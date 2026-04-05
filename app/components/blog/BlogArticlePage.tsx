"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  FolderKanban,
  Sparkles,
  Target,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogCopy, getBlogPostBySlug } from "@/app/data/blog";
import { getProjectBySlug } from "@/app/data/projects";
import { trackContentClick } from "@/app/lib/client-portfolio-analytics";

type BlogArticlePageProps = {
  slug: string;
};

export default function BlogArticlePage({ slug }: BlogArticlePageProps) {
  const { language } = useLanguage();
  const copy = blogCopy[language];
  const post = getBlogPostBySlug(language, slug) || copy.posts[0];
  const currentIndex = copy.posts.findIndex((item) => item.slug === post.slug);
  const previousPost =
    currentIndex > 0
      ? copy.posts[currentIndex - 1]
      : copy.posts[copy.posts.length - 1];
  const nextPost =
    currentIndex < copy.posts.length - 1
      ? copy.posts[currentIndex + 1]
      : copy.posts[0];
  const relatedProject = getProjectBySlug(language, post.relatedProjectSlug);

  const labels =
    language === "vi"
      ? {
          back: "Quay lại blog",
          highlight: "Bài viết",
          summary: "Tóm tắt nhanh",
          takeaway: "Điểm chính",
          proof: "Điều bài này chứng minh",
          systems: "Hệ thống / phần liên quan",
          relatedProject: "Case study liên quan",
          readNext: "Đọc tiếp",
          viewProjects: "Xem dự án",
          contact: "Liên hệ",
          openProject: "Mở case study",
          previous: "Bài liền trước",
        }
      : {
          back: "Back to blog",
          highlight: "Article",
          summary: "Quick summary",
          takeaway: "Key points",
          proof: "What this article proves",
          systems: "Related systems",
          relatedProject: "Related case study",
          readNext: "Read next",
          viewProjects: "View projects",
          contact: "Contact",
          openProject: "Open case study",
          previous: "Previous article",
        };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <div className="space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-200 dark:hover:text-sky-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {labels.back}
        </Link>

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-8 lg:p-10">
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${post.accent}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),transparent_28%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                {labels.highlight}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-sky-400" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-sky-400" />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {post.excerpt}
                </p>
              </div>

              <div className="interactive-card rounded-[2rem] border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <BookOpenText className="h-4 w-4 text-sky-400" />
                  {labels.summary}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {post.focus}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="space-y-4"
            >
              {post.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Target className="h-4 w-4 text-violet-400" />
                {labels.takeaway}
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Sparkles className="h-4 w-4 text-sky-400" />
                {labels.proof}
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {post.credibilityPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <FolderKanban className="h-4 w-4 text-sky-400" />
                {labels.systems}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.systems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {relatedProject ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-950/90 p-6 text-slate-50 shadow-[0_24px_60px_-28px_rgba(56,189,248,0.45)] dark:border-slate-800 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                  {labels.relatedProject}
                </p>
                <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
                  {relatedProject.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {relatedProject.summary}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    onClick={() =>
                      trackContentClick({
                        kind: "project",
                        slug: relatedProject.slug,
                        label: relatedProject.title,
                        href: `/projects/${relatedProject.slug}`,
                      })
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
                  >
                    {labels.openProject}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/12"
                  >
                    {labels.viewProjects}
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
                {labels.readNext}
              </p>
              <div className="space-y-2">
                <Link
                  href={`/blog/${nextPost.slug}`}
                  onClick={() =>
                    trackContentClick({
                      kind: "blog",
                      slug: nextPost.slug,
                      label: nextPost.title,
                      href: `/blog/${nextPost.slug}`,
                    })
                  }
                  className="block text-2xl font-black leading-snug transition-colors hover:text-sky-400 sm:text-3xl"
                >
                  {nextPost.title}
                </Link>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {nextPost.excerpt}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/blog/${nextPost.slug}`}
                onClick={() =>
                  trackContentClick({
                    kind: "blog",
                    slug: nextPost.slug,
                    label: nextPost.title,
                    href: `/blog/${nextPost.slug}`,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
              >
                {labels.readNext}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-slate-700 dark:text-slate-200 dark:hover:text-sky-400"
              >
                {labels.contact}
              </Link>
            </div>
          </div>

          {previousPost.slug !== nextPost.slug && (
            <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                {labels.previous}
              </p>
              <Link
                href={`/blog/${previousPost.slug}`}
                onClick={() =>
                  trackContentClick({
                    kind: "blog",
                    slug: previousPost.slug,
                    label: previousPost.title,
                    href: `/blog/${previousPost.slug}`,
                  })
                }
                className="mt-3 block text-sm font-semibold text-slate-800 transition-colors hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
              >
                {previousPost.title}
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
