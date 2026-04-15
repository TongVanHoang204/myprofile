"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { threeDCopy } from "@/app/data/three-d";

export default function FeaturedVideoSection() {
  const { language } = useLanguage();
  const copy = threeDCopy[language].featured;

  return (
    <section
      id="features"
      className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="relative aspect-video overflow-hidden rounded-3xl"
        >
          <video
            className="h-full w-full object-cover"
            src="/videos/three-d/featured.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
              <p className="relative z-10 mb-3 text-xs uppercase tracking-[0.3em] text-white/50">
                {copy.label}
              </p>
              <p className="relative z-10 text-sm leading-relaxed text-white md:text-base">
                {copy.description}
              </p>
            </div>

            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass inline-flex w-fit items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-white"
            >
              <span className="relative z-10">{copy.cta}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
