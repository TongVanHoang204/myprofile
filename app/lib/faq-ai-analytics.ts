import type { AiIntent } from "@/app/lib/faq-ai-types";

type QuestionStat = {
  count: number;
  lastAskedAt: number;
  intent: AiIntent;
  language: "vi" | "en";
};

const questionStats = new Map<string, QuestionStat>();
const MAX_TRACKED_QUESTIONS = 100;

function normalizeQuestion(question: string) {
  return question.trim().toLowerCase().slice(0, 180);
}

export function logFaqQuestion(
  question: string,
  language: "vi" | "en",
  intent: AiIntent
) {
  const key = normalizeQuestion(question);
  if (!key) {
    return;
  }

  const current = questionStats.get(key);
  const nextEntry: QuestionStat = {
    count: (current?.count || 0) + 1,
    lastAskedAt: Date.now(),
    intent,
    language,
  };

  questionStats.set(key, nextEntry);

  if (questionStats.size <= MAX_TRACKED_QUESTIONS) {
    return;
  }

  const oldestEntry = [...questionStats.entries()].sort(
    (a, b) => a[1].lastAskedAt - b[1].lastAskedAt
  )[0];

  if (oldestEntry) {
    questionStats.delete(oldestEntry[0]);
  }
}

export function getTopFaqQuestions(limit = 5) {
  return [...questionStats.entries()]
    .sort((a, b) => b[1].count - a[1].count || b[1].lastAskedAt - a[1].lastAskedAt)
    .slice(0, limit)
    .map(([question, stat]) => ({
      question,
      ...stat,
    }));
}
