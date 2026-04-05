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
    eyebrow: "FeShenShop",
    title: "Case study dự án",
    subtitle:
      "Mỗi phần dưới đây là một lát cắt thật tôi đã trực tiếp xây trong hệ thống FeShenShop: web storefront, RESTful API, dashboard quản trị và mobile app.",
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
        slug: "feshenshop-web-storefront",
        category: "website",
        title: "FeShenShop Web Storefront",
        shortTitle: "Web Storefront",
        eyebrow: "Frontend / Commerce UI",
        description:
          "Storefront responsive cho FeShenShop, nơi tôi kết hợp UI bán hàng, visual search và AI shopping assistant để trải nghiệm mua sắm không chỉ dừng ở product grid.",
        summary:
          "Phần web là nơi tôi nối UI, dữ liệu sản phẩm và trải nghiệm AI thành một luồng mua sắm hoàn chỉnh.",
        thumbnail: "/projects/feshenshop-web.png",
        tags: ["React", "TypeScript", "Responsive UI", "AI Chat", "Visual Search"],
        objective:
          "Tạo một storefront hiện đại cho cửa hàng thời trang, dễ demo trên desktop và mobile, đồng thời đủ chỗ để thể hiện cách tôi gắn AI vào flow mua sắm thật.",
        role: [
          "Thiết kế và dựng giao diện storefront bằng React và TypeScript.",
          "Làm product listing, product detail, cart flow và các trạng thái responsive chính.",
          "Nối chat widget và visual search vào đúng điểm người dùng cần tư vấn sản phẩm.",
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "Next.js UI patterns"],
        aiUse:
          "AI được gắn vào shopping chat, tư vấn sản phẩm theo ngữ cảnh và visual search từ ảnh tải lên thay vì chỉ thêm một chatbot độc lập.",
        result:
          "Phần web trở thành điểm demo mạnh nhất của hệ thống vì vừa cho thấy UI/UX, vừa chứng minh tôi biết kết hợp frontend với AI service và dữ liệu sản phẩm.",
        outcomes: [
          "Responsive tốt trên cả desktop và mobile.",
          "Có visual search và AI chat để làm rõ năng lực tích hợp AI.",
          "Là lớp giao diện trực quan nhất để recruiter nhìn thấy chất lượng sản phẩm.",
        ],
        relatedBlogSlugs: ["frontend-foundation", "ai-workflow"],
      },
      {
        slug: "feshenshop-rest-api",
        category: "backend",
        title: "FeShenShop RESTful API",
        shortTitle: "RESTful API",
        eyebrow: "Backend / Service Layer",
        description:
          "Backend Node.js, Express và TypeScript cho FeShenShop với CRUD, route cấu trúc rõ ràng, nhóm route AI riêng, phân quyền, rate limit và fallback cho visual search.",
        summary:
          "Backend này không chỉ là CRUD mà là service layer đủ sạch để web, dashboard và mobile cùng dùng.",
        thumbnail: "/projects/feshenshop-api.png",
        tags: ["Node.js", "Express", "TypeScript", "REST API", "AI Routes"],
        objective:
          "Xây API có cấu trúc rõ ràng để phục vụ web storefront, dashboard quản trị, mobile app và cả những tính năng AI mà không làm kiến trúc bị rối.",
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
        slug: "feshenshop-admin-dashboard",
        category: "website",
        title: "FeShenShop Admin Dashboard",
        shortTitle: "Admin Dashboard",
        eyebrow: "Dashboard / Operations",
        description:
          "Dashboard quản trị giúp theo dõi đơn hàng, khách hàng, doanh thu và hàng tồn, đồng thời thêm AI insight, AI coupon generation và hỗ trợ viết nội dung quản trị.",
        summary:
          "Dashboard là nơi tôi làm rõ việc AI không chỉ phục vụ user chat mà còn hỗ trợ vận hành nội bộ.",
        thumbnail: "/projects/feshenshop-dashboard.png",
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
          "AI được dùng cho admin insight, gợi ý trả lời, tạo coupon và hỗ trợ viết nội dung sản phẩm, tức là bám vào vận hành thực tế của shop.",
        result:
          "Dashboard giúp phần portfolio bớt một chiều: thay vì chỉ có storefront, tôi có thêm bằng chứng rằng mình hiểu admin workflow và cách AI tạo giá trị ở phía nội bộ.",
        outcomes: [
          "Thể hiện được tư duy vận hành chứ không chỉ UI bán hàng.",
          "AI xuất hiện ở đúng các điểm phân tích và hỗ trợ nội bộ.",
          "Tăng độ tin cậy cho câu chuyện full-stack của FeShenShop.",
        ],
        relatedBlogSlugs: ["ai-workflow"],
      },
      {
        slug: "feshenshop-mobile-app",
        category: "mobile",
        title: "FeShenShop Mobile App",
        shortTitle: "Mobile App",
        eyebrow: "Mobile / Flutter",
        description:
          "Ứng dụng Flutter mở rộng hệ thống FeShenShop lên mobile, có luồng xem sản phẩm, điều hướng mua sắm và màn AI assistant riêng cho việc hỏi sản phẩm hoặc size.",
        summary:
          "Mobile app cho thấy tôi không dừng ở web mà còn hiểu cách đưa cùng hệ thống lên một bề mặt sử dụng khác.",
        thumbnail: "/projects/feshenshop-mobile.png",
        tags: ["Flutter", "Mobile UI", "E-commerce", "AI Chat"],
        objective:
          "Đưa cùng một hệ thống FeShenShop lên mobile để thể hiện khả năng chuyển đổi sản phẩm từ web sang app mà vẫn giữ được luồng mua sắm và AI assistant.",
        role: [
          "Xây giao diện mobile shopping bằng Flutter với product list, navigation và account flow cơ bản.",
          "Tạo màn AI chat riêng để người dùng hỏi về sản phẩm hoặc cần tư vấn nhanh trên điện thoại.",
          "Điều chỉnh trải nghiệm để phù hợp hơn với màn hình nhỏ và thao tác touch.",
        ],
        stack: ["Flutter", "Dart", "Mobile UI", "API integration"],
        aiUse:
          "AI xuất hiện như một mobile shopping assistant riêng, giúp hỏi nhanh về sản phẩm, size hoặc bước tiếp theo trong hành trình mua sắm.",
        result:
          "Phần mobile giúp câu chuyện của tôi mạnh hơn khi phỏng vấn, vì nó cho thấy tôi có thể học và mở rộng sản phẩm sang nền tảng khác thay vì chỉ dừng ở web.",
        outcomes: [
          "Mở rộng cùng hệ thống FeShenShop sang mobile.",
          "Có AI chat riêng trên điện thoại để thể hiện khả năng tích hợp đa nền tảng.",
          "Bổ sung năng lực Flutter vào portfolio một cách có ngữ cảnh sản phẩm thật.",
        ],
        relatedBlogSlugs: ["ai-workflow", "portfolio-direction"],
      },
    ],
  },
  en: {
    eyebrow: "FeShenShop",
    title: "Project case studies",
    subtitle:
      "Each section below is a real slice of the FeShenShop system that I built directly: the web storefront, RESTful API, admin dashboard, and mobile app.",
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
        slug: "feshenshop-web-storefront",
        category: "website",
        title: "FeShenShop Web Storefront",
        shortTitle: "Web Storefront",
        eyebrow: "Frontend / Commerce UI",
        description:
          "A responsive storefront where I combined commerce UI, visual search, and an AI shopping assistant so the buying flow feels more interactive than a standard product grid.",
        summary:
          "The web layer is where I connected UI, product data, and AI-assisted shopping into one visible product experience.",
        thumbnail: "/projects/feshenshop-web.png",
        tags: ["React", "TypeScript", "Responsive UI", "AI Chat", "Visual Search"],
        objective:
          "Build a modern fashion storefront that demos well on desktop and mobile while clearly showing how I attach AI to a real shopping flow.",
        role: [
          "Designed and built the storefront UI with React and TypeScript.",
          "Implemented the main responsive states for listing, detail, cart, and browsing flows.",
          "Connected the AI chat widget and visual search to the moments where users actually need product help.",
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "Next.js UI patterns"],
        aiUse:
          "AI supports shopping chat, product recommendations, and image-based search instead of existing as a separate generic chatbot.",
        result:
          "The storefront became the strongest demo surface in the system because it shows both UI quality and how I integrate frontend with AI services and product data.",
        outcomes: [
          "Responsive across desktop and mobile.",
          "Includes visual search and AI chat as visible product features.",
          "Makes the product quality easy for recruiters to evaluate quickly.",
        ],
        relatedBlogSlugs: ["frontend-foundation", "ai-workflow"],
      },
      {
        slug: "feshenshop-rest-api",
        category: "backend",
        title: "FeShenShop RESTful API",
        shortTitle: "RESTful API",
        eyebrow: "Backend / Service Layer",
        description:
          "A Node.js, Express, and TypeScript backend with CRUD, clear routing, a dedicated AI route group, access control, rate limiting, and fallback logic for visual search.",
        summary:
          "This backend is more than CRUD. It is the service layer shared by the web app, dashboard, and mobile client.",
        thumbnail: "/projects/feshenshop-api.png",
        tags: ["Node.js", "Express", "TypeScript", "REST API", "AI Routes"],
        objective:
          "Build an API structure that can serve the web storefront, admin dashboard, mobile app, and AI features without turning the system into a mess.",
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
          "One backend serves web, dashboard, and mobile clients.",
        ],
        relatedBlogSlugs: ["backend-notes", "ai-workflow"],
      },
      {
        slug: "feshenshop-admin-dashboard",
        category: "website",
        title: "FeShenShop Admin Dashboard",
        shortTitle: "Admin Dashboard",
        eyebrow: "Dashboard / Operations",
        description:
          "An admin dashboard for orders, customers, revenue, and inventory, extended with AI insights, AI coupon generation, and writing assistance for internal workflows.",
        summary:
          "The dashboard is where I show that AI in this system supports operations, not only customer chat.",
        thumbnail: "/projects/feshenshop-dashboard.png",
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
          "AI is used for admin insight, reply suggestions, coupon generation, and product writing, which ties it directly to internal operations.",
        result:
          "The dashboard keeps the portfolio from looking one-dimensional. It adds evidence that I understand operations and how AI can support internal business workflows.",
        outcomes: [
          "Shows operational thinking beyond the customer-facing UI.",
          "Places AI in analytics and internal support workflows.",
          "Strengthens the full-stack story around FeShenShop.",
        ],
        relatedBlogSlugs: ["ai-workflow"],
      },
      {
        slug: "feshenshop-mobile-app",
        category: "mobile",
        title: "FeShenShop Mobile App",
        shortTitle: "Mobile App",
        eyebrow: "Mobile / Flutter",
        description:
          "A Flutter app that brings the same FeShenShop system to mobile with product browsing, shopping flow, and a dedicated AI assistant screen for product or sizing questions.",
        summary:
          "The mobile app proves that I can extend the same system to another platform instead of stopping at the web layer.",
        thumbnail: "/projects/feshenshop-mobile.png",
        tags: ["Flutter", "Mobile UI", "E-commerce", "AI Chat"],
        objective:
          "Extend the same product system to mobile so I can show I understand how to adapt the shopping flow and AI assistant to a different interaction surface.",
        role: [
          "Built the mobile shopping UI in Flutter with listing, navigation, and basic account flow.",
          "Created a dedicated AI chat screen for product or sizing help on mobile.",
          "Adjusted the experience for smaller screens and touch-based interaction.",
        ],
        stack: ["Flutter", "Dart", "Mobile UI", "API integration"],
        aiUse:
          "AI appears as a dedicated mobile shopping assistant for quick product, size, and shopping-flow questions.",
        result:
          "The mobile app makes my portfolio stronger in interviews because it shows I can learn and extend the same system to another platform instead of stopping at the web.",
        outcomes: [
          "Extends FeShenShop to mobile with the same product context.",
          "Includes a dedicated AI assistant on mobile.",
          "Adds Flutter experience to the portfolio with real product context.",
        ],
        relatedBlogSlugs: ["ai-workflow", "portfolio-direction"],
      },
    ],
  },
};

export function getProjectBySlug(language: Language, slug: string) {
  return projectCopy[language].items.find((item) => item.slug === slug) || null;
}
