"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { ProjectScreenshot } from "@/app/data/projects";

type ProjectGalleryProps = {
  title: string;
  hint: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  items: ProjectScreenshot[];
};

export default function ProjectGallery({
  title,
  hint,
  closeLabel,
  previousLabel,
  nextLabel,
  items,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const desktopItems = items.filter((item) => item.device !== "mobile");
  const mobileItems = items.filter((item) => item.device === "mobile");
  const activeItem = activeIndex === null ? null : items[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setActiveIndex((current) =>
        current === null ? current : (current + direction + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, close, step]);

  const renderTile = (item: ProjectScreenshot) => {
    const index = items.indexOf(item);
    const isMobile = item.device === "mobile";

    return (
      <button
        key={item.src}
        type="button"
        onClick={() => setActiveIndex(index)}
        className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 text-left transition-colors hover:border-sky-400 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-400"
      >
        <div
          className={`overflow-hidden bg-slate-100 dark:bg-slate-900 ${
            isMobile ? "aspect-[9/16]" : "aspect-[16/10]"
          }`}
        >
          <img
            src={item.src}
            alt={item.caption}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <p className="px-4 py-3 text-xs font-semibold leading-5 text-slate-600 dark:text-slate-300">
          {item.caption}
        </p>
      </button>
    );
  };

  const lightbox = (
    <AnimatePresence>
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.caption}
        >
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
  
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label={previousLabel}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label={nextLabel}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
  
          <motion.figure
            key={activeItem.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex max-h-full max-w-6xl flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeItem.src}
              alt={activeItem.caption}
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="text-center text-sm text-slate-200">
              {activeItem.caption}
              <span className="ml-2 text-slate-400">
                {(activeIndex ?? 0) + 1}/{items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/65 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Images className="h-5 w-5 text-sky-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{title}</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      </div>

      {desktopItems.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {desktopItems.map(renderTile)}
        </div>
      )}

      {mobileItems.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {mobileItems.map(renderTile)}
        </div>
      )}

      {/* Portal to body: the section backdrop-blur would otherwise trap the fixed overlay */}
      {isMounted && createPortal(lightbox, document.body)}
    </section>
  );
}
