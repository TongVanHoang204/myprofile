type ContactFeedbackDictionary = {
  send_error: string;
  config_error: string;
};

const GENERIC_CONFIG_ERROR = "Email service is not configured yet.";
const TEMPORARY_UNAVAILABLE = "Email service is temporarily unavailable.";

export function getContactErrorMessage(
  error: string | undefined,
  dict: ContactFeedbackDictionary
) {
  if (!error) {
    return dict.send_error;
  }

  if (
    error.startsWith(GENERIC_CONFIG_ERROR) ||
    error.startsWith(TEMPORARY_UNAVAILABLE)
  ) {
    return dict.config_error;
  }

  return error;
}
