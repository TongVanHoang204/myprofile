"use client";

import { RefObject, useEffect, useRef } from "react";

export function useSeamlessVideoLoop(videoRef: RefObject<HTMLVideoElement | null>) {
  const fadeRafRef = useRef<number | null>(null);
  const restartTimeoutRef = useRef<number | null>(null);
  const visibilityFallbackRef = useRef<number | null>(null);
  const fadeStateRef = useRef<"idle" | "in" | "out">("idle");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    const cancelFade = () => {
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
    };

    const animateOpacity = (
      from: number,
      to: number,
      duration: number,
      onComplete?: () => void
    ) => {
      cancelFade();
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const nextOpacity = from + (to - from) * progress;
        video.style.opacity = nextOpacity.toString();

        if (progress < 1) {
          fadeRafRef.current = requestAnimationFrame(tick);
          return;
        }

        fadeRafRef.current = null;
        onComplete?.();
      };

      fadeRafRef.current = requestAnimationFrame(tick);
    };

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // autoplay may be blocked until the browser allows playback
      }
    };

    const fadeIn = () => {
      fadeStateRef.current = "in";
      animateOpacity(Number(video.style.opacity || 0), 1, 500, () => {
        fadeStateRef.current = "idle";
      });
    };

    const fadeOut = () => {
      if (fadeStateRef.current === "out") return;

      fadeStateRef.current = "out";
      animateOpacity(Number(video.style.opacity || 1), 0, 500, () => {
        fadeStateRef.current = "idle";
      });
    };

    const handleCanPlay = () => {
      playVideo();
      fadeIn();
    };

    const handleLoadedData = () => {
      if (video.style.opacity === "0") {
        fadeIn();
      }
    };

    const handleError = () => {
      // If the media cannot be played, avoid leaving the hero in a permanent black state.
      video.style.opacity = "1";
    };

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration)) return;

      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55) {
        fadeOut();
      }
    };

    const handleEnded = () => {
      cancelFade();
      video.style.opacity = "0";

      if (restartTimeoutRef.current !== null) {
        window.clearTimeout(restartTimeoutRef.current);
      }

      restartTimeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        playVideo();
        fadeIn();
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    visibilityFallbackRef.current = window.setTimeout(() => {
      if (video.style.opacity === "0" && video.readyState >= 2) {
        fadeIn();
      }
    }, 1200);

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      cancelFade();

      if (restartTimeoutRef.current !== null) {
        window.clearTimeout(restartTimeoutRef.current);
      }

      if (visibilityFallbackRef.current !== null) {
        window.clearTimeout(visibilityFallbackRef.current);
      }

      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoRef]);
}
