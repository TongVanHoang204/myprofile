"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogCopy } from "@/app/data/blog";

export default function BlogSection() {
  const { language } = useLanguage();
  const copy = blogCopy[language];
  const sectionPosts = copy.posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="bg-slate-50/55 px-4 py-14 backdrop-blur-sm dark:bg-slate-900/20 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:items-end lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.sectionBadge}
            </div>
            <h2 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {copy.sectionTitle}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              {copy.featuredLabel}
            </p>
            <h3 className="mt-3 text-xl font-black leading-snug text-slate-900 dark:text-slate-50 sm:text-2xl">
              {copy.featuredTitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {copy.featuredDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {copy.featuredPoints.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
                >
                  {point}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sectionPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/65 sm:p-5"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${post.accent}`}
              />
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-black leading-snug text-slate-900 dark:text-slate-50 sm:mt-5 sm:text-xl">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {post.excerpt}
              </p>

              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50/85 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {copy.summaryLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {post.focus}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href="/blog"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400 sm:w-auto"
          >
            {copy.sectionCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
