"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { buildProtectedHeaders } from "@/app/lib/client-request-security";
import { emitOwnerAnalyticsChanged } from "@/app/components/VisitorAnalyticsWidget";
import { useLanguage } from "@/app/context/LanguageContext";

export default function OwnerPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy =
    language === "vi"
      ? {
          eyebrow: "Truy cập riêng",
          title: "Bật chế độ xem thống kê lượt truy cập",
          subtitle:
            "Trang này chỉ dùng để bạn mở quyền xem bộ đếm người xem. Sau khi xác thực thành công, số lượt xem sẽ hiện riêng cho bạn và không tính lượt truy cập của chính bạn.",
          placeholder: "Nhập owner access key",
          action: "Bật chế độ owner",
          back: "Quay lại trang chủ",
          genericError: "Không thể bật chế độ owner lúc này.",
        }
      : {
          eyebrow: "Private access",
          title: "Enable the private visitor analytics view",
          subtitle:
            "This page is only for unlocking the owner-only visitor counter. After a successful verification, the total will appear only for you and your own visit will be excluded.",
          placeholder: "Enter the owner access key",
          action: "Enable owner mode",
          back: "Back to home",
          genericError: "Could not enable owner mode right now.",
        };

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
      router.replace("/");
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {copy.action}
              <ArrowRight className="h-4 w-4" />
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
