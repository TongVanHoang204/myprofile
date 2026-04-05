"use client";

import { buildProtectedHeaders } from "@/app/lib/client-request-security";

type TrackContentClickParams = {
  kind: "blog" | "project";
  slug: string;
  label: string;
  href: string;
};

export function trackContentClick(params: TrackContentClickParams) {
  const slug = params.slug.trim();
  const label = params.label.trim();
  const href = params.href.trim();

  if (!slug || !label || !href) {
    return;
  }

  void fetch("/api/portfolio-analytics/event", {
    method: "POST",
    keepalive: true,
    headers: buildProtectedHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      kind: params.kind,
      slug,
      label,
      href,
    }),
  }).catch(() => {
    // Analytics should never block navigation or UI behavior.
  });
}
