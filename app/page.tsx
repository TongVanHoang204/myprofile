"use client";

import { motion, type Variants } from "framer-motion";
import Typewriter from "typewriter-effect";
import ProfileAvatar from "@/app/components/ProfileAvatar";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import BlogSection from "@/app/components/sections/BlogSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ContactSection from "@/app/components/sections/ContactSection";
import { useLanguage } from "@/app/context/LanguageContext";

export default function HomePage() {
  const { dict } = useLanguage();
  const heroHighlights = Array.isArray(dict.hero.highlights)
    ? (dict.hero.highlights as string[])
    : ["UI/UX", "Frontend", "Backend"];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="text-slate-900 transition-colors duration-300 dark:text-slate-50">
      <section
        id="home"
        className="flex min-h-[100svh] items-start justify-center pt-22 sm:pt-28 md:min-h-screen md:items-center md:pt-0"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto flex max-w-6xl flex-col-reverse gap-8 px-4 py-5 sm:px-6 sm:py-10 md:flex-row md:items-center md:gap-12"
        >
          <div className="flex-1 space-y-4 text-center md:space-y-6 md:text-left">
            <motion.p
              variants={fadeInUp}
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 sm:text-sm"
            >
              {dict.hero.greeting}
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl"
            >
              Tống Văn <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent dark:from-sky-400 dark:to-purple-400">
                Hoàng
              </span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center gap-1.5 text-center text-base font-medium text-slate-600 dark:text-slate-200 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2 sm:text-xl md:justify-start md:text-left"
            >
              <span className="shrink-0">{dict.hero.role_prefix}</span>
              <span className="hero-typewriter inline-flex min-h-12 pb-2 font-bold sm:min-h-0 sm:min-w-[220px]">
                <Typewriter
                  options={{
                    strings: dict.hero.roles,
                    autoStart: true,
                    loop: true,
                    delay: 95,
                    deleteSpeed: 90,
                  }}
                />
              </span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base md:mx-0 md:text-lg"
            >
              {dict.hero.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:justify-start"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative inline-flex min-h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-sky-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-400 hover:shadow-sky-500/50 sm:w-auto sm:px-8"
              >
                <span className="mr-2">{dict.hero.view_projects}</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-600 transition-all duration-300 hover:border-sky-400 hover:bg-slate-50 hover:text-sky-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-sky-400 sm:w-auto sm:px-8"
              >
                {dict.hero.contact}
              </button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6 flex flex-col items-center gap-2 text-center text-sm font-medium text-slate-500 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 sm:text-left md:justify-start dark:text-slate-500"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                {dict.hero.available}
              </div>
              {heroHighlights.map((highlight) => (
                <div key={highlight} className="contents">
                  <span className="hidden sm:inline">•</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="relative flex flex-1 items-center justify-center pt-2 md:pt-0"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-500/30 to-purple-500/30 blur-[70px] sm:h-[300px] sm:w-[300px] sm:blur-[80px]"
            />

            <div className="relative z-10 flex w-full justify-center">
              <ProfileAvatar />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <ProjectsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
