"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { MouseEvent } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type Project = {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: "website" | "backend" | "mobile";
};

export default function ProjectCard({ project }: { project: Project }) {
  const { dict } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
  // Spotlight specific values (top-left relative)
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    // For Tilt (Center origin)
    x.set(event.clientX - left - width / 2);
    y.set(event.clientY - top - height / 2);
    // For Spotlight (Top-left origin)
    spotX.set(event.clientX - left);
    spotY.set(event.clientY - top);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    spotX.set(-1000); // Move spotlight away
    spotY.set(-1000);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX}px ${spotY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

  return (
    <motion.article 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/50 p-4 shadow-xl backdrop-blur-sm transition-colors hover:border-sky-500/50 dark:border-slate-800 dark:bg-slate-900/40 sm:p-5"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Thumbnail */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-inner dark:from-slate-800 dark:to-slate-900 sm:h-48"
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        
        {/* Category badge */}
        <span className="absolute right-3 top-3 rounded-full bg-white/80 dark:bg-slate-950/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-800/50">
          {dict.projects.filters[project.category]}
        </span>
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-50 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 group-hover:border-sky-500/30 group-hover:bg-sky-50 dark:group-hover:bg-sky-500/10 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
