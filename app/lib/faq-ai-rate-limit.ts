import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

export const FAQ_AI_LIMIT = 12;
const WINDOW_MS = 10 * 60 * 1000;
const COOLDOWN_MS = 10 * 1000;
const MAX_MEMORY_BUCKETS = 10_000;

export class AiRateLimitConfigError extends Error {
  constructor() {
    super("AI rate limit storage is not configured: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.");
    this.name = "AiRateLimitConfigError";
  }
}

export type AiRateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

// Check and consume in one Redis operation so parallel instances cannot bypass it.
// NOTE: Timestamp is passed via ARGV[4] instead of redis.call('TIME') because
// Upstash Redis blocks non-deterministic commands inside Lua scripts.
export const AI_RATE_LIMIT_SCRIPT = `
local now = tonumber(ARGV[4])
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local cooldown = tonumber(ARGV[3])
local count = tonumber(redis.call('HGET', KEYS[1], 'count')) or 0
local reset = tonumber(redis.call('HGET', KEYS[1], 'reset')) or 0
local nextAllowed = tonumber(redis.call('HGET', KEYS[1], 'next')) or 0
if now >= reset then
  count = 0
  reset = now + window
  nextAllowed = 0
end
local wait = math.max(0, nextAllowed - now)
if count >= limit then wait = math.max(wait, reset - now) end
if wait > 0 then
  return {0, math.max(0, limit - count), math.ceil(wait / 1000)}
end
count = count + 1
nextAllowed = now + cooldown
redis.call('HSET', KEYS[1], 'count', count, 'reset', reset, 'next', nextAllowed)
redis.call('PEXPIRE', KEYS[1], math.max(reset, nextAllowed) - now)
local retry = cooldown
if count >= limit then retry = math.max(retry, reset - now) end
return {1, math.max(0, limit - count), math.ceil(retry / 1000)}
`;

type Bucket = { count: number; resetAt: number; nextAllowedAt: number };
type Store = { eval: (script: string, keys: string[], args: number[]) => Promise<unknown> };

export function createAiRateLimiter({
  store,
  production,
  now = Date.now,
}: {
  store: Store | null;
  production: boolean;
  now?: () => number;
}) {
  const buckets = new Map<string, Bucket>();

  return async (ip: string): Promise<AiRateLimitResult> => {
    const digest = createHash("sha256").update(ip).digest("hex");
    const key = `portfolio:faq-ai:limit:v1:${digest}`;

    if (store) {
      // Propagate storage failures: never silently switch to per-instance limits.
      const result = await store.eval(AI_RATE_LIMIT_SCRIPT, [key], [FAQ_AI_LIMIT, WINDOW_MS, COOLDOWN_MS, Date.now()]);
      if (!Array.isArray(result) || result.length !== 3 ||
        !result.every((value) => typeof value === "number" && Number.isFinite(value)) ||
        ![0, 1].includes(result[0]) || result[1] < 0 || result[2] <= 0) {
        throw new Error("Invalid AI rate limit result");
      }
      return { allowed: result[0] === 1, remaining: result[1], retryAfterSeconds: result[2] };
    }

    if (production) throw new AiRateLimitConfigError();

    const time = now();
    for (const [entryKey, entry] of buckets) {
      if (time >= Math.max(entry.resetAt, entry.nextAllowedAt)) buckets.delete(entryKey);
    }
    const bucket = buckets.get(key) ?? { count: 0, resetAt: time + WINDOW_MS, nextAllowedAt: 0 };
    if (!buckets.has(key) && buckets.size >= MAX_MEMORY_BUCKETS) {
      throw new Error("AI rate limit storage is full");
    }
    const wait = Math.max(0, bucket.nextAllowedAt - time,
      bucket.count >= FAQ_AI_LIMIT ? bucket.resetAt - time : 0);
    if (wait > 0) {
      return { allowed: false, remaining: Math.max(0, FAQ_AI_LIMIT - bucket.count), retryAfterSeconds: Math.ceil(wait / 1000) };
    }
    bucket.count += 1;
    bucket.nextAllowedAt = time + COOLDOWN_MS;
    buckets.set(key, bucket);
    return {
      allowed: true,
      remaining: FAQ_AI_LIMIT - bucket.count,
      retryAfterSeconds: Math.ceil(Math.max(COOLDOWN_MS,
        bucket.count >= FAQ_AI_LIMIT ? bucket.resetAt - time : 0) / 1000),
    };
  };
}

export const consumeAiRateLimit = createAiRateLimiter({
  store: process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv() : null,
  production: process.env.NODE_ENV === "production",
});
