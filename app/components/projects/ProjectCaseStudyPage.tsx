"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Cpu,
  Layers3,
  Sparkles,
  Target,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogCopy } from "@/app/data/blog";
import { getProjectBySlug, projectCopy } from "@/app/data/projects";
import { trackContentClick } from "@/app/lib/client-portfolio-analytics";

type ProjectCaseStudyPageProps = {
  slug: string;
};

export default function ProjectCaseStudyPage({
  slug,
}: ProjectCaseStudyPageProps) {
  const { language } = useLanguage();
  const copy = projectCopy[language];
  const project = getProjectBySlug(language, slug) || copy.items[0];
  const blogPosts = blogCopy[language].posts.filter((post) =>
    project.relatedBlogSlugs.includes(post.slug)
  );

  const currentIndex = copy.items.findIndex((item) => item.slug === project.slug);
  const nextProject =
    currentIndex < copy.items.length - 1
      ? copy.items[currentIndex + 1]
      : copy.items[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <div className="space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-200 dark:hover:text-sky-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "vi" ? "Quay lại dự án" : "Back to projects"}
        </Link>

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),transparent_28%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.caseStudyEyebrow}
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  {project.eyebrow}
                </p>
                <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                  {project.title}
                </h1>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-sky-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  {copy.labels.objective}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {project.objective}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-sky-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  {copy.labels.role}
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {project.role.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-sky-400" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {copy.labels.stack}
                  </h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-sky-400" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {copy.labels.aiUse}
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {project.aiUse}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950/90 p-6 text-slate-50 shadow-[0_24px_60px_-28px_rgba(56,189,248,0.45)] dark:border-slate-800 sm:p-8">
              <div className="flex items-center gap-3">
                <BookOpenText className="h-5 w-5 text-sky-300" />
                <h2 className="text-xl font-bold">
                  {copy.labels.result}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">
                {project.result}
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">
                  {copy.labels.outcomes}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                  {project.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-400">
              {copy.labels.relatedBlog}
            </p>
            <div className="mt-4 space-y-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() =>
                    trackContentClick({
                      kind: "blog",
                      slug: post.slug,
                      label: post.title,
                      href: `/blog/${post.slug}`,
                    })
                  }
                  className="block rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 transition-colors hover:border-sky-400 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-sky-500/50"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {post.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-400">
              {language === "vi" ? "Case study tiếp theo" : "Next case study"}
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight text-slate-900 dark:text-slate-50">
              {nextProject.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {nextProject.summary}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/projects/${nextProject.slug}`}
                onClick={() =>
                  trackContentClick({
                    kind: "project",
                    slug: nextProject.slug,
                    label: nextProject.title,
                    href: `/projects/${nextProject.slug}`,
                  })
                }
                className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400"
              >
                {copy.openCaseStudy}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:text-slate-200 dark:hover:text-sky-400"
              >
                {language === "vi" ? "Xem blog kỹ thuật" : "Open technical blog"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
