"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  Clock,
  Code,
  Layers,
  Loader2,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { buildProtectedHeaders } from "@/app/lib/client-request-security";

type FAQItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
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

  const blocks = normalized.split(/\n{2,}/).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isBulletList = lines.every((line) => /^[-*\u2022]\s+/.test(line));
    const isOrderedList = lines.every((line) => /^\d+\.\s+/.test(line));

    if (isBulletList || isOrderedList) {
      const ListTag = isOrderedList ? "ol" : "ul";

      return (
        <ListTag
          key={`block-${blockIndex}`}
          className={`space-y-2 pl-5 ${
            isOrderedList ? "list-decimal" : "list-disc"
          }`}
        >
          {lines.map((line, lineIndex) => (
            <li key={`line-${blockIndex}-${lineIndex}`} className="pl-1">
              {renderInlineText(line.replace(/^([-*\u2022]|\d+\.)\s+/, ""))}
            </li>
          ))}
        </ListTag>
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

export default function FAQPage() {
  const { dict, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMeta, setAiMeta] = useState<{
    provider?: string;
    model?: string;
  }>({});

  const faqData = dict.faq;
  const ctaContent =
    language === "vi"
      ? {
          title: "Li\u00ean h\u1ec7",
          subtitle:
            "B\u1ea1n c\u00f3 th\u1ec3 m\u1edf trang li\u00ean h\u1ec7 \u0111\u1ec3 g\u1eedi tin nh\u1eafn tr\u1ef1c ti\u1ebfp ho\u1eb7c m\u1edf CV PDF \u0111\u1ec3 xem \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin h\u1ed3 s\u01a1.",
          emailBtn: "M\u1edf trang li\u00ean h\u1ec7",
          cvBtn: "Xem CV PDF",
        }
      : {
          title: "Contact",
          subtitle:
            "You can open the contact page to send a direct message or open the PDF resume to view the full profile.",
          emailBtn: "Open contact page",
          cvBtn: "View PDF resume",
        };

  const filters = [
    { id: "all", label: faqData.filters.all, icon: Layers },
    { id: "tech", label: faqData.filters.tech, icon: Code },
    { id: "work", label: faqData.filters.work, icon: Briefcase },
    { id: "experience", label: faqData.filters.experience, icon: Clock },
  ];

  const filteredItems = faqData.items.filter((item: FAQItem) => {
    const matchesSearch = item.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();

    const question = aiQuestion.trim();
    if (!question) {
      setAiError(
        language === "vi"
          ? "Vui l\u00f2ng nh\u1eadp c\u00e2u h\u1ecfi."
          : "Please enter a question."
      );
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiAnswer("");
    setAiMeta({});

    try {
      const response = await fetch("/api/faq-ai", {
        method: "POST",
        headers: buildProtectedHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          question,
          language,
          context: faqData.items.map((item: FAQItem) => ({
            question: item.question,
            answer: item.answer,
          })),
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        answer?: string;
        error?: string;
        provider?: string;
        model?: string;
      };

      if (!response.ok) {
        setAiError(
          payload.error ||
            (language === "vi"
              ? "Kh\u00f4ng th\u1ec3 l\u1ea5y c\u00e2u tr\u1ea3 l\u1eddi AI."
              : "Could not get AI answer.")
        );
        return;
      }

      setAiAnswer(payload.answer || "");
      setAiMeta({
        provider: payload.provider,
        model: payload.model,
      });
    } catch {
      setAiError(
        language === "vi"
          ? "L\u1ed7i k\u1ebft n\u1ed1i t\u1edbi d\u1ecbch v\u1ee5 AI."
          : "Failed to connect to AI service."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 transition-colors duration-300 dark:text-slate-50">
      <main className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-4 text-center sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-bold tracking-wide text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
            >
              {language === "vi" ? "H\u1ed3 s\u01a1 t\u1eeb CV" : "CV-based profile"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-6xl dark:from-sky-400 dark:via-blue-500 dark:to-purple-500"
            >
              {faqData.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-lg"
            >
              {faqData.subtitle}
            </motion.p>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:mb-12 sm:p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-sky-500" size={18} />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {language === "vi"
                  ? "H\u1ecfi AI v\u1ec1 h\u1ed3 s\u01a1 n\u00e0y"
                  : "Ask AI about this profile"}
              </h2>
            </div>

            <form onSubmit={handleAskAI} className="space-y-4">
              <textarea
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                rows={3}
                placeholder={
                  language === "vi"
                    ? "V\u00ed d\u1ee5: B\u1ea1n \u0111\u00e3 l\u00e0m backend b\u1eb1ng c\u00f4ng ngh\u1ec7 g\u00ec?"
                    : "Example: What backend technologies have you used?"
                }
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
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
                {language === "vi" ? "G\u1eedi c\u00e2u h\u1ecfi" : "Ask"}
              </button>
            </form>

            {aiError && <p className="mt-3 text-sm text-red-500">{aiError}</p>}

            {aiAnswer && (
              <div className="mt-5 overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/80 shadow-lg shadow-sky-500/5 dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-950/90">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-500/10 px-4 py-3 dark:border-sky-500/15">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-sky-500/10 p-2 text-sky-500">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {language === "vi"
                          ? "AI tr\u1ea3 l\u1eddi"
                          : "AI answer"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {language === "vi"
                          ? "T\u00f3m t\u1eaft ng\u1eafn t\u1eeb h\u1ed3 s\u01a1 v\u00e0 FAQ"
                          : "Short summary from the profile and FAQ"}
                      </p>
                    </div>
                  </div>

                  {(aiMeta.provider || aiMeta.model) && (
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {aiMeta.provider && (
                        <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                          {aiMeta.provider}
                        </span>
                      )}
                      {aiMeta.model && (
                        <span className="rounded-full border border-slate-300/70 bg-white/70 px-3 py-1 font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                          {aiMeta.model}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 px-4 py-4 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:px-5">
                  {renderRichText(aiAnswer)}
                </div>
              </div>
            )}
          </motion.section>

          <div className="mb-16 space-y-8">
            <div className="group relative mx-auto max-w-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-600 opacity-20 blur transition-opacity group-hover:opacity-30" />
              <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
                <Search className="ml-4 text-slate-400" size={24} />
                <input
                  type="text"
                  placeholder={faqData.search_placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400/70 focus:outline-none sm:px-4 sm:py-3 sm:text-lg dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategory(filter.id)}
                    className={`flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 ${
                      isActive
                        ? "scale-105 bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-sky-700"
                    }`}
                  >
                    <Icon size={16} />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item: FAQItem) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      openQuestion === item.id
                        ? "border-sky-500/30 bg-slate-50 ring-1 ring-sky-500/20 dark:bg-slate-900/60"
                        : "border-slate-200 bg-white hover:border-sky-500/30 dark:border-slate-800 dark:bg-slate-900/40"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setOpenQuestion(
                          openQuestion === item.id ? null : item.id
                        )
                      }
                      className="flex w-full items-start justify-between gap-3 p-4 text-left sm:items-center sm:p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-lg p-2 transition-colors ${
                            openQuestion === item.id
                              ? "bg-sky-500/10 text-sky-500"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                          }`}
                        >
                          {item.category === "tech" && <Code size={20} />}
                          {item.category === "work" && <Briefcase size={20} />}
                          {item.category === "experience" && <Clock size={20} />}
                        </div>
                        <span
                          className={`text-base font-bold transition-colors sm:text-lg ${
                            openQuestion === item.id
                              ? "text-sky-600 dark:text-sky-400"
                              : "text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`text-slate-400 transition-transform duration-300 ${
                          openQuestion === item.id
                            ? "rotate-180 text-sky-500"
                            : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openQuestion === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pl-4 leading-relaxed text-slate-600 dark:text-slate-400 sm:px-6 sm:pb-6 sm:pl-[4.5rem]">
                            <div className="space-y-3">
                              {renderRichText(item.answer)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <p className="text-lg text-slate-500 dark:text-slate-400">
                    {language === "vi"
                      ? "Kh\u00f4ng t\u00ecm th\u1ea5y c\u00e2u h\u1ecfi ph\u00f9 h\u1ee3p."
                      : "No matching questions found."}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center sm:mt-20 sm:p-10"
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {ctaContent.title}
              </h2>
              <p className="mx-auto max-w-lg text-slate-400">
                {ctaContent.subtitle}
              </p>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <MessageCircle size={20} />
                  {ctaContent.emailBtn}
                </Link>
                <a
                  href="/documents/tong-van-hoang-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-8 py-3 font-medium text-white transition-all hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-700"
                >
                  {ctaContent.cvBtn}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
