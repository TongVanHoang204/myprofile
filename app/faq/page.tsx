"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Briefcase,
  ChevronDown,
  Clock,
  Code,
  FileDown,
  Layers,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import FaqAssistantPanel from "@/app/components/faq/FaqAssistantPanel";
import { useLanguage } from "@/app/context/LanguageContext";

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

    const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line));
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
              {renderInlineText(line.replace(/^([-*•]|\d+\.)\s+/, ""))}
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

  const faqData = dict.faq;
  const helperContent =
    language === "vi"
      ? {
          badge: "Hồ sơ từ CV",
          introTitle: "FAQ theo 2 cách xem",
          introDescription:
            "Bạn có thể duyệt câu hỏi theo chủ đề trước, sau đó dùng AI để đào sâu vào đúng phần muốn hỏi.",
          introItems: [
            "Duyệt FAQ nhanh theo nhóm kỹ năng, mục tiêu và dự án.",
            "Khối AI đã được nén gọn để hỏi sâu hơn khi cần.",
            "Toàn bộ câu trả lời bám theo CV, dự án và blog thật của bạn.",
          ],
          browserTitle: "Duyệt câu hỏi",
          browserDescription:
            "Tìm theo từ khóa hoặc mở từng câu hỏi để xem câu trả lời đã được viết gọn theo CV.",
          resultLabel: "câu hỏi",
          empty: "Không tìm thấy câu hỏi phù hợp.",
          ctaTitle: "Liên hệ",
          ctaSubtitle:
            "Bạn có thể mở trang liên hệ để gửi tin nhắn trực tiếp hoặc tải CV PDF để xem đầy đủ thông tin hồ sơ.",
          ctaContact: "Mở trang liên hệ",
          ctaCv: "Tải CV PDF",
        }
      : {
          badge: "CV-based profile",
          introTitle: "FAQ in two layers",
          introDescription:
            "You can browse structured questions first, then use the AI panel to go deeper into a specific topic.",
          introItems: [
            "Browse the FAQ quickly by skills, goals, and project categories.",
            "The AI panel is now more compact and focused.",
            "All answers stay grounded in the real CV, project work, and blog.",
          ],
          browserTitle: "Browse questions",
          browserDescription:
            "Search by keyword or open each question to read concise answers derived from the CV.",
          resultLabel: "questions",
          empty: "No matching questions found.",
          ctaTitle: "Contact",
          ctaSubtitle:
            "You can open the contact page to send a direct message or download the PDF resume to view the full profile.",
          ctaContact: "Open contact page",
          ctaCv: "Download PDF resume",
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

  return (
    <div className="min-h-screen text-slate-900 transition-colors duration-300 dark:text-slate-50">
      <main className="px-4 py-18 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-4 text-center sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-bold tracking-wide text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
            >
              {helperContent.badge}
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
              className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-lg"
            >
              {faqData.subtitle}
            </motion.p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="space-y-6 xl:sticky xl:top-24 xl:self-start"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-500">
                    <Bot size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-500">
                      FAQ
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                      {helperContent.introTitle}
                    </h2>
                  </div>
                </div>

                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {helperContent.introDescription}
                </p>

                <div className="mt-5 space-y-3">
                  {helperContent.introItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40"
                    >
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-sky-500" />
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-500/15 blur-[80px]" />
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]" />

                <div className="relative z-10 space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {helperContent.ctaTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {helperContent.ctaSubtitle}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <MessageCircle size={18} />
                      {helperContent.ctaContact}
                    </Link>
                    <a
                      href="/api/cv-download"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-700"
                    >
                      <FileDown size={18} />
                      {helperContent.ctaCv}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.aside>

            <div className="space-y-8">
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16 }}
                className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6"
              >
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-sky-500" />
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        {helperContent.browserTitle}
                      </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {helperContent.browserDescription}
                    </p>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
                    {filteredItems.length} {helperContent.resultLabel}
                  </div>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="group relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-600 opacity-15 blur transition-opacity group-hover:opacity-25" />
                    <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-950/60">
                      <Search className="ml-4 text-slate-400" size={22} />
                      <input
                        type="text"
                        placeholder={faqData.search_placeholder}
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400/70 focus:outline-none sm:px-4 sm:text-base dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                      const Icon = filter.icon;
                      const isActive = activeCategory === filter.id;

                      return (
                        <button
                          key={filter.id}
                          onClick={() => {
                            setActiveCategory(filter.id);
                            setOpenQuestion(null);
                          }}
                          className={`flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
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

                <div className="space-y-4">
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
                                {item.category === "work" && (
                                  <Briefcase size={20} />
                                )}
                                {item.category === "experience" && (
                                  <Clock size={20} />
                                )}
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
                      <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
                        <p className="text-lg text-slate-500 dark:text-slate-400">
                          {helperContent.empty}
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              <FaqAssistantPanel language={language} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
