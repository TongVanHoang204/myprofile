"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  FileText,
  ArrowUpRight,
  Code2,
  Layers,
  Cpu,
  Star,
} from "lucide-react";
import { contactInfo } from "@/app/data/contact";

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Express", "Tailwind", "Prisma", "Docker", "GCP", "Figma",
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: contactInfo.github,
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:border-violet-400/60",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${contactInfo.email}`,
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-400/60",
  },
  {
    icon: FileText,
    label: "CV",
    href: "/cv",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:border-emerald-400/60",
  },
];

interface BentoBioGridProps {
  lang: "vi" | "en";
}

const copy = {
  vi: {
    featured: "Dự án nổi bật",
    viewProject: "Xem dự án",
    projects: "Dự án",
    aiReady: "AI sẵn sàng",
    stack: "Bộ công nghệ",
    connect: "Kết nối",
    downloadCV: "Tải xuống CV",
    cvSub: "Hồ sơ & kinh nghiệm",
  },
  en: {
    featured: "Featured Project",
    viewProject: "View Project",
    projects: "Projects",
    aiReady: "AI Ready",
    stack: "Tech Stack",
    connect: "Connect",
    downloadCV: "Download CV",
    cvSub: "Profile & experience",
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function BentoBioGrid({ lang }: BentoBioGridProps) {
  const t = copy[lang];

  return (
    <div className="grid h-full grid-cols-3 grid-rows-[auto_auto_auto_auto] gap-3">
      {/* ── HERO (col-span-3) ── */}
      <motion.div {...fadeUp(0.1)} className="col-span-3">
        <Link
          href="/projects/feshenshop-web-storefront"
          className="group relative flex h-44 overflow-hidden rounded-2xl border border-white/8 bg-black/20 transition hover:border-violet-400/30"
        >
          <Image
            src="/projects/feshenshop-web.png"
            alt="FeShenShop"
            fill
            className="object-cover object-top opacity-70 transition duration-500 group-hover:opacity-90 group-hover:scale-[1.03]"
            unoptimized
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0618]/90 via-[#0d0618]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0618]/80 via-transparent to-transparent" />

          <div className="relative flex flex-col justify-end p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400/80">
              <Star className="mr-1 inline h-3 w-3" />
              {t.featured}
            </p>
            <h3 className="mt-1 text-xl font-black tracking-tight text-white">
              FeShenShop
            </h3>
            <p className="mt-0.5 text-xs text-white/50">
              React · TypeScript · Node.js · Prisma
            </p>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-bold text-white/70 backdrop-blur-sm transition group-hover:border-violet-400/40 group-hover:text-violet-300">
            {t.viewProject}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </motion.div>

      {/* ── STAT: Projects ── */}
      <motion.div {...fadeUp(0.18)} className="col-span-1">
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/8 bg-black/20 p-4 text-center">
          <Code2 className="mb-2 h-5 w-5 text-violet-400/70" />
          <p className="text-3xl font-black text-white">4+</p>
          <p className="mt-0.5 text-[11px] font-semibold text-white/38">{t.projects}</p>
        </div>
      </motion.div>

      {/* ── STAT: AI ── */}
      <motion.div {...fadeUp(0.22)} className="col-span-1">
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/8 bg-black/20 p-4 text-center">
          <Cpu className="mb-2 h-5 w-5 text-sky-400/70" />
          <p className="text-3xl font-black text-white">AI</p>
          <p className="mt-0.5 text-[11px] font-semibold text-white/38">{t.aiReady}</p>
        </div>
      </motion.div>

      {/* ── STAT: Stack count ── */}
      <motion.div {...fadeUp(0.26)} className="col-span-1">
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/8 bg-black/20 p-4 text-center">
          <Layers className="mb-2 h-5 w-5 text-emerald-400/70" />
          <p className="text-3xl font-black text-white">10+</p>
          <p className="mt-0.5 text-[11px] font-semibold text-white/38">{t.stack}</p>
        </div>
      </motion.div>

      {/* ── TECH STACK (col-span-3) ── */}
      <motion.div {...fadeUp(0.3)} className="col-span-3">
        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            {t.stack}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/60 transition hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── SOCIAL LINKS (3 × col-span-1) ── */}
      {socialLinks.map((item, i) => {
        const Icon = item.icon;
        const isExternal = item.href.startsWith("http");
        return (
          <motion.div key={item.label} {...fadeUp(0.36 + i * 0.06)} className="col-span-1">
            <Link
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className={`flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/8 bg-black/20 py-5 text-white/50 transition duration-300 hover:text-white ${item.glow}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          </motion.div>
        );
      })}

      {/* ── CV DOWNLOAD (col-span-3) ── */}
      <motion.div {...fadeUp(0.56)} className="col-span-3">
        <Link
          href="/cv"
          className="flex w-full items-center justify-between rounded-2xl border border-violet-400/20 bg-violet-500/10 px-5 py-4 transition hover:bg-violet-500/20 hover:border-violet-400/40 group"
        >
          <div>
            <p className="text-sm font-black text-white">{t.downloadCV}</p>
            <p className="text-xs text-white/40">{t.cvSub}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20 text-violet-300 transition group-hover:bg-violet-500/40">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
