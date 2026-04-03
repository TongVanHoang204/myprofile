import { NextRequest, NextResponse } from "next/server";
import { REQUEST_TOKEN_COOKIE } from "@/app/lib/request-security-config";

const REQUEST_TOKEN_PATTERN = /^[a-f0-9]{32}$/i;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function createRequestToken() {
  return crypto.randomUUID().replace(/-/g, "");
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const currentToken = request.cookies.get(REQUEST_TOKEN_COOKIE)?.value || "";

  if (!REQUEST_TOKEN_PATTERN.test(currentToken)) {
    response.cookies.set({
      name: REQUEST_TOKEN_COOKIE,
      value: createRequestToken(),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE_SECONDS,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.[^/]+$).*)"],
};
