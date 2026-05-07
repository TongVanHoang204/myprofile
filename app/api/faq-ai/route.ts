import { NextResponse } from "next/server";
import { logFaqQuestion } from "@/app/lib/faq-ai-analytics";
import type {
  AiAudienceMode,
  ChatHistoryItem,
  FaqAiMeta,
} from "@/app/lib/faq-ai-types";
import {
  buildPortfolioPrompt,
  getActionCards,
  getPortfolioContext,
  getSuggestedQuestions,
  sanitizeHistoryItems,
} from "@/app/lib/portfolio-ai";
import {
  consumeRateLimit,
  getClientIp,
  hasAllowedFetchMetadata,
  hasValidProtectionToken,
  isJsonRequest,
  isSameOriginRequest,
} from "@/app/lib/request-security";

type RequestBody = {
  question?: string;
  language?: "vi" | "en";
  mode?: AiAudienceMode;
  history?: ChatHistoryItem[];
};

type AiProvider = "gemini" | "ollama" | "openrouter";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ text?: string; type?: string }>;
    };
  }>;
};

const MAX_REQUESTS_PER_WINDOW = 12;
const WINDOW_MS = 10 * 60 * 1000;
const AI_TIMEOUT_MS = 15_000;
const DEFAULT_GEMINI_MODEL = "gemini-3-flash-preview";
const DEFAULT_OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_OPENROUTER_MODEL = "openai/gpt-oss-120b";
const GEMINI_FALLBACK_MODELS = [
  DEFAULT_GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
] as const;

function resolveMode(mode?: AiAudienceMode) {
  return mode === "client" ? "client" : "recruiter";
}

function resolveLanguage(language?: "vi" | "en") {
  return language === "en" ? "en" : "vi";
}

function resolveProvider(): AiProvider {
  const normalized = process.env.FAQ_AI_PROVIDER?.trim().toLowerCase();

  if (normalized === "openrouter") {
    return "openrouter";
  }

  if (normalized === "ollama") {
    return "ollama";
  }

  if (normalized === "gemini") {
    return "gemini";
  }

  if (process.env.OPENROUTER_API_KEY) {
    return "openrouter";
  }

  return process.env.GEMINI_API_KEY ? "gemini" : "ollama";
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs: number
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

function extractGeminiText(data: GeminiResponse) {
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text?.trim() || "")
      .filter(Boolean)
      .join("\n")
      .trim() || ""
  );
}

function extractOpenRouterText(data: OpenRouterResponse) {
  const content = data.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => part.text?.trim() || "")
      .filter(Boolean)
      .join("\n")
      .trim();
  }

  return "";
}

function getGeminiModelCandidates() {
  const configuredModel =
    process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  return [
    configuredModel,
    ...GEMINI_FALLBACK_MODELS.filter((model) => model !== configuredModel),
  ];
}

async function callGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_NOT_CONFIGURED");
  }

  const models = getGeminiModelCandidates();
  let lastError = "GEMINI_REQUEST_FAILED";

  for (const model of models) {
    let response: Response;

    try {
      response = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              candidateCount: 1,
              maxOutputTokens: 512,
              temperature: 0.55,
            },
          }),
        },
        AI_TIMEOUT_MS
      );
    } catch (error) {
      console.error(`Gemini request failed for model ${model}:`, error);
      lastError = "GEMINI_UNREACHABLE";
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini upstream error for model ${model}:`, errorText);
      lastError =
        response.status >= 500 || response.status === 429
          ? "GEMINI_UNAVAILABLE"
          : "GEMINI_REQUEST_FAILED";
      continue;
    }

    const data = (await response.json()) as GeminiResponse;
    const answer = extractGeminiText(data);

    if (!answer) {
      console.error(`Gemini empty response for model ${model}:`, data);
      lastError = "GEMINI_EMPTY_RESPONSE";
      continue;
    }

    return { answer, model };
  }

  throw new Error(lastError);
}

async function callOpenRouter(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("OPENROUTER_NOT_CONFIGURED");
  }

  const apiUrl =
    process.env.OPENROUTER_API_URL?.trim() || DEFAULT_OPENROUTER_API_URL;
  const model =
    process.env.OPENROUTER_MODEL?.trim() || DEFAULT_OPENROUTER_MODEL;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "X-Title": "Tong Van Hoang Portfolio",
  };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (siteUrl) {
    headers["HTTP-Referer"] = siteUrl;
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(
      apiUrl,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 512,
          temperature: 0.55,
          reasoning: {
            effort: "low",
            exclude: true,
          },
        }),
      },
      AI_TIMEOUT_MS
    );
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    throw new Error("OPENROUTER_UNREACHABLE");
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenRouter upstream error:", errorText);
    throw new Error(
      response.status >= 500 || response.status === 429
        ? "OPENROUTER_UNAVAILABLE"
        : "OPENROUTER_REQUEST_FAILED"
    );
  }

  const data = (await response.json()) as OpenRouterResponse;
  const answer = extractOpenRouterText(data);

  if (!answer) {
    console.error("OpenRouter empty response:", data);
    throw new Error("OPENROUTER_EMPTY_RESPONSE");
  }

  return { answer, model };
}

async function callOllama(prompt: string) {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  const model = process.env.OLLAMA_MODEL || "llama3.2:latest";

  let response: Response;
  try {
    response = await fetchWithTimeout(
      `${baseUrl}/api/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          stream: false,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      },
      AI_TIMEOUT_MS
    );
  } catch (error) {
    console.error("Ollama request failed:", error);
    throw new Error("OLLAMA_UNREACHABLE");
  }

  if (!response.ok) {
    console.error("Ollama upstream error:", await response.text());
    throw new Error("OLLAMA_REQUEST_FAILED");
  }

  const data = (await response.json()) as {
    message?: { content?: string };
  };
  const answer = data.message?.content?.trim();

  if (!answer) {
    throw new Error("OLLAMA_EMPTY_RESPONSE");
  }

  return { answer, model };
}

function toSseEvent(event: string, data: object) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function chunkAnswerText(answer: string) {
  const tokens = answer.split(/(\s+)/).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  for (const token of tokens) {
    current += token;

    if (current.length >= 36 || /[\n.!?]$/.test(token)) {
      chunks.push(current);
      current = "";
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

async function buildStreamResponse(params: {
  answer: string;
  meta: FaqAiMeta;
  provider: AiProvider;
  model: string;
}) {
  const { answer, meta, provider, model } = params;
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: object) => {
        controller.enqueue(encoder.encode(toSseEvent(event, data)));
      };

      send("meta", meta);

      for (const chunk of chunkAnswerText(answer)) {
        send("chunk", { text: chunk });
        await new Promise((resolve) => setTimeout(resolve, 14));
      }

      send("done", { provider, model });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: Request) {
  try {
    if (
      !isSameOriginRequest(request) ||
      !hasAllowedFetchMetadata(request) ||
      !hasValidProtectionToken(request)
    ) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (!isJsonRequest(request)) {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 }
      );
    }

    const ip = getClientIp(request);
    if (consumeRateLimit(`faq-ai:${ip}`, MAX_REQUESTS_PER_WINDOW, WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as RequestBody;
    const question = body.question?.trim() || "";
    const language = resolveLanguage(body.language);
    const mode = resolveMode(body.mode);
    const history = sanitizeHistoryItems(body.history);

    if (!question) {
      return NextResponse.json(
        { error: "Vui lòng nhập câu hỏi." },
        { status: 400 }
      );
    }

    if (question.length > 1000) {
      return NextResponse.json(
        { error: "Câu hỏi quá dài." },
        { status: 400 }
      );
    }

    const provider = resolveProvider();
    const { intent, sources } = getPortfolioContext(question, language);
    const actions = getActionCards(language, intent, sources);
    const suggestions = getSuggestedQuestions(language, mode, intent);
    const prompt = buildPortfolioPrompt({
      question,
      language,
      mode,
      intent,
      sources,
      history,
    });

    await logFaqQuestion(question, language, intent);

    const { answer, model } =
      provider === "openrouter"
        ? await callOpenRouter(prompt)
        : provider === "gemini"
          ? await callGemini(prompt)
          : await callOllama(prompt);

    return buildStreamResponse({
      answer,
      provider,
      model,
      meta: {
        intent,
        mode,
        sources,
        actions,
        suggestions,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (
      message === "GEMINI_NOT_CONFIGURED" ||
      message === "OPENROUTER_NOT_CONFIGURED"
    ) {
      return NextResponse.json(
        { error: "AI service is not configured yet." },
        { status: 503 }
      );
    }

    if (
      message.startsWith("GEMINI_") ||
      message.startsWith("OLLAMA_") ||
      message.startsWith("OPENROUTER_")
    ) {
      return NextResponse.json(
        { error: "AI service is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    console.error("FAQ AI error:", error);
    return NextResponse.json(
      {
        error:
          "Dịch vụ AI tạm thời không khả dụng. Vui lòng thử lại.",
      },
      { status: 500 }
    );
  }
}
