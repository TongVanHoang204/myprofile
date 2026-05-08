import type { Language } from "@/app/data/dictionaries";

export type ProjectFilter = "all" | "website" | "backend" | "mobile";

export type ProjectCaseStudy = {
  slug: string;
  category: Exclude<ProjectFilter, "all">;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  objective: string;
  role: string[];
  stack: string[];
  aiUse: string;
  result: string;
  outcomes: string[];
  relatedBlogSlugs: string[];
  liveLink?: string;
};

export type ProjectsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  caseStudyEyebrow: string;
  caseStudyTitle: string;
  caseStudySubtitle: string;
  openCaseStudy: string;
  filters: Record<Exclude<ProjectFilter, "all"> | "all", string>;
  labels: {
    objective: string;
    role: string;
    stack: string;
    aiUse: string;
    result: string;
    outcomes: string;
    relatedBlog: string;
  };
  items: ProjectCaseStudy[];
};

export const projectCopy: Record<Language, ProjectsCopy> = {
  vi: {
    eyebrow: "Nurfia – Fashion eCommerce",
    title: "Case study dự án",
    subtitle:
      "Nurfia là một hệ thống eCommerce thời trang toàn diện do tôi trực tiếp xây dựng: từ Web Storefront, RESTful API cho đến Dashboard quản trị tích hợp AI — đang chạy thực tế tại vanhoang.mauweb68.com.",
    caseStudyEyebrow: "Case study",
    caseStudyTitle: "Đọc nhanh từng phần tôi đã trực tiếp làm",
    caseStudySubtitle:
      "Mỗi dự án đều theo cùng một format để recruiter hoặc người xem scan nhanh: mục tiêu, vai trò, stack, lớp AI và kết quả.",
    openCaseStudy: "Mở case study",
    filters: {
      all: "Tất cả",
      website: "Trang web",
      backend: "Backend",
      mobile: "Mobile App",
    },
    labels: {
      objective: "Mục tiêu",
      role: "Vai trò của tôi",
      stack: "Stack",
      aiUse: "AI dùng ở đâu",
      items: [
      {
        slug: "nurfia-fullstack-system",
        category: "website",
        title: "Hệ thống Nurfia (Full-stack)",
        shortTitle: "Nurfia Full-stack",
        eyebrow: "Full-stack / E-commerce Ecosystem",
        description:
          "Một hệ sinh thái thương mại điện tử thời trang hoàn chỉnh được xây dựng từ đầu, bao gồm giao diện cửa hàng (Storefront) hiện đại, trang quản trị (Dashboard) thông minh và hệ thống RESTful API mạnh mẽ có tích hợp trí tuệ nhân tạo.",
        summary:
          "Nurfia không chỉ là một website bán hàng đơn thuần mà là một hệ thống quản lý và mua sắm thông minh, kết hợp giữa công nghệ Web hiện đại và khả năng xử lý dữ liệu của AI.",
        thumbnail: "/projects/nurfia-web.png",
        tags: [
          "React",
          "Node.js",
          "TypeScript",
          "MySQL",
          "AI Integration",
          "Full-stack",
        ],
        objective:
          "Xây dựng một giải pháp eCommerce toàn diện, có khả năng mở rộng và ứng dụng thực tế AI vào quy trình mua sắm của khách hàng cũng như quản lý của doanh nghiệp.",
        role: [
          "Thiết kế và phát triển toàn bộ giao diện Storefront & Dashboard bằng React và TypeScript.",
          "Xây dựng kiến trúc Backend API với Node.js, Express và MySQL.",
          "Tích hợp các mô hình AI (Gemini, Ollama) cho Visual Search và Trợ lý mua sắm ảo.",
          "Triển khai hệ thống lên môi trường production thực tế.",
        ],
        stack: [
          "Frontend: React, Tailwind CSS, Vite",
          "Backend: Node.js, Express, TypeScript",
          "Database: MySQL",
          "AI: Google Gemini API, Ollama (Vision/Chat)",
        ],
        aiUse:
          "AI đóng vai trò cốt lõi: Tìm kiếm sản phẩm bằng hình ảnh (Visual Search), Trợ lý tư vấn mua sắm 24/7 và AI Insights hỗ trợ admin phân tích xu hướng kinh doanh.",
        result:
          "Hệ thống đã hoàn thiện và đang vận hành ổn định tại vanhoang.mauweb68.com, xử lý mượt mà toàn bộ quy trình từ duyệt sản phẩm đến thanh toán và quản lý đơn hàng.",
        outcomes: [
          "Storefront đạt điểm tối ưu về hiệu suất và trải nghiệm người dùng.",
          "Dashboard quản trị cung cấp báo cáo doanh thu và tồn kho thời gian thực.",
          "Hệ thống API ổn định, bảo mật và dễ dàng mở rộng.",
          "Ứng dụng AI thực tế giúp tăng tính tương tác và tiện dụng cho hệ thống.",
        ],
        relatedBlogSlugs: ["frontend-foundation", "backend-notes", "ai-workflow"],
        liveLink: "https://vanhoang.mauweb68.com/",
      },
    ],
  },
  en: {
    eyebrow: "Nurfia – Fashion eCommerce",
    title: "Project case studies",
    subtitle:
      "Nurfia is a comprehensive fashion eCommerce ecosystem I built from scratch: including a premium Storefront, an intelligent Admin Dashboard, and a robust RESTful API — live at vanhoang.mauweb68.com.",
    caseStudyEyebrow: "Case study",
    caseStudyTitle: "A fast way to scan what I actually built",
    caseStudySubtitle:
      "Every project follows the same format so recruiters can scan it quickly: goal, role, stack, AI layer, and result.",
    openCaseStudy: "Open case study",
    filters: {
      all: "All",
      website: "Website",
      backend: "Backend",
      mobile: "Mobile App",
    },
    labels: {
      objective: "Goal",
      role: "My role",
      stack: "Stack",
      aiUse: "Where AI is used",
      result: "Result",
      outcomes: "Highlights",
      relatedBlog: "Related blog notes",
    },
    items: [
      {
        slug: "nurfia-fullstack-system",
        category: "website",
        title: "Nurfia Full-stack System",
        shortTitle: "Nurfia Full-stack",
        eyebrow: "Full-stack / E-commerce Ecosystem",
        description:
          "A comprehensive fashion eCommerce system built from scratch, including a premium Web Storefront, an intelligent Admin Dashboard, and a robust RESTful API with integrated AI capabilities.",
        summary:
          "Nurfia is more than just a website; it is a complete ecosystem that combines modern UI/UX with intelligent data processing to optimize shopping and business operations.",
        thumbnail: "/projects/nurfia-web.png",
        tags: [
          "React",
          "Node.js",
          "TypeScript",
          "MySQL",
          "AI Integration",
          "Full-stack",
        ],
        objective:
          "Build an end-to-end, scalable, and secure eCommerce solution that demonstrates real-world application of AI in critical user and administrative touchpoints.",
        role: [
          "Designed and developed the entire Frontend (Storefront & Dashboard) using React and TypeScript.",
          "Architected the RESTful API backend using Node.js, Express, and MySQL.",
          "Integrated AI models (Gemini, Ollama) for Visual Search and intelligent Shopping Assistants.",
          "Deployed and optimized the production system on a live domain.",
        ],
        stack: [
          "Frontend: React, Tailwind CSS, Vite",
          "Backend: Node.js, Express, TypeScript",
          "Database: MySQL",
          "AI: Google Gemini API, Ollama (Vision/Chat)",
        ],
        aiUse:
          "AI is deeply integrated: Image-based Visual Search, a smart Shopping Assistant for customers, and AI Insights for administrators to analyze business performance.",
        result:
          "The system is currently live at vanhoang.mauweb68.com, delivering stable performance and seamless processing from order placement to logistics management.",
        outcomes: [
          "Modern Storefront UI optimized for SEO and mobile responsiveness.",
          "Powerful Admin Dashboard with real-time revenue and inventory reporting.",
          "Secure API layer with rate limiting and strict access control.",
          "Accurate Visual Search feature driving higher user engagement.",
        ],
        relatedBlogSlugs: ["frontend-foundation", "backend-notes", "ai-workflow"],
        liveLink: "https://vanhoang.mauweb68.com/",
      },
    ],
  },
};

export function getProjectBySlug(language: Language, slug: string) {
  return projectCopy[language].items.find((item) => item.slug === slug) || null;
}
