import { Redis } from "@upstash/redis";
import { VISITOR_ANALYTICS_REDIS_KEY } from "@/app/lib/visitor-analytics-config";

const memoryVisitors = new Set<string>();
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

async function withFallback<T>(
  action: (() => Promise<T>) | null,
  fallback: () => T | Promise<T>
) {
  if (!action) {
    return fallback();
  }

  try {
    return await action();
  } catch (error) {
    console.error("Visitor analytics store error:", error);
    return fallback();
  }
}

export async function addUniqueVisitor(visitorId: string) {
  await withFallback(
    redis ? () => redis.sadd(VISITOR_ANALYTICS_REDIS_KEY, visitorId) : null,
    () => {
      memoryVisitors.add(visitorId);
      return 1;
    }
  );
}

export async function removeUniqueVisitor(visitorId: string) {
  await withFallback(
    redis ? () => redis.srem(VISITOR_ANALYTICS_REDIS_KEY, visitorId) : null,
    () => {
      memoryVisitors.delete(visitorId);
      return 1;
    }
  );
}

export async function getUniqueVisitorCount() {
  return withFallback(
    redis ? () => redis.scard(VISITOR_ANALYTICS_REDIS_KEY) : null,
    () => memoryVisitors.size
  );
}
