"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectGrid, { type ProjectFilter } from "@/app/components/ProjectGrid";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectCopy } from "@/app/data/projects";

export default function ProjectsSection() {
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
    <section id="projects" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400"
            >
              {copy.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-3 inline-block bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-sky-400 dark:to-purple-500 sm:text-3xl"
            >
              {copy.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base"
            >
              {copy.subtitle}
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
                className="relative z-10 min-w-[calc(50%-0.25rem)] rounded-full px-3 py-2.5 font-medium transition-colors sm:min-w-0 sm:px-4 sm:py-2"
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

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <Link
            href="/projects"
            className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400"
          >
            {copy.openCaseStudy}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
