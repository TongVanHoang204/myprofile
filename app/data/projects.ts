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
      "Nurfia là hệ thống thương mại điện tử thời trang tôi trực tiếp xây dựng: web storefront, RESTful API, dashboard quản trị và mobile app — triển khai tại vanhoang.mauweb68.com.",
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
      result: "Kết quả",
      outcomes: "Điểm nổi bật",
      relatedBlog: "Bài blog liên quan",
    },
    items: [
      {
        slug: "nurfia-web-storefront",
        category: "website",
        title: "Nurfia Web Storefront",
        shortTitle: "Web Storefront",
        eyebrow: "Frontend / Commerce UI",
        description:
          "Storefront responsive cho Nurfia, nơi tôi kết hợp UI bán hàng thời trang cao cấp, visual search và AI shopping assistant để trải nghiệm mua sắm không chỉ dừng ở product grid.",
        summary:
          "Phần web là nơi tôi nối UI, dữ liệu sản phẩm và trải nghiệm AI thành một luồng mua sắm hoàn chỉnh, đang chạy thực tế tại vanhoang.mauweb68.com.",
        thumbnail: "/projects/nurfia-web.png",
        tags: ["React", "TypeScript", "Responsive UI", "AI Chat", "Visual Search"],
        objective:
          "Tạo một storefront hiện đại cho cửa hàng thời trang Nurfia, dễ demo trên desktop và mobile, đồng thời đủ chỗ để thể hiện cách tôi gắn AI vào flow mua sắm thật.",
        role: [
          "Thiết kế và dựng giao diện storefront bằng React và TypeScript.",
          "Làm product listing, product detail, cart flow và các trạng thái responsive chính.",
          "Nối chat widget và visual search vào đúng điểm người dùng cần tư vấn sản phẩm.",
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
        aiUse:
          "AI được gắn vào shopping chat, tư vấn sản phẩm theo ngữ cảnh và visual search từ ảnh tải lên thay vì chỉ thêm một chatbot độc lập.",
        result:
          "Nurfia Storefront trở thành điểm demo mạnh nhất của hệ thống vì vừa cho thấy UI/UX cao cấp, vừa chứng minh tôi biết kết hợp frontend với AI service và dữ liệu sản phẩm. Xem tại: https://vanhoang.mauweb68.com/",
        outcomes: [
          "Responsive tốt trên cả desktop và mobile.",
          "Có visual search và AI chat để làm rõ năng lực tích hợp AI.",
          "Đang được deploy và chạy thực tế trên domain vanhoang.mauweb68.com.",
        ],
        relatedBlogSlugs: ["frontend-foundation", "ai-workflow"],
        liveLink: "https://vanhoang.mauweb68.com/",
      },
      {
        slug: "nurfia-rest-api",
        category: "backend",
        title: "Nurfia RESTful API",
        shortTitle: "RESTful API",
        eyebrow: "Backend / Service Layer",
        description:
          "Backend Node.js, Express và TypeScript cho Nurfia với CRUD, route cấu trúc rõ ràng, nhóm route AI riêng, phân quyền, rate limit và fallback cho visual search.",
        summary:
          "Backend này không chỉ là CRUD mà là service layer đủ sạch để web storefront, dashboard và mobile cùng dùng.",
        thumbnail: "/projects/nurfia-api.png",
        tags: ["Node.js", "Express", "TypeScript", "REST API", "AI Routes"],
        objective:
          "Xây API có cấu trúc rõ ràng để phục vụ web storefront Nurfia, dashboard quản trị, mobile app và cả những tính năng AI mà không làm kiến trúc bị rối.",
        role: [
          "Thiết kế route và tổ chức backend cho sản phẩm, người dùng và các luồng thương mại điện tử cơ bản.",
          "Tách nhóm route AI riêng cho chat, generate nội dung và visual search.",
          "Thiết lập guard, rate limit, quyền truy cập và fallback để AI không phá vỡ backend chính.",
        ],
        stack: ["Node.js", "Express", "TypeScript", "MySQL", "Ollama", "Gemini"],
        aiUse:
          "AI được đặt trong một service layer riêng cho shopping assistant, generate nội dung quản trị và visual search, có đường lui bằng thuật toán khi AI vision không sẵn sàng.",
        result:
          "Phần backend cho thấy tôi không chỉ gọi model rồi trả text mà biết đưa AI vào hệ thống có cấu trúc, guard và khả năng vận hành an toàn hơn.",
        outcomes: [
          "Tách route AI khỏi CRUD để dễ mở rộng.",
          "Có fallback cho visual search thay vì phụ thuộc hoàn toàn vào model.",
          "Cùng một backend phục vụ web, dashboard và mobile.",
        ],
        relatedBlogSlugs: ["backend-notes", "ai-workflow"],
      },
      {
        slug: "nurfia-admin-dashboard",
        category: "website",
        title: "Nurfia Admin Dashboard",
        shortTitle: "Admin Dashboard",
        eyebrow: "Dashboard / Operations",
        description:
          "Dashboard quản trị giúp theo dõi đơn hàng, khách hàng, doanh thu và hàng tồn, đồng thời thêm AI insight, AI coupon generation và hỗ trợ viết nội dung quản trị.",
        summary:
          "Dashboard là nơi tôi làm rõ việc AI không chỉ phục vụ user chat mà còn hỗ trợ vận hành nội bộ của Nurfia.",
        thumbnail: "/projects/nurfia-dashboard.png",
        tags: ["Dashboard UI", "Analytics", "Admin AI", "Operations"],
        objective:
          "Tạo một lớp quản trị đủ rõ về dữ liệu, vừa để theo dõi vận hành, vừa để chứng minh tôi hiểu cách AI hỗ trợ công việc nội bộ chứ không chỉ phục vụ giao diện khách hàng.",
        role: [
          "Dựng dashboard layout và các card thống kê cho doanh thu, đơn hàng, tồn kho và khách hàng.",
          "Làm khu AI insight panel để người quản trị nhìn nhanh hơn vào dữ liệu thật.",
          "Tích hợp AI generate cho coupon, mô tả sản phẩm và một số tác vụ hỗ trợ quản trị.",
        ],
        stack: ["React", "TypeScript", "Dashboard UI", "Analytics", "Gemini"],
        aiUse:
          "AI được dùng cho admin insight, gợi ý trả lời, tạo coupon và hỗ trợ viết nội dung sản phẩm, tức là bám vào vận hành thực tế của Nurfia.",
        result:
          "Dashboard giúp phần portfolio bớt một chiều: thay vì chỉ có storefront, tôi có thêm bằng chứng rằng mình hiểu admin workflow và cách AI tạo giá trị ở phía nội bộ.",
        outcomes: [
          "Thể hiện được tư duy vận hành chứ không chỉ UI bán hàng.",
          "AI xuất hiện ở đúng các điểm phân tích và hỗ trợ nội bộ.",
          "Tăng độ tin cậy cho câu chuyện full-stack của Nurfia.",
        ],
        relatedBlogSlugs: ["ai-workflow"],
      },
    ],
  },
  en: {
    eyebrow: "Nurfia – Fashion eCommerce",
    title: "Project case studies",
    subtitle:
      "Nurfia is a full fashion eCommerce system I built directly: web storefront, RESTful API, admin dashboard, and mobile app — live at vanhoang.mauweb68.com.",
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
        slug: "nurfia-web-storefront",
        category: "website",
        title: "Nurfia Web Storefront",
        shortTitle: "Web Storefront",
        eyebrow: "Frontend / Commerce UI",
        description:
          "A responsive fashion storefront where I combined premium commerce UI, visual search, and an AI shopping assistant so the buying flow feels more interactive than a standard product grid.",
        summary:
          "The web layer is where I connected UI, product data, and AI-assisted shopping into one visible product experience, live at vanhoang.mauweb68.com.",
        thumbnail: "/projects/nurfia-web.png",
        tags: ["React", "TypeScript", "Responsive UI", "AI Chat", "Visual Search"],
        objective:
          "Build a modern fashion storefront for Nurfia that demos well on desktop and mobile while clearly showing how I attach AI to a real shopping flow.",
        role: [
          "Designed and built the storefront UI with React and TypeScript.",
          "Implemented the main responsive states for listing, detail, cart, and browsing flows.",
          "Connected the AI chat widget and visual search to the moments where users actually need product help.",
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
        aiUse:
          "AI supports shopping chat, product recommendations, and image-based search instead of existing as a separate generic chatbot.",
        result:
          "The Nurfia storefront became the strongest demo surface in the system because it shows both premium UI quality and how I integrate frontend with AI services. Live at: https://vanhoang.mauweb68.com/",
        outcomes: [
          "Responsive across desktop and mobile.",
          "Includes visual search and AI chat as visible product features.",
          "Deployed and running live on vanhoang.mauweb68.com.",
        ],
        relatedBlogSlugs: ["frontend-foundation", "ai-workflow"],
        liveLink: "https://vanhoang.mauweb68.com/",
      },
      {
        slug: "nurfia-rest-api",
        category: "backend",
        title: "Nurfia RESTful API",
        shortTitle: "RESTful API",
        eyebrow: "Backend / Service Layer",
        description:
          "A Node.js, Express, and TypeScript backend with CRUD, clear routing, a dedicated AI route group, access control, rate limiting, and fallback logic for visual search.",
        summary:
          "This backend is more than CRUD. It is the service layer shared by the Nurfia web app, dashboard, and mobile client.",
        thumbnail: "/projects/nurfia-api.png",
        tags: ["Node.js", "Express", "TypeScript", "REST API", "AI Routes"],
        objective:
          "Build an API structure that can serve the Nurfia web storefront, admin dashboard, mobile app, and AI features without turning the system into a mess.",
        role: [
          "Designed the routing structure for products, users, and core commerce flows.",
          "Separated AI routes for chat, content generation, and visual search.",
          "Added guards, rate limiting, and fallback paths so AI features do not weaken the backend design.",
        ],
        stack: ["Node.js", "Express", "TypeScript", "MySQL", "Ollama", "Gemini"],
        aiUse:
          "AI lives inside a dedicated service layer for the shopping assistant, admin-side generation, and visual search, with an algorithmic fallback when vision AI is unavailable.",
        result:
          "This backend shows that I do more than call a model and return text. I can place AI inside a structured system with access control and operational fallback.",
        outcomes: [
          "AI routes are separated from CRUD for maintainability.",
          "Visual search has a fallback instead of relying only on the model.",
          "One backend serves the Nurfia web, dashboard, and mobile clients.",
        ],
        relatedBlogSlugs: ["backend-notes", "ai-workflow"],
      },
      {
        slug: "nurfia-admin-dashboard",
        category: "website",
        title: "Nurfia Admin Dashboard",
        shortTitle: "Admin Dashboard",
        eyebrow: "Dashboard / Operations",
        description:
          "An admin dashboard for orders, customers, revenue, and inventory, extended with AI insights, AI coupon generation, and writing assistance for internal Nurfia workflows.",
        summary:
          "The dashboard is where I show that AI in the Nurfia system supports operations, not only customer chat.",
        thumbnail: "/projects/nurfia-dashboard.png",
        tags: ["Dashboard UI", "Analytics", "Admin AI", "Operations"],
        objective:
          "Create an admin layer that makes operational data readable while also proving that AI can support internal work, not just end-user conversations.",
        role: [
          "Built the dashboard layout and core KPI surfaces for revenue, orders, inventory, and customers.",
          "Added AI insight panels so operators can read business data faster.",
          "Integrated AI generation for coupons, product descriptions, and admin support flows.",
        ],
        stack: ["React", "TypeScript", "Dashboard UI", "Analytics", "Gemini"],
        aiUse:
          "AI is used for admin insight, reply suggestions, coupon generation, and product writing, which ties it directly to internal Nurfia operations.",
        result:
          "The dashboard keeps the portfolio from looking one-dimensional. It adds evidence that I understand operations and how AI can support internal business workflows.",
        outcomes: [
          "Shows operational thinking beyond the customer-facing UI.",
          "Places AI in analytics and internal support workflows.",
          "Strengthens the full-stack story around Nurfia.",
        ],
        relatedBlogSlugs: ["ai-workflow"],
      },
    ],
  },
};

export function getProjectBySlug(language: Language, slug: string) {
  return projectCopy[language].items.find((item) => item.slug === slug) || null;
}
