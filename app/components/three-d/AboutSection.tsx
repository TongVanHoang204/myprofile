"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { threeDCopy } from "@/app/data/three-d";

export default function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const copy = threeDCopy[language].about;

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.32em] text-white/40"
        >
          {copy.label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-5xl text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {copy.prefix}{" "}
          <span className="font-instrument-serif italic text-white/60">
            {copy.accent}
          </span>{" "}
          {copy.middle}
          <br className="hidden md:block" />
          <span className="font-instrument-serif italic text-white/60">
            {" "}
            {copy.suffix}
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
