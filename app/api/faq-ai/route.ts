import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientIp,
  hasAllowedFetchMetadata,
  hasValidProtectionToken,
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
const DEFAULT_GEMINI_MODEL = "gemini-3-flash-preview";
const GEMINI_FALLBACK_MODELS = [
  DEFAULT_GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
] as const;

function buildPrompt(
  question: string,
  language: "vi" | "en",
  context: FAQContextItem[]
) {
  const header =
    language === "vi"
      ? "B\u1ea1n l\u00e0 tr\u1ee3 l\u00fd FAQ cho portfolio c\u1ee7a T\u1ed1ng V\u0103n Ho\u00e0ng."
      : "You are an FAQ assistant for Tong Van Hoang's portfolio.";

  const rules =
    language === "vi"
      ? "Tr\u1ea3 l\u1eddi ng\u1eafn g\u1ecdn, r\u00f5 r\u00e0ng, th\u00e2n thi\u1ec7n. N\u1ebfu thi\u1ebfu th\u00f4ng tin, h\u00e3y n\u00f3i r\u00f5 v\u00e0 khuy\u00ean ng\u01b0\u1eddi d\u00f9ng li\u00ean h\u1ec7 tr\u1ef1c ti\u1ebfp."
      : "Answer clearly and concisely. If information is missing, say so and suggest contacting directly.";

  const formatHint =
    language === "vi"
      ? "Tr\u00e1nh d\u00f9ng markdown nh\u01b0 **in \u0111\u1eadm**, # heading ho\u1eb7c b\u1ea3ng. N\u1ebfu c\u1ea7n li\u1ec7t k\u00ea, h\u00e3y d\u00f9ng g\u1ea1ch \u0111\u1ea7u d\u00f2ng \u0111\u01a1n gi\u1ea3n ho\u1eb7c 1-3 \u0111o\u1ea1n ng\u1eafn."
      : "Formatting rules: do not use markdown such as **bold**, # headings, or tables. If listing items, use simple bullet points or 1-3 short paragraphs.";

  const contextText =
    context.length > 0
      ? context
          .map(
            (item, index) =>
              `${index + 1}. Q: ${item.question}\nA: ${item.answer}`
          )
          .join("\n\n")
      : language === "vi"
        ? "Kh\u00f4ng c\u00f3 d\u1eef li\u1ec7u FAQ b\u1ed5 sung."
        : "No additional FAQ context.";

  return `${header}

${rules}

${formatHint}

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
        { error: "Vui l\u00f2ng nh\u1eadp c\u00e2u h\u1ecfi." },
        { status: 400 }
      );
    }

    if (question.length > 1000) {
      return NextResponse.json(
        { error: "C\u00e2u h\u1ecfi qu\u00e1 d\u00e0i." },
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
      {
        error:
          "D\u1ecbch v\u1ee5 AI t\u1ea1m th\u1eddi kh\u00f4ng kh\u1ea3 d\u1ee5ng. Vui l\u00f2ng th\u1eed l\u1ea1i.",
      },
      { status: 500 }
    );
  }
}
