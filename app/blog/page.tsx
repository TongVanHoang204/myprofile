"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  FolderKanban,
  Sparkles,
  Target,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogCopy } from "@/app/data/blog";

export default function BlogPage() {
  const { language } = useLanguage();
  const copy = blogCopy[language];
  const featuredPost = copy.posts[0];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),transparent_28%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.eyebrow}
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                {copy.title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {copy.subtitle}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {copy.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                  className="interactive-card rounded-3xl border border-slate-200 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <p className="text-2xl font-black text-slate-900 dark:text-slate-50">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`#${featuredPost.slug}`}
                className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400"
              >
                {copy.readArticle}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/projects"
                className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-bold text-slate-900 hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:hover:text-sky-400"
              >
                {copy.ctaSecondary}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="interactive-card rounded-[2rem] border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-950/60 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <BookOpenText className="h-4 w-4 text-sky-400" />
                {copy.topicsTitle}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {copy.topics.map((topic) => (
                  <span
                    key={topic}
                    className="interactive-pill cursor-default rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="space-y-5"
          >
            <article className="interactive-card relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950/90 p-6 text-slate-50 shadow-[0_30px_80px_-30px_rgba(14,165,233,0.45)] dark:border-slate-800 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),transparent_34%)]" />

              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                    {copy.featuredLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                    <CalendarDays className="h-3.5 w-3.5 text-sky-300" />
                    {featuredPost.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                    <Clock3 className="h-3.5 w-3.5 text-sky-300" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-black leading-tight sm:text-3xl">
                    {copy.featuredTitle}
                  </h2>
                  <p className="text-sm leading-7 text-slate-300 sm:text-base">
                    {copy.featuredDescription}
                  </p>
                </div>

                <div className="interactive-card rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                    {copy.summaryLabel}
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                    {copy.featuredPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <div className="interactive-card rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Target className="h-4 w-4 text-violet-400" />
                {copy.listTitle}
              </div>
              <div className="mt-4 space-y-3">
                {copy.posts.map((post, index) => (
                  <a
                    key={post.slug}
                    href={`#${post.slug}`}
                    className="interactive-link flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-left dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {String(index + 1).padStart(2, "0")} · {post.category}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {post.title}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.34fr,0.66fr] lg:gap-10">
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-5 lg:sticky lg:top-28 lg:self-start"
        >
          <div className="interactive-card rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              {copy.listEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-slate-50 sm:text-3xl">
              {copy.listTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {copy.listSubtitle}
            </p>
          </div>

          <div className="interactive-card rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <FolderKanban className="h-4 w-4 text-sky-400" />
              {copy.takeawayLabel}
            </div>
            <div className="mt-4 space-y-3">
              {copy.posts.map((post) => (
                <div
                  key={post.slug}
                  className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {post.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
                    {post.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        <div className="space-y-6">
          {copy.posts.map((post, index) => (
            <motion.article
              key={post.slug}
              id={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="interactive-card scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${post.accent}`} />

              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.42fr,0.58fr] lg:gap-8 lg:p-8">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
                        {copy.detailLabel}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-900 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-black leading-tight text-slate-900 dark:text-slate-50">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="interactive-card rounded-3xl border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {copy.summaryLabel}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {post.focus}
                    </p>
                  </div>

                  <div className="interactive-card rounded-3xl border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {copy.takeawayLabel}
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {post.takeaways.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  {post.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="interactive-card mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950/90 p-6 text-slate-50 shadow-[0_24px_60px_-28px_rgba(56,189,248,0.45)] dark:border-slate-800 sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {copy.ctaEyebrow}
            </p>
            <h2 className="text-2xl font-black sm:text-3xl">
              {copy.ctaTitle}
            </h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              {copy.ctaSubtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="interactive-button inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400"
            >
              {copy.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="interactive-button inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white hover:bg-white/12"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
