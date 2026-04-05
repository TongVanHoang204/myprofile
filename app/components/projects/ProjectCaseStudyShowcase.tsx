"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectCopy } from "@/app/data/projects";
import { trackContentClick } from "@/app/lib/client-portfolio-analytics";

export default function ProjectCaseStudyShowcase() {
  const { language } = useLanguage();
  const copy = projectCopy[language];

  return (
    <section className="mt-12 space-y-6 sm:mt-14 sm:space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
          {copy.caseStudyEyebrow}
        </p>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
          {copy.caseStudyTitle}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          {copy.caseStudySubtitle}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {copy.items.map((project, index) => {
          const href = `/projects/${project.slug}`;

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="interactive-card rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
            >
              <div className="flex flex-col gap-5">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-400">
                    {project.eyebrow}
                  </p>
                  <h3 className="text-2xl font-black leading-tight text-slate-900 dark:text-slate-50">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {project.summary}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {copy.labels.objective}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {project.objective}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {copy.labels.stack}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {copy.labels.aiUse}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {project.aiUse}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {copy.labels.result}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {project.result}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {copy.labels.role}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {project.role.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={href}
                  onClick={() =>
                    trackContentClick({
                      kind: "project",
                      slug: project.slug,
                      label: project.title,
                      href,
                    })
                  }
                  className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400 sm:w-fit"
                >
                  {copy.openCaseStudy}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
