"use client";

import type { FC } from 'react';
import React, { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const ThemeToggle: FC = () => {
    const { theme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    const isDark = theme === "dark";

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-800 transition-colors hover:bg-sky-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:h-10 sm:w-10 sm:rounded-xl"
            aria-label="Toggle Theme"
        >
            <div className="relative h-5 w-5 overflow-hidden">
                 {/* Sun Icon */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute inset-0 h-full w-full text-amber-500"
                    initial={{ y: isDark ? 20 : 0, opacity: isDark ? 0 : 1 }}
                    animate={{ y: isDark ? 20 : 0, opacity: isDark ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.svg>
                
                {/* Moon Icon */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute inset-0 h-full w-full text-sky-400"
                    initial={{ y: isDark ? 0 : -20, opacity: isDark ? 1 : 0 }}
                    animate={{ y: isDark ? 0 : -20, opacity: isDark ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
            </div>
            
            <span className="sr-only">Toggle theme</span>
        </motion.button>
    );
};

export default ThemeToggle;
