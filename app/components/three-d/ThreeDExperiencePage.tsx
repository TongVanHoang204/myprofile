"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Globe,
  Github,
  Mail,
} from "lucide-react";
import { useRef } from "react";
import AboutSection from "@/app/components/three-d/AboutSection";
import FeaturedVideoSection from "@/app/components/three-d/FeaturedVideoSection";
import PhilosophySection from "@/app/components/three-d/PhilosophySection";
import ServicesSection from "@/app/components/three-d/ServicesSection";
import { useSeamlessVideoLoop } from "@/app/components/three-d/useSeamlessVideoLoop";
import { contactInfo } from "@/app/data/contact";
import { useLanguage } from "@/app/context/LanguageContext";
import LanguageToggle from "@/app/components/LanguageToggle";
import { threeDCopy } from "@/app/data/three-d";

const socialItems = [
  { icon: Github, href: contactInfo.github },
  { icon: Mail, href: `mailto:${contactInfo.email}` },
  { icon: Globe, href: "/" },
] as const;

export default function ThreeDExperiencePage() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const { language } = useLanguage();
  const copy = threeDCopy[language];

  useSeamlessVideoLoop(heroVideoRef);

  return (
    <div className="bg-black text-white">
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover object-bottom [filter:brightness(0.72)_contrast(1.14)_saturate(1.15)]"
          src="/videos/three-d/hero.mp4"
          poster="/videos/three-d/hero-poster.jpg"
          muted
          autoPlay
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_38%,rgba(0,0,0,0.02),rgba(0,0,0,0.16)_46%,rgba(0,0,0,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-t from-black via-black/55 to-transparent" />

        <header className="relative z-20 px-6 py-6">
          <div className="liquid-glass mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Globe className="relative z-10 h-6 w-6 shrink-0 text-white" />
              <span className="relative z-10 text-lg font-semibold text-white">
                Tong Van Hoang
              </span>

              <nav className="relative z-10 ml-8 hidden items-center gap-8 md:flex">
                <a
                  href="#features"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {copy.nav.projects}
                </a>
                <a
                  href="#services"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {copy.nav.workflow}
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {copy.nav.profile}
                </a>
              </nav>
            </div>

            <div className="relative z-10 flex shrink-0 items-center gap-2">
              <LanguageToggle />
              <Link
                href="/cv"
                className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white sm:px-6"
              >
                <FileText className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{copy.nav.viewCv}</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center md:-translate-y-[20%]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-instrument-serif whitespace-nowrap text-[3.25rem] tracking-tight text-white drop-shadow-[0_20px_90px_rgba(255,255,255,0.18)] sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {copy.hero.title} <em className="italic">{copy.hero.titleAccent}</em>
          </motion.h1>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="mt-8 w-full max-w-xl"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
              <input
                type="email"
                placeholder={copy.hero.inputPlaceholder}
                className="relative z-10 h-12 w-full bg-transparent text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="relative z-10 inline-flex rounded-full bg-white p-3 text-black"
                aria-label="Submit email"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl px-4 text-sm leading-relaxed text-white"
          >
            {copy.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            <Link
              href="/projects"
              className="liquid-glass mt-6 inline-flex rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              <span className="relative z-10">{copy.hero.primaryCta}</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {socialItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
              >
                <Icon className="relative z-10 h-5 w-5" />
              </motion.a>
            );
          })}
        </div>
      </section>

      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />

      <section className="bg-black px-6 pb-16 pt-6">
        <div className="mx-auto flex max-w-6xl justify-center">
          <Link
            href="/"
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <span className="relative z-10">{copy.hero.backHome}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
