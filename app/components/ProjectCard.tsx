"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { ProjectCaseStudy } from "@/app/data/projects";
import { trackContentClick } from "@/app/lib/client-portfolio-analytics";

export default function ProjectCard({ project }: { project: ProjectCaseStudy }) {
  const { dict } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const href = `/projects/${project.slug}`;

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - left - width / 2);
    y.set(event.clientY - top - height / 2);
    spotX.set(event.clientX - left);
    spotY.set(event.clientY - top);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    spotX.set(-1000);
    spotY.set(-1000);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX}px ${spotY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

  return (
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
      className="block h-full"
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative flex min-h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/50 p-4 shadow-xl backdrop-blur-sm transition-colors hover:border-sky-500/50 dark:border-slate-800 dark:bg-slate-900/40"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-inner dark:from-slate-800 dark:to-slate-900 sm:h-44"
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute right-3 top-3 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600 shadow-lg backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/60 dark:text-sky-400">
            {dict.projects.filters[project.category]}
          </span>
        </div>

        <div
          style={{ transform: "translateZ(30px)" }}
          className="flex flex-1 flex-col"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            {project.eyebrow}
          </p>
          <h3 className="mt-3 text-base font-bold text-slate-800 transition-colors group-hover:text-sky-500 dark:text-slate-50 dark:group-hover:text-sky-400 sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors group-hover:border-sky-500/30 group-hover:bg-sky-50 group-hover:text-sky-600 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300 dark:group-hover:bg-sky-500/10 dark:group-hover:text-sky-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors group-hover:border-sky-400/40 group-hover:text-sky-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200 dark:group-hover:text-sky-300">
            <span className="line-clamp-1">
              {dict.projects.view_project}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
