"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import styles from "./SiteLoader.module.css";

type LoaderMode = "page" | "route";

type SiteLoaderProps = {
  mode?: LoaderMode;
};

const copy = {
  vi: {
    badge: "Portfolio cá nhân",
    phase: "Đang khởi tạo trải nghiệm",
    detail: "Web Developer • React • Node.js",
    loading: "Đang tải giao diện",
    ready: "Thiết lập không gian số",
  },
  en: {
    badge: "Personal portfolio",
    phase: "Initializing experience",
    detail: "Web Developer • React • Node.js",
    loading: "Loading interface",
    ready: "Preparing digital space",
  },
} as const;

function getNextProgress(current: number, mode: LoaderMode) {
  if (current >= 96) {
    return current;
  }

  const remaining = 100 - current;
  const divisor = mode === "page" ? 6.5 : 5;
  const jitter = mode === "page" ? Math.random() * 4 : Math.random() * 6;
  const increment = Math.max(1.4, remaining / divisor + jitter);

  return Math.min(current + increment, 96);
}

export default function SiteLoader({ mode = "page" }: SiteLoaderProps) {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(mode === "page" ? 0 : 12);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => getNextProgress(current, mode));
    }, mode === "page" ? 120 : 95);

    return () => window.clearInterval(interval);
  }, [mode]);

  const displayProgress = Math.max(1, Math.round(progress));
  const percent = useMemo(
    () => displayProgress.toString().padStart(2, "0"),
    [displayProgress],
  );
  const text = copy[language];

  return (
    <div
      className={`${styles.loader} ${mode === "route" ? styles.route : styles.page}`}
      role="status"
      aria-live="polite"
      aria-label={text.phase}
    >
      <div className={styles.media} aria-hidden="true">
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/loading.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scanline} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.eyebrow}>
          <span>{text.badge}</span>
          <span>TVH / 2026</span>
        </div>

        <div className={styles.main}>
          <div className={styles.copyBlock}>
            <p className={styles.kicker}>{text.phase}</p>
            <h2 className={styles.name}>
              <span>Tong</span>
              <span>Van Hoang</span>
            </h2>
            <p className={styles.detail}>{text.detail}</p>
          </div>

          <div className={styles.metric} aria-hidden="true">
            <span className={styles.percent}>{percent}</span>
            <span className={styles.percentUnit}>%</span>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.track}>
            <span className={styles.fill} style={{ width: `${displayProgress}%` }} />
          </div>

          <div className={styles.meta}>
            <span>{text.loading}</span>
            <span>{text.ready}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
