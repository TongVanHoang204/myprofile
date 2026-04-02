"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Timeline() {
  const { dict } = useLanguage();
  const items = dict.about.timeline || [];

  return (
    <div className="relative pl-4">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-sky-500 to-transparent"
      />

      <ol className="relative space-y-8">
        {items.map(
          (
            item: {
              year: string;
              title: string;
              place: string;
              description: string;
            },
            index: number
          ) => (
            <li key={`${item.year}-${item.title}`} className="relative pl-6">
              <ScrollReveal direction="left" delay={index * 0.2}>
                <span className="absolute -left-[29px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-2 ring-sky-500 dark:bg-slate-950">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    {item.year}
                  </span>
                  <span className="hidden text-slate-400 dark:text-slate-600 sm:inline">
                    •
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.place}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </ScrollReveal>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
