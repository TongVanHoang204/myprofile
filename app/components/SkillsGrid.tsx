"use client";

import { MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function SkillItem({ skill }: { skill: string }) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <motion.div
      variants={item}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      className="group relative flex min-h-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-center text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-sky-400"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              220px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.14),
              transparent 75%
            )
          `,
        }}
      />
      <span className="relative z-10">{skill}</span>
    </motion.div>
  );
}

export default function SkillsGrid() {
  const { dict } = useLanguage();
  const skills = dict.about.skills;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {skills.map((skill: string) => (
        <SkillItem key={skill} skill={skill} />
      ))}
    </motion.div>
  );
}
