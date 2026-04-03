"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

const HOME_SECTIONS = ["home", "projects", "blog", "about", "contact"] as const;
type HomeSectionId = (typeof HOME_SECTIONS)[number];

type NavItem =
  | { kind: "section"; sectionId: HomeSectionId; label: string }
  | { kind: "route"; href: string; label: string };

const SCROLL_TARGET_KEY = "home-scroll-target";

const emitRouteLoadingStart = () => {
  window.dispatchEvent(new Event("app:route-loading-start"));
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { dict, language } = useLanguage();

  const navLinks: NavItem[] = [
    { kind: "section", sectionId: "home", label: dict.nav.home },
    { kind: "section", sectionId: "projects", label: dict.nav.projects },
    {
      kind: "section",
      sectionId: "blog",
      label: language === "vi" ? "Blog" : "Blog",
    },
    { kind: "section", sectionId: "about", label: dict.nav.about },
    { kind: "route", href: "/certificates", label: dict.nav.certificates },
    { kind: "route", href: "/faq", label: dict.nav.faq },
    { kind: "route", href: "/cv", label: dict.nav.cv },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const stripHashFromUrl = useCallback(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      );
    }
  }, []);

  const scrollToSection = useCallback(
    (sectionId: HomeSectionId, behavior: ScrollBehavior = "smooth") => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      element.scrollIntoView({ behavior });
      setActiveSection(sectionId);
      stripHashFromUrl();
    },
    [stripHashFromUrl]
  );

  const handleSectionNavigation = (
    e: React.MouseEvent<HTMLElement>,
    sectionId: HomeSectionId
  ) => {
    e.preventDefault();
    closeMenu();

    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    sessionStorage.setItem(SCROLL_TARGET_KEY, sectionId);
    emitRouteLoadingStart();
    router.push("/");
  };

  const handleRouteNavigation = (
    e: React.MouseEvent<HTMLElement>,
    href: string
  ) => {
    e.preventDefault();
    closeMenu();
    emitRouteLoadingStart();
    router.push(href);
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const pendingTarget = sessionStorage.getItem(SCROLL_TARGET_KEY);
    if (pendingTarget && HOME_SECTIONS.includes(pendingTarget as HomeSectionId)) {
      sessionStorage.removeItem(SCROLL_TARGET_KEY);
      window.setTimeout(() => {
        scrollToSection(pendingTarget as HomeSectionId);
      }, 40);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of HOME_SECTIONS) {
        const element = document.getElementById(section);
        if (!element) continue;

        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;
        if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, scrollToSection]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-lg transition-colors duration-300 dark:border-slate-800/70 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <Link
          href="/"
          onClick={(e) => handleSectionNavigation(e, "home")}
          className="group flex min-w-0 items-center gap-2"
        >
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-[11px] font-bold text-white shadow-lg shadow-sky-500/20 sm:h-10 sm:w-10 sm:text-xs"
          >
            TVH
          </motion.span>
          <span className="max-w-[7rem] truncate text-[13px] font-semibold tracking-wide text-slate-800 transition-colors group-hover:text-sky-500 dark:text-slate-100 dark:group-hover:text-sky-400 sm:max-w-none sm:text-sm">
            Tong Van Hoang
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((item) => {
            const isActive =
              item.kind === "section"
                ? pathname === "/" && activeSection === item.sectionId
                : pathname === item.href;

            return (
              <Link
                key={item.kind === "section" ? item.sectionId : item.href}
                href={item.kind === "section" ? "/" : item.href}
                onClick={(e) =>
                  item.kind === "section"
                    ? handleSectionNavigation(e, item.sectionId)
                    : handleRouteNavigation(e, item.href)
                }
                className={clsx(
                  "relative flex items-center justify-center rounded-full px-4 py-2 transition-colors",
                  isActive
                    ? "font-medium text-sky-600 dark:text-sky-400"
                    : "text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-sky-500/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              onClick={(e) => handleSectionNavigation(e, "contact")}
              className="ml-4 block rounded-full bg-sky-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-sky-500/30 transition-colors hover:bg-sky-400 dark:text-slate-950"
            >
              {dict.nav.contact}
            </Link>
          </motion.div>

          <div className="ml-2 flex items-center gap-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-h-[calc(100svh-4rem)] overflow-y-auto md:hidden"
          >
            <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white/95 px-3 py-3 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-950/95">
              {navLinks.map((item, index) => {
                const isActive =
                  item.kind === "section"
                    ? pathname === "/" && activeSection === item.sectionId
                    : pathname === item.href;

                return (
                  <motion.div
                    key={item.kind === "section" ? item.sectionId : item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.kind === "section" ? "/" : item.href}
                      onClick={(e) =>
                        item.kind === "section"
                          ? handleSectionNavigation(e, item.sectionId)
                          : handleRouteNavigation(e, item.href)
                      }
                      className={clsx(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2"
              >
                <Link
                  href="/"
                  onClick={(e) => handleSectionNavigation(e, "contact")}
                  className="block w-full rounded-xl bg-sky-500 px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-colors hover:bg-sky-400 dark:text-slate-950"
                >
                  {dict.nav.contact}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
