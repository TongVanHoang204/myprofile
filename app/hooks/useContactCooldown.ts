"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/app/data/dictionaries";

const CONTACT_COOLDOWN_STORAGE_KEY = "portfolio-contact-cooldown-until";

function readStoredCooldownUntil() {
  if (typeof window === "undefined") {
    return 0;
  }

  const rawValue = window.localStorage.getItem(CONTACT_COOLDOWN_STORAGE_KEY) || "";
  const cooldownUntil = Number(rawValue);

  if (!Number.isFinite(cooldownUntil) || cooldownUntil <= Date.now()) {
    window.localStorage.removeItem(CONTACT_COOLDOWN_STORAGE_KEY);
    return 0;
  }

  return cooldownUntil;
}

function readStoredRemainingSeconds() {
  const cooldownUntil = readStoredCooldownUntil();

  if (!cooldownUntil) {
    return 0;
  }

  return Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
}

function persistRemainingSeconds(remainingSeconds: number) {
  if (typeof window === "undefined") {
    return;
  }

  if (remainingSeconds <= 0) {
    window.localStorage.removeItem(CONTACT_COOLDOWN_STORAGE_KEY);
    return;
  }

  const cooldownUntil = Date.now() + remainingSeconds * 1000;
  window.localStorage.setItem(
    CONTACT_COOLDOWN_STORAGE_KEY,
    String(cooldownUntil)
  );
}

export function formatContactCooldown(seconds: number, language: Language) {
  const roundedSeconds = Math.max(0, Math.ceil(seconds));
  const hours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.ceil((roundedSeconds % 3600) / 60);

  if (language === "vi") {
    if (hours > 0) {
      return minutes > 0
        ? `${hours} gi\u1edd ${minutes} ph\u00fat`
        : `${hours} gi\u1edd`;
    }

    return `${Math.max(1, minutes)} ph\u00fat`;
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${Math.max(1, minutes)}m`;
}

export function useContactCooldown(language: Language) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    readStoredRemainingSeconds
  );

  useEffect(() => {
    if (!remainingSeconds) {
      persistRemainingSeconds(0);
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          persistRemainingSeconds(0);
          return 0;
        }

        const next = current - 1;
        persistRemainingSeconds(next);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [remainingSeconds]);

  return {
    isCoolingDown: remainingSeconds > 0,
    remainingSeconds,
    remainingLabel: formatContactCooldown(remainingSeconds, language),
    applyCooldown: (seconds: number) => {
      const cooldown = Math.max(0, Math.ceil(seconds));
      setRemainingSeconds(cooldown);
      persistRemainingSeconds(cooldown);
    },
  };
}
