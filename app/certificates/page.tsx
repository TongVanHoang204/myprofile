"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PageWrapper from "@/app/components/PageWrapper";
import { useLanguage } from "@/app/context/LanguageContext";

const itemVisuals: Record<
  string,
  { logoColor: string; icon: React.ReactNode }
> = {
  "EDU-HUTECH": {
    logoColor: "bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 20.055a12.083 12.083 0 01-6.16-9.477L12 14z"
        />
      </svg>
    ),
  },
  "PRJ-FESHEN": {
    logoColor:
      "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.75 17L15 12l-5.25-5M6 6h.01M6 18h.01M18 6h.01M18 18h.01"
        />
      </svg>
    ),
  },
  "SKILL-API": {
    logoColor:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 9l3 3-3 3m5 0h3M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
        />
      </svg>
    ),
  },
  "SKILL-WEB": {
    logoColor:
      "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 12H3m18 0a9 9 0 10-18 0m18 0a9 9 0 01-18 0m8-9c-2 2.5-3 5.5-3 9s1 6.5 3 9m6-18c2 2.5 3 5.5 3 9s-1 6.5-3 9"
        />
      </svg>
    ),
  },
  "SKILL-MOBILE": {
    logoColor:
      "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 18h.01M8 4h8a1 1 0 011 1v14a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1z"
        />
      </svg>
    ),
  },
  "SKILL-GIT": {
    logoColor:
      "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M7 7h10M7 12h6m-6 5h10M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        />
      </svg>
    ),
  },
  "CERT-GEMINI": {
    logoColor:
      "bg-gradient-to-br from-emerald-100 to-sky-100 text-sky-700 dark:from-emerald-950/40 dark:to-sky-950/40 dark:text-sky-300",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 3l1.9 3.86L18 8l-3 2.93.71 4.14L12 13.3 8.29 15.07 9 10.93 6 8l4.1-1.14L12 3z"
        />
      </svg>
    ),
  },
};

const categories = [
  "all",
  "education",
  "project",
  "skill",
  "certificate",
] as const;

export default function CertificatesPage() {
  const { dict, language } = useLanguage();
  const [activeTab, setActiveTab] =
    useState<(typeof categories)[number]>("all");

  const items = dict.certificates.items;
  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter(
          (item: { category: string }) => item.category === activeTab
        );

  return (
    <PageWrapper>
      <div className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-24 md:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-500"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
              {dict.certificates.tag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {dict.certificates.collection_title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg"
            >
              {dict.certificates.collection_desc}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:w-auto"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-purple-500 text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {dict.certificates.total_count}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {items.length}{" "}
                <span className="text-sm font-normal text-slate-500">
                  {dict.certificates.certs_unit}
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:px-5 sm:text-sm ${
                  isActive
                    ? "scale-105 bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {
                  dict.certificates.filters[
                    category as keyof typeof dict.certificates.filters
                  ]
                }
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map(
            (
              item: {
                id: string;
                title: string;
                issuer: string;
                desc: string;
                meta: string;
                issuedOn?: string;
                expiresOn?: string;
                url?: string;
              },
              index: number
            ) => {
              const visual = itemVisuals[item.id] ?? itemVisuals["SKILL-GIT"];

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-6"
                >
                  <div>
                    <div className="mb-6 flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${visual.logoColor}`}
                      >
                        {visual.icon}
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:text-[10px]">
                        {item.id}
                      </span>
                    </div>

                    <h2 className="mb-3 text-lg font-bold leading-snug text-slate-900 dark:text-white sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="mb-3 text-sm font-semibold text-sky-500">
                      {item.issuer}
                    </p>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>

                    {(item.issuedOn || item.expiresOn) && (
                      <div className="mt-4 space-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {item.issuedOn && (
                          <p>
                            {language === "vi" ? "Cấp ngày: " : "Issued on: "}
                            {item.issuedOn}
                          </p>
                        )}
                        {item.expiresOn && (
                          <p>
                            {language === "vi"
                              ? "Hết hạn: "
                              : "Expires on: "}
                            {item.expiresOn}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      {dict.certificates.meta_label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {item.meta}
                    </p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
                      >
                        {language === "vi"
                          ? "Xác thực chứng chỉ"
                          : "Verify credential"}
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5h5m0 0v5m0-5L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            }
          )}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full w-full rounded-full bg-sky-500" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {dict.certificates.showing} {filteredItems.length} / {items.length}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
