const STORAGE_KEY = "portfolio-contact-cooldown-data";

export type CooldownData = {
  cooldownUntil: number;
  email: string;
};

export function readStoredCooldownData(): CooldownData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<CooldownData> | null;
    if (
      !data || typeof data.email !== "string" || !data.email.trim() ||
      typeof data.cooldownUntil !== "number" || !Number.isFinite(data.cooldownUntil) ||
      data.cooldownUntil <= Date.now()
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return { email: data.email, cooldownUntil: data.cooldownUntil };
  } catch {
    return null;
  }
}

export function persistCooldownData(data: CooldownData | null) {
  if (typeof window === "undefined") return;
  try {
    if (!data || data.cooldownUntil <= Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    // Storage is optional; the server still enforces the contact cooldown.
  }
}
