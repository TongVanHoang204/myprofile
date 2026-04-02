import nodemailer from "nodemailer";

export type ContactMailInput = {
  name: string;
  email: string;
  message: string;
};

export class ContactMailConfigError extends Error {
  constructor(message = "Email service is not configured yet.") {
    super(message);
    this.name = "ContactMailConfigError";
  }
}

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

type ResendConfig = {
  apiKey: string;
  from: string;
  to: string;
};

type ConfigCandidate<TConfig> = {
  config: TConfig | null;
  hasAny: boolean;
  missing: string[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSmtpCandidate(): ConfigCandidate<SmtpConfig> {
  const host = process.env.SMTP_HOST?.trim() || "";
  const portRaw = process.env.SMTP_PORT?.trim() || "465";
  const user = process.env.SMTP_USER?.trim() || "";
  const pass = process.env.SMTP_PASS?.trim() || "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "";
  const from =
    process.env.SMTP_FROM_EMAIL?.trim() ||
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    user ||
    "";

  const hasAny = Boolean(
    host ||
      process.env.SMTP_PORT?.trim() ||
      user ||
      pass ||
      process.env.SMTP_FROM_EMAIL?.trim() ||
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      to
  );

  if (!hasAny) {
    return { config: null, hasAny: false, missing: [] };
  }

  const missing: string[] = [];
  const port = Number.parseInt(portRaw, 10);

  if (!host) {
    missing.push("SMTP_HOST");
  }
  if (!Number.isInteger(port) || port <= 0) {
    missing.push("SMTP_PORT");
  }
  if (!user) {
    missing.push("SMTP_USER");
  }
  if (!pass) {
    missing.push("SMTP_PASS");
  }
  if (!from) {
    missing.push("SMTP_FROM_EMAIL");
  }
  if (!to) {
    missing.push("CONTACT_TO_EMAIL");
  }

  if (missing.length > 0) {
    return { config: null, hasAny: true, missing };
  }

  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureRaw === undefined ? port === 465 : secureRaw === "true" || secureRaw === "1";

  return {
    config: {
      host,
      port,
      secure,
      user,
      pass,
      from,
      to,
    },
    hasAny: true,
    missing: [],
  };
}

function getResendCandidate(): ConfigCandidate<ResendConfig> {
  const apiKey = process.env.RESEND_API_KEY?.trim() || "";
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "";
  const hasAny = Boolean(apiKey || from || to);

  if (!hasAny) {
    return { config: null, hasAny: false, missing: [] };
  }

  const missing: string[] = [];

  if (!apiKey) {
    missing.push("RESEND_API_KEY");
  }
  if (!from) {
    missing.push("CONTACT_FROM_EMAIL");
  }
  if (!to) {
    missing.push("CONTACT_TO_EMAIL");
  }

  if (missing.length > 0) {
    return { config: null, hasAny: true, missing };
  }

  return {
    config: { apiKey, from, to },
    hasAny: true,
    missing: [],
  };
}

async function sendViaSmtp(config: SmtpConfig, input: ContactMailInput) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `Portfolio contact: ${input.name}`,
    text: `New message from portfolio\n\nName: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
    html: `
      <h2>New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
    `,
  });
}

async function sendViaResend(config: ResendConfig, input: ContactMailInput) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: `Portfolio contact: ${input.name}`,
      reply_to: input.email,
      text: `New message from portfolio\n\nName: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
      html: `
        <h2>New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(`Resend API error: ${errorPayload}`);
  }
}

export async function sendContactMail(input: ContactMailInput) {
  const smtpCandidate = getSmtpCandidate();
  if (smtpCandidate.config) {
    await sendViaSmtp(smtpCandidate.config, input);
    return;
  }

  const resendCandidate = getResendCandidate();
  if (resendCandidate.config) {
    await sendViaResend(resendCandidate.config, input);
    return;
  }

  if (smtpCandidate.hasAny) {
    throw new ContactMailConfigError(
      `Missing email config: ${smtpCandidate.missing.join(", ")}`
    );
  }

  if (resendCandidate.hasAny) {
    throw new ContactMailConfigError(
      `Missing email config: ${resendCandidate.missing.join(", ")}`
    );
  }

  throw new ContactMailConfigError(
    "Email service is not configured yet. Set SMTP_* or Resend environment variables."
  );
}
