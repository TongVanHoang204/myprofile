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
    eyebrow: "Blog cá nhân",
    title:
      "Nơi tôi ghi lại cách xây sản phẩm, học công nghệ và hoàn thiện portfolio",
    subtitle:
      "Trang blog này tổng hợp những ghi chú ngắn xoay quanh frontend, backend, mobile và AI workflow mà tôi đang áp dụng trong quá trình phát triển FeShenShop cũng như website cá nhân.",
    listEyebrow: "Bài viết",
    ctaEyebrow: "Kết nối",
    topicsTitle: "Chủ đề tôi đang viết",
    topics: [
      "Frontend thực chiến với React và Next.js",
      "Kiến trúc backend cho project cá nhân",
      "Quy trình dùng AI để tăng tốc công việc",
      "Kinh nghiệm tối ưu portfolio khi đi thực tập",
    ],
    featuredLabel: "Bài nổi bật",
    featuredTitle:
      "Từ FeShenShop đến portfolio cá nhân: cách tôi gom một hệ thống học tập thành sản phẩm có thể trình bày",
    featuredDescription:
      "Bài viết này nói về cách tôi chia một project cá nhân thành nhiều bề mặt rõ ràng: storefront web, RESTful API, dashboard và mobile app, rồi biến toàn bộ hệ thống đó thành câu chuyện tuyển dụng dễ hiểu hơn trên portfolio.",
    featuredPoints: [
      "Tách rõ từng phần web, API, dashboard và mobile để trình bày đúng năng lực.",
      "Ưu tiên trải nghiệm responsive và khả năng demo trước khi nói sâu về kỹ thuật.",
      "Dùng blog như lớp giải thích thêm cho recruiter ngoài CV và FAQ.",
    ],
    stats: [
      { value: "04", label: "Bài viết mở đầu" },
      { value: "03", label: "Nhóm kỹ thuật chính" },
      { value: "01", label: "Case study hệ thống" },
    ],
    listTitle: "Bài viết hiện có",
    listSubtitle:
      "Tôi khởi động blog bằng những chủ đề bám sát đúng thứ mình đang xây và đang học, thay vì viết lan man.",
    readArticle: "Đọc bài viết",
    detailLabel: "Nội dung chi tiết",
    summaryLabel: "Tóm tắt nhanh",
    takeawayLabel: "Điểm chính",
    ctaTitle: "Muốn trao đổi trực tiếp về các bài viết hoặc dự án?",
    ctaSubtitle:
      "Nếu bạn muốn xem cách tôi triển khai thực tế hoặc trao đổi sâu hơn về stack đang dùng, hãy chuyển sang trang liên hệ hoặc xem phần dự án.",
    ctaPrimary: "Đi tới liên hệ",
    ctaSecondary: "Xem dự án",
    sectionBadge: "Blog",
    sectionTitle:
      "Những ghi chú kỹ thuật tôi đang biến thành lợi thế khi đi thực tập",
    sectionSubtitle:
      "Blog được gắn ngay trên trang chính để người xem kéo xuống là thấy cách tôi học, cách tôi xây sản phẩm và cách tôi dùng AI trong portfolio này.",
    sectionCta: "Mở trang blog",
    posts: [
      {
        slug: "frontend-foundation",
        category: "Frontend",
        date: "03 Apr 2026",
        readTime: "4 phút đọc",
        title: "Frontend tôi đang dùng cho portfolio và FeShenShop web",
        excerpt:
          "Tôi chọn React, Next.js và Tailwind để có tốc độ triển khai nhanh, nhưng vẫn ưu tiên tính rõ ràng của layout, animation vừa đủ và khả năng responsive thật sự trên mobile.",
        focus:
          "Từ hero, navbar đến card dự án đều được tối ưu theo mobile-first rồi mới mở rộng cho desktop.",
        takeaways: [
          "Tách route page rõ ràng để portfolio dễ điều hướng hơn.",
          "Giữ animation có chủ đích, không làm nặng trải nghiệm đọc.",
          "Thiết kế giao diện theo nội dung thật từ CV và dự án.",
        ],
        body: [
          "Khi làm frontend cho portfolio, tôi không muốn trang chỉ là một bản CV đặt lên web. Vì vậy tôi xây từng khu vực như một trang trải nghiệm riêng: trang chủ để tạo ấn tượng, trang dự án để cho thấy năng lực triển khai, còn blog để giải thích tư duy làm sản phẩm.",
          "Với FeShenShop web, mục tiêu của tôi là giao diện đủ trực quan để người xem có thể hiểu ngay đây là một storefront thật, không phải chỉ là mockup. Điều này làm tôi tập trung nhiều vào responsive layout, spacing và thứ tự ưu tiên thông tin trên màn hình nhỏ.",
        ],
        accent: "from-sky-500/80 via-cyan-400/70 to-blue-500/80",
      },
      {
        slug: "backend-notes",
        category: "Backend",
        date: "03 Apr 2026",
        readTime: "5 phút đọc",
        title: "Những gì tôi học được khi dựng RESTful API cho FeShenShop",
        excerpt:
          "Phần backend giúp tôi hiểu rõ hơn cách tách route, chuẩn hóa dữ liệu và giữ cho cấu trúc project đủ sạch để frontend, dashboard và mobile cùng dùng chung logic.",
        focus:
          "API không cần quá phức tạp, nhưng phải đủ rõ, đủ ổn định và đủ dễ mở rộng khi hệ thống lớn lên.",
        takeaways: [
          "Chuẩn hóa naming và group route ngay từ đầu giúp project đỡ rối.",
          "CORS, validation và lỗi phản hồi rõ ràng là phần không thể bỏ qua.",
          "Một backend tốt giúp portfolio có câu chuyện full-stack thuyết phục hơn.",
        ],
        body: [
          "Trong FeShenShop, tôi dùng RESTful API như một cách để rèn tư duy hệ thống. Dù project là cá nhân, tôi vẫn muốn backend có cấu trúc rõ, endpoint đặt hợp lý và dữ liệu phản hồi nhất quán để frontend dễ sử dụng hơn.",
          "Khi backend có nền tảng tốt, dashboard quản trị, storefront và ứng dụng mobile đều có thể bám vào cùng một lớp dữ liệu. Điều này giúp tôi nhìn project như một hệ thống thực sự thay vì nhiều phần tách rời.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "03 Apr 2026",
        readTime: "4 phút đọc",
        title: "Cách tôi dùng Prompt AI và Gemini trong website portfolio",
        excerpt:
          "Tôi không dùng AI chỉ để tạo nội dung. Mục tiêu là biến AI thành lớp hỗ trợ giao tiếp: trả lời nhanh về CV, dự án, kỹ năng và định hướng thực tập của tôi.",
        focus:
          "AI phải trả lời ngắn, đúng ngữ cảnh hồ sơ và không làm mất chất cá nhân của portfolio.",
        takeaways: [
          "Prompt phải bám đúng dữ liệu CV và dự án thật.",
          "Fallback model và kiểm soát lỗi giúp chatbot ổn định hơn khi deploy.",
          "Format câu trả lời quyết định trải nghiệm người xem nhiều hơn tôi nghĩ.",
        ],
        body: [
          "Phần FAQ AI của website là nơi tôi thử cách kết hợp Gemini với dữ liệu hồ sơ cá nhân. Tôi muốn người xem có thể hỏi trực tiếp về stack, dự án hoặc định hướng của tôi mà không phải đọc hết toàn bộ site.",
          "Việc này buộc tôi phải nghĩ nhiều hơn về prompt, format đầu ra và bảo mật API. Bài học lớn nhất là AI trên website không nên nói quá nhiều. Nó phải trả lời đủ gọn để tăng độ tin cậy cho hồ sơ, không phải để lấn át nội dung thật.",
        ],
        accent: "from-fuchsia-500/80 via-violet-400/70 to-sky-500/80",
      },
      {
        slug: "portfolio-direction",
        category: "Career",
        date: "03 Apr 2026",
        readTime: "3 phút đọc",
        title: "Tôi dùng blog để làm portfolio bớt phẳng khi đi tìm thực tập như thế nào",
        excerpt:
          "Một portfolio chỉ liệt kê stack thường khá giống nhau. Blog giúp tôi cho thấy cách mình suy nghĩ, cách mình ưu tiên và cách mình học từ project thật.",
        focus:
          "Người xem không chỉ nhìn thấy mình đã làm gì, mà còn hiểu vì sao mình làm theo hướng đó.",
        takeaways: [
          "Blog biến project thành câu chuyện thay vì danh sách công nghệ.",
          "Bài viết ngắn nhưng đúng trọng tâm dễ đọc hơn bài dài chung chung.",
          "Portfolio có chiều sâu hơn khi nội dung nói được cả tư duy và sản phẩm.",
        ],
        body: [
          "Khi chuẩn bị portfolio để tìm thực tập, tôi nhận ra phần lớn ứng viên đều có thể ghi React, Node.js hay Git vào CV. Điều tạo khác biệt không nằm ở việc liệt kê thêm công nghệ, mà ở cách giải thích mình đã dùng chúng vào một sản phẩm cụ thể như thế nào.",
          "Vì vậy tôi thêm blog như một lớp nội dung bổ sung. Nó cho phép tôi nói về quyết định giao diện, cách tổ chức project, cách dùng AI và cả những gì tôi đang tiếp tục cải thiện. Với recruiter, đây là phần giúp nhìn rõ hơn cách tôi tiếp cận công việc.",
        ],
        accent: "from-amber-400/80 via-orange-400/70 to-rose-500/80",
      },
    ],
  },
  en: {
    eyebrow: "Personal blog",
    title:
      "A place where I document how I build products, learn technology, and shape my portfolio",
    subtitle:
      "This blog page collects short notes about frontend, backend, mobile, and AI workflow that I am actively applying while building FeShenShop and refining my personal website.",
    listEyebrow: "Journal",
    ctaEyebrow: "Connect",
    topicsTitle: "Topics I am writing about",
    topics: [
      "Hands-on frontend with React and Next.js",
      "Backend structure for personal projects",
      "Using AI to speed up real work",
      "Improving a portfolio for internship applications",
    ],
    featuredLabel: "Featured note",
    featuredTitle:
      "From FeShenShop to a personal portfolio: how I turned one learning system into a presentable product story",
    featuredDescription:
      "This piece is about how I split one personal project into clear surfaces: web storefront, RESTful API, dashboard, and mobile app, then translated that system into a portfolio story that recruiters can scan quickly.",
    featuredPoints: [
      "Separate the web, API, dashboard, and mobile layers so each skill is visible.",
      "Prioritize demo quality and responsive experience before overly deep technical detail.",
      "Use the blog as an explanation layer beyond the CV and FAQ.",
    ],
    stats: [
      { value: "04", label: "Launch articles" },
      { value: "03", label: "Core technical tracks" },
      { value: "01", label: "System case study" },
    ],
    listTitle: "Current articles",
    listSubtitle:
      "I started this blog with topics directly connected to what I am actually building and learning, instead of writing generic content.",
    readArticle: "Read article",
    detailLabel: "Full note",
    summaryLabel: "Quick summary",
    takeawayLabel: "Key points",
    ctaTitle: "Want to discuss the articles or the projects directly?",
    ctaSubtitle:
      "If you want to see how I implement these ideas in practice or talk more deeply about the stack I use, move to the contact page or explore the project section.",
    ctaPrimary: "Go to contact",
    ctaSecondary: "View projects",
    sectionBadge: "Blog",
    sectionTitle:
      "Technical notes I am turning into an edge for internship applications",
    sectionSubtitle:
      "The blog now lives on the main page so visitors can scroll straight into how I learn, build products, and use AI inside this portfolio.",
    sectionCta: "Open blog page",
    posts: [
      {
        slug: "frontend-foundation",
        category: "Frontend",
        date: "Apr 03, 2026",
        readTime: "4 min read",
        title: "The frontend stack I am using for the portfolio and FeShenShop web",
        excerpt:
          "I chose React, Next.js, and Tailwind for fast implementation, while still prioritizing layout clarity, restrained motion, and truly responsive behavior on mobile.",
        focus:
          "From the hero to the navbar and project cards, the interface is designed mobile-first before expanding to desktop.",
        takeaways: [
          "Separate route pages make the portfolio easier to navigate.",
          "Motion should have purpose instead of adding noise.",
          "Design is stronger when it is driven by real CV and project content.",
        ],
        body: [
          "When building the frontend for this portfolio, I did not want the site to feel like a CV pasted onto the web. That is why each major area became its own experience: the home page creates the first impression, the projects page proves implementation ability, and the blog explains product thinking.",
          "For the FeShenShop web interface, my goal was to make it feel like a real storefront rather than a static mockup. That pushed me to focus on responsive layout, spacing, and information priority on smaller screens.",
        ],
        accent: "from-sky-500/80 via-cyan-400/70 to-blue-500/80",
      },
      {
        slug: "backend-notes",
        category: "Backend",
        date: "Apr 03, 2026",
        readTime: "5 min read",
        title: "What I learned while building the RESTful API for FeShenShop",
        excerpt:
          "The backend helped me understand route separation, cleaner data structure, and how to keep a project organized enough for the frontend, dashboard, and mobile app to share one logic layer.",
        focus:
          "An API does not need to be overly complex, but it does need to be clear, stable, and easy to extend as the system grows.",
        takeaways: [
          "Consistent naming and route grouping reduce chaos later.",
          "CORS, validation, and clear error responses are non-negotiable.",
          "A solid backend makes the full-stack story much more convincing.",
        ],
        body: [
          "In FeShenShop, I used the RESTful API layer as a way to train system thinking. Even though the project is personal, I still wanted the backend to have clean structure, sensible endpoints, and consistent responses so the frontend would stay easier to maintain.",
          "Once the backend foundation is stable, the dashboard, storefront, and mobile app can all rely on the same data model. That makes the project feel like one connected system instead of disconnected demos.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "Apr 03, 2026",
        readTime: "4 min read",
        title: "How I use AI Prompting and Gemini inside the portfolio website",
        excerpt:
          "I do not use AI only for content generation. The goal is to turn AI into a communication layer that can answer quickly about my CV, projects, skills, and internship direction.",
        focus:
          "The AI should stay concise, resume-aware, and supportive of the portfolio rather than overpowering it.",
        takeaways: [
          "Prompts need to stay grounded in real CV and project data.",
          "Model fallback and error handling matter for production stability.",
          "Answer formatting shapes user trust more than I first expected.",
        ],
        body: [
          "The AI FAQ inside the website is where I explored how Gemini can work with profile data. I wanted visitors to ask directly about my stack, projects, and direction without reading every section of the site first.",
          "That forced me to think more carefully about prompts, output structure, and API protection. The biggest lesson is that AI on a portfolio should not talk too much. It should answer just enough to strengthen the credibility of the profile.",
        ],
        accent: "from-fuchsia-500/80 via-violet-400/70 to-sky-500/80",
      },
      {
        slug: "portfolio-direction",
        category: "Career",
        date: "Apr 03, 2026",
        readTime: "3 min read",
        title: "How I use a blog to make my internship portfolio less flat",
        excerpt:
          "A portfolio that only lists technologies often looks interchangeable. The blog helps me show how I think, what I prioritize, and how I learn from real project work.",
        focus:
          "Visitors should not only see what I built, but also understand why I approached it that way.",
        takeaways: [
          "A blog turns projects into a story instead of a stack list.",
          "Short focused articles are more useful than broad generic essays.",
          "A stronger portfolio shows both thinking and implementation.",
        ],
        body: [
          "When preparing a portfolio for internship applications, I realized many candidates can list React, Node.js, or Git on a CV. The real difference comes from showing how those tools were used inside a concrete product and why certain decisions were made.",
          "That is why I added a blog as an extra layer. It lets me talk about interface decisions, project structure, AI usage, and the areas I am still improving. For recruiters, this gives a clearer view into how I approach work.",
        ],
        accent: "from-amber-400/80 via-orange-400/70 to-rose-500/80",
      },
    ],
  },
};
