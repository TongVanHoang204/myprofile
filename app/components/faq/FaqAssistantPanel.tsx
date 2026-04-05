"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MessageCircle, Sparkles } from "lucide-react";
import type {
  AiAudienceMode,
  ChatHistoryItem,
  FaqAiMeta,
} from "@/app/lib/faq-ai-types";
import { buildProtectedHeaders } from "@/app/lib/client-request-security";
import FaqChatBubble from "@/app/components/faq/FaqChatBubble";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "streaming" | "done";
  meta?: Partial<FaqAiMeta>;
};

type FaqAssistantPanelProps = {
  language: "vi" | "en";
};

function renderInlineText(text: string) {
  const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong
          key={`${segment}-${index}`}
          className="text-sky-600 dark:text-sky-400"
        >
          {segment.slice(2, -2)}
        </strong>
      );
    }

    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={`${segment}-${index}`}
          className="rounded-md bg-slate-900/10 px-1.5 py-0.5 text-[0.95em] font-semibold text-slate-800 dark:bg-slate-100/10 dark:text-slate-100"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

function renderRichText(content: string) {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return null;
  }

  return normalized
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block, blockIndex) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line));

      if (isBulletList) {
        return (
          <ul key={`block-${blockIndex}`} className="list-disc space-y-2 pl-5">
            {lines.map((line, lineIndex) => (
              <li key={`line-${blockIndex}-${lineIndex}`} className="pl-1">
                {renderInlineText(line.replace(/^[-*•]\s+/, ""))}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <div key={`block-${blockIndex}`} className="space-y-2">
          {lines.map((line, lineIndex) => (
            <p key={`line-${blockIndex}-${lineIndex}`}>
              {renderInlineText(line)}
            </p>
          ))}
        </div>
      );
    });
}

function getInitialQuickPrompts(language: "vi" | "en", mode: AiAudienceMode) {
  if (language === "vi") {
    return mode === "recruiter"
      ? [
          "Stack chính của bạn là gì?",
          "Bạn đã tích hợp AI vào FeShenShop như thế nào?",
          "Bạn làm phần backend nào trực tiếp?",
          "Trang nào nên xem để hiểu nhanh về bạn?",
        ]
      : [
          "Bạn có thể làm website theo stack nào?",
          "FeShenShop có tính năng AI gì nổi bật?",
          "Bạn có làm được mobile app không?",
          "Tôi nên xem project nào đầu tiên?",
        ];
  }

  return mode === "recruiter"
    ? [
        "What is your core stack?",
        "How did you integrate AI into FeShenShop?",
        "What backend work did you handle directly?",
        "Which page should I open first to understand your work?",
      ]
    : [
        "What kind of website stack can you build with?",
        "What AI features did you add to FeShenShop?",
        "Do you also have mobile app experience?",
        "Which project should I review first?",
      ];
}

export default function FaqAssistantPanel({
  language,
}: FaqAssistantPanelProps) {
  const [chatMode, setChatMode] = useState<AiAudienceMode>("recruiter");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickPrompts, setQuickPrompts] = useState<string[]>(() =>
    getInitialQuickPrompts(language, "recruiter")
  );
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  const content =
    language === "vi"
      ? {
          title: "Hỏi AI sâu hơn",
          description:
            "Dùng khối này khi bạn muốn đào sâu vào stack, AI integration, backend hoặc phần việc thực tế đã làm.",
          recruiterMode: "Recruiter mode",
          clientMode: "Client mode",
          placeholder:
            "Ví dụ: Bạn đã tích hợp AI vào FeShenShop như thế nào?",
          emptyTitle: "Đặt câu hỏi bất kỳ",
          emptyDescription:
            "Ví dụ về stack, backend, AI integration, internship hoặc trang nên xem tiếp theo.",
          loadingLabel: "Đang soạn câu trả lời...",
          helper:
            "AI dùng RAG mini từ portfolio, nhớ ngắn lịch sử chat và trả kèm nguồn.",
          askButton: "Gửi câu hỏi",
          askingButton: "Đang trả lời...",
          required: "Vui lòng nhập câu hỏi.",
          noResponse: "AI không trả về dữ liệu.",
          fetchError: "Không thể lấy câu trả lời AI.",
          networkError: "Lỗi kết nối tới dịch vụ AI.",
        }
      : {
          title: "Ask the AI for detail",
          description:
            "Use this panel when you want to go deeper into the stack, AI integration, backend work, or direct contributions.",
          recruiterMode: "Recruiter mode",
          clientMode: "Client mode",
          placeholder: "Example: How did you integrate AI into FeShenShop?",
          emptyTitle: "Ask anything",
          emptyDescription:
            "Try asking about the stack, backend, AI integration, internship, or what page to view next.",
          loadingLabel: "Drafting the answer...",
          helper:
            "The AI uses a mini RAG layer from the portfolio and includes short chat memory plus sources.",
          askButton: "Ask",
          askingButton: "Answering...",
          required: "Please enter a question.",
          noResponse: "AI returned no response body.",
          fetchError: "Could not get AI answer.",
          networkError: "Failed to connect to AI service.",
        };

  const modeOptions = [
    { id: "recruiter" as const, label: content.recruiterMode },
    { id: "client" as const, label: content.clientMode },
  ];

  const chatHistory = useMemo<ChatHistoryItem[]>(
    () =>
      messages
        .filter((message) => message.content.trim())
        .slice(-6)
        .map((message) => ({ role: message.role, content: message.content })),
    [messages]
  );

  useEffect(() => {
    setQuickPrompts(getInitialQuickPrompts(language, chatMode));
  }, [chatMode, language]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTo({
        top: chatLogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const updateMessage = (
    messageId: string,
    updater: (message: ChatMessage) => ChatMessage
  ) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId ? updater(message) : message
      )
    );
  };

  const consumeAiStream = async (response: Response, messageId: string) => {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error(content.noResponse);
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (buffer.includes("\n\n")) {
        const index = buffer.indexOf("\n\n");
        const rawEvent = buffer.slice(0, index).trim();
        buffer = buffer.slice(index + 2);
        if (!rawEvent) continue;

        const lines = rawEvent.split("\n");
        const eventName = lines
          .find((line) => line.startsWith("event:"))
          ?.replace(/^event:\s*/, "");
        const eventData = lines
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.replace(/^data:\s*/, ""))
          .join("\n");

        if (!eventName || !eventData) continue;
        const parsed = JSON.parse(eventData) as
          | FaqAiMeta
          | { text: string }
          | { provider: string; model: string };

        if (eventName === "meta") {
          const meta = parsed as FaqAiMeta;
          updateMessage(messageId, (message) => ({ ...message, meta }));
          setQuickPrompts(meta.suggestions);
          continue;
        }

        if (eventName === "chunk") {
          const chunk = parsed as { text: string };
          updateMessage(messageId, (message) => ({
            ...message,
            content: `${message.content}${chunk.text}`,
          }));
          continue;
        }

        if (eventName === "done") {
          const meta = parsed as { provider: string; model: string };
          updateMessage(messageId, (message) => ({
            ...message,
            status: "done",
            meta: { ...message.meta, provider: meta.provider, model: meta.model },
          }));
        }
      }
    }
  };

  const submitQuestion = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || aiLoading) return;

    const userId = `user-${Date.now()}`;
    const assistantId = `assistant-${Date.now() + 1}`;

    setAiError("");
    setAiQuestion("");
    setAiLoading(true);
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", content: question, status: "done" },
      { id: assistantId, role: "assistant", content: "", status: "streaming" },
    ]);

    try {
      const response = await fetch("/api/faq-ai", {
        method: "POST",
        headers: buildProtectedHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          question,
          language,
          mode: chatMode,
          history: [...chatHistory, { role: "user", content: question }].slice(
            -6
          ),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error || content.fetchError);
      }

      await consumeAiStream(response, assistantId);
    } catch (error) {
      setAiError(
        error instanceof Error ? error.message : content.networkError
      );
      setMessages((current) =>
        current.filter((item) => item.id !== assistantId)
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-5"
    >
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="text-sky-500" size={18} />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {content.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {content.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {modeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setChatMode(option.id)}
              className={`min-w-[calc(50%-0.25rem)] rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:min-w-0 ${
                chatMode === option.id
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:text-sky-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submitQuestion(prompt)}
            disabled={aiLoading}
            className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-xs font-semibold text-slate-600 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:text-sky-400"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div
        ref={chatLogRef}
        className="mb-4 max-h-[30rem] min-h-[14rem] space-y-4 overflow-y-auto rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40 sm:max-h-[28rem] sm:min-h-[13rem] sm:p-4"
      >
        {messages.length === 0 ? (
          <div className="flex min-h-[11rem] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-white/70 px-5 py-6 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <MessageCircle className="mb-3 h-8 w-8 text-sky-400" />
            <p className="text-base font-bold text-slate-900 dark:text-slate-50">
              {content.emptyTitle}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {content.emptyDescription}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <FaqChatBubble
              key={message.id}
              language={language}
              role={message.role}
              content={
                message.content
                  ? renderRichText(message.content)
                  : content.loadingLabel
              }
              isStreaming={message.status === "streaming"}
              intent={message.meta?.intent}
              provider={message.meta?.provider}
              model={message.meta?.model}
              sources={message.meta?.sources}
              actions={message.meta?.actions}
            />
          ))
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!aiQuestion.trim()) {
            setAiError(content.required);
            return;
          }
          void submitQuestion(aiQuestion);
        }}
        className="space-y-3"
      >
        <textarea
          value={aiQuestion}
          onChange={(event) => setAiQuestion(event.target.value)}
          rows={2}
          placeholder={content.placeholder}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {aiError ? (
            <p className="text-sm text-red-500">{aiError}</p>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {content.helper}
            </p>
          )}

          <button
            type="submit"
            disabled={aiLoading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {aiLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Sparkles size={16} />
            )}
            {aiLoading ? content.askingButton : content.askButton}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
