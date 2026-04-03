import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientIp,
  isJsonRequest,
  isSameOriginRequest,
} from "@/app/lib/request-security";

type FAQContextItem = {
  question: string;
  answer: string;
};

type RequestBody = {
  provider?: string;
  question?: string;
  language?: "vi" | "en";
  context?: FAQContextItem[];
};

type AiProvider = "gemini" | "ollama";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

const MAX_REQUESTS_PER_WINDOW = 12;
const WINDOW_MS = 10 * 60 * 1000;
const AI_TIMEOUT_MS = 15_000;
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_FALLBACK_MODELS = [
  DEFAULT_GEMINI_MODEL,
  "gemini-2.5-flash-lite",
] as const;

function buildPrompt(
  question: string,
  language: "vi" | "en",
  context: FAQContextItem[]
) {
  const header =
    language === "vi"
      ? "Bạn là trợ lý FAQ cho portfolio của Tống Văn Hoàng."
      : "You are an FAQ assistant for Tong Van Hoang's portfolio.";

  const rules =
    language === "vi"
      ? "Trả lời ngắn gọn, rõ ràng, thân thiện. Nếu thiếu thông tin, hãy nói rõ và khuyên người dùng liên hệ trực tiếp."
      : "Answer clearly and concisely. If information is missing, say so and suggest contacting directly.";

  const contextText =
    context.length > 0
      ? context
          .map(
            (item, index) =>
              `${index + 1}. Q: ${item.question}\nA: ${item.answer}`
          )
          .join("\n\n")
      : language === "vi"
        ? "Không có dữ liệu FAQ bổ sung."
        : "No additional FAQ context.";

  return `${header}

${rules}

FAQ context:
${contextText}

User question: ${question}`;
}

function normalizeProvider(provider?: string): AiProvider | null {
  if (!provider) return null;

  const normalized = provider.trim().toLowerCase();

  if (normalized === "gemini" || normalized === "google") {
    return "gemini";
  }

  if (normalized === "ollama") {
    return "ollama";
  }

  return null;
}

function resolveProvider(provider?: string): AiProvider {
  const requestedProvider = normalizeProvider(provider);
  if (requestedProvider) {
    return requestedProvider;
  }

  const envProvider = normalizeProvider(process.env.FAQ_AI_PROVIDER);
  if (envProvider) {
    return envProvider;
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
              maxOutputTokens: 384,
              temperature: 0.6,
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

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
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

    if (body.provider && !normalizeProvider(body.provider)) {
      return NextResponse.json(
        { error: "AI provider is not supported." },
        { status: 400 }
      );
    }

    const provider = resolveProvider(body.provider);
    const question = body.question?.trim() || "";
    const language = body.language || "vi";
    const context = (body.context || []).slice(0, 10);

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

    const prompt = buildPrompt(question, language, context);
    const { answer, model } =
      provider === "gemini"
        ? await callGemini(prompt)
        : await callOllama(prompt);

    return NextResponse.json({ answer, provider, model });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message === "GEMINI_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "AI service is not configured yet." },
        { status: 503 }
      );
    }

    if (message.startsWith("GEMINI_") || message.startsWith("OLLAMA_")) {
      return NextResponse.json(
        { error: "AI service is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    console.error("FAQ AI error:", error);
    return NextResponse.json(
      { error: "Dịch vụ AI tạm thời không khả dụng. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
