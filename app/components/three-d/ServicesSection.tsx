"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { threeDCopy } from "@/app/data/three-d";

export default function ServicesSection() {
  const { language } = useLanguage();
  const copy = threeDCopy[language].services;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-end justify-between gap-4 md:mb-14"
        >
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">
            {copy.title}
          </h2>
          <p className="hidden text-sm text-white/40 md:block">{copy.eyebrow}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {copy.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="liquid-glass group overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {card.tag}
                  </p>
                  <span className="liquid-glass inline-flex rounded-full p-2 text-white">
                    <ArrowUpRight className="relative z-10 h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-5 text-xl tracking-tight text-white md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
