"use client";

import { motion } from "framer-motion";
import Timeline from "@/app/components/Timeline";
import SkillsGrid from "@/app/components/SkillsGrid";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AboutPage() {
  const { dict } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 pb-12 pt-24 sm:space-y-16 sm:pt-28">
      <section className="grid gap-10 md:grid-cols-[0.9fr,1.4fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60 sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
            Portfolio
          </p>
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-3xl">
            {dict.about.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {dict.about.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {dict.about.skills.slice(0, 6).map((skill: string) => (
              <span
                key={skill}
                className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8"
        >
          <p className="text-base font-medium text-slate-900 dark:text-slate-100 sm:text-lg">
            {dict.hero.description}
          </p>
          <p>{dict.about.summary}</p>
        </motion.div>
      </section>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-100 sm:mb-8 sm:text-xl">
              <span className="h-1 w-8 rounded-full bg-sky-500" />
              {dict.about.timeline_title}
            </h2>
            <Timeline />
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-100 sm:mb-8 sm:text-xl">
              <span className="h-1 w-8 rounded-full bg-purple-500" />
              {dict.about.skills_title}
            </h2>
            <SkillsGrid />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
