import { NextRequest, NextResponse } from "next/server";
import {
  ContactMailConfigError,
  sendContactMail,
} from "@/app/lib/contact-mailer";
import {
  consumeRateLimit,
  getClientIp,
  isJsonRequest,
  isSameOriginRequest,
} from "@/app/lib/request-security";

const MAX_REQUESTS_PER_WINDOW = 4;
const WINDOW_MS = 10 * 60 * 1000;

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function validateContactBody(body: ContactBody) {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const company = body.company?.trim() ?? "";

  if (company) {
    return {
      ok: true as const,
      isSpamTrap: true,
      name,
      email,
      message,
    };
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !isEmailValid || !message) {
    return {
      ok: false as const,
      status: 400,
      error: "Invalid input. Please check your details and try again.",
    };
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return {
      ok: false as const,
      status: 400,
      error: "Your message is too long. Please shorten it.",
    };
  }

  return {
    ok: true as const,
    isSpamTrap: false,
    name,
    email,
    message,
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (!isJsonRequest(request)) {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 }
      );
    }

    const ip = getClientIp(request);

    if (consumeRateLimit(`contact:${ip}`, MAX_REQUESTS_PER_WINDOW, WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactBody;
    const parsed = validateContactBody(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { error: parsed.error },
        { status: parsed.status }
      );
    }

    if (parsed.isSpamTrap) {
      return NextResponse.json({ success: true });
    }

    await sendContactMail({
      name: parsed.name,
      email: parsed.email,
      message: parsed.message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ContactMailConfigError) {
      console.error("Contact mail config error:", error.message);
      return NextResponse.json(
        { error: "Email service is temporarily unavailable." },
        { status: 503 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
