"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { buildProtectedHeaders } from "@/app/lib/client-request-security";
import { emitOwnerAnalyticsChanged } from "@/app/components/VisitorAnalyticsWidget";
import { useLanguage } from "@/app/context/LanguageContext";
import OwnerAnalyticsDashboard from "@/app/components/owner/OwnerAnalyticsDashboard";
import type {
  ContentClickStat,
  FaqQuestionStat,
  PageViewStat,
} from "@/app/lib/private-analytics-store";

type OwnerAnalyticsSummary = {
  uniqueVisitors: number;
  topPages: PageViewStat[];
  topBlogClicks: ContentClickStat[];
  topAiQuestions: FaqQuestionStat[];
};

export default function OwnerPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [summary, setSummary] = useState<OwnerAnalyticsSummary | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const copy =
    language === "vi"
      ? {
          eyebrow: "Truy cập riêng",
          title: "Bật chế độ owner để xem dashboard analytics",
          subtitle:
            "Trang này chỉ dành cho bạn. Sau khi xác thực, bạn sẽ thấy tổng lượt xem, trang được xem nhiều, bài blog được mở nhiều và câu hỏi AI được hỏi nhiều nhất.",
          placeholder: "Nhập owner access key",
          action: "Bật chế độ owner",
          back: "Quay lại trang chủ",
          genericError: "Không thể bật chế độ owner lúc này.",
          summaryError: "Không thể tải dashboard analytics.",
        }
      : {
          eyebrow: "Private access",
          title: "Enable owner mode to open the analytics dashboard",
          subtitle:
            "This page is only for you. After verification, you will see total visits, top viewed pages, most opened blog articles, and the most asked AI questions.",
          placeholder: "Enter the owner access key",
          action: "Enable owner mode",
          back: "Back to home",
          genericError: "Could not enable owner mode right now.",
          summaryError: "Could not load the analytics dashboard.",
        };

  const loadSummary = useCallback(async () => {
    setIsLoadingSummary(true);

    try {
      const response = await fetch("/api/owner-analytics/summary", {
        method: "GET",
        headers: buildProtectedHeaders(),
        cache: "no-store",
      });

      if (!response.ok) {
        setSummary(null);
        return;
      }

      const data = (await response.json()) as OwnerAnalyticsSummary;
      setSummary(data);
    } catch {
      setSummary(null);
    } finally {
      setIsLoadingSummary(false);
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/visitor-analytics/session", {
        method: "POST",
        headers: buildProtectedHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ accessKey }),
        cache: "no-store",
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || copy.genericError);
        return;
      }

      emitOwnerAnalyticsChanged();
      await loadSummary();
      setAccessKey("");
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch("/api/visitor-analytics/session", {
        method: "DELETE",
        headers: buildProtectedHeaders(),
        cache: "no-store",
      });
      setSummary(null);
      emitOwnerAnalyticsChanged();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoadingSummary) {
    return (
      <div className="mx-auto flex min-h-[100svh] max-w-3xl items-center justify-center px-4 py-24">
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
          {language === "vi" ? "Đang tải owner dashboard..." : "Loading owner dashboard..."}
        </div>
      </div>
    );
  }

  if (summary) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <OwnerAnalyticsDashboard
          summary={summary}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[100svh] max-w-3xl items-center px-4 py-24">
      <div className="w-full rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_24px_70px_-40px_rgba(14,165,233,0.45)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          {copy.eyebrow}
        </div>

        <h1 className="mt-5 text-3xl font-black leading-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          {copy.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="sr-only">{copy.placeholder}</span>
            <input
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              placeholder={copy.placeholder}
              autoComplete="current-password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-50"
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {copy.action}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:text-slate-200 dark:hover:text-sky-400"
            >
              {copy.back}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
