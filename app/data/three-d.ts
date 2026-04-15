import type { Language } from "@/app/data/dictionaries";

export const threeDCopy: Record<
  Language,
  {
    nav: {
      projects: string;
      workflow: string;
      profile: string;
      viewCv: string;
    };
    hero: {
      title: string;
      titleAccent: string;
      inputPlaceholder: string;
      description: string;
      primaryCta: string;
      backHome: string;
    };
    about: {
      label: string;
      prefix: string;
      accent: string;
      middle: string;
      suffix: string;
    };
    featured: {
      label: string;
      description: string;
      cta: string;
    };
    philosophy: {
      title: string;
      accent: string;
      suffix: string;
      blockOneLabel: string;
      blockOneBody: string;
      blockTwoLabel: string;
      blockTwoBody: string;
    };
    services: {
      title: string;
      eyebrow: string;
      cards: Array<{
        tag: string;
        title: string;
        description: string;
        video: string;
      }>;
    };
  }
> = {
  vi: {
    nav: {
      projects: "Dự án",
      workflow: "Quy trình",
      profile: "Hồ sơ",
      viewCv: "Xem CV",
    },
    hero: {
      title: "Build it then",
      titleAccent: "ship",
      inputPlaceholder: "Nhập email để kết nối",
      description:
        "Một phiên bản cinematic của portfolio, tập trung vào cách tôi xây sản phẩm thật qua frontend, backend, AI integration và các quyết định triển khai đứng sau FeShenShop.",
      primaryCta: "Khám phá dự án",
      backHome: "Về portfolio",
    },
    about: {
      label: "Hồ sơ",
      prefix: "Biến",
      accent: "ý tưởng",
      middle: "thành",
      suffix: "sản phẩm có giao diện, logic và AI đi cùng nhau.",
    },
    featured: {
      label: "Cách tôi làm",
      description:
        "FeShenShop là nơi tôi nối storefront, REST API, dashboard, mobile app và AI features thành một câu chuyện sản phẩm thống nhất thay vì nhiều demo rời rạc.",
      cta: "Xem dự án",
    },
    philosophy: {
      title: "Product",
      accent: "x",
      suffix: "Engineering",
      blockOneLabel: "Cách tôi làm việc",
      blockOneBody:
        "Tôi cố giữ design, frontend, backend và AI trong cùng một luồng. Mục tiêu không chỉ là làm cho tính năng chạy được, mà còn phải đủ rõ để người khác hiểu sản phẩm rất nhanh.",
      blockTwoLabel: "Điều tôi tối ưu",
      blockTwoBody:
        "Tôi quan tâm đến responsive UI, cấu trúc route rõ ràng, AI fallback và những flow có thể demo tốt. Đó là thứ làm project trong portfolio gần hơn với một sản phẩm thật.",
    },
    services: {
      title: "Điều tôi xây",
      eyebrow: "Năng lực cốt lõi",
      cards: [
        {
          tag: "Frontend",
          title: "UI, motion và trải nghiệm responsive",
          description:
            "Tôi xây giao diện bằng React, TypeScript, motion và cấu trúc responsive để sản phẩm vẫn rõ ràng trên cả desktop lẫn mobile.",
          video: "/videos/three-d/service-research.mp4",
        },
        {
          tag: "Backend + AI",
          title: "API, workflow và product logic",
          description:
            "Tôi kết nối Express APIs, prompt flow, AI routes và các fallback thực tế để tính năng vẫn hữu ích ngay cả khi đường đi lý tưởng không sẵn sàng.",
          video: "/videos/three-d/service-design.mp4",
        },
      ],
    },
  },
  en: {
    nav: {
      projects: "Projects",
      workflow: "Workflow",
      profile: "Profile",
      viewCv: "View CV",
    },
    hero: {
      title: "Build it then",
      titleAccent: "ship",
      inputPlaceholder: "Enter your email to connect",
      description:
        "A cinematic profile focused on how I build real products through frontend, backend, AI integration, and the product decisions behind FeShenShop.",
      primaryCta: "Explore projects",
      backHome: "Back to portfolio",
    },
    about: {
      label: "Profile",
      prefix: "Turning",
      accent: "ideas",
      middle: "into",
      suffix: "products where interface, logic, and AI work together.",
    },
    featured: {
      label: "How I Build",
      description:
        "FeShenShop is where I connected storefront, REST API, dashboard, mobile app, and AI features into one product story instead of treating each stack layer as a separate demo.",
      cta: "View projects",
    },
    philosophy: {
      title: "Product",
      accent: "x",
      suffix: "Engineering",
      blockOneLabel: "How I work",
      blockOneBody:
        "I try to keep design, frontend, backend, and AI in one flow. The goal is not just to make something work, but to make each part connect clearly enough that another person can understand the product fast.",
      blockTwoLabel: "What I optimize",
      blockTwoBody:
        "I care about responsive UI, clean route structure, AI fallbacks, and demo-ready flows. That is what makes a portfolio project feel closer to a real product instead of a one-off prototype.",
    },
    services: {
      title: "What I build",
      eyebrow: "Core strengths",
      cards: [
        {
          tag: "Frontend",
          title: "UI, Motion & Responsive Experience",
          description:
            "I build interfaces with React, TypeScript, motion, and responsive structure so the product stays clear across desktop and mobile.",
          video: "/videos/three-d/service-research.mp4",
        },
        {
          tag: "Backend + AI",
          title: "APIs, Workflow & Product Logic",
          description:
            "I connect Express APIs, prompt flows, AI routes, and practical fallbacks so features stay useful even when the ideal path is unavailable.",
          video: "/videos/three-d/service-design.mp4",
        },
      ],
    },
  },
};
