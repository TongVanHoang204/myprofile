import { NextRequest, NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientIp,
  hasAllowedFetchMetadata,
  hasValidProtectionToken,
  isJsonRequest,
  isSameOriginRequest,
} from "@/app/lib/request-security";
import {
  hasOwnerSession,
  isBotRequest,
} from "@/app/lib/owner-analytics";
import { logContentClick } from "@/app/lib/private-analytics-store";

const MAX_REQUESTS_PER_WINDOW = 120;
const WINDOW_MS = 10 * 60 * 1000;

type AnalyticsEventBody = {
  kind?: "blog" | "project";
  slug?: string;
  label?: string;
  href?: string;
};

export async function POST(request: NextRequest) {
  try {
    if (
      !isSameOriginRequest(request) ||
      !hasAllowedFetchMetadata(request) ||
      !hasValidProtectionToken(request)
    ) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (!isJsonRequest(request)) {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 }
      );
    }

    const ip = getClientIp(request);
    if (
      consumeRateLimit(`portfolio-analytics-event:${ip}`, MAX_REQUESTS_PER_WINDOW, WINDOW_MS)
    ) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (hasOwnerSession(request) || isBotRequest(request)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const body = (await request.json()) as AnalyticsEventBody;
    const kind = body.kind;
    const slug = body.slug?.trim() || "";
    const label = body.label?.trim() || "";
    const href = body.href?.trim() || "";

    if (!kind || !slug || !label || !href) {
      return NextResponse.json(
        { error: "Invalid analytics event." },
        { status: 400 }
      );
    }

    if (kind !== "blog" && kind !== "project") {
      return NextResponse.json(
        { error: "Unsupported analytics event." },
        { status: 400 }
      );
    }

    await logContentClick({ kind, slug, label, href });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Portfolio analytics event error:", error);
    return NextResponse.json(
      { error: "Could not record analytics event right now." },
      { status: 500 }
    );
  }
}
