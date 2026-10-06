export type AiAudienceMode = "recruiter" | "client";

export type AiIntent =
  | "stack"
  | "project"
  | "ai"
  | "experience"
  | "education"
  | "contact"
  | "blog"
  | "general";

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export type FaqAiSource = {
  id: string;
  label: string;
  href: string;
  kind:
    | "project"
    | "blog"
    | "cv"
    | "faq"
    | "certificate"
    | "about"
    | "contact";
  title: string;
  excerpt: string;
};

export type FaqAiAction = {
  id: string;
  label: string;
  href: string;
  kind: "route" | "download";
  variant: "primary" | "secondary";
};

export type FaqAiMeta = {
  intent: AiIntent;
  mode: AiAudienceMode;
  sources: FaqAiSource[];
  actions: FaqAiAction[];
  suggestions: string[];
  provider?: string;
  model?: string;
};
