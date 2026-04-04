import { blogCopy } from "@/app/data/blog";
import { dictionaries, type Language } from "@/app/data/dictionaries";
import type {
  AiAudienceMode,
  AiIntent,
  ChatHistoryItem,
  FaqAiAction,
  FaqAiSource,
} from "@/app/lib/faq-ai-types";

type PortfolioDoc = FaqAiSource & {
  content: string;
  tags: string[];
};

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  category: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

type CvExperienceItem = {
  title: string;
  company: string;
  desc: string[];
};

type CvEducationItem = {
  title: string;
  school: string;
  meta: string;
  description: string;
};

type CertificateItem = {
  id: string;
  title: string;
  issuer: string;
  desc: string;
  category: string;
  meta: string;
};

type AboutTimelineItem = {
  year: string;
  title: string;
  place: string;
  description: string;
};

type PortfolioDictionary = {
  projects?: {
    items?: ProjectItem[];
  };
  faq?: {
    items?: FaqItem[];
  };
  cv: {
    profile: {
      name: string;
      role: string;
      summary: string;
    };
    tech_stack?: string[];
    main_content: {
      about_content: string;
      experience_title: string;
      experience: CvExperienceItem[];
      education_title: string;
      education: CvEducationItem[];
    };
  };
  certificates?: {
    items?: CertificateItem[];
  };
  about: {
    title: string;
    summary: string;
    skills?: string[];
    timeline?: AboutTimelineItem[];
  };
  contact: {
    title: string;
    subtitle: string;
  };
};

const MAX_HISTORY_ITEMS = 6;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[`*#:/.,!?()[\]{}|"'’“”+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function createDoc(
  language: Language,
  source: Omit<PortfolioDoc, "content" | "tags"> & {
    contentParts: string[];
    tags?: string[];
  }
): PortfolioDoc {
  const tags = source.tags || [];
  return {
    ...source,
    content: source.contentParts.join("\n"),
    tags,
  };
}

function getLanguageDictionary(language: Language): PortfolioDictionary {
  return dictionaries[language] as unknown as PortfolioDictionary;
}

function getProjectDocs(language: Language) {
  const dict = getLanguageDictionary(language);
  const projectItems = dict.projects?.items || [];

  const docs = projectItems.map((item, index) =>
    createDoc(language, {
      id: `project-${index + 1}`,
      label: language === "vi" ? "Dự án" : "Projects",
      href: "/projects",
      kind: "project",
      title: item.title,
      excerpt: item.description,
      tags: [item.category, ...(item.tags || [])],
      contentParts: [item.title, item.description, ...(item.tags || [])],
    })
  );

  docs.push(
    createDoc(language, {
      id: "project-dashboard",
      label: language === "vi" ? "Dự án" : "Projects",
      href: "/projects",
      kind: "project",
      title:
        language === "vi"
          ? "Dashboard quản trị FeShenShop"
          : "FeShenShop Admin Dashboard",
      excerpt:
        language === "vi"
          ? "Dashboard quản trị có AI insight panel, AI tạo coupon, gợi ý phản hồi và viết mô tả sản phẩm."
          : "An admin dashboard with AI insight panels, AI coupon generation, reply suggestions, and product-writing support.",
      tags: ["dashboard", "analytics", "admin", "AI"],
      contentParts: [
        language === "vi"
          ? "Dashboard quản trị của FeShenShop."
          : "FeShenShop admin dashboard.",
        language === "vi"
          ? "Có AI insight cho analytics, tồn kho, khách hàng, đơn hàng, đánh giá và khuyến mãi."
          : "Includes AI insight panels for analytics, inventory, customers, orders, reviews, and coupons.",
        language === "vi"
          ? "Hỗ trợ AI tạo mã giảm giá, gợi ý phản hồi chat và viết mô tả sản phẩm."
          : "Supports AI coupon generation, reply suggestions, and product description writing.",
      ],
    })
  );

  return docs;
}

function getBlogDocs(language: Language) {
  const copy = blogCopy[language];

  return copy.posts.map((post) =>
    createDoc(language, {
      id: `blog-${post.slug}`,
      label: language === "vi" ? "Blog" : "Blog",
      href: `/blog#${post.slug}`,
      kind: "blog",
      title: post.title,
      excerpt: post.excerpt,
      tags: [post.category, ...post.takeaways],
      contentParts: [
        post.title,
        post.excerpt,
        post.focus,
        ...post.takeaways,
        ...post.body,
      ],
    })
  );
}

function getFaqDocs(language: Language) {
  const dict = getLanguageDictionary(language);
  const items = dict.faq?.items || [];

  return items.map((item) =>
    createDoc(language, {
      id: `faq-${item.id}`,
      label: "FAQ",
      href: "/faq",
      kind: "faq",
      title: item.question,
      excerpt: item.answer,
      tags: [item.category],
      contentParts: [item.question, item.answer],
    })
  );
}

function getCvDocs(language: Language) {
  const dict = getLanguageDictionary(language);
  const cv = dict.cv;
  const docs: PortfolioDoc[] = [];

  docs.push(
    createDoc(language, {
      id: "cv-profile",
      label: "CV",
      href: "/cv",
      kind: "cv",
      title: cv.profile.name,
      excerpt: cv.profile.summary,
      tags: [cv.profile.role, ...(cv.tech_stack || [])],
      contentParts: [
        cv.profile.name,
        cv.profile.role,
        cv.profile.summary,
        ...(cv.tech_stack || []),
      ],
    })
  );

  docs.push(
    createDoc(language, {
      id: "cv-experience",
      label: "CV",
      href: "/cv",
      kind: "cv",
      title: cv.main_content.experience_title,
      excerpt: cv.main_content.experience[0]?.company || cv.main_content.experience_title,
      tags: [cv.main_content.experience_title, "experience"],
      contentParts: [
        cv.main_content.about_content,
        ...cv.main_content.experience.flatMap((item) => [
          item.title,
          item.company,
          ...item.desc,
        ]),
      ],
    })
  );

  docs.push(
    createDoc(language, {
      id: "cv-education",
      label: "CV",
      href: "/cv",
      kind: "cv",
      title: cv.main_content.education_title,
      excerpt: cv.main_content.education[0]?.school || cv.main_content.education_title,
      tags: ["education", "HUTECH"],
      contentParts: cv.main_content.education.flatMap((item) => [
        item.title,
        item.school,
        item.meta,
        item.description,
      ]),
    })
  );

  return docs;
}

function getCertificateDocs(language: Language) {
  const dict = getLanguageDictionary(language);
  const items = dict.certificates?.items || [];

  return items.map((item) =>
    createDoc(language, {
      id: `certificate-${item.id}`,
      label: language === "vi" ? "Năng lực" : "Capabilities",
      href: "/certificates",
      kind: "certificate",
      title: item.title,
      excerpt: item.desc,
      tags: [item.category, item.meta, item.issuer],
      contentParts: [item.title, item.issuer, item.desc, item.meta],
    })
  );
}

function getAboutDocs(language: Language) {
  const dict = getLanguageDictionary(language);
  const about = dict.about;

  return [
    createDoc(language, {
      id: "about-summary",
      label: language === "vi" ? "Giới thiệu" : "About",
      href: "/about",
      kind: "about",
      title: about.title,
      excerpt: about.summary,
      tags: about.skills || [],
      contentParts: [
        about.title,
        about.summary,
        ...(about.skills || []),
        ...(about.timeline || []).flatMap((item) => [
          item.year,
          item.title,
          item.place,
          item.description,
        ]),
      ],
    }),
  ];
}

function getContactDoc(language: Language) {
  const dict = getLanguageDictionary(language);
  return createDoc(language, {
    id: "contact-info",
    label: language === "vi" ? "Liên hệ" : "Contact",
    href: "/contact",
    kind: "contact",
    title: dict.contact.title,
    excerpt: dict.contact.subtitle,
    tags: ["contact", "email", "phone"],
    contentParts: [dict.contact.title, dict.contact.subtitle],
  });
}

export function detectAiIntent(question: string): AiIntent {
  const normalized = normalizeText(question);

  const matches = (terms: string[]) =>
    terms.some((term) => normalized.includes(normalizeText(term)));

  if (
    matches([
      "stack",
      "tech",
      "cong nghe",
      "ky nang",
      "frontend",
      "backend",
      "react",
      "node",
      "java",
      "php",
      "mysql",
      "flutter",
    ])
  ) {
    return "stack";
  }

  if (
    matches([
      "project",
      "du an",
      "feshenshop",
      "dashboard",
      "mobile",
      "api",
      "storefront",
    ])
  ) {
    return "project";
  }

  if (
    matches([
      "ai",
      "gemini",
      "chatbot",
      "visual search",
      "prompt",
      "assistant",
      "insight",
    ])
  ) {
    return "ai";
  }

  if (
    matches([
      "intern",
      "thuc tap",
      "experience",
      "kinh nghiem",
      "role",
      "position",
      "work on",
    ])
  ) {
    return "experience";
  }

  if (
    matches([
      "education",
      "hoc van",
      "school",
      "university",
      "hutech",
      "student",
    ])
  ) {
    return "education";
  }

  if (
    matches([
      "contact",
      "email",
      "phone",
      "hire",
      "lien he",
      "connect",
      "talk",
    ])
  ) {
    return "contact";
  }

  if (matches(["blog", "article", "viet", "journal", "ghi chu"])) {
    return "blog";
  }

  return "general";
}

function getIntentBoosts(intent: AiIntent, language: Language) {
  const contactKeyword = language === "vi" ? "liên hệ" : "contact";

  switch (intent) {
    case "stack":
      return ["JavaScript", "TypeScript", "React", "Node.js", "Flutter", "MySQL"];
    case "project":
      return ["FeShenShop", "dashboard", "mobile", "API", "storefront"];
    case "ai":
      return ["AI", "Gemini", "visual search", "assistant", "Prompt AI"];
    case "experience":
      return ["intern", "thực tập", "project", "workflow"];
    case "education":
      return ["HUTECH", "education", "student", "Software Engineering"];
    case "contact":
      return [contactKeyword, "email", "phone"];
    case "blog":
      return ["blog", "article", "notes", "AI Workflow"];
    default:
      return ["portfolio", "FeShenShop", "skills"];
  }
}

function scoreDoc(questionTokens: string[], doc: PortfolioDoc, intent: AiIntent, language: Language) {
  const docTokens = new Set(tokenize(`${doc.title} ${doc.excerpt} ${doc.content} ${doc.tags.join(" ")}`));
  const titleTokens = new Set(tokenize(doc.title));
  const boostTokens = new Set(tokenize(getIntentBoosts(intent, language).join(" ")));

  let score = 0;

  for (const token of questionTokens) {
    if (docTokens.has(token)) {
      score += 3;
    }

    if (titleTokens.has(token)) {
      score += 5;
    }
  }

  for (const token of boostTokens) {
    if (docTokens.has(token)) {
      score += 2;
    }
  }

  if (intent === "contact" && doc.kind === "contact") score += 12;
  if (intent === "education" && (doc.kind === "cv" || doc.kind === "certificate")) score += 10;
  if (intent === "project" && doc.kind === "project") score += 10;
  if (intent === "ai" && (doc.kind === "project" || doc.kind === "blog")) score += 8;
  if (intent === "blog" && doc.kind === "blog") score += 12;
  if (intent === "stack" && (doc.kind === "about" || doc.kind === "cv" || doc.kind === "project")) score += 6;
  if (intent === "experience" && (doc.kind === "cv" || doc.kind === "about" || doc.kind === "project")) score += 7;

  return score;
}

function getFallbackSources(intent: AiIntent, docs: PortfolioDoc[]) {
  const priorities: Record<AiIntent, PortfolioDoc["kind"][]> = {
    stack: ["cv", "about", "project"],
    project: ["project", "cv", "blog"],
    ai: ["blog", "project", "cv"],
    experience: ["cv", "about", "project"],
    education: ["cv", "certificate", "about"],
    contact: ["contact", "cv", "about"],
    blog: ["blog", "project", "about"],
    general: ["about", "project", "cv"],
  };

  const desiredKinds = priorities[intent];
  const picked: PortfolioDoc[] = [];

  for (const kind of desiredKinds) {
    const match = docs.find((doc) => doc.kind === kind && !picked.some((item) => item.id === doc.id));
    if (match) {
      picked.push(match);
    }
  }

  return picked.slice(0, 4);
}

export function getPortfolioContext(question: string, language: Language) {
  const docs = [
    ...getProjectDocs(language),
    ...getBlogDocs(language),
    ...getFaqDocs(language),
    ...getCvDocs(language),
    ...getCertificateDocs(language),
    ...getAboutDocs(language),
    getContactDoc(language),
  ];

  const intent = detectAiIntent(question);
  const questionTokens = tokenize(question);

  const ranked = docs
    .map((doc) => ({
      doc,
      score: scoreDoc(questionTokens, doc, intent, language),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 5)
    .map((entry) => entry.doc);

  const sources = ranked.length > 0 ? ranked : getFallbackSources(intent, docs);

  return { intent, sources };
}

export function sanitizeHistoryItems(
  history: ChatHistoryItem[] | undefined
): ChatHistoryItem[] {
  return (history || [])
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({
      role: (item.role === "assistant" ? "assistant" : "user") as
        | "user"
        | "assistant",
      content: item.content.trim().slice(0, 700),
    }))
    .filter((item) => item.content.length > 0);
}

export function getSuggestedQuestions(language: Language, mode: AiAudienceMode, intent: AiIntent) {
  const viSuggestions: Record<AiAudienceMode, string[]> = {
    recruiter: [
      "Stack chính của bạn là gì?",
      "Bạn đã tích hợp AI vào FeShenShop như thế nào?",
      "Bạn đang phụ trách phần backend nào?",
      "Vì sao recruiter nên xem phần blog của bạn?",
    ],
    client: [
      "Bạn có thể làm website theo stack nào?",
      "FeShenShop có gì nổi bật về AI?",
      "Bạn có kinh nghiệm làm mobile app không?",
      "Tôi nên xem trang nào để hiểu nhanh về bạn?",
    ],
  };

  const enSuggestions: Record<AiAudienceMode, string[]> = {
    recruiter: [
      "What is your core stack?",
      "How did you integrate AI into FeShenShop?",
      "What backend work did you handle directly?",
      "Why should a recruiter read your blog notes?",
    ],
    client: [
      "What kind of website stack can you build with?",
      "What AI features did you add to FeShenShop?",
      "Do you have mobile app experience too?",
      "Which page should I open first to understand your work quickly?",
    ],
  };

  const suggestions = language === "vi" ? viSuggestions : enSuggestions;

  if (intent === "contact") {
    return language === "vi"
      ? [
          "Làm sao để liên hệ nhanh với bạn?",
          "Tôi nên gửi nội dung gì qua form liên hệ?",
          "Tôi có thể xem CV ở đâu?",
        ]
      : [
          "What is the fastest way to contact you?",
          "What should I include in the contact form?",
          "Where can I download your resume?",
        ];
  }

  if (intent === "education") {
    return language === "vi"
      ? [
          "Bạn đang học ở đâu?",
          "Bạn đang thực tập và phát triển theo hướng nào?",
          "Phần học vấn có điểm gì liên quan đến web?",
        ]
      : [
          "Where are you studying now?",
          "What direction are you developing during your internship?",
          "How does your education connect to web development?",
        ];
  }

  return suggestions[mode];
}

export function getActionCards(
  language: Language,
  intent: AiIntent,
  sources: FaqAiSource[]
): FaqAiAction[] {
  const labels =
    language === "vi"
      ? {
          projects: "Xem dự án",
          contact: "Mở trang liên hệ",
          downloadCv: "Tải CV PDF",
          readBlog: "Xem blog",
          capabilities: "Xem năng lực",
          viewCv: "Mở trang CV",
        }
      : {
          projects: "View projects",
          contact: "Open contact page",
          downloadCv: "Download resume",
          readBlog: "Open blog",
          capabilities: "View capabilities",
          viewCv: "Open resume page",
        };

  const baseActions: FaqAiAction[] = [];

  if (intent === "contact") {
    baseActions.push(
      {
        id: "contact-page",
        label: labels.contact,
        href: "/contact",
        kind: "route",
        variant: "primary",
      },
      {
        id: "download-cv",
        label: labels.downloadCv,
        href: "/api/cv-download",
        kind: "download",
        variant: "secondary",
      }
    );
  } else if (intent === "blog" || intent === "ai") {
    baseActions.push(
      {
        id: "blog-page",
        label: labels.readBlog,
        href: "/blog",
        kind: "route",
        variant: "primary",
      },
      {
        id: "projects-page",
        label: labels.projects,
        href: "/projects",
        kind: "route",
        variant: "secondary",
      }
    );
  } else if (intent === "education") {
    baseActions.push(
      {
        id: "resume-page",
        label: labels.viewCv,
        href: "/cv",
        kind: "route",
        variant: "primary",
      },
      {
        id: "capabilities-page",
        label: labels.capabilities,
        href: "/certificates",
        kind: "route",
        variant: "secondary",
      }
    );
  } else {
    baseActions.push(
      {
        id: "projects-page",
        label: labels.projects,
        href: "/projects",
        kind: "route",
        variant: "primary",
      },
      {
        id: "contact-page",
        label: labels.contact,
        href: "/contact",
        kind: "route",
        variant: "secondary",
      }
    );
  }

  for (const source of sources) {
    if (baseActions.some((item) => item.href === source.href)) {
      continue;
    }

    if (source.kind === "blog") {
      baseActions.push({
        id: `source-${source.id}`,
        label: labels.readBlog,
        href: source.href,
        kind: "route",
        variant: "secondary",
      });
    }

    if (source.kind === "cv") {
      baseActions.push({
        id: `source-${source.id}`,
        label: labels.viewCv,
        href: source.href,
        kind: "route",
        variant: "secondary",
      });
    }
  }

  return baseActions.slice(0, 3);
}

export function buildPortfolioPrompt(params: {
  question: string;
  language: Language;
  mode: AiAudienceMode;
  intent: AiIntent;
  sources: FaqAiSource[];
  history: ChatHistoryItem[];
}) {
  const { question, language, mode, intent, sources, history } = params;

  const header =
    language === "vi"
      ? "Bạn là trợ lý AI cho portfolio của Tống Văn Hoàng."
      : "You are the AI assistant for Tong Van Hoang's portfolio.";

  const audienceRule =
    language === "vi"
      ? mode === "recruiter"
        ? "Người dùng đang ở chế độ recruiter. Hãy nhấn vào stack, phần việc trực tiếp đã làm, AI integration, internship hiện tại và lý do hồ sơ này đáng xem."
        : "Người dùng đang ở chế độ client. Hãy nhấn vào những gì Tống Văn Hoàng có thể xây dựng, cách tích hợp AI và trang nào nên xem tiếp theo."
      : mode === "recruiter"
        ? "The user is in recruiter mode. Emphasize stack, direct contributions, AI integration, current internship, and why this profile is worth reviewing."
        : "The user is in client mode. Emphasize what Tong Van Hoang can build, how AI is integrated, and which pages to view next.";

  const intentRule =
    language === "vi"
      ? `Intent hiện tại: ${intent}. Trả lời bám sát intent này.`
      : `Current intent: ${intent}. Keep the answer centered on this intent.`;

  const formatRule =
    language === "vi"
      ? "Trả lời bằng tiếng Việt, ngắn gọn và rõ ràng. Không dùng markdown như **in đậm** hoặc # heading. Hãy bắt đầu bằng 1 câu tóm tắt ngắn. Sau đó nếu cần thì dùng 2-4 gạch đầu dòng ngắn cho công nghệ, phần việc đã làm, AI integration hoặc trang nên xem."
      : "Answer in English, concise and clear. Do not use markdown such as **bold** or # headings. Start with one short summary sentence, then use 2-4 short bullet points if useful for stack, direct work, AI integration, or recommended next pages.";

  const trustRule =
    language === "vi"
      ? "Chỉ sử dụng thông tin có trong portfolio context. Nếu thiếu dữ liệu, hãy nói rõ và gợi ý chuyển sang trang liên hệ."
      : "Use only the provided portfolio context. If something is missing, say so explicitly and suggest the contact page.";

  const sourceText = sources
    .map(
      (source, index) =>
        `${index + 1}. [${source.label}] ${source.title}\nLink: ${source.href}\nSummary: ${source.excerpt}`
    )
    .join("\n\n");

  const historyText =
    history.length > 0
      ? history
          .map(
            (item) =>
              `${item.role === "user" ? "User" : "Assistant"}: ${item.content}`
          )
          .join("\n")
      : language === "vi"
        ? "Không có lịch sử hội thoại trước."
        : "No previous chat history.";

  return `${header}

${audienceRule}
${intentRule}
${formatRule}
${trustRule}

Conversation history:
${historyText}

Portfolio context:
${sourceText}

User question: ${question}`;
}
