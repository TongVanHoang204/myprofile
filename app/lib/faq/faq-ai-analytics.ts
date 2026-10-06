import type { AiIntent } from "@/app/lib/faq/faq-ai-types";
import {
  getTopFaqQuestionStats,
  logFaqQuestionStat,
} from "@/app/lib/analytics/private-analytics-store";

export async function logFaqQuestion(
  question: string,
  language: "vi" | "en",
  intent: AiIntent
) {
  await logFaqQuestionStat(question, language, intent);
}

export async function getTopFaqQuestions(limit = 5) {
  return getTopFaqQuestionStats(limit);
}
