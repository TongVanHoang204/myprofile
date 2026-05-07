"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  FileText,
  Github,
  List,
  Mail,
  MapPin,
  Menu,
  Play,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
} from "lucide-react";
import LanguageToggle from "@/app/components/LanguageToggle";
import { useLanguage } from "@/app/context/LanguageContext";
import { contactInfo } from "@/app/data/contact";

const copy = {
  vi: {
    handle: "@TONGVANHOANG204 · UI/UX",
    greeting: "Xin chào.",
    intro:
      "Frontend, UI/UX và AI workflow được kể bằng một trang bio gọn, tối, dễ scan.",
    member: "Sinh viên IT tại HUTECH — đang thực tập và xây sản phẩm thật.",
    collab: "Liên hệ cộng tác:",
    track: "Deep Focus for Portfolio — UI/UX Flow",
    links: "Links",
    footer: "Powered by Tong Van Hoang",
    nav: {
      overview: "Overview",
      projects: "Projects",
      info: "Info",
      home: "Portfolio",
      cv: "CV",
    },
    tabs: ["Overview", "Projects", "Info"],
    follow: "Xem dự án",
    projectSignal: "Project signal",
    stats: [
      { value: "04", label: "Case studies" },
      { value: "AI", label: "Integrated" },
    ],
    items: [
      {
        title: "FeShenShop Web Storefront",
        meta: "React, TypeScript, responsive UI",
        href: "/projects/feshenshop-web-storefront",
        icon: Code2,
      },
      {
        title: "RESTful API + AI Routes",
        meta: "Express, auth, rate limit, fallback",
        href: "/projects/feshenshop-rest-api",
        icon: BriefcaseBusiness,
      },
      {
        title: "AI Workflow Blog",
        meta: "Prompt, guard, product logic",
        href: "/blog/ai-workflow",
        icon: Sparkles,
      },
      {
        title: "Portfolio Projects",
        meta: "Storefront, dashboard, mobile, API",
        href: "/projects",
        icon: ExternalLink,
      },
      {
        title: "Download CV",
        meta: "Profile and experience",
        href: "/cv",
        icon: FileText,
      },
      {
        title: "GitHub",
        meta: "github.com/TongVanHoang204",
        href: contactInfo.github,
        icon: Github,
      },
      {
        title: "Contact Email",
        meta: contactInfo.email,
        href: `mailto:${contactInfo.email}`,
        icon: Mail,
      },
    ],
  },
  en: {
    handle: "@TONGVANHOANG204 · UI/UX",
    greeting: "Hello.",
    intro:
      "Frontend, UI/UX, and AI workflow presented as a compact dark bio page built for fast scanning.",
    member:
      "IT student at HUTECH — currently interning and building real product work.",
    collab: "DM for work:",
    track: "Deep Focus for Portfolio — UI/UX Flow",
    links: "Links",
    footer: "Powered by Tong Van Hoang",
    nav: {
      overview: "Overview",
      projects: "Projects",
      info: "Info",
      home: "Portfolio",
      cv: "CV",
    },
    tabs: ["Overview", "Projects", "Info"],
    follow: "View projects",
    projectSignal: "Project signal",
    stats: [
      { value: "04", label: "Case studies" },
      { value: "AI", label: "Integrated" },
    ],
    items: [
      {
        title: "FeShenShop Web Storefront",
        meta: "React, TypeScript, responsive UI",
        href: "/projects/feshenshop-web-storefront",
        icon: Code2,
      },
      {
        title: "RESTful API + AI Routes",
        meta: "Express, auth, rate limit, fallback",
        href: "/projects/feshenshop-rest-api",
        icon: BriefcaseBusiness,
      },
      {
        title: "AI Workflow Blog",
        meta: "Prompt, guard, product logic",
        href: "/blog/ai-workflow",
        icon: Sparkles,
      },
      {
        title: "Portfolio Projects",
        meta: "Storefront, dashboard, mobile, API",
        href: "/projects",
        icon: ExternalLink,
      },
      {
        title: "Download CV",
        meta: "Profile and experience",
        href: "/cv",
        icon: FileText,
      },
      {
        title: "GitHub",
        meta: "github.com/TongVanHoang204",
        href: contactInfo.github,
        icon: Github,
      },
      {
        title: "Contact Email",
        meta: contactInfo.email,
        href: `mailto:${contactInfo.email}`,
        icon: Mail,
      },
    ],
  },
} as const;

const socialItems = [
  { icon: Mail, href: `mailto:${contactInfo.email}`, label: "Email" },
  { icon: Github, href: contactInfo.github, label: "GitHub" },
  { icon: FileText, href: "/cv", label: "CV" },
] as const;

export default function ThreeDExperiencePage() {
  const { language } = useLanguage();
  const page = copy[language];

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900 dark:text-white">
      <div
        id="overview"
        className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-28 md:grid-cols-[28rem_minmax(0,44rem)] md:px-10 lg:gap-10"
      >
        <motion.aside
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <section className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#12071d]/58 shadow-2xl shadow-purple-950/45 backdrop-blur-md">
            <div className="relative h-56 overflow-hidden">
              <video
                className="h-full w-full object-cover object-bottom opacity-85 [filter:brightness(0.58)_contrast(1.2)_saturate(1.2)]"
                src="/videos/three-d/featured.mp4"
                poster="/videos/three-d/hero-poster.jpg"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-[#140720]" />
            </div>

            <div className="relative px-6 pb-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="relative mx-auto -mt-20 h-36 w-36 rounded-full border-[5px] border-violet-400 bg-[#09050e] p-1 shadow-[0_0_42px_rgba(168,85,247,0.55)]"
              >
                <Image
                  src="/profile/tong-van-hoang-avatar.jpg"
                  alt="Tong Van Hoang avatar"
                  width={180}
                  height={180}
                  priority
                  className="h-full w-full rounded-full object-cover"
                />
                <span className="absolute bottom-4 right-2 h-5 w-5 rounded-full border-4 border-[#140720] bg-emerald-400" />
              </motion.div>

              <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-white/88 sm:text-5xl">
                TONG VAN HOANG
              </h1>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-300/78">
                {page.handle}
              </p>
              <p className="mt-5 text-base text-violet-100/55">
                {page.greeting}
              </p>
              <p className="mt-2 text-base font-semibold leading-6 text-white/86">
                {page.member}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/50">{page.intro}</p>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white/46">
                <MapPin className="h-4 w-4 text-violet-300/80" />
                {contactInfo.location}
              </p>
              <p className="mt-2 text-sm text-white/46">
                {page.collab}{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-bold text-white transition hover:text-violet-200"
                >
                  {contactInfo.email}
                </a>
              </p>

              <div className="mt-8 flex justify-center gap-3">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={item.label}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/7 bg-white/[0.035] text-white/48 transition hover:-translate-y-0.5 hover:bg-violet-400/12 hover:text-white"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/8 bg-[#0b0710]/68 p-6 shadow-2xl shadow-black/35 backdrop-blur-md">
            <h2 className="truncate text-xl font-black tracking-tight text-white">
              {page.track}
            </h2>
            <p className="mt-2 text-sm text-white/45">0:03 / 70:10</p>
            <div className="mt-12 flex items-center justify-between gap-5 text-white/45">
              <SkipBack className="h-5 w-5" />
              <button
                type="button"
                aria-label="Play"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-400 text-white shadow-[0_0_34px_rgba(168,85,247,0.75)] transition hover:scale-105"
              >
                <Play className="h-6 w-6 fill-current" />
              </button>
              <SkipForward className="h-5 w-5" />
              <Volume2 className="h-5 w-5" />
              <span className="h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,0.95)]" />
              <List className="h-6 w-6" />
            </div>
          </section>
        </motion.aside>

        <motion.section
          id="projects"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative max-h-[calc(100vh-4rem)] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#10051a]/52 p-6 shadow-2xl shadow-purple-950/45 backdrop-blur-md md:p-8"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] text-white/48">
              <ExternalLink className="h-4 w-4" />
              {page.links}
            </h2>
            <LanguageToggle />
          </div>

          <div className="max-h-[calc(100vh-13rem)] space-y-3 overflow-y-auto pr-1">
            {page.items.map((item, index) => {
              const Icon = item.icon;
              const isExternal =
                item.href.startsWith("http") || item.href.startsWith("mailto:");

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 + index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    target={isExternal && item.href.startsWith("http") ? "_blank" : undefined}
                    rel={isExternal && item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex min-h-24 items-center gap-5 rounded-2xl border border-white/7 bg-black/16 px-5 py-4 transition hover:-translate-y-0.5 hover:border-violet-300/22 hover:bg-violet-300/8"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-black">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-lg font-black tracking-tight text-white/90">
                        {item.title}
                      </span>
                      <span className="mt-1 block truncate text-sm font-semibold text-white/36">
                        {item.meta}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/22 transition group-hover:text-violet-200" />
                  </Link>
                </motion.div>
              );
            })}

            <article
              id="info"
              className="mt-4 overflow-hidden rounded-2xl border border-white/7 bg-black/18"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/projects/feshenshop-web.png"
                  alt="FeShenShop storefront"
                  width={900}
                  height={520}
                  className="h-full w-full object-cover object-top opacity-85"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#10051a] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/38">
                  {page.projectSignal}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
                  FeShenShop
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {page.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/7 bg-white/[0.035] p-4"
                    >
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="mt-1 text-xs text-white/38">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/projects"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-400 px-5 py-3 text-sm font-black text-white transition hover:scale-[1.01]"
                >
                  {page.follow}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#10051a] to-transparent" />
          <div className="absolute bottom-4 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-violet-300/30 p-1">
            <span className="block h-full w-full rounded-full bg-violet-400 shadow-[0_0_16px_rgba(168,85,247,0.9)]" />
          </div>
        </motion.section>
      </div>

      <button
        type="button"
        aria-label="Open menu"
        className="fixed bottom-6 left-5 z-20 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/8 bg-white/[0.045] text-violet-200 backdrop-blur-xl transition hover:bg-white/10"
      >
        <Menu className="h-8 w-8" />
      </button>

      <nav className="fixed inset-x-0 bottom-5 z-20 mx-auto hidden w-[min(88vw,24rem)] items-center justify-between rounded-full border border-white/8 bg-[#0b0710]/78 p-1.5 text-xs font-black text-white/44 backdrop-blur-xl md:flex">
        {page.tabs.map((tab, index) => (
          <a
            key={tab}
            href={index === 0 ? "#" : index === 1 ? "#projects" : "#info"}
            className="flex min-h-10 flex-1 items-center justify-center rounded-full px-3 transition hover:bg-white/8 hover:text-white"
          >
            {tab}
          </a>
        ))}
      </nav>

      <p className="fixed bottom-3 right-6 z-20 hidden text-xs text-white/26 xl:block">
        {page.footer}
      </p>
    </main>
  );
}
