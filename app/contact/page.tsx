"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { contactInfo, socialLinks } from "@/app/data/contact";
import { useLanguage } from "@/app/context/LanguageContext";
import { getContactErrorMessage } from "@/app/lib/contact-form-feedback";
import ContactSuccessPopup from "@/app/components/ContactSuccessPopup";
import { buildProtectedHeaders } from "@/app/lib/client-request-security";
import { useContactCooldown } from "@/app/hooks/useContactCooldown";

type ContactForm = {
  name: string;
  email: string;
  message: string;
  company: string;
};

export default function ContactPage() {
  const { dict, language } = useLanguage();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorToast, setErrorToast] = useState("");
  const { isCoolingDown, remainingLabel, applyCooldown } =
    useContactCooldown(language);

  const cooldownHint = useMemo(() => {
    if (!isCoolingDown) {
      return "";
    }

    return language === "vi"
      ? `Bạn có thể gửi lại sau ${remainingLabel}.`
      : `You can send another message in ${remainingLabel}.`;
  }, [isCoolingDown, language, remainingLabel]);

  const showErrorToast = (message: string) => {
    setErrorToast(message);
    setTimeout(() => setErrorToast(""), 4000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      showErrorToast(dict.contact.name_required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      showErrorToast(dict.contact.email_invalid);
      return;
    }
    if (!trimmedMessage) {
      showErrorToast(dict.contact.message_required);
      return;
    }
    if (isCoolingDown) {
      showErrorToast(cooldownHint);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: buildProtectedHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          company: formData.company,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        retryAfterSeconds?: number;
        cooldownSeconds?: number;
      };

      if (!response.ok) {
        showErrorToast(getContactErrorMessage(payload, dict.contact, language));
        if (payload.retryAfterSeconds) {
          applyCooldown(payload.retryAfterSeconds);
        }
        return;
      }

      if (payload.cooldownSeconds) {
        applyCooldown(payload.cooldownSeconds);
      }
      setShowSuccessPopup(true);
      setFormData({ name: "", email: "", message: "", company: "" });
    } catch {
      showErrorToast(dict.contact.network_error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-22 sm:gap-12 sm:pt-28 md:grid-cols-[1fr,1.25fr]">
      <ContactSuccessPopup
        open={showSuccessPopup}
        title={dict.contact.success_title}
        message={dict.contact.success_msg}
        onClose={() => setShowSuccessPopup(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{
          opacity: errorToast ? 1 : 0,
          y: errorToast ? 0 : -20,
          pointerEvents: errorToast ? "auto" : "none",
        }}
        className="fixed left-4 right-4 top-18 z-50 flex items-center gap-3 rounded-xl border border-white/10 bg-red-500/90 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:left-auto sm:right-4 sm:top-24 sm:px-5 sm:py-4"
      >
        <span className="text-sm font-semibold">{errorToast}</span>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 sm:space-y-8"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
            Portfolio
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            {dict.contact.title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 sm:space-y-6">
          <div className="group flex items-start gap-4 rounded-2xl border border-transparent bg-slate-100/70 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50">
            <div className="rounded-full bg-white p-3 text-sky-500 transition-colors dark:bg-slate-800">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase text-slate-500">Email</p>
              <p className="break-all font-medium tracking-wide text-slate-900 dark:text-slate-100">
                {contactInfo.email}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 rounded-2xl border border-transparent bg-slate-100/70 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50">
            <div className="rounded-full bg-white p-3 text-purple-500 transition-colors dark:bg-slate-800">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase text-slate-500">
                Điện thoại
              </p>
              <p className="font-medium tracking-wide text-slate-900 dark:text-slate-100">
                {contactInfo.phone}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 rounded-2xl border border-transparent bg-slate-100/70 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50">
            <div className="rounded-full bg-white p-3 text-slate-700 transition-colors dark:bg-slate-800 dark:text-slate-100">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.03c-3.34.73-4.03-1.42-4.03-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.06 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.39 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.4 11.4 0 0112 6.8c1.02 0 2.05.14 3 .41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.83 1.24 1.91 1.24 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.11.82 2.23v3.3c0 .32.19.69.8.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase text-slate-500">GitHub</p>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-medium text-slate-900 hover:text-sky-500 dark:text-slate-100 dark:hover:text-sky-400"
              >
                {contactInfo.github.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>

        {socialLinks.length > 0 && (
          <div className="pt-4">
            <p className="mb-4 text-xs font-bold uppercase text-slate-500">
              {dict.contact.social_title}
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:text-sky-400 hover:shadow-lg hover:shadow-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d={link.iconPath} />
                  </svg>
                <span className="pointer-events-none absolute -top-8 left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
          </div>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-sky-500 via-purple-500 to-fuchsia-500 opacity-30 blur-2xl" />

        <form
          onSubmit={handleSubmit}
          className="relative space-y-5 rounded-[2rem] border border-white/5 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-xl sm:space-y-6 sm:p-8"
        >
          <h2 className="mb-6 text-lg font-bold text-slate-50 sm:text-xl">
            {dict.contact.send_btn}
          </h2>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-5 sm:space-y-6">
            {[
              { key: "name", label: dict.contact.name_label, type: "text" },
              { key: "email", label: dict.contact.email_label, type: "email" },
            ].map((field) => (
              <div key={field.key} className="group relative">
                <label
                  htmlFor={field.key}
                  className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    focusedField === field.key ||
                    formData[field.key as keyof ContactForm]
                      ? "-top-2.5 bg-slate-900 px-2 text-xs text-sky-400"
                      : "top-3.5 text-sm text-slate-400"
                  }`}
                >
                  {field.label}
                </label>
                <input
                  id={field.key}
                  type={field.type}
                  value={formData[field.key as keyof ContactForm]}
                  onFocus={() => setFocusedField(field.key)}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3.5 text-sm text-slate-100 shadow-inner outline-none transition-all focus:border-sky-400 focus:bg-slate-900/80"
                />
              </div>
            ))}

            <div className="group relative">
              <label
                htmlFor="message"
                className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                  focusedField === "message" || formData.message
                    ? "-top-2.5 bg-slate-900 px-2 text-xs text-sky-400"
                    : "top-3.5 text-sm text-slate-400"
                }`}
              >
                {dict.contact.message_label}
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3.5 text-sm text-slate-100 shadow-inner outline-none transition-all focus:border-sky-400 focus:bg-slate-900/80"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || isCoolingDown}
            className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? dict.contact.sending
              : isCoolingDown
                ? cooldownHint
                : dict.contact.send_btn}
          </motion.button>
          {isCoolingDown ? (
            <p className="text-center text-xs text-slate-400">{cooldownHint}</p>
          ) : null}
        </form>
      </motion.section>
    </div>
  );
}
