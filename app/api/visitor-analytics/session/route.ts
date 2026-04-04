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
  createOwnerSessionValue,
  getVisitorId,
  isOwnerAnalyticsConfigured,
  matchesOwnerAccessKey,
} from "@/app/lib/owner-analytics";
import {
  OWNER_ANALYTICS_COOKIE,
  OWNER_ANALYTICS_SESSION_MAX_AGE,
} from "@/app/lib/visitor-analytics-config";
import { removeUniqueVisitor } from "@/app/lib/visitor-analytics-store";

const MAX_REQUESTS_PER_WINDOW = 8;
const WINDOW_MS = 10 * 60 * 1000;

type SessionBody = {
  accessKey?: string;
};

function clearOwnerCookie(response: NextResponse) {
  response.cookies.set({
    name: OWNER_ANALYTICS_COOKIE,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}

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

    if (!isOwnerAnalyticsConfigured()) {
      return NextResponse.json(
        { error: "Owner analytics is not configured." },
        { status: 503 }
      );
    }

    const ip = getClientIp(request);
    if (
      consumeRateLimit(
        `owner-analytics-session:${ip}`,
        MAX_REQUESTS_PER_WINDOW,
        WINDOW_MS
      )
    ) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as SessionBody;
    const accessKey = body.accessKey?.trim() || "";

    if (!accessKey || accessKey.length > 200) {
      return NextResponse.json(
        { error: "Access key is invalid." },
        { status: 400 }
      );
    }

    if (!matchesOwnerAccessKey(accessKey)) {
      return NextResponse.json(
        { error: "Access key is incorrect." },
        { status: 401 }
      );
    }

    const visitorId = getVisitorId(request);
    if (visitorId) {
      await removeUniqueVisitor(visitorId);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: OWNER_ANALYTICS_COOKIE,
      value: createOwnerSessionValue(),
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: OWNER_ANALYTICS_SESSION_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Owner analytics session error:", error);
    return NextResponse.json(
      { error: "Could not enable owner mode right now." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (
    !isSameOriginRequest(request) ||
    !hasAllowedFetchMetadata(request) ||
    !hasValidProtectionToken(request)
  ) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const response = NextResponse.json({ success: true });
  clearOwnerCookie(response);
  return response;
}
