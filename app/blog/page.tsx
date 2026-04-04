"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogCopy } from "@/app/data/blog";

export default function BlogPage() {
  const { language } = useLanguage();
  const copy = blogCopy[language];
  const featuredPost = copy.posts[0];

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 pb-14 pt-24 sm:space-y-16 sm:pt-28">
      <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
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
                className="interactive-card rounded-3xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65"
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

          <div className="interactive-card rounded-[2rem] border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60 sm:p-6">
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

        <motion.article
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="interactive-card relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950/90 p-6 text-slate-50 shadow-[0_30px_80px_-30px_rgba(14,165,233,0.45)] sm:p-8"
        >
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
        </motion.article>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              {copy.listEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-slate-50 sm:text-3xl">
              {copy.listTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {copy.listSubtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {copy.posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              className="group interactive-card relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${post.accent}`}
              />
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="mt-5 text-xl font-black leading-snug text-slate-900 dark:text-slate-50">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {post.excerpt}
              </p>

              <div className="interactive-card mt-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {copy.summaryLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {post.focus}
                </p>
              </div>

              <a
                href={`#${post.slug}`}
                className="interactive-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-500"
              >
                {copy.readArticle}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        {copy.posts.map((post, index) => (
          <motion.article
            key={post.slug}
            id={post.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="interactive-card scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65"
          >
            <div className={`h-1 w-full bg-gradient-to-r ${post.accent}`} />

            <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[0.82fr,1.18fr] lg:p-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
                    {copy.detailLabel}
                  </p>
                  <h3 className="text-2xl font-black leading-tight text-slate-900 dark:text-slate-50">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>
                </div>

                <div className="interactive-card rounded-3xl border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <FolderKanban className="h-4 w-4 text-sky-400" />
                    {copy.takeawayLabel}
                  </div>
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
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="interactive-card overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950/90 p-6 text-slate-50 shadow-[0_24px_60px_-28px_rgba(56,189,248,0.45)] dark:border-slate-800 sm:p-8"
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
