"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { threeDCopy } from "@/app/data/three-d";

export default function PhilosophySection() {
  const { language } = useLanguage();
  const copy = threeDCopy[language].philosophy;

  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl"
        >
          {copy.title}{" "}
          <span className="font-instrument-serif italic text-white/40">
            {copy.accent}
          </span>{" "}
          {copy.suffix}
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <video
                className="h-full w-full object-cover"
                src="/videos/three-d/philosophy.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
                {copy.blockOneLabel}
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                {copy.blockOneBody}
              </p>
            </div>

            <div className="my-8 h-px w-full bg-white/10" />

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
                {copy.blockTwoLabel}
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                {copy.blockTwoBody}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
