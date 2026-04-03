"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ContactSuccessPopupProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export default function ContactSuccessPopup({
  open,
  title,
  message,
  onClose,
}: ContactSuccessPopupProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const timeoutId = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timeoutId);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-emerald-400/40 bg-slate-900/95 p-6 text-center shadow-[0_24px_80px_rgba(15,23,42,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <span className="text-lg leading-none">x</span>
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.18)]">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-2xl font-extrabold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {message}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-w-28 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
