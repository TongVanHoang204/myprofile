"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import { HiOutlineCodeBracket, HiOutlineSparkles } from "react-icons/hi2";
import {
  SiGit,
  SiGithub,
  SiJavascript,
  SiMysql,
  SiPhp,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { useLanguage } from "@/app/components/providers/LanguageProvider";

const skillAppearance: Record<string, { icon: IconType; accent: string }> = {
  JavaScript: {
    icon: SiJavascript,
    accent: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  },
  TypeScript: {
    icon: SiTypescript,
    accent: "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
  },
  PHP: {
    icon: SiPhp,
    accent: "bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
  },
  Java: {
    icon: FaJava,
    accent: "bg-orange-50 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
  },
  React: {
    icon: SiReact,
    accent: "bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300",
  },
  MySQL: {
    icon: SiMysql,
    accent: "bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
  },
  Git: {
    icon: SiGit,
    accent: "bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400",
  },
  GitHub: {
    icon: SiGithub,
    accent: "bg-slate-100 text-slate-700 dark:bg-slate-400/10 dark:text-slate-200",
  },
  "Prompt AI": {
    icon: HiOutlineSparkles,
    accent: "bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300",
  },
};

export default function SkillsGrid() {
  const { dict } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <motion.ul
      initial={reducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reducedMotion ? 0 : 0.04 } },
      }}
      aria-label={dict.about.skills_title}
      className="grid list-none grid-cols-3 gap-2.5 sm:gap-3"
    >
      {dict.about.skills.map((skill: string) => {
        const appearance = skillAppearance[skill];
        const Icon = appearance?.icon ?? HiOutlineCodeBracket;

        return (
          <motion.li
            key={skill}
            variants={{
              hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
              show: { opacity: 1, y: 0 },
            }}
            className="group flex min-w-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/80 px-2 py-4 transition-colors duration-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-purple-400/40 dark:hover:bg-slate-800/70 sm:py-5"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 ${appearance?.accent ?? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </span>
            <span className="max-w-full text-center text-xs font-semibold leading-5 text-slate-700 dark:text-slate-200 sm:text-sm">
              {skill}
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
