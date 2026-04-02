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
import { contactInfo } from "@/app/data/contact";

type FAQItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

function renderAnswer(answer: string) {
  const segments = answer.split(/(\*\*.*?\*\*)/g);

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

    return <span key={`${segment}-${index}`}>{segment}</span>;
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

  const faqData = dict.faq;
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
          ? "Vui lòng nhập câu hỏi."
          : "Please enter a question."
      );
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiAnswer("");

    try {
      const response = await fetch("/api/faq-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      };

      if (!response.ok) {
        setAiError(
          payload.error ||
            (language === "vi"
              ? "Không thể lấy câu trả lời AI."
              : "Could not get AI answer.")
        );
        return;
      }

      setAiAnswer(payload.answer || "");
    } catch {
      setAiError(
        language === "vi"
          ? "Lỗi kết nối tới dịch vụ AI."
          : "Failed to connect to AI service."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 transition-colors duration-300 dark:text-slate-50">
      <main className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 space-y-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-bold tracking-wide text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
            >
              {language === "vi" ? "Hồ sơ từ CV" : "CV-based profile"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl dark:from-sky-400 dark:via-blue-500 dark:to-purple-500"
            >
              {faqData.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            >
              {faqData.subtitle}
            </motion.p>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-sky-500" size={18} />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {language === "vi"
                  ? "Hỏi AI về hồ sơ này"
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
                    ? "Ví dụ: Bạn đã làm backend bằng công nghệ gì?"
                    : "Example: What backend technologies have you used?"
                }
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {aiLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Sparkles size={16} />
                )}
                {language === "vi" ? "Gửi câu hỏi" : "Ask"}
              </button>
            </form>

            {aiError && <p className="mt-3 text-sm text-red-500">{aiError}</p>}

            {aiAnswer && (
              <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50/70 p-4 text-sm leading-relaxed text-slate-700 dark:border-sky-900/60 dark:bg-slate-950/70 dark:text-slate-200">
                {aiAnswer}
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
                  className="w-full bg-transparent px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400/70 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategory(filter.id)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
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
                      className="flex w-full items-center justify-between p-6 text-left"
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
                          className={`text-lg font-bold transition-colors ${
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
                          openQuestion === item.id ? "rotate-180 text-sky-500" : ""
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
                          <div className="px-6 pb-6 pl-[4.5rem] leading-relaxed text-slate-600 dark:text-slate-400">
                            <div>{renderAnswer(item.answer)}</div>
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
                      ? "Không tìm thấy câu hỏi phù hợp."
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
            className="relative mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center"
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold text-white">
                {faqData.cta.title}
              </h2>
              <p className="mx-auto max-w-lg text-slate-400">
                {faqData.cta.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href={`mailto:${contactInfo.email}`}>
                  <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">
                    <MessageCircle size={20} />
                    {faqData.cta.email_btn}
                  </button>
                </Link>
                <Link href="/documents/tong-van-hoang-cv.pdf" target="_blank">
                  <button className="rounded-xl border border-slate-700 bg-slate-800 px-8 py-3 font-medium text-white transition-all hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-700">
                    {faqData.cta.cv_btn}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
