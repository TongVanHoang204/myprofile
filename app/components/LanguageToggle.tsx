"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
      <motion.div
        className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm dark:bg-slate-600"
        animate={{
          x: language === "vi" ? 0 : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        onClick={() => setLanguage("vi")}
        className={`relative z-10 min-w-9 rounded-full px-2 py-1.5 text-[11px] font-bold transition-colors sm:text-xs ${
          language === "vi"
            ? "text-sky-600 dark:text-sky-300"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        VI
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`relative z-10 min-w-9 rounded-full px-2 py-1.5 text-[11px] font-bold transition-colors sm:text-xs ${
          language === "en"
            ? "text-sky-600 dark:text-sky-300"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        EN
      </button>
    </div>
  );
}
