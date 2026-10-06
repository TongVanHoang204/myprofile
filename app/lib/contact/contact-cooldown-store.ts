import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

const CONTACT_COOLDOWN_PREFIX = "portfolio:contact:cooldown";
const memoryCooldowns = new Map<string, number>();
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

function createCooldownKey(type: "email" | "ip", value: string) {
  const digest = createHash("sha256").update(value).digest("hex");
  return `${CONTACT_COOLDOWN_PREFIX}:${type}:${digest}`;
}

async function getRemainingFromMemory(key: string) {
  const expiresAt = memoryCooldowns.get(key) || 0;
  const remainingMs = expiresAt - Date.now();

  if (remainingMs <= 0) {
    memoryCooldowns.delete(key);
    return 0;
  }

  return Math.ceil(remainingMs / 1000);
}

async function getRemainingSeconds(key: string) {
  if (!redis) {
    return getRemainingFromMemory(key);
  }

  try {
    const ttl = await redis.ttl(key);
    return typeof ttl === "number" && ttl > 0 ? ttl : 0;
  } catch (error) {
    console.error("Contact cooldown ttl error:", error);
    return getRemainingFromMemory(key);
  }
}

async function setCooldownSeconds(key: string, seconds: number) {
  if (!redis) {
    memoryCooldowns.set(key, Date.now() + seconds * 1000);
    return;
  }

  try {
    await redis.set(key, "1", { ex: seconds });
  } catch (error) {
    console.error("Contact cooldown set error:", error);
    memoryCooldowns.set(key, Date.now() + seconds * 1000);
  }
}

export async function getContactCooldownRemaining(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return await getRemainingSeconds(createCooldownKey("email", normalizedEmail));
}

export async function activateContactCooldown(
  email: string,
  seconds: number
) {
  const normalizedEmail = email.trim().toLowerCase();
  await setCooldownSeconds(createCooldownKey("email", normalizedEmail), seconds);
}
