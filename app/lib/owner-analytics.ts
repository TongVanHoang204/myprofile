import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import {
  OWNER_ANALYTICS_COOKIE,
  OWNER_ANALYTICS_KEY_ENV,
  OWNER_ANALYTICS_SESSION_MAX_AGE,
  VISITOR_ANALYTICS_COOKIE,
} from "@/app/lib/visitor-analytics-config";

const VISITOR_ID_PATTERN = /^[a-f0-9]{32}$/i;

function parseCookieHeader(cookieHeader: string) {
  return cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((cookies, entry) => {
      const separatorIndex = entry.indexOf("=");
      if (separatorIndex <= 0) {
        return cookies;
      }

      const key = entry.slice(0, separatorIndex).trim();
      const value = decodeURIComponent(entry.slice(separatorIndex + 1).trim());
      cookies[key] = value;
      return cookies;
    }, {});
}

function getOwnerAccessKey() {
  return process.env[OWNER_ANALYTICS_KEY_ENV]?.trim() || "";
}

function safeEqual(left: string, right: string) {
  if (!left || !right || left.length !== right.length) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(left), Buffer.from(right));
  } catch {
    return false;
  }
}

function signOwnerPayload(payload: string) {
  const accessKey = getOwnerAccessKey();
  if (!accessKey) {
    return "";
  }

  return createHmac("sha256", accessKey).update(payload).digest("base64url");
}

export function isOwnerAnalyticsConfigured() {
  return getOwnerAccessKey().length >= 16;
}

export function matchesOwnerAccessKey(candidate: string) {
  const expected = getOwnerAccessKey();
  return Boolean(expected) && safeEqual(candidate.trim(), expected);
}

export function createOwnerSessionValue() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${signOwnerPayload(issuedAt)}`;
}

export function hasValidOwnerSessionValue(value: string) {
  const [issuedAtRaw, signature = ""] = value.split(".");
  const issuedAt = Number(issuedAtRaw);

  if (!issuedAtRaw || !Number.isFinite(issuedAt) || !signature) {
    return false;
  }

  const sessionAgeMs = Date.now() - issuedAt;
  if (sessionAgeMs < 0 || sessionAgeMs > OWNER_ANALYTICS_SESSION_MAX_AGE * 1000) {
    return false;
  }

  return safeEqual(signature, signOwnerPayload(issuedAtRaw));
}

export function hasOwnerSession(request: Request) {
  const cookies = parseCookieHeader(request.headers.get("cookie") || "");
  const ownerSession = cookies[OWNER_ANALYTICS_COOKIE] || "";
  return hasValidOwnerSessionValue(ownerSession);
}

export function getVisitorId(request: Request) {
  const cookies = parseCookieHeader(request.headers.get("cookie") || "");
  const visitorId = cookies[VISITOR_ANALYTICS_COOKIE] || "";
  return VISITOR_ID_PATTERN.test(visitorId) ? visitorId : "";
}

export function createVisitorId() {
  return randomUUID().replace(/-/g, "");
}

export function isBotRequest(request: Request) {
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  return /bot|crawler|spider|slurp|preview|headless|facebookexternalhit|whatsapp|discordbot|telegrambot/.test(
    userAgent
  );
}
