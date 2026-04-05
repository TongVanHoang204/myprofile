import { NextRequest, NextResponse } from "next/server";
import {
  hasAllowedFetchMetadata,
  hasValidProtectionToken,
  isSameOriginRequest,
} from "@/app/lib/request-security";
import { hasOwnerSession } from "@/app/lib/owner-analytics";
import { getUniqueVisitorCount } from "@/app/lib/visitor-analytics-store";
import {
  getTopContentClicks,
  getTopFaqQuestionStats,
  getTopPageViews,
} from "@/app/lib/private-analytics-store";

export async function GET(request: NextRequest) {
  try {
    if (
      !isSameOriginRequest(request) ||
      !hasAllowedFetchMetadata(request) ||
      !hasValidProtectionToken(request)
    ) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (!hasOwnerSession(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const [uniqueVisitors, topPages, topBlogClicks, topAiQuestions] =
      await Promise.all([
        getUniqueVisitorCount(),
        getTopPageViews(8),
        getTopContentClicks("blog", 6),
        getTopFaqQuestionStats(6),
      ]);

    return NextResponse.json({
      uniqueVisitors,
      topPages,
      topBlogClicks,
      topAiQuestions,
    });
  } catch (error) {
    console.error("Owner analytics summary error:", error);
    return NextResponse.json(
      { error: "Could not load owner analytics right now." },
      { status: 500 }
    );
  }
}
