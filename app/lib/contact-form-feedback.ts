import type { Language } from "@/app/data/dictionaries";

type ContactFeedbackDictionary = {
  send_error: string;
  config_error: string;
};

const GENERIC_CONFIG_ERROR = "Email service is not configured yet.";
const TEMPORARY_UNAVAILABLE = "Email service is temporarily unavailable.";

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
