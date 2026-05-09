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
        className={`max-w-[86%] rounded-[2rem] px-6 py-4 shadow-sm sm:max-w-[80%] xl:max-w-[75%] ${
          role === "user"
            ? "border border-sky-400/30 bg-sky-500 text-white shadow-sky-500/10"
            : "border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        }`}
      >
        <div className="mb-3 flex items-center gap-2.5">
          {role === "user" ? (
            <>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <User2 size={12} className="text-white" />
              </div>
              <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/90">
                {language === "vi" ? "Bạn" : "You"}
              </span>
            </>
          ) : (
            <>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/10 dark:bg-sky-500/20">
                <Sparkles size={12} className="text-sky-500" />
              </div>
              <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                AI
              </span>
              <span className="rounded-lg border border-slate-100 bg-slate-50/50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
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

          </div>
        ) : (
          <div className="text-sm leading-7 text-white">{content}</div>
        )}
      </div>
    </div>
  );
}
