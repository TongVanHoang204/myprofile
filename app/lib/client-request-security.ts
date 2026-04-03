"use client";

import {
  REQUEST_TOKEN_COOKIE,
  REQUEST_TOKEN_HEADER,
} from "@/app/lib/request-security-config";

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
}

export function buildProtectedHeaders(init?: HeadersInit) {
  const headers = new Headers(init);
  const token = getCookieValue(REQUEST_TOKEN_COOKIE);

  if (token) {
    headers.set(REQUEST_TOKEN_HEADER, token);
  }

  return headers;
}
