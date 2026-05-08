import type { Language } from "@/app/data/dictionaries";

export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  focus: string;
  takeaways: string[];
  credibilityPoints: string[];
  systems: string[];
  relatedProjectSlug: string;
  body: string[];
  accent: string;
};

export type BlogPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  listEyebrow: string;
  ctaEyebrow: string;
  topicsTitle: string;
  topics: string[];
  featuredLabel: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredPoints: string[];
  stats: Array<{ value: string; label: string }>;
  listTitle: string;
  listSubtitle: string;
  readArticle: string;
  detailLabel: string;
  summaryLabel: string;
  takeawayLabel: string;
  credibilityLabel: string;
  systemsLabel: string;
  relatedProjectLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  sectionCta: string;
  posts: BlogPost[];
};

export const blogCopy: Record<Language, BlogPageCopy> = {
  vi: {
    eyebrow: "Blog kỹ thuật",
    title:
      "Những bài viết kỹ thuật gắn trực tiếp với hệ thống Nurfia, portfolio và AI workflow tôi đã triển khai",
    subtitle:
      "Trang blog này tập trung vào những gì tôi đã thật sự làm trong hệ thống Nurfia và chính portfolio này: cách tôi xây dựng kiến trúc Full-stack, tích hợp AI và tối ưu hóa trải nghiệm người dùng.",
    listEyebrow: "Bài viết",
    ctaEyebrow: "Kết nối",
    topicsTitle: "Các trục nội dung tôi đang dùng để xây credibility",
    topics: [
      "Kiến trúc Full-stack thực chiến với React và Node.js",
      "Tích hợp AI theo nghiệp vụ (Visual Search, AI Chat)",
      "Quản trị dữ liệu và vận hành hệ thống eCommerce",
      "Cách biến project cá nhân thành sản phẩm có giá trị thực tế",
    ],
    featuredLabel: "Bài nổi bật",
    featuredTitle:
      "Từ ý tưởng đến hệ thống Nurfia: Cách tôi xây dựng một hệ sinh thái eCommerce Full-stack tích hợp AI",
    featuredDescription:
      "Bài viết này tổng hợp hành trình xây dựng Nurfia: từ việc thiết kế Storefront, xây dựng RESTful API đến việc triển khai AI Insights trên Dashboard quản trị.",
    featuredPoints: [
      "Kết nối Storefront, Backend và Dashboard thành một hệ thống thống nhất.",
      "Ứng dụng AI vào các tính năng thực tế như tìm kiếm ảnh và trợ lý mua sắm.",
      "Dùng blog để giải thích sâu về các quyết định kỹ thuật cho nhà tuyển dụng.",
      "Tối ưu hóa khả năng vận hành thực tế thay vì chỉ làm giao diện demo.",
    ],
    stats: [
      { value: "04", label: "Bài kỹ thuật" },
      { value: "01", label: "Hệ thống Full-stack" },
      { value: "100%", label: "Dự án thực tế" },
    ],
    listTitle: "Bài viết hiện có",
    listSubtitle:
      "Mỗi bài đều bám vào những tính năng tôi đã trực tiếp code trong Nurfia, có liên kết về project case study để bạn có thể đối chiếu trực tiếp.",
    readArticle: "Đọc bài viết",
    detailLabel: "Nội dung chi tiết",
    summaryLabel: "Tóm tắt nhanh",
    takeawayLabel: "Điểm chính",
    credibilityLabel: "Điều bài này chứng minh",
    systemsLabel: "Hệ thống / phần liên quan",
    relatedProjectLabel: "Case study liên quan",
    ctaTitle: "Muốn trải nghiệm hệ thống thực tế?",
    ctaSubtitle:
      "Sau khi đọc các bài viết kỹ thuật, bạn có thể truy cập thẳng vào hệ thống Nurfia đang chạy hoặc xem case study chi tiết.",
    ctaPrimary: "Đi tới liên hệ",
    ctaSecondary: "Xem case study Nurfia",
    sectionBadge: "Blog",
    sectionTitle: "",
    sectionSubtitle: "",
    sectionCta: "Mở trang blog",
    posts: [
      {
        slug: "frontend-foundation",
        category: "Frontend",
        date: "03 May 2026",
        readTime: "4 phút đọc",
        title: "Xây dựng giao diện thương mại cao cấp cho Nurfia",
        excerpt:
          "Cách tôi sử dụng React và Tailwind CSS để tạo ra một Storefront không chỉ đẹp mà còn tích hợp sâu AI chat widget và Visual Search.",
        focus:
          "Tập trung vào trải nghiệm người dùng (UX) và khả năng tương tác thông minh của giao diện với người dùng cuối.",
        takeaways: [
          "Xây dựng các component UI tái sử dụng cao cho eCommerce.",
          "Tích hợp Visual Search cho phép tìm sản phẩm qua ảnh tải lên.",
          "Thiết kế AI chat widget bám sát dữ liệu sản phẩm thời gian thực.",
        ],
        credibilityPoints: [
          "Khả năng xây dựng UI/UX phức tạp nhưng vẫn giữ được tốc độ tải trang.",
          "Biết cách tích hợp các tính năng AI vào luồng frontend một cách tự nhiên.",
          "Tư duy làm sản phẩm tập trung vào tỷ lệ chuyển đổi của người dùng.",
        ],
        systems: ["Storefront UI", "Visual Search", "AI Shopping Assistant"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "Trong phần Frontend của Nurfia, tôi tập trung vào việc tạo ra một Storefront có tính tương tác cao. Thay vì chỉ hiển thị sản phẩm tĩnh, tôi thêm các tính năng như tìm kiếm bằng hình ảnh (Visual Search), giúp người dùng tìm món đồ yêu thích chỉ bằng một tấm ảnh.",
          "Ngoài ra, trợ lý mua sắm AI (Shopping Assistant) được thiết kế để không chỉ trả lời văn bản mà còn gợi ý trực tiếp các link sản phẩm phù hợp ngay trong ô chat, giúp rút ngắn hành trình mua sắm của khách hàng.",
        ],
        accent: "from-sky-500/80 via-cyan-400/70 to-blue-500/80",
      },
      {
        slug: "backend-notes",
        category: "Backend",
        date: "05 May 2026",
        readTime: "5 phút đọc",
        title: "Kiến trúc RESTful API mạnh mẽ cho hệ sinh thái Nurfia",
        excerpt:
          "Chi tiết cách tôi xây dựng tầng Backend với Node.js và TypeScript, quản lý dữ liệu MySQL và tách biệt các dịch vụ AI để đảm bảo hiệu suất.",
        focus:
          "Tính ổn định, bảo mật và khả năng mở rộng của tầng dịch vụ (Service Layer).",
        takeaways: [
          "Tổ chức route khoa học, tách biệt giữa CRUD cơ bản và các tác vụ AI.",
          "Triển khai middleware bảo mật, rate limiting để bảo vệ tài nguyên hệ thống.",
          "Xây dựng cơ chế fallback cho các dịch vụ AI để đảm bảo tính sẵn sàng.",
        ],
        credibilityPoints: [
          "Hiểu sâu về cấu trúc hệ thống và luồng dữ liệu của một ứng dụng thực tế.",
          "Khả năng tối ưu hóa database MySQL cho các truy vấn phức tạp.",
          "Biết cách vận hành và quản lý các AI API (Gemini, Ollama) một cách hiệu quả.",
        ],
        systems: ["REST API", "Auth System", "AI Service Layer", "Database Design"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "Backend của Nurfia được xây dựng để phục vụ đồng thời cả Web, Dashboard và các nền tảng khác. Tôi sử dụng Node.js với TypeScript để đảm bảo tính chặt chẽ của mã nguồn và dễ dàng bảo trì.",
          "Một trong những thách thức lớn nhất là việc xử lý các tác vụ AI tốn nhiều tài nguyên. Tôi đã tách riêng các route xử lý AI và áp dụng rate limiting để tránh việc hệ thống bị quá tải, đồng thời xây dựng các thuật toán dự phòng (fallback) để người dùng vẫn có kết quả tìm kiếm ngay cả khi AI gặp sự cố.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "07 May 2026",
        readTime: "4 phút đọc",
        title: "Đưa AI vào vận hành: Từ Visual Search đến Admin Insights",
        excerpt:
          "Cách tôi biến AI từ một công cụ demo thành các tính năng thực tế hỗ trợ cả khách hàng lẫn người quản lý hệ thống Nurfia.",
        focus:
          "Tối ưu hóa hiệu quả kinh doanh thông qua việc ứng dụng trí tuệ nhân tạo vào quy trình thực tế.",
        takeaways: [
          "AI phân tích dữ liệu bán hàng để đưa ra các gợi ý (Insights) cho admin.",
          "Tự động hóa việc tạo nội dung sản phẩm và mã giảm giá bằng AI.",
          "Visual Search giúp người dùng tìm kiếm theo style cá nhân nhanh chóng.",
        ],
        credibilityPoints: [
          "Tư duy ứng dụng AI vào giải quyết bài toán nghiệp vụ thay vì chạy theo xu hướng.",
          "Khả năng triển khai AI trên nhiều bề mặt: Storefront, Dashboard và Mobile.",
          "Hiểu rõ về prompt engineering và quản lý chi phí/hiệu suất khi dùng AI API.",
        ],
        systems: ["Visual Search", "AI Insights", "Auto Content Generation"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "Tại Nurfia, AI không chỉ là một ô chat chatbot. Tôi tích hợp AI vào Dashboard quản trị để nó tự động phân tích doanh thu và hành vi khách hàng, từ đó đưa ra các gợi ý như 'Sản phẩm này đang hot, hãy tạo thêm coupon'.",
          "Ngoài ra, AI còn hỗ trợ viết mô tả sản phẩm tự động, giúp tiết kiệm thời gian vận hành. Ở phía người dùng, Visual Search là điểm nhấn lớn nhất khi nó cho phép tìm kiếm sản phẩm thông qua thị giác, mang lại trải nghiệm mua sắm hiện đại và tiện lợi.",
        ],
        accent: "from-fuchsia-500/80 via-violet-400/70 to-sky-500/80",
      },
      {
        slug: "portfolio-direction",
        category: "Career",
        date: "08 May 2026",
        readTime: "3 phút đọc",
        title: "Tại sao tôi chọn xây dựng Nurfia như một sản phẩm hoàn chỉnh?",
        excerpt:
          "Tại sao thay vì làm nhiều dự án nhỏ, tôi chọn tập trung xây dựng một hệ sinh thái lớn để chứng minh năng lực Full-stack.",
        focus:
          "Tư duy làm sản phẩm (Product Thinking) và định hướng sự nghiệp của một Full-stack Developer.",
        takeaways: [
          "Một dự án lớn cho thấy khả năng bao quát hệ thống tốt hơn nhiều dự án nhỏ.",
          "Nurfia là bằng chứng thép cho năng lực xử lý vấn đề từ Frontend đến DevOps.",
          "Blog là cầu nối giúp nhà tuyển dụng hiểu được 'tâm hồn' của mã nguồn.",
        ],
        credibilityPoints: [
          "Khả năng tập trung và kiên trì để hoàn thiện một sản phẩm có độ phức tạp cao.",
          "Có tư duy hệ thống và cái nhìn tổng thể về vòng đời phát triển phần mềm.",
          "Biết cách trình bày và marketing sản phẩm kỹ thuật của chính mình.",
        ],
        systems: ["Full-stack Ecosystem", "Product Lifecycle", "Technical Writing"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "Nhiều người hỏi tại sao tôi lại tốn nhiều công sức để xây dựng cả Storefront, API và Dashboard cho một dự án cá nhân. Câu trả lời đơn giản là: Tôi muốn chứng minh mình có thể làm chủ toàn bộ quy trình xây dựng một sản phẩm thực tế.",
          "Nurfia không chỉ là code, nó là một bài toán vận hành. Qua dự án này, tôi học được cách kết nối các thành phần rời rạc thành một hệ thống mượt mà. Blog này chính là nơi tôi lưu giữ lại những bài học đó để chia sẻ với bạn và các nhà tuyển dụng.",
        ],
        accent: "from-amber-400/80 via-orange-400/70 to-rose-500/80",
      },
    ],
  },
  en: {
    eyebrow: "Technical blog",
    title:
      "Technical articles tied directly to the Nurfia system, the portfolio, and the AI workflows I have implemented",
    subtitle:
      "This blog focuses on the work I actually built across the Nurfia ecosystem and this portfolio: building a Full-stack architecture, integrating AI, and optimizing UX.",
    listEyebrow: "Articles",
    ctaEyebrow: "Connect",
    topicsTitle: "The credibility tracks I am building through content",
    topics: [
      "Full-stack architecture with React and Node.js",
      "Business-driven AI integration (Visual Search, AI Chat)",
      "Data management and eCommerce operations",
      "Turning personal projects into real-world products",
    ],
    featuredLabel: "Featured article",
    featuredTitle:
      "From Concept to Nurfia: Building a Full-stack AI-integrated eCommerce Ecosystem",
    featuredDescription:
      "This post summarizes the journey of building Nurfia: from designing the Storefront to architecting the RESTful API and implementing AI Insights on the Admin Dashboard.",
    featuredPoints: [
      "Connecting Storefront, Backend, and Dashboard into a unified system.",
      "Implementing AI in real-world features like Visual Search and Shopping Assistants.",
      "Using the blog to explain technical decisions to recruiters and peers.",
      "Focusing on operational readiness instead of just a demo UI.",
    ],
    stats: [
      { value: "04", label: "Technical articles" },
      { value: "01", label: "Full-stack System" },
      { value: "100%", label: "Real-world Project" },
    ],
    listTitle: "Current articles",
    listSubtitle:
      "Each article stays tied to features I actually coded in Nurfia, with direct links to the project case study for reference.",
    readArticle: "Read article",
    detailLabel: "Detailed note",
    summaryLabel: "Quick summary",
    takeawayLabel: "Key points",
    credibilityLabel: "What this article proves",
    systemsLabel: "Related systems",
    relatedProjectLabel: "Related case study",
    ctaTitle: "Want to experience the real system?",
    ctaSubtitle:
      "After reading the technical notes, you can access the live Nurfia system or view the detailed case study.",
    ctaPrimary: "Go to contact",
    ctaSecondary: "View Nurfia case study",
    sectionBadge: "Blog",
    sectionTitle:
      "The blog is now a technical credibility layer for the portfolio",
    sectionSubtitle:
      "Each article is tied directly to a real product slice or AI workflow so you can see both how I think and how I ship.",
    sectionCta: "Open blog page",
    posts: [
      {
        slug: "frontend-foundation",
        category: "Frontend",
        date: "May 03, 2026",
        readTime: "4 min read",
        title: "Building a Premium Commerce UI for Nurfia",
        excerpt:
          "How I used React and Tailwind CSS to create a Storefront that is not only beautiful but also deeply integrates an AI chat widget and Visual Search.",
        focus:
          "Focusing on User Experience (UX) and intelligent interaction between the interface and the end user.",
        takeaways: [
          "Building highly reusable UI components for eCommerce.",
          "Integrating Visual Search for image-based product discovery.",
          "Designing an AI chat widget tied to real-time product data.",
        ],
        credibilityPoints: [
          "Ability to build complex UI/UX while maintaining high performance.",
          "Knowing how to integrate AI features naturally into frontend flows.",
          "Product-focused mindset targeting user conversion rates.",
        ],
        systems: ["Storefront UI", "Visual Search", "AI Shopping Assistant"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "In Nurfia's Frontend, I focused on creating a highly interactive Storefront. Instead of just static products, I added features like Visual Search, allowing users to find their favorite items just by uploading a photo.",
          "Additionally, the AI Shopping Assistant was designed to go beyond text replies by suggesting direct product links within the chat, streamlining the customer's shopping journey.",
        ],
        accent: "from-sky-500/80 via-cyan-400/70 to-blue-500/80",
      },
      {
        slug: "backend-notes",
        category: "Backend",
        date: "May 05, 2026",
        readTime: "5 min read",
        title: "Robust RESTful API Architecture for Nurfia",
        excerpt:
          "Detailing how I built the Backend layer with Node.js and TypeScript, managing MySQL data and decoupling AI services for performance.",
        focus:
          "Stability, security, and scalability of the Service Layer.",
        takeaways: [
          "Architecting clean routes, separating CRUD from AI-driven tasks.",
          "Implementing security middleware and rate limiting to protect resources.",
          "Building fallback mechanisms for AI services to ensure high availability.",
        ],
        credibilityPoints: [
          "Deep understanding of system architecture and data flows in real apps.",
          "Ability to optimize MySQL databases for complex queries.",
          "Knowing how to operate and manage AI APIs (Gemini, Ollama) effectively.",
        ],
        systems: ["REST API", "Auth System", "AI Service Layer", "Database Design"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "Nurfia's Backend was built to serve the Web, Dashboard, and other platforms simultaneously. I used Node.js with TypeScript to ensure code reliability and maintainability.",
          "One of the biggest challenges was handling resource-intensive AI tasks. I decoupled AI routes and applied rate limiting to prevent system overload, while building fallback algorithms so users still get search results even if AI encounters an issue.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "May 07, 2026",
        readTime: "4 min read",
        title: "Bringing AI into Operations: From Visual Search to Admin Insights",
        excerpt:
          "How I turned AI from a demo tool into practical features supporting both customers and system administrators at Nurfia.",
        focus:
          "Optimizing business efficiency through the application of AI in real-world workflows.",
        takeaways: [
          "AI analyzing sales data to provide actionable Insights for admins.",
          "Automating product content and coupon generation using AI.",
          "Visual Search helping users find products based on their personal style.",
        ],
        credibilityPoints: [
          "Mindset of applying AI to solve business problems rather than just following trends.",
          "Ability to deploy AI across multiple surfaces: Storefront, Dashboard, and Mobile.",
          "Clear understanding of prompt engineering and managing cost/performance of AI APIs.",
        ],
        systems: ["Visual Search", "AI Insights", "Auto Content Generation"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "At Nurfia, AI is not just a chatbot box. I integrated AI into the Admin Dashboard to automatically analyze revenue and customer behavior, providing suggestions like 'This product is trending, create a coupon'.",
          "Additionally, AI supports automated product descriptions, saving operational time. On the user side, Visual Search is the biggest highlight, enabling image-based discovery for a modern shopping experience.",
        ],
        accent: "from-fuchsia-500/80 via-violet-400/70 to-sky-500/80",
      },
      {
        slug: "portfolio-direction",
        category: "Career",
        date: "May 08, 2026",
        readTime: "3 min read",
        title: "Why I Chose to Build Nurfia as a Complete Product?",
        excerpt:
          "Why instead of doing many small projects, I chose to focus on building a large ecosystem to prove my Full-stack capabilities.",
        focus:
          "Product Thinking and the career direction of a Full-stack Developer.",
        takeaways: [
          "A large project demonstrates system-wide oversight better than small ones.",
          "Nurfia is solid proof of problem-solving ability from Frontend to DevOps.",
          "The blog acts as a bridge for recruiters to understand the 'soul' of the source code.",
        ],
        credibilityPoints: [
          "Ability to focus and persevere to complete a high-complexity product.",
          "Systems thinking and a holistic view of the software development lifecycle.",
          "Knowing how to present and market your own technical products.",
        ],
        systems: ["Full-stack Ecosystem", "Product Lifecycle", "Technical Writing"],
        relatedProjectSlug: "nurfia-fullstack-system",
        body: [
          "Many ask why I put so much effort into building a Storefront, API, and Dashboard for a personal project. The answer is simple: I wanted to prove I can master the entire process of building a real product.",
          "Nurfia is not just code; it's an operational puzzle. Through this project, I learned how to connect disjointed components into a smooth system. This blog is where I document those lessons to share with you and potential recruiters.",
        ],
        accent: "from-amber-400/80 via-orange-400/70 to-rose-500/80",
      },
    ],
  },
};

export function getBlogPostBySlug(language: Language, slug: string) {
  return blogCopy[language].posts.find((post) => post.slug === slug) ?? null;
}
