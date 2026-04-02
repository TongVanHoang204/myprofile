"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useLanguage } from "@/app/context/LanguageContext";
import { contactInfo, socialLinks } from "@/app/data/contact";
import { getContactErrorMessage } from "@/app/lib/contact-form-feedback";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

export default function ContactSection() {
  const { dict } = useLanguage();
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    const newErrors = {
      name: !trimmedName,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail),
      message: !trimmedMessage,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          company: formState.company,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setSubmitError(getContactErrorMessage(payload.error, dict.contact));
        return;
      }

      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "", company: "" });

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0ea5e9", "#a855f7", "#ec4899"],
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setSubmitError(dict.contact.network_error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-2 inline-block bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-sky-400 dark:to-purple-500 sm:text-3xl"
          >
            {dict.contact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400"
          >
            {dict.contact.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                {dict.contact.info_title}
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 p-4 shadow-sm transition-colors hover:border-sky-500/50 dark:border-slate-800 dark:bg-slate-900/50">
                  <span className="rounded-lg bg-sky-100 p-2 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span>{contactInfo.email}</span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 p-4 shadow-sm transition-colors hover:border-sky-500/50 dark:border-slate-800 dark:bg-slate-900/50">
                  <span className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <span>{contactInfo.phone}</span>
                </div>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                  {dict.contact.social_title}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 shadow-sm transition-all hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-sky-500"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d={social.iconPath} />
                      </svg>
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="animate-gradient-xy absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 opacity-75 blur-sm" />

            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:p-8"
            >
              <input
                type="text"
                name="company"
                value={formState.company}
                onChange={handleChange}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="mb-6 space-y-2">
                <label
                  htmlFor="name"
                  className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.name_label}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl border p-3 outline-none ring-2 transition-all ${
                    errors.name
                      ? "border-red-500 bg-red-50 ring-red-500 dark:bg-red-900/10"
                      : "border-slate-200 bg-slate-50 ring-transparent hover:bg-slate-100 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                  }`}
                  placeholder={dict.contact.name_label}
                />
              </div>

              <div className="mb-6 space-y-2">
                <label
                  htmlFor="email"
                  className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.email_label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl border p-3 outline-none ring-2 transition-all ${
                    errors.email
                      ? "border-red-500 bg-red-50 ring-red-500 dark:bg-red-900/10"
                      : "border-slate-200 bg-slate-50 ring-transparent hover:bg-slate-100 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                  }`}
                  placeholder={dict.contact.email_label}
                />
              </div>

              <div className="mb-4 space-y-2">
                <label
                  htmlFor="message"
                  className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  {dict.contact.message_label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full resize-none rounded-xl border p-3 outline-none ring-2 transition-all ${
                    errors.message
                      ? "border-red-500 bg-red-50 ring-red-500 dark:bg-red-900/10"
                      : "border-slate-200 bg-slate-50 ring-transparent hover:bg-slate-100 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                  }`}
                  placeholder={dict.contact.message_label}
                />
              </div>

              {submitError && (
                <p className="mb-4 text-sm text-red-500">{submitError}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? dict.contact.sending : dict.contact.send_btn}
              </motion.button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute left-1/2 top-1/2 z-20 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-xl border border-green-500 bg-white p-4 text-center shadow-2xl dark:bg-slate-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-900/30">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {dict.contact.success_title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {dict.contact.success_msg}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
