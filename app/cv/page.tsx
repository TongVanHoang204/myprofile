"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageWrapper from "@/app/components/PageWrapper";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  Briefcase,
  CheckCircle2,
  Code2,
  Coffee,
  Download,
  Github,
  GraduationCap,
  Heart,
  Mail,
  Phone,
  Plane,
  Sandwich,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type QuickInfoItem = {
  label: string;
  value: string;
  icon: "mail" | "phone" | "github";
};

type CVData = {
  profile: {
    name: string;
    role: string;
    tag: string;
    summary: string;
  };
  download_btn: string;
  skills_title: string;
  tech_stack: string[];
  strengths_title: string;
  strengths: string[];
  quick_info_title: string;
  quick_info: QuickInfoItem[];
  main_content: {
    about_title: string;
    about_content: string;
    education_title: string;
    education: Array<{
      title: string;
      school: string;
      meta: string;
      description: string;
    }>;
    experience_title: string;
    experience: Array<{
      title: string;
      company: string;
      time: string;
      desc: string[];
    }>;
    technical_title: string;
    technical_groups: Array<{
      label: string;
      items: string[];
    }>;
  };
};

const quickIconMap: Record<QuickInfoItem["icon"], LucideIcon> = {
  mail: Mail,
  phone: Phone,
  github: Github,
};

export default function CVPage() {
  const { dict, language } = useLanguage();
  const cv = dict.cv as CVData;
  const content = cv.main_content;
  const avatarUrl = "/profile/tong-van-hoang-avatar.jpg";
  const strengthsTitle = language === "vi" ? "Điểm Mạnh" : "Strengths";
  const strengths =
    language === "vi"
      ? [
          "Tư duy logic tốt",
          "Khả năng tự học cao",
          "Làm việc nhóm hiệu quả",
        ]
      : [
          "Strong logical thinking",
          "Fast self-learning ability",
          "Work well in teams",
        ];
  const interests =
    language === "vi"
      ? [
          { label: "Du lịch", icon: Plane },
          { label: "Coffee chill", icon: Coffee },
          { label: "Ăn vặt", icon: Sandwich },
          { label: "Coding", icon: Code2 },
        ]
      : [
          { label: "Travel", icon: Plane },
          { label: "Coffee chill", icon: Coffee },
          { label: "Snack", icon: Sandwich },
          { label: "Coding", icon: Code2 },
        ];

  return (
    <PageWrapper>
      <div className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-24 md:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:col-span-4"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-sky-500/30 bg-slate-100 dark:bg-slate-800 sm:h-24 sm:w-24">
                  <Image
                    src={avatarUrl}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
                    CV
                  </p>
                  <h1 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                    {cv.profile.name}
                  </h1>
                  <p className="text-sm font-medium text-sky-500">
                    {cv.profile.role}
                  </p>
                </div>
              </div>

              <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {cv.profile.tag}
              </span>

              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {cv.profile.summary}
              </p>

              <a
                href="/api/cv-download"
                download="tong-van-hoang-cv.pdf"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 font-bold text-white shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400 sm:rounded-2xl"
              >
                <Download size={18} />
                {cv.download_btn}
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
              <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                <Code2 className="text-purple-500" size={18} />
                {cv.skills_title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cv.tech_stack.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
              <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                <Sparkles className="text-amber-500" size={18} />
                {strengthsTitle}
              </h2>
              <ul className="space-y-3">
                {strengths.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
              <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                <Heart className="text-pink-500" size={18} />
                {language === "vi" ? "Sở thích" : "Interests"}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100/80 px-3 py-4 text-center dark:border-slate-800 dark:bg-slate-950/50"
                  >
                    <Icon className="h-5 w-5 text-slate-500 dark:text-slate-300" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
              <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                <Mail className="text-emerald-500" size={18} />
                {cv.quick_info_title}
              </h2>
              <div className="space-y-4">
                {cv.quick_info.map((item) => {
                  const Icon = quickIconMap[item.icon];
                  return (
                    <div
                      key={`${item.label}-${item.value}`}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                    >
                      <div className="rounded-xl bg-white p-2 text-sky-500 dark:bg-slate-800">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 lg:col-span-8"
          >
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                {content.about_title}
              </h2>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:leading-8">
                {content.about_content}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                <GraduationCap className="text-sky-500" size={20} />
                {content.education_title}
              </h2>
              <div className="grid gap-4">
                {content.education.map((item) => (
                  <div
                    key={`${item.title}-${item.school}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/40"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                        {item.title}
                      </h3>
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
                        {item.meta}
                      </span>
                    </div>
                    <p className="mt-2 font-medium text-slate-700 dark:text-slate-300">
                      {item.school}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <h2 className="mb-8 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                <Briefcase className="text-blue-500" size={20} />
                {content.experience_title}
              </h2>

              <div className="space-y-8">
                {content.experience.map((item) => (
                  <div
                    key={`${item.title}-${item.company}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/40"
                  >
                    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-sm font-semibold text-sky-500">
                          {item.company}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.time}
                      </span>
                    </div>
                    <ul className="space-y-2 pl-5 text-sm leading-7 text-slate-600 marker:text-sky-500 dark:text-slate-300">
                      {item.desc.map((detail) => (
                        <li key={detail} className="list-disc">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                <Code2 className="text-violet-500" size={20} />
                {content.technical_title}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {content.technical_groups.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/40"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                      {group.label}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </PageWrapper>
  );
}
