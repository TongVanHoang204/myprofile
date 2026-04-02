"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { socialLinks } from "@/app/data/contact";

export default function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-xs text-slate-500 dark:text-slate-400 md:flex-row md:text-left">
        <p className="max-w-2xl">
          © {new Date().getFullYear()} Tống Văn Hoàng. {dict.footer.text}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-sky-500 dark:hover:text-sky-400"
              aria-label={social.name}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.iconPath} />
              </svg>
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
