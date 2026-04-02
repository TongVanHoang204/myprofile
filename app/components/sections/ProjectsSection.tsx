"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectGrid, { type ProjectFilter } from "../ProjectGrid";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ProjectsSection() {
  const { dict } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filters: Array<{ value: ProjectFilter; label: string }> = [
    { value: "all", label: dict.projects.filters.all },
    { value: "website", label: dict.projects.filters.website },
    { value: "backend", label: dict.projects.filters.backend },
    { value: "mobile", label: dict.projects.filters.mobile },
  ];

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-2 inline-block bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-sky-400 dark:to-purple-500 sm:text-3xl"
            >
              {dict.projects.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl text-slate-600 dark:text-slate-400"
            >
              {dict.projects.subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto flex w-full flex-wrap justify-center gap-2 rounded-3xl border border-slate-200 bg-white/60 p-1.5 text-xs shadow-sm backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/50 dark:shadow-none sm:mx-0 sm:w-auto sm:rounded-full"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="relative z-10 rounded-full px-3 py-2 font-medium transition-colors sm:px-4"
              >
                {activeFilter === filter.value && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 rounded-full bg-sky-500 shadow-md shadow-sky-500/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    activeFilter === filter.value
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {filter.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        <ProjectGrid filter={activeFilter} />
      </div>
    </section>
  );
}
