"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/app/data/dictionaries";

const CONTACT_COOLDOWN_STORAGE_KEY = "portfolio-contact-cooldown-data";

type CooldownData = {
  cooldownUntil: number;
  email: string;
};

function readStoredCooldownData(): CooldownData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(CONTACT_COOLDOWN_STORAGE_KEY);
    if (!rawValue) return null;
    const data = JSON.parse(rawValue) as CooldownData;
    if (!Number.isFinite(data.cooldownUntil) || data.cooldownUntil <= Date.now()) {
      window.localStorage.removeItem(CONTACT_COOLDOWN_STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    window.localStorage.removeItem(CONTACT_COOLDOWN_STORAGE_KEY);
    return null;
  }
}

function persistCooldownData(data: CooldownData | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!data || data.cooldownUntil <= Date.now()) {
    window.localStorage.removeItem(CONTACT_COOLDOWN_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(CONTACT_COOLDOWN_STORAGE_KEY, JSON.stringify(data));
}

export function formatContactCooldown(seconds: number, language: Language) {
  const roundedSeconds = Math.max(0, Math.ceil(seconds));
  const hours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.ceil((roundedSeconds % 3600) / 60);

  if (language === "vi") {
    if (hours > 0) {
      return minutes > 0
        ? `${hours} giờ ${minutes} phút`
        : `${hours} giờ`;
    }

    return `${Math.max(1, minutes)} phút`;
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${Math.max(1, minutes)}m`;
}

export function useContactCooldown(language: Language, currentEmail: string) {
  const [cooldownData, setCooldownData] = useState<CooldownData | null>(readStoredCooldownData);
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const data = readStoredCooldownData();
    return data ? Math.max(0, Math.ceil((data.cooldownUntil - Date.now()) / 1000)) : 0;
  });

  useEffect(() => {
    if (!cooldownData || remainingSeconds <= 0) {
      if (cooldownData) persistCooldownData(null);
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds(() => {
        const remaining = Math.max(0, Math.ceil((cooldownData.cooldownUntil - Date.now()) / 1000));
        if (remaining <= 0) {
          persistCooldownData(null);
          setCooldownData(null);
        }
        return remaining;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [cooldownData, remainingSeconds]);

  const normalizedCurrent = currentEmail.trim().toLowerCase();
  const normalizedCooldown = cooldownData?.email.trim().toLowerCase() || "";
  const isCoolingDownForCurrentEmail = remainingSeconds > 0 && normalizedCurrent === normalizedCooldown && normalizedCurrent !== "";

  return {
    isCoolingDown: isCoolingDownForCurrentEmail,
    remainingSeconds,
    remainingLabel: formatContactCooldown(remainingSeconds, language),
    applyCooldown: (seconds: number, emailToLock: string) => {
      const cooldown = Math.max(0, Math.ceil(seconds));
      if (cooldown <= 0) {
         persistCooldownData(null);
         setCooldownData(null);
         setRemainingSeconds(0);
         return;
      }
      const newData = {
        cooldownUntil: Date.now() + cooldown * 1000,
        email: emailToLock,
      };
      setCooldownData(newData);
      setRemainingSeconds(cooldown);
      persistCooldownData(newData);
    },
  };
}
