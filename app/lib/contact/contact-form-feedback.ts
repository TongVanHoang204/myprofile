import type { Language } from "@/app/data/dictionaries";

type ContactFeedbackDictionary = {
  send_error: string;
  config_error: string;
};

const GENERIC_CONFIG_ERROR = "Email service is not configured yet.";
const TEMPORARY_UNAVAILABLE = "Email service is temporarily unavailable.";

type ContactResponse =
  | { ok: true; cooldownSeconds: number }
  | { ok: false; error?: string; retryAfterSeconds?: number };

function positiveSeconds(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.ceil(value)
    : undefined;
}

export async function parseContactResponse(response: Response): Promise<ContactResponse> {
  const payload: unknown = await response.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false };
  }

  const data = payload as Record<string, unknown>;
  const cooldownSeconds = positiveSeconds(data.cooldownSeconds);
  // The anti-spam decoy returns success without a cooldown, but does not send mail.
  if (response.ok && data.success === true && cooldownSeconds !== undefined) {
    return { ok: true, cooldownSeconds };
  }

  return {
    ok: false,
    error: typeof data.error === "string" ? data.error : undefined,
    retryAfterSeconds: response.status === 429
      ? positiveSeconds(data.retryAfterSeconds)
      : undefined,
  };
}

function getCooldownMessage(language: Language, retryAfterSeconds: number) {
  const hours = Math.floor(retryAfterSeconds / 3600);
  const minutes = Math.ceil((retryAfterSeconds % 3600) / 60);

  if (language === "vi") {
    if (hours > 0) {
      return minutes > 0
        ? `Bạn vừa gửi tin nhắn. Vui lòng chờ ${hours} giờ ${minutes} phút rồi gửi lại.`
        : `Bạn vừa gửi tin nhắn. Vui lòng chờ ${hours} giờ rồi gửi lại.`;
    }

    return `Bạn vừa gửi tin nhắn. Vui lòng chờ ${Math.max(1, minutes)} phút rồi gửi lại.`;
  }

  if (hours > 0) {
    return minutes > 0
      ? `You have already sent a message. Please wait ${hours}h ${minutes}m before sending another one.`
      : `You have already sent a message. Please wait ${hours}h before sending another one.`;
  }

  return `You have already sent a message. Please wait ${Math.max(1, minutes)}m before sending another one.`;
}

export function getContactErrorMessage(
  payload: { error?: string; retryAfterSeconds?: number } | undefined,
  dict: ContactFeedbackDictionary,
  language: Language
) {
  const error = payload?.error;

  if (!error) {
    return dict.send_error;
  }

  if (error === "CONTACT_COOLDOWN_ACTIVE") {
    return getCooldownMessage(language, payload?.retryAfterSeconds || 0);
  }

  if (
    error.startsWith(GENERIC_CONFIG_ERROR) ||
    error.startsWith(TEMPORARY_UNAVAILABLE)
  ) {
    return dict.config_error;
  }

  return error;
}
