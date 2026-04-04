"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, Sparkles, User2 } from "lucide-react";
import type {
  AiIntent,
  FaqAiAction,
  FaqAiSource,
} from "@/app/lib/faq-ai-types";

type ChatBubbleProps = {
  language: "vi" | "en";
  role: "user" | "assistant";
  content: ReactNode;
  isStreaming?: boolean;
  intent?: AiIntent;
  provider?: string;
  model?: string;
  sources?: FaqAiSource[];
  actions?: FaqAiAction[];
};

function getIntentLabel(language: "vi" | "en", intent?: AiIntent) {
  const labels =
    language === "vi"
      ? {
          stack: "Stack",
          project: "Dự án",
          ai: "AI",
          experience: "Kinh nghiệm",
          education: "Học vấn",
          contact: "Liên hệ",
          blog: "Blog",
          general: "Tổng quan",
        }
      : {
          stack: "Stack",
          project: "Project",
          ai: "AI",
          experience: "Experience",
          education: "Education",
          contact: "Contact",
          blog: "Blog",
          general: "Overview",
        };

  return labels[intent || "general"];
}

export default function FaqChatBubble({
  language,
  role,
  content,
  isStreaming,
  intent,
  provider,
  model,
  sources,
  actions,
}: ChatBubbleProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-[1.5rem] border px-5 py-4 sm:max-w-[74%] xl:max-w-[68%] ${
          role === "user"
            ? "border-sky-500/25 bg-sky-500 text-white shadow-lg shadow-sky-500/15"
            : "border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
        }`}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
          {role === "user" ? (
            <>
              <User2 className="h-3.5 w-3.5" />
              {language === "vi" ? "Bạn" : "You"}
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              AI
              <span className="rounded-full border border-slate-300/70 bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-slate-600 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300">
                {getIntentLabel(language, intent)}
              </span>
            </>
          )}
        </div>

        {role === "assistant" ? (
          <div className="space-y-4 text-sm leading-7">
            <div>
              {content}
              {isStreaming && (
                <span className="ml-2 inline-flex items-center text-slate-500 dark:text-slate-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              )}
            </div>

            {sources && sources.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {language === "vi" ? "Nguồn tham chiếu" : "Sources"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sources.map((source) => (
                    <Link
                      key={source.id}
                      href={source.href}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:text-sky-400"
                    >
                      <span>{source.label}</span>
                      <span className="max-w-[14rem] truncate">
                        {source.title}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {actions && actions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {language === "vi" ? "Hành động tiếp theo" : "Next actions"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {actions.map((action) =>
                    action.kind === "download" ? (
                      <a
                        key={action.id}
                        href={action.href}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                          action.variant === "primary"
                            ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:text-sky-400"
                        }`}
                      >
                        {action.label}
                      </a>
                    ) : (
                      <Link
                        key={action.id}
                        href={action.href}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                          action.variant === "primary"
                            ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:text-sky-400"
                        }`}
                      >
                        {action.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}

            {(provider || model) && (
              <div className="flex flex-wrap gap-2 text-xs">
                {provider && (
                  <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                    {provider}
                  </span>
                )}
                {model && (
                  <span className="rounded-full border border-slate-300/70 bg-slate-50 px-3 py-1 font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
                    {model}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm leading-7 text-white">{content}</div>
        )}
      </div>
    </div>
  );
}
