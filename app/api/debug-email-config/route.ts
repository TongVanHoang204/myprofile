import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = {
    SMTP_HOST: process.env.SMTP_HOST ? "✓ SET" : "✗ MISSING",
    SMTP_PORT: process.env.SMTP_PORT ? "✓ SET" : "✗ MISSING",
    SMTP_USER: process.env.SMTP_USER ? "✓ SET" : "✗ MISSING",
    SMTP_PASS: process.env.SMTP_PASS ? "✓ SET" : "✗ MISSING (OK if using OAuth2)",
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL ? "✓ SET" : "✗ MISSING",
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL ? "✓ SET" : "✗ MISSING",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "✓ SET" : "✗ MISSING",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "✓ SET" : "✗ MISSING",
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN ? "✓ SET" : "✗ MISSING",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "✓ SET" : "✗ MISSING",
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL ? "✓ SET" : "✗ MISSING",
  };

  const isOAuth2Ready = Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );

  const isSmtpReady = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.CONTACT_TO_EMAIL &&
    (process.env.SMTP_PASS || isOAuth2Ready)
  );

  const isResendReady = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_FROM_EMAIL &&
    process.env.CONTACT_TO_EMAIL
  );

  return NextResponse.json({
    env_variables: config,
    status: {
      oauth2_ready: isOAuth2Ready,
      smtp_ready: isSmtpReady,
      resend_ready: isResendReady,
      will_send_via: isSmtpReady ? "SMTP (Gmail OAuth2)" : isResendReady ? "Resend" : "NONE - will fail",
    },
  });
}
