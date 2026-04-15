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
      "Những bài viết kỹ thuật gắn trực tiếp với FeShenShop, portfolio và AI workflow tôi đã triển khai",
    subtitle:
      "Trang blog này tập trung vào những gì tôi đã thật sự làm trong FeShenShop và chính portfolio này: cách tôi tách frontend, backend, tích hợp AI và biến từng phần thành một sản phẩm có thể trình bày rõ ràng.",
    listEyebrow: "Bài viết",
    ctaEyebrow: "Kết nối",
    topicsTitle: "Các trục nội dung tôi đang dùng để xây credibility",
    topics: [
      "Frontend thực chiến với React và trải nghiệm mua sắm",
      "Kiến trúc backend cho một hệ thống có AI route",
      "AI integration theo nghiệp vụ thay vì gắn cho có",
      "Cách biến project cá nhân thành câu chuyện đủ thuyết phục",
    ],
    featuredLabel: "Bài nổi bật",
    featuredTitle:
      "Từ FeShenShop đến portfolio cá nhân: cách tôi biến một project học tập thành câu chuyện kỹ thuật có thể trình bày",
    featuredDescription:
      "Bài mở đầu này gom lại toàn bộ hệ thống FeShenShop theo góc nhìn portfolio: storefront, RESTful API, dashboard, mobile app và lớp AI để người xem hiểu nhanh tôi thực sự đã làm gì.",
    featuredPoints: [
      "Tách rõ frontend, backend, dashboard và mobile để năng lực không bị dồn vào một card chung.",
      "Chỉ ra AI được gắn vào đúng luồng sản phẩm thay vì thêm một chatbot độc lập.",
      "Dùng blog như lớp giải thích cho recruiter ngoài CV, FAQ và ảnh chụp màn hình.",
      "Biến mỗi bài viết thành một bằng chứng kỹ thuật có thể click vào và kiểm chứng.",
    ],
    stats: [
      { value: "04", label: "Bài kỹ thuật" },
      { value: "04", label: "Case study liên kết" },
      { value: "01", label: "Hệ thống xuyên suốt" },
    ],
    listTitle: "Bài viết hiện có",
    listSubtitle:
      "Mỗi bài đều bám vào thứ tôi đã trực tiếp build, có liên kết về project case study để người xem đọc theo chiều sâu thay vì chỉ nhìn qua card tổng quan.",
    readArticle: "Đọc bài viết",
    detailLabel: "Nội dung chi tiết",
    summaryLabel: "Tóm tắt nhanh",
    takeawayLabel: "Điểm chính",
    credibilityLabel: "Điều bài này chứng minh",
    systemsLabel: "Hệ thống / phần liên quan",
    relatedProjectLabel: "Case study liên quan",
    ctaTitle: "Muốn đi tiếp từ blog sang project thật?",
    ctaSubtitle:
      "Sau khi đọc bài viết, bạn có thể mở thẳng case study của từng phần trong FeShenShop hoặc chuyển sang trang liên hệ để trao đổi sâu hơn.",
    ctaPrimary: "Đi tới liên hệ",
    ctaSecondary: "Xem case study dự án",
    sectionBadge: "Blog",
    sectionTitle: "",
    sectionSubtitle: "",
    sectionCta: "Mở trang blog",
    posts: [
      {
        slug: "frontend-foundation",
        category: "Frontend",
        date: "03 Apr 2026",
        readTime: "4 phút đọc",
        title: "Frontend tôi đang dùng cho portfolio và FeShenShop web",
        excerpt:
          "Ngoài React và TypeScript cho storefront, tôi còn gắn AI chat widget, voice input và visual search để trải nghiệm mua sắm không dừng ở việc duyệt sản phẩm thủ công.",
        focus:
          "Phần web không chỉ là UI bán hàng mà còn là nơi tôi thử AI tư vấn size, gợi ý outfit và tìm sản phẩm từ ảnh tải lên.",
        takeaways: [
          "Chat widget AI được nối trực tiếp với lịch sử hội thoại và dữ liệu sản phẩm.",
          "Visual search cho phép upload ảnh, gửi qua backend AI và nhận danh sách sản phẩm gần nhất.",
          "Voice input giúp luồng hỏi AI trên web gần với hành vi mua sắm thực tế hơn.",
        ],
        credibilityPoints: [
          "Tôi không chỉ dựng UI mà còn biết gắn trải nghiệm AI vào đúng hành vi người dùng.",
          "Tôi hiểu cách demo frontend bằng một luồng sản phẩm có chiều sâu thay vì chỉ có landing page.",
          "Tôi có thể nối frontend với AI service và dữ liệu sản phẩm thật.",
        ],
        systems: ["Storefront UI", "Product detail", "AI chat widget", "Visual search"],
        relatedProjectSlug: "feshenshop-web-storefront",
        body: [
          "Ở FeShenShop web, tôi không dừng ở phần storefront cơ bản. Tôi thêm chat widget để người dùng hỏi về sản phẩm, size và outfit, đồng thời giữ product card xuất hiện ngay trong luồng chat để AI trả lời bám vào dữ liệu thật thay vì chỉ nhả text chung chung.",
          "Điểm làm phần này đáng đưa lên portfolio hơn là visual search. Người dùng có thể tải ảnh lên, frontend gửi ảnh sang backend AI layer để phân tích món đồ chính rồi trả về các sản phẩm tương tự. Khi AI vision không sẵn sàng, hệ thống vẫn có fallback để giữ trải nghiệm không bị gãy hoàn toàn.",
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
          "Backend của FeShenShop không chỉ có CRUD. Tôi tách riêng lớp AI route cho chat, generate nội dung và visual search, đồng thời giữ phân quyền, rate limit và fallback đủ rõ để vận hành an toàn hơn.",
        focus:
          "Điểm quan trọng nhất là AI không được phá cấu trúc hệ thống; nó phải là một service layer có quyền truy cập, guard và đường lui rõ ràng.",
        takeaways: [
          "AI chat, AI generate và visual search được tách thành route riêng thay vì trộn vào CRUD.",
          "Role-based auth và rate limit giúp các tính năng AI không mở hoàn toàn cho mọi loại người dùng.",
          "Visual search có fallback pHash và color histogram khi AI vision lỗi hoặc offline.",
        ],
        credibilityPoints: [
          "Tôi hiểu backend ở mức service design chứ không chỉ viết API CRUD.",
          "Tôi biết cách đưa AI vào kiến trúc có guard, quyền và fallback.",
          "Tôi có thể giải thích quyết định kỹ thuật thay vì chỉ liệt kê stack.",
        ],
        systems: ["REST API", "AI routes", "Rate limit", "Fallback search"],
        relatedProjectSlug: "feshenshop-rest-api",
        body: [
          "Khi dựng backend cho FeShenShop, tôi giữ phần AI như một nhóm route riêng: chat cho assistant, generate cho nội dung quản trị như coupon hoặc product description, và visual-search cho tìm kiếm từ ảnh. Điều này giúp web, dashboard và mobile đều có cách gọi rõ ràng hơn.",
          "Phần tôi thấy đáng giá nhất là visual search. AI service dùng Ollama hoặc Gemini để phân tích ảnh thành dữ liệu có cấu trúc như loại sản phẩm, màu sắc, chất liệu và style. Nếu vision fail, hệ thống chuyển sang pHash và color histogram bằng sharp để vẫn trả về kết quả gần đúng thay vì hỏng hẳn.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "03 Apr 2026",
        readTime: "4 phút đọc",
        title: "Cách tôi tích hợp AI vào FeShenShop thay vì chỉ thêm chatbot cho có",
        excerpt:
          "Repo WebBanQuanAO cho thấy tôi dùng AI ở nhiều lớp: trợ lý mua sắm, visual search, admin insight, AI tạo coupon, AI viết mô tả sản phẩm và màn AI chat trên mobile.",
        focus:
          "Điều tôi ưu tiên là AI phải bám vào nghiệp vụ thật của shop, có prompt rõ, guard rõ và fallback rõ.",
        takeaways: [
          "Chatbot khách hàng có knowledge về size, shipping, đổi trả và gọi tool theo ngữ cảnh.",
          "Admin dashboard dùng AI để phân tích dữ liệu thật thay vì chỉ hiển thị chart tĩnh.",
          "AI generate hỗ trợ coupon, product description và gợi ý trả lời chat cho vận hành nội bộ.",
        ],
        credibilityPoints: [
          "Tôi biết phân biệt giữa AI demo và AI product feature.",
          "Tôi có thể tích hợp AI xuyên frontend, backend, dashboard và mobile.",
          "Tôi hiểu AI cần prompt, guard và fallback để dùng được trong sản phẩm thật.",
        ],
        systems: ["Shopping assistant", "Visual search", "Admin insight", "Mobile AI chat"],
        relatedProjectSlug: "feshenshop-admin-dashboard",
        body: [
          "Trong WebBanQuanAO, AI không chỉ nằm ở một ô chat. Ở phía user, tôi có shopping assistant để tư vấn sản phẩm và size, visual search để tải ảnh và tìm món đồ tương tự, còn mobile app cũng có route AI chat riêng. Ở phía admin, tôi thêm AI insight panel cho analytics, inventory, orders, customers, reviews và coupons để hỗ trợ nhìn dữ liệu nhanh hơn.",
          "Điểm tôi muốn nhấn mạnh trong portfolio là cách tích hợp. Tôi viết prompt theo từng vai trò, chia route riêng cho chat, generate và visual-search, thêm phân quyền và rate limit, rồi chuẩn bị fallback thuật toán cho visual search khi AI vision không sẵn sàng. Với tôi, đó mới là phần cho thấy mình đang dùng AI như một lớp sản phẩm thật.",
        ],
        accent: "from-fuchsia-500/80 via-violet-400/70 to-sky-500/80",
      },
      {
        slug: "portfolio-direction",
        category: "Career",
        date: "03 Apr 2026",
        readTime: "3 phút đọc",
        title: "Tôi dùng blog để làm portfolio bớt phẳng như thế nào",
        excerpt:
          "Một portfolio chỉ liệt kê stack thường khá giống nhau. Blog giúp tôi cho thấy cách mình suy nghĩ, cách mình ưu tiên và cách mình học từ project thật.",
        focus:
          "Người xem không chỉ nhìn thấy mình đã làm gì, mà còn hiểu vì sao mình làm theo hướng đó.",
        takeaways: [
          "Blog biến project thành câu chuyện thay vì danh sách công nghệ.",
          "Bài viết ngắn nhưng đúng trọng tâm dễ đọc hơn bài dài chung chung.",
          "Portfolio có chiều sâu hơn khi nội dung nói được cả tư duy và sản phẩm.",
        ],
        credibilityPoints: [
          "Tôi có thể tự giải thích sản phẩm và quyết định kỹ thuật của mình.",
          "Tôi biết cách đóng gói một project thành narrative thuyết phục hơn cho recruiter.",
          "Portfolio của tôi có thêm lớp nội dung để chứng minh cách tôi tiếp cận công việc.",
        ],
        systems: ["Portfolio", "Case study", "Blog article flow", "Recruiter reading path"],
        relatedProjectSlug: "feshenshop-mobile-app",
        body: [
          "Khi chuẩn bị portfolio để đi thực tập, tôi nhận ra phần lớn ứng viên đều có thể ghi React, Node.js hay Git vào CV. Điều tạo khác biệt không nằm ở việc liệt kê thêm công nghệ, mà ở cách giải thích mình đã dùng chúng vào một sản phẩm cụ thể như thế nào.",
          "Vì vậy tôi thêm blog như một lớp nội dung bổ sung. Nó cho phép tôi nói về quyết định giao diện, cách tổ chức project, cách dùng AI và cả những gì tôi đang tiếp tục cải thiện. Với recruiter, đây là phần giúp nhìn rõ hơn cách tôi tiếp cận công việc.",
        ],
        accent: "from-amber-400/80 via-orange-400/70 to-rose-500/80",
      },
    ],
  },
  en: {
    eyebrow: "Technical blog",
    title:
      "Technical articles tied directly to FeShenShop, the portfolio, and the AI workflows I have implemented",
    subtitle:
      "This blog focuses on the work I actually built across FeShenShop and this portfolio: how I split frontend and backend, integrate AI, and turn each part into something clear enough to present.",
    listEyebrow: "Articles",
    ctaEyebrow: "Connect",
    topicsTitle: "The credibility tracks I am building through content",
    topics: [
      "Hands-on frontend with React and shopping UX",
      "Backend structure for a product with AI routes",
      "AI integration tied to real workflows instead of gimmicks",
      "Turning a personal project into a stronger story for recruiters",
    ],
    featuredLabel: "Featured article",
    featuredTitle:
      "From FeShenShop to a personal portfolio: how I turned one learning project into a presentable technical story",
    featuredDescription:
      "This opening piece reframes the whole FeShenShop system through the lens of a portfolio: storefront, RESTful API, dashboard, mobile app, and the AI layer that connects them.",
    featuredPoints: [
      "Separate frontend, backend, dashboard, and mobile so each skill is visible.",
      "Show AI in real product flows instead of hiding it inside a generic chat box.",
      "Use the blog as an explanation layer beyond the CV, screenshots, and FAQ.",
      "Turn every article into a technical proof point that can be clicked and verified.",
    ],
    stats: [
      { value: "04", label: "Technical articles" },
      { value: "04", label: "Linked case studies" },
      { value: "01", label: "Connected system story" },
    ],
    listTitle: "Current articles",
    listSubtitle:
      "Each article stays tied to something I actually built, and each one links back to a project case study so visitors can move from narrative into proof.",
    readArticle: "Read article",
    detailLabel: "Detailed note",
    summaryLabel: "Quick summary",
    takeawayLabel: "Key points",
    credibilityLabel: "What this article proves",
    systemsLabel: "Related systems",
    relatedProjectLabel: "Related case study",
    ctaTitle: "Want to move from the blog into the real project work?",
    ctaSubtitle:
      "After reading the article, you can open the matching project case study or move to the contact page to discuss the work in more detail.",
    ctaPrimary: "Go to contact",
    ctaSecondary: "View project case studies",
    sectionBadge: "Blog",
    sectionTitle:
      "The blog is now a technical credibility layer for the portfolio, not a side section",
    sectionSubtitle:
      "Each article is tied directly to a real product slice or AI workflow so visitors can see both how I think and how I ship.",
    sectionCta: "Open blog page",
    posts: [
      {
        slug: "frontend-foundation",
        category: "Frontend",
        date: "Apr 03, 2026",
        readTime: "4 min read",
        title: "The frontend stack I am using for the portfolio and FeShenShop web",
        excerpt:
          "Beyond React and TypeScript for the storefront, I integrated an AI chat widget, voice input, and visual search so the shopping experience goes beyond browsing a static product grid.",
        focus:
          "The web layer is not only a commerce UI. It is also where I test AI-assisted shopping, sizing help, and image-based discovery.",
        takeaways: [
          "The AI chat widget is connected to conversation history and real product data.",
          "Visual search lets users upload an image and receive similar in-store products.",
          "Voice input makes the AI shopping flow feel closer to real user behavior.",
        ],
        credibilityPoints: [
          "I can do more than build UI. I can place AI into a real user flow.",
          "I know how to demo frontend work through a richer product journey.",
          "I can connect frontend behavior to AI services and product data.",
        ],
        systems: ["Storefront UI", "Product detail", "AI chat widget", "Visual search"],
        relatedProjectSlug: "feshenshop-web-storefront",
        body: [
          "In the FeShenShop web app, I did not stop at storefront basics. I added an AI chat widget so users can ask about products, sizes, and outfit suggestions, while still keeping product cards visible inside the conversation flow instead of returning generic text alone.",
          "The stronger portfolio angle is visual search. Users can upload an image, the frontend passes it to the backend AI layer, and the system returns visually similar products. When the vision path is unavailable, the app still falls back to similarity matching so the feature does not collapse completely.",
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
          "The backend is not only CRUD. I separated AI routes for chat, content generation, and visual search while keeping access control, rate limiting, and fallback logic explicit.",
        focus:
          "The important part is that AI should not weaken the system design; it should live inside a guarded service layer.",
        takeaways: [
          "AI chat, AI generation, and visual search live in their own route group.",
          "Role-based auth and rate limiting keep AI features from being completely open.",
          "Visual search has a pHash and color-histogram fallback when vision AI is unavailable.",
        ],
        credibilityPoints: [
          "I understand backend design beyond CRUD endpoints.",
          "I know how to integrate AI with guards, permissions, and fallback paths.",
          "I can explain the architectural decisions behind my backend work.",
        ],
        systems: ["REST API", "AI routes", "Rate limit", "Fallback search"],
        relatedProjectSlug: "feshenshop-rest-api",
        body: [
          "While building the FeShenShop backend, I kept the AI layer as its own route family: chat for assistants, generate for internal content such as coupons or product descriptions, and visual search for image-based discovery. That made the API easier to reason about from the web, dashboard, and mobile clients.",
          "The most valuable piece is the visual-search service. It uses Ollama or Gemini to turn an image into structured fashion attributes such as product type, color, material, and style. If the AI path fails, the service falls back to perceptual hashing and color histograms with sharp so the feature still returns a usable result.",
        ],
        accent: "from-emerald-500/80 via-teal-400/70 to-cyan-500/80",
      },
      {
        slug: "ai-workflow",
        category: "AI Workflow",
        date: "Apr 03, 2026",
        readTime: "4 min read",
        title: "How I integrated AI into FeShenShop instead of adding a generic chatbot",
        excerpt:
          "The WebBanQuanAO repo shows AI across multiple layers: shopping assistant, visual search, admin insights, AI coupon generation, AI product writing, and a dedicated mobile AI chat screen.",
        focus:
          "What matters most to me is making AI serve real store workflows with clear prompts, clear guards, and clear fallback paths.",
        takeaways: [
          "The customer assistant knows store policies, sizing, and when to call tools for live data.",
          "The admin dashboard uses AI to analyze real data instead of only displaying charts.",
          "AI generation helps with coupons, product descriptions, and reply suggestions for operations.",
        ],
        credibilityPoints: [
          "I can tell the difference between an AI demo and an AI product feature.",
          "I can integrate AI across frontend, backend, dashboard, and mobile.",
          "I understand prompts, guards, and fallback as product requirements, not optional extras.",
        ],
        systems: ["Shopping assistant", "Visual search", "Admin insight", "Mobile AI chat"],
        relatedProjectSlug: "feshenshop-admin-dashboard",
        body: [
          "Inside WebBanQuanAO, AI is not isolated to one chat box. On the customer side, I have a shopping assistant for product and size advice, visual search for uploaded images, and a dedicated AI chat flow in the Flutter mobile app. On the admin side, I added AI insight panels for analytics, inventory, orders, customers, reviews, and coupons so the dashboard can interpret real data faster.",
          "The part I want the portfolio to communicate is the integration work itself. I wrote prompts for different roles, split chat, generate, and visual-search into separate routes, added authorization and rate limiting, and prepared an algorithmic fallback for vision search when AI is unavailable. That is what makes the AI layer feel like a real product feature rather than a simple model call.",
        ],
        accent: "from-fuchsia-500/80 via-violet-400/70 to-sky-500/80",
      },
      {
        slug: "portfolio-direction",
        category: "Career",
        date: "Apr 03, 2026",
        readTime: "3 min read",
        title: "How I use a blog to make my portfolio less flat",
        excerpt:
          "A portfolio that only lists technologies often feels interchangeable. The blog helps me show how I think, what I prioritize, and how I learn from real project work.",
        focus:
          "Visitors should not only see what I built, but also understand why I approached it that way.",
        takeaways: [
          "A blog turns projects into a story instead of a stack list.",
          "Short focused articles are more useful than broad generic essays.",
          "A stronger portfolio shows both thinking and implementation.",
        ],
        credibilityPoints: [
          "I can explain my own product and technical decisions clearly.",
          "I know how to turn a personal project into a stronger recruiter narrative.",
          "The portfolio now includes a content layer that proves how I approach work.",
        ],
        systems: ["Portfolio", "Case study", "Blog article flow", "Recruiter reading path"],
        relatedProjectSlug: "feshenshop-mobile-app",
        body: [
          "When preparing a portfolio for internship applications, I realized many candidates can list React, Node.js, or Git on a CV. The real difference comes from showing how those tools were used inside a concrete product and why certain decisions were made.",
          "That is why I added a blog as an extra layer. It lets me talk about interface decisions, project structure, AI usage, and the areas I am still improving. For recruiters, this gives a clearer view into how I approach work.",
        ],
        accent: "from-amber-400/80 via-orange-400/70 to-rose-500/80",
      },
    ],
  },
};

export function getBlogPostBySlug(language: Language, slug: string) {
  return blogCopy[language].posts.find((post) => post.slug === slug) ?? null;
}
