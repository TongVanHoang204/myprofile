import {
  REQUEST_TOKEN_COOKIE,
  REQUEST_TOKEN_HEADER,
} from "@/app/lib/request-security-config";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitEntry>();
const REQUEST_TOKEN_PATTERN = /^[a-f0-9]{32}$/i;

function parseCookieHeader(cookieHeader: string) {
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
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

function getExpectedOrigin(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) {
    return "";
  }

  const proto =
    request.headers.get("x-forwarded-proto") ||
    (host.includes("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${proto}://${host}`;
}

function matchesExpectedOrigin(value: string, expectedOrigin: string) {
  try {
    return new URL(value).origin === expectedOrigin;
  } catch {
    return false;
  }
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (bucket.count >= limit) {
    return true;
  }

  bucket.count += 1;
  return false;
}

export function isSameOriginRequest(request: Request): boolean {
  const expectedOrigin = getExpectedOrigin(request);
  if (!expectedOrigin) {
    return process.env.NODE_ENV !== "production";
  }

  const origin = request.headers.get("origin");
  if (origin) {
    return origin === expectedOrigin;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    return matchesExpectedOrigin(referer, expectedOrigin);
  }

  return process.env.NODE_ENV !== "production";
}

export function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get("content-type") || "";
  return contentType.includes("application/json");
}

export function hasAllowedFetchMetadata(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");

  if (!fetchSite) {
    return true;
  }

  return (
    fetchSite === "same-origin" ||
    fetchSite === "same-site" ||
    fetchSite === "none"
  );
}

export function hasValidProtectionToken(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parseCookieHeader(cookieHeader);
  const cookieToken = cookies[REQUEST_TOKEN_COOKIE] || "";
  const headerToken = request.headers.get(REQUEST_TOKEN_HEADER)?.trim() || "";

  return (
    REQUEST_TOKEN_PATTERN.test(cookieToken) &&
    REQUEST_TOKEN_PATTERN.test(headerToken) &&
    cookieToken === headerToken
  );
}
