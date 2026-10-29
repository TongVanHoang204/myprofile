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
      "Tích hợp AI theo nghiệp vụ (AI Shopping Assistant, AI viết nội dung admin)",
      "Quản trị dữ liệu và vận hành hệ thống eCommerce",
      "Cách biến project cá nhân thành sản phẩm có giá trị thực tế",
    ],
    featuredLabel: "Bài nổi bật",
    featuredTitle:
      "Từ ý tưởng đến hệ thống Nurfia: Cách tôi xây dựng một hệ sinh thái eCommerce Full-stack tích hợp AI",
    featuredDescription:
      "Bài viết này tổng hợp hành trình xây dựng Nurfia: từ việc thiết kế Storefront, xây dựng RESTful API đến việc làm Dashboard quản trị có báo cáo, phân quyền và AI hỗ trợ viết nội dung.",
    featuredPoints: [
      "Kết nối Storefront, Backend và Dashboard thành một hệ thống thống nhất.",
      "Ứng dụng AI vào các tính năng thực tế như trợ lý mua sắm và viết mô tả sản phẩm.",
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
          "Cách tôi dùng React 19, TypeScript, Vite và CSS thuần để tạo một Storefront song ngữ có luồng mua hàng trọn vẹn: filter, biến thể theo tồn kho, checkout 4 phương thức thanh toán và AI chat gợi ý sản phẩm.",
        focus:
          "Tập trung vào trải nghiệm người dùng (UX) và việc giữ luồng mua hàng rõ ràng dù có nhiều tính năng phụ.",
        takeaways: [
          "Lưu filter/sort/page trên URL, tách state cart/wishlist/compare/auth bằng Zustand.",
          "Chỉ cho chọn tổ hợp màu/size còn hàng và giới hạn số lượng theo tồn kho.",
          "AI chat trả về thẻ sản phẩm thật từ database, render thành product card ngay trong khung chat.",
        ],
        credibilityPoints: [
          "Khả năng xây dựng UI/UX phức tạp nhưng vẫn giữ được tốc độ tải trang nhờ lazy-load page.",
          "Biết cách tích hợp các tính năng AI vào luồng frontend một cách tự nhiên.",
          "Xử lý được các chi tiết thật của thương mại điện tử: coupon, phí ship theo vùng, thanh toán MoMo/Stripe.",
        ],
        systems: ["Storefront UI", "Checkout & Payment", "AI Shopping Assistant"],
        relatedProjectSlug: "nurfia-web-storefront",
        body: [
          "Trong phần Frontend của Nurfia, tôi tập trung vào việc tạo ra một Storefront có luồng mua hàng hoàn chỉnh: từ homepage, shop có filter theo giá/màu/size/brand, product detail chọn biến thể theo tồn kho, đến checkout có coupon, phí ship theo tỉnh và 4 phương thức thanh toán COD, chuyển khoản, MoMo, Stripe.",
          "Ngoài ra, trợ lý mua sắm AI (Shopping Assistant) được thiết kế để không chỉ trả lời văn bản mà còn gợi ý trực tiếp các sản phẩm thật dưới dạng product card ngay trong ô chat, giúp rút ngắn hành trình mua sắm của khách hàng.",
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
          "Chi tiết cách tôi xây dựng tầng Backend với Node.js, Express 5 và TypeScript, dùng Prisma + PostgreSQL, xử lý đơn hàng trong transaction và tách riêng nhóm route AI.",
        focus:
          "Tính ổn định, bảo mật và khả năng mở rộng của tầng dịch vụ (Service Layer).",
        takeaways: [
          "Tổ chức route theo domain, validate body/query/params bằng Zod và tách riêng nhóm route AI.",
          "Đặt hàng trong Prisma transaction: trừ kho, cộng lượt dùng coupon, ghi lịch sử trạng thái.",
          "Thanh toán MoMo/Stripe xác minh chữ ký; JWT thu hồi được bằng token_version.",
        ],
        credibilityPoints: [
          "Hiểu sâu về cấu trúc hệ thống và luồng dữ liệu của một ứng dụng thực tế.",
          "Thiết kế schema PostgreSQL với Prisma cho sản phẩm, biến thể, đơn hàng, tồn kho và phân quyền.",
          "Biết đặt AI API (Gemini qua OpenRouter) sau rate limit, timeout và bộ lọc output an toàn.",
        ],
        systems: ["REST API", "Auth System", "AI Service Layer", "Database Design"],
        relatedProjectSlug: "nurfia-rest-api",
        body: [
          "Backend của Nurfia được xây dựng để phục vụ đồng thời cả Storefront lẫn Dashboard quản trị. Tôi sử dụng Node.js, Express 5 với TypeScript và Prisma + PostgreSQL để đảm bảo tính chặt chẽ của mã nguồn và dễ dàng bảo trì; toàn bộ endpoint được tài liệu hoá bằng Swagger.",
          "Một trong những thách thức lớn nhất là giữ dữ liệu nhất quán và an toàn: tạo đơn, trừ kho và cộng lượt coupon nằm chung một transaction, callback MoMo/Stripe phải xác minh chữ ký, còn logout hay đổi mật khẩu phải thu hồi được mọi JWT cũ. Các route AI được tách riêng, có rate limit và timeout để không làm ảnh hưởng tới phần còn lại của hệ thống.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "07 May 2026",
        readTime: "4 phút đọc",
        title: "Đưa AI vào vận hành: Từ trợ lý mua sắm đến AI viết nội dung cho admin",
        excerpt:
          "Cách tôi biến AI từ một công cụ demo thành các tính năng thực tế hỗ trợ cả khách hàng lẫn người quản lý hệ thống Nurfia.",
        focus:
          "Tối ưu hóa hiệu quả kinh doanh thông qua việc ứng dụng trí tuệ nhân tạo vào quy trình thực tế.",
        takeaways: [
          "AI shopping assistant dùng RAG nhẹ từ sản phẩm đang bán, cài đặt cửa hàng và giỏ hàng của khách.",
          "AI Generator viết mô tả sản phẩm, nội dung blog và thông điệp popup ngay trong form admin.",
          "Trang báo cáo có insight tự động tính từ dữ liệu doanh thu, sản phẩm, danh mục và tỷ lệ huỷ đơn.",
        ],
        credibilityPoints: [
          "Tư duy ứng dụng AI vào giải quyết bài toán nghiệp vụ thay vì chạy theo xu hướng.",
          "Khả năng triển khai AI trên nhiều bề mặt: Storefront và Dashboard.",
          "Hiểu rõ về prompt engineering và quản lý chi phí/hiệu suất khi dùng AI API.",
        ],
        systems: ["AI Shopping Assistant", "Report Insights", "Auto Content Generation"],
        relatedProjectSlug: "nurfia-admin-dashboard",
        body: [
          "Tại Nurfia, AI không chỉ là một ô chat chatbot. Ở phía khách hàng, trợ lý mua sắm lấy ngữ cảnh từ sản phẩm thật, cài đặt cửa hàng và giỏ hàng, rồi gợi ý sản phẩm dưới dạng product card. Backend chặn output dạng JSON/code/bảng và kiểm tra mọi sản phẩm được gợi ý phải tồn tại trong database.",
          "Ở phía quản trị, nút AI Generator giúp admin viết mô tả sản phẩm, nội dung blog và thông điệp popup dựa trên dữ liệu đang nhập, với prompt cấm bịa chất liệu, kích thước hay khuyến mãi. Trang báo cáo bổ sung các thẻ insight tự động như sản phẩm dẫn đầu, danh mục mạnh nhất và cảnh báo tỷ lệ huỷ đơn, giúp tiết kiệm thời gian vận hành.",
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
        relatedProjectSlug: "nurfia-web-storefront",
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
      "Business-driven AI integration (AI Shopping Assistant, admin AI writing)",
      "Data management and eCommerce operations",
      "Turning personal projects into real-world products",
    ],
    featuredLabel: "Featured article",
    featuredTitle:
      "From Concept to Nurfia: Building a Full-stack AI-integrated eCommerce Ecosystem",
    featuredDescription:
      "This post summarizes the journey of building Nurfia: from designing the Storefront to architecting the RESTful API and building an Admin Dashboard with reports, permissions, and AI writing assistance.",
    featuredPoints: [
      "Connecting Storefront, Backend, and Dashboard into a unified system.",
      "Implementing AI in real-world features like the shopping assistant and product copywriting.",
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
          "How I used React 19, TypeScript, Vite, and plain CSS to build a bilingual Storefront with a complete buying flow: filters, stock-aware variants, checkout with four payment methods, and AI chat product suggestions.",
        focus:
          "Focusing on User Experience (UX) and keeping the buying flow clear even with many secondary features.",
        takeaways: [
          "Keeping filter/sort/page state in the URL and splitting cart/wishlist/compare/auth state with Zustand.",
          "Only allowing in-stock color/size combinations and capping quantity by stock.",
          "AI chat returns real product tags from the database, rendered as product cards inside the chat window.",
        ],
        credibilityPoints: [
          "Ability to build complex UI/UX while keeping load times fast with lazy-loaded pages.",
          "Knowing how to integrate AI features naturally into frontend flows.",
          "Handling real eCommerce details: coupons, zone-based shipping, and MoMo/Stripe payments.",
        ],
        systems: ["Storefront UI", "Checkout & Payment", "AI Shopping Assistant"],
        relatedProjectSlug: "nurfia-web-storefront",
        body: [
          "In Nurfia's Frontend, I focused on creating a Storefront with a complete buying flow: from the homepage and a shop filtered by price/color/size/brand, to stock-aware variant selection on product detail, to checkout with coupons, province-based shipping, and four payment methods: COD, bank transfer, MoMo, and Stripe.",
          "Additionally, the AI Shopping Assistant was designed to go beyond text replies by suggesting real products as product cards within the chat, streamlining the customer's shopping journey.",
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
          "Detailing how I built the Backend layer with Node.js, Express 5, and TypeScript on Prisma + PostgreSQL, running orders in transactions and keeping AI routes in their own group.",
        focus:
          "Stability, security, and scalability of the Service Layer.",
        takeaways: [
          "Organizing routes by domain, validating body/query/params with Zod, and separating the AI route group.",
          "Placing orders in a Prisma transaction: deducting stock, incrementing coupon usage, and writing status history.",
          "Verifying MoMo/Stripe signatures and making JWT revocable with token_version.",
        ],
        credibilityPoints: [
          "Deep understanding of system architecture and data flows in real apps.",
          "Designing a PostgreSQL schema with Prisma for products, variants, orders, inventory, and permissions.",
          "Placing AI APIs (Gemini via OpenRouter) behind rate limits, timeouts, and safe output filters.",
        ],
        systems: ["REST API", "Auth System", "AI Service Layer", "Database Design"],
        relatedProjectSlug: "nurfia-rest-api",
        body: [
          "Nurfia's Backend was built to serve both the Storefront and the Admin Dashboard. I used Node.js, Express 5 with TypeScript, and Prisma + PostgreSQL to ensure code reliability and maintainability, with every endpoint documented in Swagger.",
          "One of the biggest challenges was keeping data consistent and safe: order creation, stock deduction, and coupon usage share one transaction, MoMo/Stripe callbacks must have verified signatures, and logout or password changes must revoke every old JWT. AI routes are kept separate with rate limits and timeouts so they cannot affect the rest of the system.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "May 07, 2026",
        readTime: "4 min read",
        title: "Bringing AI into Operations: From Shopping Assistant to Admin Content Writing",
        excerpt:
          "How I turned AI from a demo tool into practical features supporting both customers and system administrators at Nurfia.",
        focus:
          "Optimizing business efficiency through the application of AI in real-world workflows.",
        takeaways: [
          "The AI shopping assistant uses lightweight RAG over active products, store settings, and the shopper's cart.",
          "The AI Generator writes product descriptions, blog content, and popup messages directly inside admin forms.",
          "The reports page shows automatic insights computed from revenue, product, category, and cancellation data.",
        ],
        credibilityPoints: [
          "Mindset of applying AI to solve business problems rather than just following trends.",
          "Ability to deploy AI across multiple surfaces: Storefront and Dashboard.",
          "Clear understanding of prompt engineering and managing cost/performance of AI APIs.",
        ],
        systems: ["AI Shopping Assistant", "Report Insights", "Auto Content Generation"],
        relatedProjectSlug: "nurfia-admin-dashboard",
        body: [
          "At Nurfia, AI is not just a chatbot box. On the customer side, the shopping assistant pulls context from real products, store settings, and the cart, then suggests products as product cards. The backend blocks JSON/code/table output and checks that every suggested product exists in the database.",
          "On the admin side, the AI Generator button helps admins write product descriptions, blog content, and popup messages from the data they are entering, with a prompt that forbids inventing materials, dimensions, or promotions. The reports page adds automatic insight cards such as the leading product, strongest category, and cancellation-rate warnings, saving operational time.",
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
        relatedProjectSlug: "nurfia-web-storefront",
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
