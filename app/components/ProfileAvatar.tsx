"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { contactInfo } from "@/app/data/contact";

export default function ProfileAvatar() {
  const { language, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const profile = {
    avatarUrl: "/profile/tong-van-hoang-avatar.jpg",
    name: dict.cv.profile.name,
    role: dict.cv.profile.role,
    bio: dict.cv.profile.summary,
    email: contactInfo.email,
    phone: contactInfo.phone,
    location: contactInfo.location,
  };

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center">
      <motion.div
        animate={{ y: isOpen ? 0 : [0, -15, 0] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer"
      >
        <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-96 md:w-96">
          <div className="absolute inset-0 overflow-hidden rounded-full p-[4px]">
            <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,#0ea5e9_300deg,#a855f7_330deg,#ffffff_360deg)] opacity-100 blur-sm" />
            <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,#0ea5e9_300deg,#a855f7_330deg,#ffffff_360deg)] opacity-60 blur-xl" />

            <div className="absolute inset-[4px] z-10 flex items-center justify-center rounded-full bg-slate-950 p-1">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>

          {!isOpen && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-2 top-8 h-12 w-12 rounded-full border border-dashed border-sky-500/30 sm:-right-4 sm:top-10 sm:h-16 sm:w-16"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -left-4 bottom-16 h-16 w-16 rounded-full border border-dotted border-purple-500/20 sm:-left-8 sm:bottom-20 sm:h-24 sm:w-24"
              />
            </>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 z-20 hidden items-center justify-center rounded-full bg-black/40 backdrop-blur-[2px] md:flex"
          >
            <span className="rounded-full border border-white/30 px-3 py-1 text-sm font-bold uppercase tracking-wider text-white">
              {language === "vi" ? "Xem chi tiết" : "View details"}
            </span>
          </motion.div>
        </div>
      </motion.div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 md:hidden dark:text-slate-400">
        {language === "vi" ? "Nhấn để xem" : "Tap for details"}
      </p>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 max-h-[85svh] w-[calc(100vw-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900/90 shadow-2xl backdrop-blur-xl"
            >
              <div className="relative h-28 w-full bg-gradient-to-r from-sky-500 to-purple-600 sm:h-32">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-black/20 p-1 text-white transition-colors hover:bg-black/40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="relative mb-4 -mt-12 inline-block sm:-mt-16">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-slate-900 bg-slate-800 shadow-lg sm:h-32 sm:w-32">
                    <Image
                      src={profile.avatarUrl}
                      alt="Avatar"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-500 ring-4 ring-slate-900" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {profile.name}
                    </h3>
                    <p className="font-medium text-sky-400">{profile.role}</p>
                  </div>

                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="break-words">{profile.location || "Việt Nam"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="break-words">{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="break-all">{profile.email}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-sm italic text-slate-400">
                      {profile.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 sm:gap-3">
                    {["GitHub", "Facebook", "LinkedIn"].map((social) => (
                      <button
                        key={social}
                        className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-sky-500 hover:text-white"
                      >
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
