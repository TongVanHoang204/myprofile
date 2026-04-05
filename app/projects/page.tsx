"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectGrid, { type ProjectFilter } from "@/app/components/ProjectGrid";
import ProjectCaseStudyShowcase from "@/app/components/projects/ProjectCaseStudyShowcase";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectCopy } from "@/app/data/projects";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const copy = projectCopy[language];

  const filters: Array<{ value: ProjectFilter; label: string }> = [
    { value: "all", label: copy.filters.all },
    { value: "website", label: copy.filters.website },
    { value: "backend", label: copy.filters.backend },
    { value: "mobile", label: copy.filters.mobile },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
      <div className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            {copy.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex w-full flex-wrap justify-center gap-2 rounded-3xl border border-slate-200 bg-white/60 p-1.5 text-xs shadow-sm backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/50 sm:w-auto sm:rounded-full"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className="relative z-10 min-w-[calc(50%-0.25rem)] rounded-full px-3 py-2.5 font-medium transition-colors sm:min-w-0 sm:px-4 sm:py-2"
            >
              {activeFilter === filter.value && (
                <motion.div
                  layoutId="projectsPageFilter"
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
      <ProjectCaseStudyShowcase />
    </div>
  );
}
