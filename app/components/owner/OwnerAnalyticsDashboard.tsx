"use client";

import Link from "next/link";
import {
  Eye,
  FileText,
  MessageSquareMore,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogCopy } from "@/app/data/blog";
import { projectCopy } from "@/app/data/projects";
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

type OwnerAnalyticsDashboardProps = {
  summary: OwnerAnalyticsSummary;
  onLogout: () => void;
  isLoggingOut: boolean;
};

function formatDate(timestamp: number, language: "vi" | "en") {
  if (!timestamp) {
    return language === "vi" ? "Chưa có" : "No data";
  }

  return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

function formatPathLabel(path: string, language: "vi" | "en") {
  const blogPosts = blogCopy[language].posts;
  const projectItems = projectCopy[language].items;

  if (path === "/") {
    return language === "vi" ? "Trang chủ" : "Home";
  }

  if (path === "/projects") {
    return language === "vi" ? "Trang dự án" : "Projects page";
  }

  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "");
    return (
      projectItems.find((item) => item.slug === slug)?.title ||
      (language === "vi" ? "Case study dự án" : "Project case study")
    );
  }

  if (path === "/blog") {
    return language === "vi" ? "Trang blog" : "Blog page";
  }

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    return (
      blogPosts.find((item) => item.slug === slug)?.title ||
      (language === "vi" ? "Bài blog" : "Blog article")
    );
  }

  if (path === "/faq") {
    return "FAQ";
  }

  if (path === "/cv") {
    return "CV";
  }

  if (path === "/contact") {
    return language === "vi" ? "Liên hệ" : "Contact";
  }

  if (path === "/certificates") {
    return language === "vi" ? "Năng lực" : "Capabilities";
  }

  return path;
}

export default function OwnerAnalyticsDashboard({
  summary,
  onLogout,
  isLoggingOut,
}: OwnerAnalyticsDashboardProps) {
  const { language } = useLanguage();

  const totalBlogClicks = summary.topBlogClicks.reduce(
    (total, item) => total + item.count,
    0
  );
  const totalAiQuestions = summary.topAiQuestions.reduce(
    (total, item) => total + item.count,
    0
  );

  const copy =
    language === "vi"
      ? {
          eyebrow: "Owner dashboard",
          title: "Thống kê riêng cho portfolio của bạn",
          subtitle:
            "Các số liệu bên dưới loại trừ lượt xem của chính bạn và giúp bạn biết trang nào, bài blog nào và câu hỏi AI nào đang được quan tâm nhiều nhất.",
          backHome: "Quay lại trang chủ",
          logout: "Ẩn chế độ owner",
          cards: {
            visitors: "Người xem duy nhất",
            pages: "Trang được xem nhiều",
            blog: "Lượt mở blog",
            ai: "Câu hỏi AI đã ghi nhận",
          },
          sections: {
            topPages: "Trang được xem nhiều nhất",
            topBlog: "Bài blog được mở nhiều nhất",
            topAi: "Câu hỏi AI được hỏi nhiều nhất",
            count: "lượt",
            viewPage: "Mở trang",
            openBlog: "Mở bài",
            askedAt: "Lần gần nhất",
            noData: "Chưa có dữ liệu đủ để hiển thị.",
          },
        }
      : {
          eyebrow: "Owner dashboard",
          title: "Private analytics for your portfolio",
          subtitle:
            "The stats below exclude your own visits and show which pages, blog articles, and AI questions attract the most attention.",
          backHome: "Back to home",
          logout: "Hide owner mode",
          cards: {
            visitors: "Unique visitors",
            pages: "Most viewed pages",
            blog: "Blog opens",
            ai: "Tracked AI questions",
          },
          sections: {
            topPages: "Top viewed pages",
            topBlog: "Top opened blog articles",
            topAi: "Most asked AI questions",
            count: "views",
            viewPage: "Open page",
            openBlog: "Open article",
            askedAt: "Last asked",
            noData: "Not enough data yet.",
          },
        };

  const cards = [
    {
      icon: Eye,
      label: copy.cards.visitors,
      value: summary.uniqueVisitors.toString(),
    },
    {
      icon: FileText,
      label: copy.cards.pages,
      value: summary.topPages[0]?.count?.toString() || "0",
    },
    {
      icon: Sparkles,
      label: copy.cards.blog,
      value: totalBlogClicks.toString(),
    },
    {
      icon: MessageSquareMore,
      label: copy.cards.ai,
      value: totalAiQuestions.toString(),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_24px_70px_-40px_rgba(14,165,233,0.45)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
          {copy.eyebrow}
        </p>
        <div className="mt-4 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {copy.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {copy.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:text-slate-200 dark:hover:text-sky-400"
            >
              {copy.backHome}
            </Link>
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {copy.logout}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-3xl font-black text-slate-900 dark:text-slate-50">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {card.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-sky-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {copy.sections.topPages}
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            {summary.topPages.length > 0 ? (
              summary.topPages.map((item, index) => (
                <div
                  key={`${item.path}-${index}`}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        #{index + 1}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100 sm:text-base">
                        {formatPathLabel(item.path, language)}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                        {item.path}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-2xl font-black text-slate-900 dark:text-slate-50">
                        {item.count}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {copy.sections.count}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {copy.sections.noData}
              </p>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-sky-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {copy.sections.topBlog}
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {summary.topBlogClicks.length > 0 ? (
                summary.topBlogClicks.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="block rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 transition-colors hover:border-sky-400 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-sky-500/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 sm:text-base">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.href}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-2xl font-black text-slate-900 dark:text-slate-50">
                          {item.count}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.sections.count}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {copy.sections.noData}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
            <div className="flex items-center gap-3">
              <MessageSquareMore className="h-5 w-5 text-sky-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {copy.sections.topAi}
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {summary.topAiQuestions.length > 0 ? (
                summary.topAiQuestions.map((item, index) => (
                  <div
                    key={`${item.question}-${index}`}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-6 text-slate-900 dark:text-slate-100">
                          {item.question}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="rounded-full border border-slate-200 bg-white px-2 py-1 font-semibold uppercase tracking-[0.18em] dark:border-slate-700 dark:bg-slate-900">
                            {item.intent}
                          </span>
                          <span>{item.language.toUpperCase()}</span>
                          <span>{copy.sections.askedAt}: {formatDate(item.lastAskedAt, language)}</span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-2xl font-black text-slate-900 dark:text-slate-50">
                          {item.count}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.sections.count}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {copy.sections.noData}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
