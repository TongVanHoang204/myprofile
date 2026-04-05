import { Redis } from "@upstash/redis";
import type { AiIntent } from "@/app/lib/faq-ai-types";

type ContentKind = "blog" | "project";

export type PageViewStat = {
  path: string;
  count: number;
  lastViewedAt: number;
};

export type ContentClickStat = {
  slug: string;
  label: string;
  href: string;
  count: number;
  lastClickedAt: number;
};

export type FaqQuestionStat = {
  question: string;
  count: number;
  lastAskedAt: number;
  intent: AiIntent;
  language: "vi" | "en";
};

const PAGE_VIEW_COUNTS_KEY = "portfolio:analytics:page-views";
const PAGE_VIEW_META_KEY = "portfolio:analytics:page-views:meta";
const CONTENT_CLICK_COUNTS_PREFIX = "portfolio:analytics:content-clicks";
const CONTENT_CLICK_META_PREFIX = "portfolio:analytics:content-clicks:meta";
const FAQ_QUESTION_COUNTS_KEY = "portfolio:analytics:faq-questions";
const FAQ_QUESTION_META_KEY = "portfolio:analytics:faq-questions:meta";

const MAX_TRACKED_FAQ_QUESTIONS = 120;

const memoryPageViews = new Map<string, PageViewStat>();
const memoryContentClicks: Record<ContentKind, Map<string, ContentClickStat>> = {
  blog: new Map<string, ContentClickStat>(),
  project: new Map<string, ContentClickStat>(),
};
const memoryFaqQuestions = new Map<string, FaqQuestionStat>();

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

function normalizePath(path: string) {
  const trimmed = path.trim();
  if (!trimmed.startsWith("/")) {
    return "";
  }

  return trimmed.split("?")[0].slice(0, 180) || "/";
}

function normalizeQuestionKey(question: string) {
  return question.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 180);
}

function toNumber(value: number | string | undefined) {
  if (typeof value === "number") {
    return value;
  }

  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseJsonValue<T>(value: string | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

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
    console.error("Private analytics store error:", error);
    return fallback();
  }
}

function getContentCountKey(kind: ContentKind) {
  return `${CONTENT_CLICK_COUNTS_PREFIX}:${kind}`;
}

function getContentMetaKey(kind: ContentKind) {
  return `${CONTENT_CLICK_META_PREFIX}:${kind}`;
}

function sortByCount<T extends { count: number; lastClickedAt?: number; lastViewedAt?: number; lastAskedAt?: number }>(
  items: T[]
) {
  return items.sort((left, right) => {
    const countDifference = right.count - left.count;
    if (countDifference !== 0) {
      return countDifference;
    }

    const rightTimestamp =
      right.lastClickedAt || right.lastViewedAt || right.lastAskedAt || 0;
    const leftTimestamp =
      left.lastClickedAt || left.lastViewedAt || left.lastAskedAt || 0;

    return rightTimestamp - leftTimestamp;
  });
}

export async function logPageView(path: string) {
  const normalizedPath = normalizePath(path);
  if (!normalizedPath) {
    return;
  }

  const now = Date.now();

  await withFallback(
    redis
      ? async () => {
          await redis.hincrby(PAGE_VIEW_COUNTS_KEY, normalizedPath, 1);
          await redis.hset(PAGE_VIEW_META_KEY, {
            [normalizedPath]: JSON.stringify({ lastViewedAt: now }),
          });
        }
      : null,
    () => {
      const current = memoryPageViews.get(normalizedPath);
      memoryPageViews.set(normalizedPath, {
        path: normalizedPath,
        count: (current?.count || 0) + 1,
        lastViewedAt: now,
      });
    }
  );
}

export async function getTopPageViews(limit = 6) {
  return withFallback(
    redis
      ? async () => {
          const counts =
            (await redis.hgetall<Record<string, number | string>>(
              PAGE_VIEW_COUNTS_KEY
            )) || {};
          const meta =
            (await redis.hgetall<Record<string, string>>(PAGE_VIEW_META_KEY)) ||
            {};

          return sortByCount(
            Object.entries(counts).map(([path, count]) => {
              const metaEntry = parseJsonValue<{ lastViewedAt?: number }>(
                meta[path],
                {}
              );

              return {
                path,
                count: toNumber(count),
                lastViewedAt: metaEntry.lastViewedAt || 0,
              };
            })
          ).slice(0, limit);
        }
      : null,
    () => sortByCount([...memoryPageViews.values()]).slice(0, limit)
  );
}

export async function logContentClick(params: {
  kind: ContentKind;
  slug: string;
  label: string;
  href: string;
}) {
  const slug = params.slug.trim().slice(0, 120);
  const label = params.label.trim().slice(0, 180);
  const href = params.href.trim().slice(0, 180);

  if (!slug || !label || !href.startsWith("/")) {
    return;
  }

  const now = Date.now();

  await withFallback(
    redis
      ? async () => {
          await redis.hincrby(getContentCountKey(params.kind), slug, 1);
          await redis.hset(getContentMetaKey(params.kind), {
            [slug]: JSON.stringify({
              label,
              href,
              lastClickedAt: now,
            }),
          });
        }
      : null,
    () => {
      const bucket = memoryContentClicks[params.kind];
      const current = bucket.get(slug);
      bucket.set(slug, {
        slug,
        label,
        href,
        count: (current?.count || 0) + 1,
        lastClickedAt: now,
      });
    }
  );
}

export async function getTopContentClicks(kind: ContentKind, limit = 6) {
  return withFallback(
    redis
      ? async () => {
          const counts =
            (await redis.hgetall<Record<string, number | string>>(
              getContentCountKey(kind)
            )) || {};
          const meta =
            (await redis.hgetall<Record<string, string>>(
              getContentMetaKey(kind)
            )) || {};

          return sortByCount(
            Object.entries(counts).map(([slug, count]) => {
              const metaEntry = parseJsonValue<{
                label?: string;
                href?: string;
                lastClickedAt?: number;
              }>(meta[slug], {});

              return {
                slug,
                label: metaEntry.label || slug,
                href: metaEntry.href || "/",
                count: toNumber(count),
                lastClickedAt: metaEntry.lastClickedAt || 0,
              };
            })
          ).slice(0, limit);
        }
      : null,
    () => sortByCount([...memoryContentClicks[kind].values()]).slice(0, limit)
  );
}

export async function logFaqQuestionStat(
  question: string,
  language: "vi" | "en",
  intent: AiIntent
) {
  const normalizedKey = normalizeQuestionKey(question);
  if (!normalizedKey) {
    return;
  }

  const displayQuestion = question.trim().replace(/\s+/g, " ").slice(0, 180);
  const now = Date.now();

  await withFallback(
    redis
      ? async () => {
          await redis.hincrby(FAQ_QUESTION_COUNTS_KEY, normalizedKey, 1);
          await redis.hset(FAQ_QUESTION_META_KEY, {
            [normalizedKey]: JSON.stringify({
              question: displayQuestion,
              language,
              intent,
              lastAskedAt: now,
            }),
          });
        }
      : null,
    () => {
      const current = memoryFaqQuestions.get(normalizedKey);
      memoryFaqQuestions.set(normalizedKey, {
        question: displayQuestion,
        count: (current?.count || 0) + 1,
        lastAskedAt: now,
        intent,
        language,
      });

      if (memoryFaqQuestions.size <= MAX_TRACKED_FAQ_QUESTIONS) {
        return;
      }

      const oldestEntry = [...memoryFaqQuestions.entries()].sort(
        (left, right) => left[1].lastAskedAt - right[1].lastAskedAt
      )[0];

      if (oldestEntry) {
        memoryFaqQuestions.delete(oldestEntry[0]);
      }
    }
  );
}

export async function getTopFaqQuestionStats(limit = 6) {
  return withFallback(
    redis
      ? async () => {
          const counts =
            (await redis.hgetall<Record<string, number | string>>(
              FAQ_QUESTION_COUNTS_KEY
            )) || {};
          const meta =
            (await redis.hgetall<Record<string, string>>(
              FAQ_QUESTION_META_KEY
            )) || {};

          return sortByCount(
            Object.entries(counts).map(([key, count]) => {
              const metaEntry = parseJsonValue<{
                question?: string;
                language?: "vi" | "en";
                intent?: AiIntent;
                lastAskedAt?: number;
              }>(meta[key], {});

              return {
                question: metaEntry.question || key,
                count: toNumber(count),
                lastAskedAt: metaEntry.lastAskedAt || 0,
                intent: metaEntry.intent || "general",
                language: metaEntry.language || "vi",
              };
            })
          ).slice(0, limit);
        }
      : null,
    () => sortByCount([...memoryFaqQuestions.values()]).slice(0, limit)
  );
}
