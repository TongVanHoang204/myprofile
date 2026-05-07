"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Github,
  Mail,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { contactInfo } from "@/app/data/contact";
import { useMusicStore } from "@/app/store/musicStore";
import BentoBioGrid from "@/app/components/BentoBioGrid";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Copy ─────────────────────────────────────────────────────────────────────
const copy = {
  vi: {
    handle: "@TONGVANHOANG204 · UI/UX",
    greeting: "Xin chào.",
    intro:
      "Frontend, UI/UX và AI workflow được kể bằng một trang bio gọn, tối, dễ scan.",
    member: "Sinh viên IT tại HUTECH — đang thực tập và xây sản phẩm thật.",
    collab: "Liên hệ cộng tác:",
    links: "Không gian",
    footer: "Được phát triển bởi Tống Văn Hoàng",
    nav: { overview: "Tổng quan", projects: "Dự án", info: "Thông tin" },
    tabs: ["Tổng quan", "Dự án", "Thông tin"],
    follow: "Xem dự án",
    statusLabels: {
      morning: "🌅 Sáng sớm — đang học bài",
      afternoon: "☀️ Giờ vàng — đang code",
      evening: "🌆 Buổi tối — đang thiết kế",
      night: "🌙 Đêm khuya — đang build",
      midnight: "⚡ Nửa đêm — deep work mode",
    },
    nowPlaying: "Đang phát",
    notPlaying: "🎵 Mở nhạc để bắt đầu",
    stats: [
      { value: "04", label: "Dự án chính" },
      { value: "AI", label: "Tích hợp" },
    ],
  },
  en: {
    handle: "@TONGVANHOANG204 · UI/UX",
    greeting: "Hello.",
    intro:
      "Frontend, UI/UX, and AI workflow presented as a compact dark bio page built for fast scanning.",
    member: "IT student at HUTECH — currently interning and building real product work.",
    collab: "DM for work:",
    links: "Space",
    footer: "Powered by Tong Van Hoang",
    nav: { overview: "Overview", projects: "Projects", info: "Info" },
    tabs: ["Overview", "Projects", "Info"],
    follow: "View projects",
    statusLabels: {
      morning: "🌅 Morning — studying",
      afternoon: "☀️ Golden hour — coding",
      evening: "🌆 Evening — designing",
      night: "🌙 Late night — building",
      midnight: "⚡ Midnight — deep work mode",
    },
    nowPlaying: "Now Playing",
    notPlaying: "🎵 Open player to start",
    stats: [
      { value: "04", label: "Case studies" },
      { value: "AI", label: "Integrated" },
    ],
  },
} as const;

const socialItems = [
  { icon: Mail, href: `mailto:${contactInfo.email}`, label: "Email" },
  { icon: Github, href: contactInfo.github, label: "GitHub" },
  { icon: FileText, href: "/cv", label: "CV" },
] as const;

// ── Live Status helper ────────────────────────────────────────────────────────
function getStatus(h: number, labels: Record<string, string>) {
  if (h >= 5 && h < 12) return labels.morning;
  if (h >= 12 && h < 17) return labels.afternoon;
  if (h >= 17 && h < 21) return labels.evening;
  if (h >= 21 && h < 24) return labels.night;
  return labels.midnight;
}

// ── Tilt Card wrapper ─────────────────────────────────────────────────────────
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 28 });
  const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 28 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(x * 10);
      rotateX.set(-y * 10);
    },
    [rotateX, rotateY]
  );

  const onLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ThreeDPage() {
  const { language } = useLanguage();
  const page = copy[language];

  // Live clock & status
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const localTime = mounted ? now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--";
  const status = mounted ? getStatus(now.getHours(), page.statusLabels) : "...";

  // Now playing from zustand
  const { playingTitle, playingArtist, isPlaying } = useMusicStore();

  return (
    <main className="relative min-h-screen overflow-hidden text-white" style={{ cursor: "none" }}>
      {/* ── Aura glow behind left card ── */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[32rem] w-[28rem] -translate-x-1/3 blur-[100px] opacity-25">
        <div className="h-full w-full rounded-full bg-violet-600" />
      </div>
      <div className="pointer-events-none absolute left-[10%] top-1/3 h-80 w-80 blur-[80px] opacity-15">
        <div className="h-full w-full rounded-full bg-indigo-500" />
      </div>
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 translate-x-1/3 blur-[100px] opacity-20">
        <div className="h-full w-full rounded-full bg-violet-700" />
      </div>

      <div
        id="overview"
        className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-stretch gap-8 px-5 pb-12 pt-28 md:grid-cols-[28rem_minmax(0,44rem)] md:px-10 lg:gap-10"
      >
        {/* ════════════════════════════════════════ LEFT CARD ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
        >
          <TiltCard className="flex flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#12071d]/60 shadow-2xl shadow-purple-950/45 backdrop-blur-md">
            {/* Cover video */}
            <div className="relative h-56 shrink-0 overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#140720]" />
              {/* Live time badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {localTime}
              </div>
            </div>

            {/* Profile content */}
            <div className="relative flex flex-1 flex-col justify-center px-6 pb-6 text-center">
              {/* Avatar */}
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

              {/* Name & handle */}
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white/90 sm:text-5xl">
                TONG VAN HOANG
              </h1>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-300/78">
                {page.handle}
              </p>

              {/* Status */}
              <p className="mt-3 text-xs font-semibold text-white/50">{status}</p>

              {/* Bio text */}
              <p className="mt-3 text-sm font-semibold leading-6 text-white/80">
                {page.member}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-white/45">{page.intro}</p>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/40">
                <MapPin className="h-3.5 w-3.5 text-violet-300/70" />
                {contactInfo.location}
              </p>

              {/* Now Playing widget */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 bg-black/30 px-4 py-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${playingTitle && isPlaying ? "bg-violet-500/30" : "bg-white/5"}`}>
                  {playingTitle && isPlaying ? (
                    <Music2 className="h-4 w-4 animate-pulse text-violet-300" />
                  ) : (
                    <Music2 className="h-4 w-4 text-white/20" />
                  )}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    {page.nowPlaying}
                  </p>
                  {playingTitle ? (
                    <>
                      <p className="truncate text-xs font-bold text-violet-200">{playingTitle}</p>
                      {playingArtist && (
                        <p className="truncate text-[10px] text-white/35">{playingArtist}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-white/30">{page.notPlaying}</p>
                  )}
                </div>
                {playingTitle && (
                  <div className={`shrink-0 text-violet-400 ${isPlaying ? "opacity-100" : "opacity-40"}`}>
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </div>
                )}
              </div>

              {/* Social icons */}
              <div className="mt-5 flex justify-center gap-3">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={item.label}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/7 bg-white/[0.035] text-white/48 transition hover:-translate-y-0.5 hover:bg-violet-400/12 hover:text-white hover:shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              {/* Collab */}
              <p className="mt-4 text-xs text-white/36">
                {page.collab}{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-bold text-white/60 transition hover:text-violet-200"
                >
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* ════════════════════════════════════════ RIGHT CARD ════════════════════════════════════════ */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <TiltCard className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#10051a]/55 p-6 shadow-2xl shadow-purple-950/45 backdrop-blur-md md:p-8">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-white/40">
                {page.links}
              </h2>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            {/* Bento Grid */}
            <div className="flex-1 overflow-y-auto pr-0.5 custom-scrollbar">
              <BentoBioGrid lang={language} />
            </div>
          </TiltCard>
        </motion.section>
      </div>

      {/* ── Mobile menu button ── */}
      <button
        type="button"
        aria-label="Open menu"
        className="fixed bottom-6 left-5 z-20 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/8 bg-white/[0.045] text-violet-200 backdrop-blur-xl transition hover:bg-white/10"
      >
        <Menu className="h-8 w-8" />
      </button>

      {/* ── Bottom nav ── */}
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
