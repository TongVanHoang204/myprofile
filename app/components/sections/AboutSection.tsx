"use client";

import TextReveal from "@/app/components/TextReveal";
import Timeline from "@/app/components/Timeline";
import SkillsGrid from "@/app/components/SkillsGrid";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AboutSection() {
  const { dict } = useLanguage();

  return (
    <section
      id="about"
      className="bg-slate-50/50 px-4 py-14 backdrop-blur-sm dark:bg-slate-900/20 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-20">
        <div className="text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-sky-400 dark:to-purple-500 sm:text-3xl"
          >
            {dict.about.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <TextReveal
              text={dict.about.summary}
              className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base"
            />
          </motion.div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-100 sm:mb-8 sm:text-xl">
                <span className="h-1 w-8 rounded-full bg-sky-500" />
                {dict.about.timeline_title}
              </h3>
              <Timeline />
            </motion.div>
          </div>

          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-100 sm:mb-8 sm:text-xl">
                <span className="h-1 w-8 rounded-full bg-purple-500" />
                {dict.about.skills_title}
              </h3>
              <SkillsGrid />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
