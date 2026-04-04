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
  createVisitorId,
  getVisitorId,
  hasOwnerSession,
  isBotRequest,
} from "@/app/lib/owner-analytics";
import {
  OWNER_ANALYTICS_COOKIE,
  VISITOR_ANALYTICS_COOKIE,
  VISITOR_ANALYTICS_COOKIE_MAX_AGE,
} from "@/app/lib/visitor-analytics-config";
import {
  addUniqueVisitor,
  getUniqueVisitorCount,
} from "@/app/lib/visitor-analytics-store";

const MAX_REQUESTS_PER_WINDOW = 90;
const WINDOW_MS = 10 * 60 * 1000;

function clearInvalidOwnerCookie(response: NextResponse) {
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

    const ip = getClientIp(request);
    if (
      consumeRateLimit(`visitor-analytics:${ip}`, MAX_REQUESTS_PER_WINDOW, WINDOW_MS)
    ) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (hasOwnerSession(request)) {
      const uniqueVisitors = await getUniqueVisitorCount();
      return NextResponse.json({ owner: true, uniqueVisitors });
    }

    const response = NextResponse.json({ owner: false, counted: false });
    clearInvalidOwnerCookie(response);

    if (isBotRequest(request)) {
      return response;
    }

    if (getVisitorId(request)) {
      return response;
    }

    const visitorId = createVisitorId();
    await addUniqueVisitor(visitorId);
    response.cookies.set({
      name: VISITOR_ANALYTICS_COOKIE,
      value: visitorId,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: VISITOR_ANALYTICS_COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Visitor analytics track error:", error);
    return NextResponse.json(
      { error: "Could not record the visit right now." },
      { status: 500 }
    );
  }
}
