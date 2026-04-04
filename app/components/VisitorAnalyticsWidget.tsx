"use client";

import { useEffect, useState } from "react";
import { Eye, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { buildProtectedHeaders } from "@/app/lib/client-request-security";

type VisitorAnalyticsResponse = {
  owner?: boolean;
  uniqueVisitors?: number;
};

const OWNER_ANALYTICS_EVENT = "portfolio:owner-access-changed";

export function emitOwnerAnalyticsChanged() {
  window.dispatchEvent(new Event(OWNER_ANALYTICS_EVENT));
}

export default function VisitorAnalyticsWidget() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const syncAnalytics = async () => {
      try {
        const response = await fetch("/api/visitor-analytics/track", {
          method: "POST",
          headers: buildProtectedHeaders({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ path: pathname }),
          cache: "no-store",
        });

        const data = (await response.json()) as VisitorAnalyticsResponse;
        if (cancelled) {
          return;
        }

        setIsOwner(Boolean(data.owner));
        setCount(data.uniqueVisitors || 0);
      } catch {
        if (!cancelled) {
          setIsOwner(false);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void syncAnalytics();

    const handleOwnerChange = () => {
      setIsLoading(true);
      void syncAnalytics();
    };

    window.addEventListener(OWNER_ANALYTICS_EVENT, handleOwnerChange);

    return () => {
      cancelled = true;
      window.removeEventListener(OWNER_ANALYTICS_EVENT, handleOwnerChange);
    };
  }, [pathname]);

  const copy =
    language === "vi"
      ? {
          title: "Người xem",
          subtitle: "Không tính bạn",
          logout: "Ẩn thống kê",
        }
      : {
          title: "Visitors",
          subtitle: "Excluding you",
          logout: "Hide stats",
        };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch("/api/visitor-analytics/session", {
        method: "DELETE",
        headers: buildProtectedHeaders(),
        cache: "no-store",
      });
    } finally {
      emitOwnerAnalyticsChanged();
      setIsLoggingOut(false);
    }
  };

  if (isLoading || !isOwner) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:left-4">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-sky-400/25 bg-slate-950/88 px-4 py-3 text-white shadow-[0_20px_50px_-30px_rgba(14,165,233,0.55)] backdrop-blur-xl sm:min-w-[260px]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
            <Eye className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              {copy.title}
            </p>
            <p className="text-xl font-black leading-none">{count}</p>
            <p className="mt-1 text-xs text-slate-400">{copy.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-sky-300/40 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-3.5 w-3.5" />
          {copy.logout}
        </button>
      </div>
    </div>
  );
}
