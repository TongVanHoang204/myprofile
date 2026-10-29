import type { Language } from "@/app/data/dictionaries";

export type ProjectFilter = "all" | "website" | "backend";

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
  liveLinkLabel?: string;
  quickScan?: {
    label: string;
    text: string;
  }[];
  features?: string[];
  userFlow?: string[];
  architecture?: string[];
  challenges?: string[];
  deepSections?: {
    title: string;
    items: string[];
  }[];
  nextSteps?: string[];
  gallery?: ProjectScreenshot[];
};

export type ProjectScreenshot = {
  src: string;
  caption: string;
  device?: "desktop" | "mobile";
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
      "Nurfia là hệ thống thương mại điện tử thời trang tôi trực tiếp xây dựng: web storefront, RESTful API, dashboard quản trị — triển khai tại vanhoang.mauweb68.com.",
    caseStudyEyebrow: "Case study",
    caseStudyTitle: "Đọc nhanh từng phần tôi đã trực tiếp làm",
    caseStudySubtitle:
      "Mỗi phần của Nurfia được tóm tắt theo đúng bản chất công việc: storefront tập trung vào trải nghiệm mua hàng, API tập trung vào contract và guard, dashboard tập trung vào vận hành.",
    openCaseStudy: "Mở case study",
    filters: {
      all: "Tất cả",
      website: "Trang web",
      backend: "Backend",
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
          "Storefront thời trang song ngữ Việt/Anh xây bằng React 19, TypeScript và Vite: đi trọn từ homepage, shop có filter, product detail theo biến thể, giỏ hàng, checkout 4 phương thức thanh toán đến tài khoản khách hàng, kèm AI shopping assistant gợi ý sản phẩm thật từ database.",
        summary:
          "Phần web là nơi tôi nối UI, dữ liệu sản phẩm, thanh toán và AI thành một luồng mua sắm hoàn chỉnh, đang chạy thực tế tại vanhoang.mauweb68.com.",
        thumbnail: "/projects/nurfia-web/01-home.jpg",
        tags: ["React 19", "TypeScript", "Vite", "Zustand", "i18n VI/EN", "AI Chat"],
        objective:
          "Xây một storefront thời trang có đủ luồng mua hàng thật — từ khám phá sản phẩm, chọn biến thể còn hàng, áp coupon, chọn phí ship theo khu vực đến thanh toán — chạy tốt trên desktop lẫn mobile, và gắn AI vào đúng chỗ khách cần tư vấn.",
        role: [
          "Tự thiết kế và code toàn bộ giao diện khách hàng bằng React 19 + TypeScript, style bằng CSS thuần theo từng component, có light/dark theme theo hệ thống và song ngữ Việt/Anh bằng i18next.",
          "Xây các trang: homepage, category, shop, product detail, cart drawer, cart, checkout, order confirmation, compare, blog, contact, policy, notifications và tài khoản (đơn hàng, wishlist, sổ địa chỉ).",
          "Làm luồng checkout với địa chỉ tỉnh/huyện/xã, kiểm tra coupon, lấy phương án giao hàng theo khu vực và 4 phương thức thanh toán: COD, chuyển khoản (upload ảnh chứng từ), MoMo, Stripe.",
          "Tích hợp AI chatbot, thông báo realtime qua Socket.IO và Axios client dùng chung có cookie auth + CSRF token.",
        ],
        stack: [
          "React 19",
          "TypeScript",
          "Vite",
          "React Router 7",
          "Zustand",
          "Axios",
          "i18next",
          "React Hook Form + Zod",
          "Socket.IO Client",
          "Swiper",
          "DOMPurify",
          "Apache (.htaccess)",
        ],
        aiUse:
          "AI shopping assistant chỉ hiện khi khách đã đăng nhập. Backend nạp danh sách sản phẩm đang bán, cài đặt cửa hàng và giỏ hàng của khách làm ngữ cảnh; AI trả về thẻ [PRODUCT|...] và frontend render thành product card bấm được. Có quick intents (phối đồ, giao hàng, đổi trả, so sánh, size, tóm tắt giỏ, liên hệ nhân viên), lưu lịch sử chat theo tài khoản và nút đánh giá câu trả lời.",
        result:
          "Nurfia Storefront là bề mặt demo chính của hệ thống: cho thấy tôi làm được UI thương mại cao cấp, xử lý đúng biến thể/tồn kho/coupon/phí ship/thanh toán, và gắn AI vào flow mua sắm bằng dữ liệu thật thay vì chatbot chung chung. Xem tại: https://vanhoang.mauweb68.com/",
        outcomes: [
          "Luồng mua hàng đầy đủ từ browse → biến thể → giỏ → checkout → xác nhận đơn → theo dõi đơn trong tài khoản.",
          "4 phương thức thanh toán (COD, chuyển khoản, MoMo, Stripe) cùng coupon và phí ship theo khu vực.",
          "Song ngữ Việt/Anh, light/dark theme và responsive desktop/mobile.",
          "Đang deploy thực tế trên vanhoang.mauweb68.com (Apache, HTTPS + HSTS + CSP).",
        ],
        relatedBlogSlugs: ["frontend-foundation", "ai-workflow"],
        liveLink: "https://vanhoang.mauweb68.com/",
        quickScan: [
          {
            label: "Điểm nhìn chính",
            text: "Bề mặt khách hàng nhìn thấy đầu tiên: browse sản phẩm, chọn biến thể, giỏ hàng, checkout 4 phương thức thanh toán và AI hỗ trợ mua sắm.",
          },
          {
            label: "Luồng quan trọng",
            text: "Shop filter → product detail chọn màu/size còn hàng → giỏ hàng → checkout áp coupon, chọn phí ship theo tỉnh → thanh toán → trang xác nhận đơn.",
          },
          {
            label: "Điểm kỹ thuật nổi bật",
            text: "Filter state nằm trên URL, Zustand tách store cart/wishlist/compare/auth, Axios client tự gắn CSRF token và AI render product card từ database.",
          },
        ],
        features: [
          "Luồng storefront đầy đủ: homepage có banner và popup ưu đãi, category, shop, product detail, cart drawer, cart page, checkout, order confirmation.",
          "Shop page lọc theo giá, màu, size, brand, category; sort theo mới nhất, giá, tên, độ phổ biến, rating; có active filters, pagination và recently viewed.",
          "Ô tìm kiếm có autocomplete debounce gọi /products/search-suggest để gợi ý sản phẩm khi đang gõ.",
          "Product detail có gallery kiểu Shopee, lightbox, chọn màu/size theo tồn kho, giới hạn số lượng, wishlist, compare, buy now, review và sản phẩm liên quan.",
          "Checkout có địa chỉ tỉnh/huyện/xã, validate coupon, chọn phương án giao hàng, thanh toán COD / chuyển khoản / MoMo / Stripe.",
          "Tài khoản khách: lịch sử đơn, huỷ đơn, đặt lại đơn cũ, wishlist, sổ địa chỉ, đổi mật khẩu bằng OTP email, quên/đặt lại mật khẩu.",
          "Thông báo realtime qua Socket.IO, trang notifications riêng và chuông thông báo trên header.",
        ],
        userFlow: [
          "Khách vào homepage hoặc category, dùng ô tìm kiếm autocomplete hoặc vào shop để lọc sản phẩm theo nhu cầu.",
          "Ở product detail, khách chọn tổ hợp màu/size còn hàng, xem gallery, review, sản phẩm liên quan, rồi Add to Cart hoặc Buy Now.",
          "Ở checkout, khách nhập địa chỉ, áp coupon, chọn phương án giao hàng (có ngưỡng freeship) và phương thức thanh toán.",
          "Sau khi đặt, khách xem trang xác nhận, nhận email, theo dõi đơn trong tài khoản và nhận thông báo khi trạng thái đơn thay đổi.",
          "Khi cần tư vấn, khách mở AI chat để được gợi ý sản phẩm, hỏi chính sách hoặc được hướng dẫn liên hệ nhân viên với case cần người xử lý.",
        ],
        architecture: [
          "React + Vite SPA dùng React Router 7 cho nhánh customer và admin, lazy-load page để giảm tải lần đầu.",
          "Zustand tách store cho auth, cart, wishlist, compare, notification và UI; Context riêng cho theme và site settings.",
          "Axios client dùng chung gửi cookie, tự lấy CSRF token cho request ghi dữ liệu và retry khi token hết hạn.",
          "Form dùng React Hook Form + Zod; nội dung HTML từ CMS được làm sạch bằng DOMPurify trước khi render.",
          "Build tĩnh deploy trên Apache: .htaccess xử lý SPA routing, ép HTTPS, HSTS, CSP, X-Frame-Options, nosniff và Referrer-Policy.",
        ],
        challenges: [
          "Giữ flow mua hàng rõ ràng dù có nhiều tính năng phụ như wishlist, compare, recently viewed, review, popup và AI chat.",
          "Biến thể màu/size phải kiểm tra tồn kho trước khi cho chọn, số lượng không vượt stock của biến thể hoặc sản phẩm gốc.",
          "Checkout phải phối hợp coupon, phí ship theo khu vực và 4 phương thức thanh toán có luồng xử lý khác nhau.",
          "Cookie auth + CSRF buộc frontend tự quản lý token, gắn header và retry; logout thất bại vì mạng thì phải giữ phiên để thử lại.",
        ],
        deepSections: [
          {
            title: "Bề mặt thương mại",
            items: [
              "Storefront có homepage (slider, banner, popup ưu đãi do admin cấu hình), category, shop, product detail, cart drawer, cart page, checkout và order confirmation.",
              "Product card có hover image, sale badge, wishlist action, rating và link vào detail; product detail có gallery thumbnail kiểu Shopee, lightbox, review và sản phẩm liên quan.",
              "Ngoài mua hàng còn có blog, trang so sánh sản phẩm, liên hệ + đăng ký newsletter và các trang chính sách.",
            ],
          },
          {
            title: "Tìm kiếm và lọc sản phẩm",
            items: [
              "Shop page lưu filter/sort/page trên URL search params, reload hoặc chia sẻ link vẫn giữ nguyên trạng thái lọc.",
              "Filter giá, màu, size, brand, category lấy option từ /products/filters thay vì hard-code ở frontend.",
              "Search autocomplete debounce gọi /products/search-suggest; recently viewed lưu localStorage rồi gọi /products/by-ids để lấy dữ liệu mới nhất.",
            ],
          },
          {
            title: "Giỏ hàng và biến thể",
            items: [
              "Product detail chỉ cho chọn tổ hợp màu/size còn hàng, tránh add nhầm biến thể đã hết.",
              "Số lượng bị giới hạn theo stock thực tế của biến thể đang chọn hoặc của sản phẩm gốc.",
              "Buy Now dùng chung luồng add-to-cart nhưng chuyển thẳng sang checkout, còn Add to Cart mở cart drawer để kiểm tra nhanh.",
            ],
          },
          {
            title: "Checkout và thanh toán",
            items: [
              "Form địa chỉ theo tỉnh/huyện/xã, gọi /orders/shipping-options để lấy phí ship theo khu vực (có ngưỡng miễn phí vận chuyển).",
              "Coupon được kiểm tra qua /orders/validate-coupon trước khi đặt: hạn dùng, giá trị đơn tối thiểu, giới hạn lượt và mức giảm tối đa.",
              "Hỗ trợ COD, chuyển khoản ngân hàng (khách upload ảnh chứng từ), ví MoMo và Stripe Checkout; xong đơn chuyển sang trang xác nhận và gửi email.",
            ],
          },
          {
            title: "Tài khoản và realtime",
            items: [
              "Trang tài khoản có lịch sử đơn hàng, huỷ đơn, đặt lại đơn cũ, wishlist và sổ địa chỉ.",
              "Đổi mật khẩu cần OTP gửi qua email; có quên/đặt lại mật khẩu qua link; đổi mật khẩu xong buộc đăng nhập lại vì token cũ đã bị thu hồi.",
              "Socket.IO đẩy thông báo đơn hàng và trạng thái tài khoản về chuông thông báo và trang notifications.",
            ],
          },
          {
            title: "Lớp AI mua sắm",
            items: [
              "Chatbot chỉ hiển thị khi đã đăng nhập, tránh biến storefront thành chatbot công khai không kiểm soát.",
              "Quick intents cho phối đồ, giao hàng, đổi trả, so sánh, bảng size, tóm tắt giỏ hàng và liên hệ nhân viên; lịch sử chat lưu theo tài khoản.",
              "AI trả về thẻ [PRODUCT|id|tên|giá|ảnh|slug], frontend render thành product card bấm vào được ngay trong khung chat.",
            ],
          },
        ],
        nextSteps: [
          "Thêm trang theo dõi đơn hàng chi tiết theo timeline trạng thái và vận chuyển.",
          "Gợi ý sản phẩm cá nhân hoá dựa trên recently viewed, wishlist và giỏ hàng ngoài khung chat.",
          "Tách chunk JS lớn hơn 500 kB để cải thiện tốc độ tải lần đầu trên mobile.",
        ],
        gallery: [
          { src: "/projects/nurfia-web/01-home.jpg", caption: "Trang chủ với hero slider và menu danh mục" },
          { src: "/projects/nurfia-web/02-home-products.jpg", caption: "Khối sản phẩm nổi bật theo tab New Arrival / Featured / Bestsellers" },
          { src: "/projects/nurfia-web/03-promo-popup.jpg", caption: "Popup ưu đãi trang chủ do admin cấu hình" },
          { src: "/projects/nurfia-web/04-shop-filters.jpg", caption: "Trang shop với filter danh mục, giá, màu, size" },
          { src: "/projects/nurfia-web/05-product-detail.jpg", caption: "Product detail: chọn màu/size, tồn kho, Add to Cart, Buy Now" },
          { src: "/projects/nurfia-web/06-search-autocomplete.jpg", caption: "Tìm kiếm autocomplete gợi ý sản phẩm khi đang gõ" },
          { src: "/projects/nurfia-web/07-dark-mode.jpg", caption: "Giao diện dark mode" },
          { src: "/projects/nurfia-web/08-mobile-home.jpg", caption: "Trang chủ trên mobile", device: "mobile" },
          { src: "/projects/nurfia-web/09-mobile-product.jpg", caption: "Product detail trên mobile", device: "mobile" },
        ],
      },
      {
        slug: "nurfia-rest-api",
        category: "backend",
        title: "Nurfia RESTful API",
        shortTitle: "RESTful API",
        eyebrow: "Backend / Service Layer",
        liveLink: "https://web-nurfia.onrender.com/api-docs/",
        liveLinkLabel: "Xem tài liệu API",
        description:
          "Backend Node.js + Express 5 + TypeScript dùng Prisma và PostgreSQL, deploy trên Render, có Swagger docs: 19 nhóm route cho catalog, giỏ hàng, đơn hàng, thanh toán MoMo/Stripe, upload, thông báo realtime, AI và khu quản trị với phân quyền theo từng module.",
        summary:
          "Một backend duy nhất phục vụ cả storefront lẫn admin dashboard, được thiết kế với giao dịch an toàn, xác thực có thể thu hồi và lớp bảo mật nhiều tầng.",
        thumbnail: "/projects/nurfia-api.png",
        tags: ["Node.js", "Express 5", "TypeScript", "Prisma", "PostgreSQL", "Swagger"],
        objective:
          "Xây một API đủ chặt để phục vụ đồng thời storefront, dashboard quản trị và AI: dữ liệu đơn hàng/tồn kho phải nhất quán, thanh toán phải xác minh được, phân quyền phải chi tiết và mọi input đều được validate.",
        role: [
          "Thiết kế schema Prisma cho người dùng, sản phẩm/biến thể/thuộc tính, giỏ hàng, đơn hàng, coupon, vận chuyển, tồn kho, blog, thông báo, nhật ký hoạt động và lịch sử chat.",
          "Viết route/controller theo domain, validate body/query/params bằng Zod, tài liệu hoá endpoint bằng Swagger.",
          "Xử lý đặt hàng trong transaction (trừ kho, cộng lượt dùng coupon, ghi lịch sử trạng thái) và tích hợp thanh toán MoMo IPN, Stripe webhook.",
          "Làm xác thực JWT có thu hồi (token version), phân quyền 4 role + 15 permission module, rate limit, CSRF, kiểm tra file upload và tự rà soát bảo mật (security audit).",
        ],
        stack: [
          "Node.js",
          "Express 5",
          "TypeScript",
          "Prisma ORM",
          "PostgreSQL",
          "Zod",
          "JWT",
          "Socket.IO",
          "Swagger",
          "Stripe",
          "MoMo",
          "Cloudinary",
          "Nodemailer",
          "Render",
        ],
        aiUse:
          "Nhóm route /api/ai riêng gọi model qua OpenRouter (mặc định Gemini 2.5 Flash): /ai/chat cho shopping assistant dùng RAG nhẹ từ sản phẩm, settings và giỏ hàng; /ai/admin/generate cho admin viết mô tả sản phẩm, blog và popup. Có Zod validation, rate limit, timeout, lọc ký tự điều khiển chống prompt injection, chặn output dạng JSON/code/bảng và kiểm tra product tag phải là sản phẩm thật.",
        result:
          "Backend cho thấy tôi không chỉ viết CRUD mà xử lý được các bài toán thật của thương mại điện tử: transaction tồn kho, xác minh thanh toán, thu hồi phiên đăng nhập, phân quyền chi tiết và đưa AI vào hệ thống có guard rõ ràng.",
        outcomes: [
          "Một backend phục vụ storefront, admin dashboard và AI, có Swagger docs công khai.",
          "Đặt hàng chạy trong Prisma transaction, huỷ đơn tự hoàn kho và hoàn lượt coupon.",
          "Thanh toán MoMo xác minh chữ ký HMAC, Stripe xác minh webhook signature.",
          "Logout/đổi mật khẩu thu hồi toàn bộ JWT cũ, kể cả kết nối Socket.IO đang mở.",
        ],
        relatedBlogSlugs: ["backend-notes", "ai-workflow"],
        quickScan: [
          {
            label: "Điểm nhìn chính",
            text: "Service layer đứng sau toàn bộ hệ sinh thái Nurfia: storefront, admin dashboard, thanh toán, realtime và AI.",
          },
          {
            label: "Luồng quan trọng",
            text: "Request đi qua Helmet → CORS allow-list → rate limit → CSRF → auth/permission → Zod validate → Prisma, trả về một format lỗi thống nhất.",
          },
          {
            label: "Điểm kỹ thuật nổi bật",
            text: "Transaction tồn kho, MoMo/Stripe webhook có xác minh chữ ký, JWT thu hồi bằng token_version, 15 permission module và AI route có guard.",
          },
        ],
        features: [
          "REST API cho auth, products, categories, cart, orders, wishlist, compare, addresses, payment, banners, popups, blog, contact, settings, notifications, chat, upload và admin.",
          "Product API hỗ trợ search, search-suggest, filter category/brand/màu/size/giá/on-sale, 7 kiểu sort, phân trang, featured/bestsellers/new, by-category, by-ids và related.",
          "Order API: validate coupon, lấy phí ship theo vùng, tạo đơn, huỷ đơn, đặt lại, upload/xem chứng từ chuyển khoản.",
          "Thanh toán: COD, chuyển khoản, MoMo (create + IPN) và Stripe Checkout (session + webhook).",
          "Auth: đăng ký, đăng nhập, logout, quên/đặt lại mật khẩu, đổi mật khẩu bằng OTP email, profile.",
          "Swagger UI tại /api-docs, health check /api/health, Socket.IO cho thông báo và trạng thái tài khoản.",
        ],
        userFlow: [
          "Storefront gọi product/category API cho danh sách, filter, chi tiết, sản phẩm liên quan và recently viewed.",
          "Khách đăng nhập rồi dùng cart → validate-coupon → shipping-options → POST /orders để đặt hàng.",
          "Nếu chọn MoMo/Stripe, backend tạo phiên thanh toán; cổng thanh toán gọi lại IPN/webhook để backend xác minh và cập nhật trạng thái đơn.",
          "Admin dashboard gọi nhóm /api/admin để quản lý sản phẩm, tồn kho, đơn hàng, khách hàng, nhân viên, báo cáo và nội dung.",
          "AI chat gọi /api/ai/chat, backend nạp ngữ cảnh từ database, gọi model có timeout rồi lọc câu trả lời trước khi trả về.",
        ],
        architecture: [
          "Express 5 + TypeScript làm API layer, Prisma làm data access cho PostgreSQL; deploy trên Render.",
          "server.ts gom Helmet (CSP), CORS allow-list, raw body cho Stripe webhook, cookie parser, rate limit toàn API, CSRF, Swagger, static uploads, routes, 404 handler và error handler.",
          "Route/controller tách theo domain, middleware validate dùng Zod cho body, query và params.",
          "Service riêng cho auth, mail, notification, socket, activity log, chat retention và startup migration.",
          "Trước khi mở cổng HTTP/Socket.IO, server chạy bước kiểm tra schema idempotent; thất bại thì không khởi động.",
        ],
        challenges: [
          "Đặt hàng đồng thời có thể làm âm kho, nên toàn bộ tạo đơn, trừ kho và cộng lượt coupon nằm trong một transaction có kiểm tra stock.",
          "Callback thanh toán có thể bị giả mạo, nên MoMo IPN kiểm chữ ký bằng timing-safe comparison và Stripe dùng webhook signature.",
          "JWT là stateless nên khó thu hồi; giải pháp là token_version lưu trong DB, kiểm tra ở cả HTTP lẫn Socket.IO.",
          "Admin cần phân quyền chi tiết hơn ADMIN/CUSTOMER, và dữ liệu permission cũ phải map được sang module mới.",
        ],
        deepSections: [
          {
            title: "Hợp đồng API và catalog",
            items: [
              "19 nhóm route theo domain, tài liệu hoá trên Swagger với 17 tag (Auth, Products, Cart, Orders, Payment, Admin...).",
              "Product filter xử lý category cha/con, search theo tên/mô tả ngắn, khoảng giá, on-sale, featured, brand slug/name; màu/size dò theo tên thuộc tính thay vì hard-code ID.",
              "Query công khai bị chặn trước khi chạm DB nếu sai: page tối đa 10.000, limit tối đa 100, giá phải hữu hạn, không âm và minPrice ≤ maxPrice.",
            ],
          },
          {
            title: "Đơn hàng và tồn kho",
            items: [
              "Tạo đơn trong Prisma $transaction: tạo order + items, kiểm tra và trừ stock biến thể/sản phẩm, tăng salesCount, tăng usedCount coupon và ghi lịch sử trạng thái.",
              "Coupon PERCENTAGE/FIXED_AMOUNT có ngày bắt đầu/kết thúc, giới hạn lượt, giá trị đơn tối thiểu và mức giảm tối đa; phí ship tính theo vùng với ngưỡng freeship.",
              "Huỷ đơn hoàn lại tồn kho và lượt dùng coupon; sau khi đặt, hệ thống gửi thông báo cho khách và admin kèm email xác nhận.",
            ],
          },
          {
            title: "Thanh toán",
            items: [
              "Hỗ trợ 4 phương thức: COD, chuyển khoản ngân hàng, MoMo và Stripe Checkout.",
              "MoMo IPN trả 503 nếu chưa cấu hình khoá, kiểm tra merchant và chữ ký HMAC bằng timing-safe comparison; sai số tiền hoặc đơn đã huỷ/đã trả thì không xác nhận.",
              "Stripe webhook nhận raw body để verify signature; ảnh chứng từ chuyển khoản không truy cập công khai được qua /uploads.",
            ],
          },
          {
            title: "Xác thực và phiên đăng nhập",
            items: [
              "JWT đọc từ cookie hoặc Bearer header, mật khẩu hash bằng bcrypt, tài khoản bị khoá thì bị chặn ngay.",
              "Cột token_version: logout, đổi hoặc reset mật khẩu sẽ thu hồi mọi JWT cũ của tài khoản trên tất cả thiết bị, kể cả token dán vào Swagger.",
              "Socket.IO và stream admin đóng ngay khi token bị thu hồi; instance khác kiểm tra lại DB mỗi 15 giây. Đổi mật khẩu cần OTP 6 số, hết hạn sau 10 phút, tối đa 5 lần nhập.",
            ],
          },
          {
            title: "Phân quyền và bảo mật",
            items: [
              "4 role CUSTOMER / STAFF / MANAGER / ADMIN, 15 permission theo module; STAFF và MANAGER có bộ quyền mặc định, có tài khoản Owner tạo bằng script riêng.",
              "Helmet + CSP, CORS allow-list, CSRF cho method ghi, rate limit toàn API (600 request/15 phút) và riêng cho login (8/15 phút), đăng ký, reset mật khẩu, upload, thanh toán.",
              "Upload kiểm tra magic bytes của file với MIME type rồi mới đẩy lên Cloudinary; settings công khai chỉ trả các khoá được phép.",
            ],
          },
          {
            title: "Lớp AI và an toàn",
            items: [
              "/ai/chat: Zod validate (tin nhắn ≤ 2.000 ký tự, history ≤ 12 tin), rate limit 10 request/phút, timeout 15 giây khi gọi model.",
              "RAG nhẹ từ tối đa 300 sản phẩm đang bán, settings cửa hàng và giỏ hàng; lọc ký tự điều khiển, chặn output JSON/code/bảng và kiểm tra product tag theo ID thật.",
              "/ai/admin/generate chỉ cho admin: 5 loại nội dung, rate limit 20 request/phút, timeout 20 giây; lịch sử chat tự xoá sau 30 ngày.",
            ],
          },
        ],
        nextSteps: [
          "Đưa bộ test tích hợp (auth, đặt hàng, thanh toán, phân quyền) lên CI để chạy mỗi lần push.",
          "Tách service layer rõ hơn giữa controller và Prisma khi business rules tiếp tục tăng.",
          "Thêm request logging, metrics và tracing lỗi production cho API trên Render.",
        ],
        gallery: [
          { src: "/projects/nurfia-api/01-swagger-overview.jpg", caption: "Swagger UI của Nurfia API trên server production" },
          { src: "/projects/nurfia-api/02-swagger-tags.jpg", caption: "Các nhóm route theo domain trong tài liệu API" },
          { src: "/projects/nurfia-api/03-swagger-try-products.jpg", caption: "Gọi thử GET /api/products trực tiếp từ Swagger" },
        ],
      },
      {
        slug: "nurfia-admin-dashboard",
        category: "website",
        title: "Nurfia Admin Dashboard",
        shortTitle: "Admin Dashboard",
        eyebrow: "Dashboard / Operations",
        liveLink: "https://vanhoang.mauweb68.com/admin",
        liveLinkLabel: "Mở trang quản trị (cần tài khoản)",
        description:
          "Khu quản trị với 19 module vận hành — sản phẩm, tồn kho theo SKU, đơn hàng, khách hàng, nhân viên, coupon, vận chuyển, nội dung, báo cáo và nhật ký hoạt động có rollback — phân quyền theo từng module và có AI hỗ trợ viết nội dung.",
        summary:
          "Dashboard là nơi tôi chứng minh mình hiểu vận hành nội bộ của một cửa hàng online, không chỉ phần giao diện bán hàng.",
        thumbnail: "/projects/nurfia-dashboard.png",
        tags: ["React", "Recharts", "RBAC", "Inventory", "Reports", "Admin AI"],
        objective:
          "Tạo một lớp quản trị để chủ cửa hàng và nhân viên vận hành hằng ngày: nhìn nhanh doanh thu và cảnh báo, xử lý đơn và tồn kho, quản lý nội dung, phân quyền nhân viên và truy vết được mọi thay đổi.",
        role: [
          "Dựng AdminLayout riêng với sidebar lọc theo quyền và các trang quản trị cho từng module.",
          "Làm dashboard tổng quan và trang báo cáo bằng Recharts: KPI, biểu đồ doanh thu, phân bổ trạng thái đơn, mục tiêu, insight tự động và xuất CSV.",
          "Xây quản lý tồn kho theo SKU/biến thể, quản lý đơn (trạng thái + thanh toán), nhân viên với phân quyền module và nhật ký hoạt động có rollback.",
          "Gắn nút AI Generator vào form sản phẩm, blog và popup để admin viết nội dung nhanh hơn.",
        ],
        stack: [
          "React 19",
          "TypeScript",
          "React Router 7",
          "Recharts",
          "Zustand",
          "react-simple-wysiwyg",
          "Server-Sent Events",
          "Socket.IO",
          "OpenRouter (Gemini 2.5 Flash)",
        ],
        aiUse:
          "Nút AI Generator trong form Products, Blog và Popups gọi /api/ai/admin/generate để viết mô tả ngắn/đầy đủ của sản phẩm, excerpt/nội dung blog và thông điệp popup từ ngữ cảnh form đang nhập. Prompt cấm AI bịa chất liệu, kích thước, giảm giá, tồn kho hay cam kết giao hàng. Trang Reports có thêm các thẻ insight tự động (hiệu suất, sản phẩm dẫn đầu, danh mục mạnh, tiến độ mục tiêu, rủi ro huỷ đơn) tính theo quy tắc từ dữ liệu báo cáo.",
        result:
          "Dashboard giúp portfolio không chỉ có storefront: nó cho thấy tôi xử lý được vận hành thật — tồn kho nhiều biến thể, phân quyền nhân viên, truy vết và hoàn tác thay đổi, báo cáo có thể xuất ra — và dùng AI ở đúng chỗ tiết kiệm thời gian cho người quản trị.",
        outcomes: [
          "19 module quản trị, sidebar và API đều kiểm tra quyền theo từng module.",
          "Tồn kho theo SKU/biến thể với lịch sử nhập/xuất/điều chỉnh/trả hàng.",
          "Nhật ký hoạt động ghi lại thay đổi và cho phép rollback bản ghi đã xoá.",
          "Báo cáo theo khoảng ngày tuỳ chọn, insight tự động và xuất CSV.",
        ],
        relatedBlogSlugs: ["ai-workflow"],
        quickScan: [
          {
            label: "Điểm nhìn chính",
            text: "Không phải trang bán hàng mà là lớp vận hành nội bộ: doanh thu, đơn hàng, khách hàng, tồn kho, nhân viên và nội dung cửa hàng.",
          },
          {
            label: "Luồng quan trọng",
            text: "Admin xem dashboard, thấy cảnh báo (tồn kho thấp, đơn mới) rồi đi vào đúng module để xử lý, mọi thao tác được ghi vào nhật ký hoạt động.",
          },
          {
            label: "Điểm kỹ thuật nổi bật",
            text: "15 permission module cho STAFF/MANAGER, báo cáo Recharts có custom range và CSV, SSE realtime cho khách hàng, AI viết nội dung trong form.",
          },
        ],
        features: [
          "Dashboard tổng quan: tổng doanh thu, doanh thu tháng, tổng đơn, khách hàng active, revenue trend 7d/30d/all, phân bổ trạng thái đơn, giao dịch gần đây, best sellers, cảnh báo tồn kho và khách hàng mới.",
          "Module: banners, popups, products, inventory, categories, brands, attributes, orders, customers, staff, reports, blog, contacts, coupons, shipping, reviews, notifications, activity logs và settings.",
          "Inventory xem stock theo SKU/biến thể, lọc trạng thái tồn kho, sửa trực tiếp và xem lịch sử giao dịch kho.",
          "Orders cập nhật trạng thái đơn (PENDING → CONFIRMED → SHIPPING → DELIVERED / CANCELLED) và trạng thái thanh toán riêng.",
          "Staff: tạo tài khoản nhân viên, gán role và từng permission, xem lịch sử thao tác của mỗi nhân viên.",
          "Reports: preset và custom date range, KPI có sparkline, mục tiêu doanh thu/đơn hàng, tỷ lệ chuyển đổi, insight tự động và xuất CSV.",
        ],
        userFlow: [
          "Admin vào dashboard để xem doanh thu, đơn hàng, khách hàng, top sản phẩm và các sản phẩm sắp hết hàng.",
          "Thấy sản phẩm tồn kho thấp, admin vào Inventory lọc theo SKU, cập nhật stock và xem lịch sử điều chỉnh.",
          "Với đơn mới, admin vào Orders xác nhận, chuyển trạng thái giao hàng và cập nhật trạng thái thanh toán (ví dụ duyệt chứng từ chuyển khoản).",
          "Khi đăng sản phẩm hoặc bài blog, admin bấm AI Generator để có bản mô tả nháp rồi chỉnh trong rich text editor.",
          "Owner/Admin quản lý nhân viên, phân quyền module và xem nhật ký hoạt động; thao tác xoá nhầm có thể rollback.",
        ],
        architecture: [
          "Admin là nhánh route riêng trong React Router với AdminLayout, không dùng header/footer của storefront.",
          "Các trang admin dùng chung Axios client nên hưởng cookie auth, CSRF và cách xử lý lỗi như phía khách hàng.",
          "Backend kiểm tra requireAdminAccess + requirePermission cho từng route /api/admin; sidebar frontend chỉ hiện module user được cấp quyền.",
          "Dashboard gọi /admin/dashboard theo range, Reports gọi /admin/reports và render bằng Recharts (area, bar, pie, sparkline).",
          "Danh sách khách hàng nhận cập nhật realtime qua Server-Sent Events (/admin/customers/stream) có heartbeat và tự đóng khi phiên hết hạn.",
        ],
        challenges: [
          "Dashboard phải đủ thông tin mà vẫn scan nhanh, nên KPI, chart và danh sách cảnh báo được xếp theo mức ưu tiên ra quyết định.",
          "Tồn kho có cả cấp sản phẩm và cấp biến thể, UI phải tránh sửa nhầm tổng stock khi sản phẩm có nhiều SKU.",
          "Nhiều module nhạy cảm (staff, settings, reports) cần phân quyền chi tiết để nhân viên không vào nhầm khu vực.",
          "Thao tác xoá trong admin dễ gây mất dữ liệu, nên nhật ký hoạt động phải lưu snapshot đủ để khôi phục.",
        ],
        deepSections: [
          {
            title: "Bảng điều khiển vận hành",
            items: [
              "KPI chính: tổng doanh thu, doanh thu tháng, tổng đơn hàng và khách hàng active.",
              "Revenue trend đổi range 7d/30d/all ngay trên dashboard, không cần chuyển trang.",
              "Phân bổ trạng thái đơn, giao dịch gần đây, best sellers, cảnh báo tồn kho thấp (gộp cả stock sản phẩm và biến thể, sort theo số lượng thấp nhất) và khách hàng mới nằm cùng một màn.",
            ],
          },
          {
            title: "Hệ thống module và phân quyền",
            items: [
              "19 module: banners, popups, products, inventory, categories, brands, attributes, orders, customers, reviews, staff, reports, coupons, shipping, blog, contacts, notifications, activity logs, settings.",
              "15 permission (MANAGE_PRODUCTS, MANAGE_ORDERS, VIEW_REPORTS, MANAGE_STAFF...); STAFF mặc định có 4 quyền xử lý đơn/khách/liên hệ/review, MANAGER có 13 quyền, Owner toàn quyền.",
              "Permission cũ được map tự động sang module mới, nên dữ liệu phân quyền trước đây không bị vỡ khi thêm module.",
            ],
          },
          {
            title: "Sản phẩm, tồn kho và đơn hàng",
            items: [
              "Sản phẩm có ảnh, brand, category, thuộc tính màu/size và biến thể; mô tả soạn bằng rich text editor.",
              "Inventory theo SKU/biến thể với ngưỡng low-stock, sửa trực tiếp và lịch sử giao dịch kho IN / OUT / ADJUSTMENT / RETURN.",
              "Orders cập nhật trạng thái đơn và trạng thái thanh toán tách riêng, mỗi lần đổi đều được ghi vào lịch sử trạng thái và gửi thông báo cho khách.",
            ],
          },
          {
            title: "Khách hàng, nội dung và marketing",
            items: [
              "Customers xem đơn gần đây, khoá/mở tài khoản và nhận cập nhật realtime qua SSE.",
              "Contacts trả lời khách trực tiếp qua email; Reviews duyệt hoặc xoá hàng loạt; Coupons bật/tắt hàng loạt.",
              "Quản lý banner, popup ưu đãi trang chủ, blog, phí vận chuyển theo vùng và cài đặt cửa hàng (thông tin chuyển khoản, liên hệ...).",
            ],
          },
          {
            title: "Báo cáo và insight",
            items: [
              "Reports có preset range và custom date range, chặn ngày tương lai và khoảng dài hơn 366 ngày.",
              "Recharts vẽ area chart, bar chart, pie chart, sparkline KPI; có mục tiêu doanh thu/đơn hàng và tỷ lệ chuyển đổi.",
              "Thẻ insight tự động: hiệu suất doanh thu, sản phẩm dẫn đầu, danh mục mạnh nhất, tiến độ mục tiêu và cảnh báo khi tỷ lệ huỷ đơn vượt 12%; xuất CSV gồm summary, traffic, top products, doanh số theo danh mục và trạng thái.",
            ],
          },
          {
            title: "Kiểm soát thay đổi và AI hỗ trợ",
            items: [
              "Activity logs ghi lại thao tác của admin/nhân viên; bản ghi đã xoá có thể rollback từ snapshot đã lưu.",
              "Mỗi nhân viên có trang lịch sử thao tác riêng để Owner kiểm tra khi cần.",
              "AI Generator trong form Products/Blog/Popups tạo nội dung theo ngữ cảnh đang nhập, giới hạn 20 request/phút và chỉ dành cho tài khoản có quyền admin.",
            ],
          },
        ],
        nextSteps: [
          "Thêm drill-down từ thẻ dashboard sang đúng màn orders/products/inventory với filter có sẵn.",
          "Dùng LLM để tóm tắt báo cáo theo ngôn ngữ tự nhiên, bổ sung cho insight dựa trên quy tắc hiện tại.",
          "Cảnh báo tự động qua email/thông báo khi tồn kho hoặc doanh thu vượt ngưỡng.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Nurfia – Fashion eCommerce",
    title: "Project case studies",
    subtitle:
      "Nurfia is a full fashion eCommerce system I built directly: web storefront, RESTful API, and admin dashboard — live at vanhoang.mauweb68.com.",
    caseStudyEyebrow: "Case study",
    caseStudyTitle: "A fast way to scan what I actually built",
    caseStudySubtitle:
      "Each Nurfia layer is summarized by what that layer actually owns: storefront for buying experience, API for contracts and guards, dashboard for operations.",
    openCaseStudy: "Open case study",
    filters: {
      all: "All",
      website: "Website",
      backend: "Backend",
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
          "A bilingual (Vietnamese/English) fashion storefront built with React 19, TypeScript, and Vite: homepage, filterable shop, variant-aware product detail, cart, checkout with four payment methods, and a customer account area, plus an AI shopping assistant that recommends real products from the database.",
        summary:
          "The web layer is where I connected UI, product data, payments, and AI into one complete buying flow, live at vanhoang.mauweb68.com.",
        thumbnail: "/projects/nurfia-web/01-home.jpg",
        tags: ["React 19", "TypeScript", "Vite", "Zustand", "i18n VI/EN", "AI Chat"],
        objective:
          "Build a fashion storefront with a real buying flow — product discovery, in-stock variant selection, coupons, region-based shipping, and payment — that works well on desktop and mobile, with AI placed exactly where shoppers need advice.",
        role: [
          "Designed and coded the entire customer UI with React 19 + TypeScript, styled with component-level plain CSS, with system-aware light/dark theme and Vietnamese/English via i18next.",
          "Built the pages: homepage, category, shop, product detail, cart drawer, cart, checkout, order confirmation, compare, blog, contact, policy, notifications, and account (orders, wishlist, address book).",
          "Implemented checkout with province/district/ward addresses, coupon validation, region-based shipping options, and four payment methods: COD, bank transfer (with proof upload), MoMo, and Stripe.",
          "Integrated the AI chatbot, Socket.IO realtime notifications, and a shared Axios client with cookie auth and CSRF tokens.",
        ],
        stack: [
          "React 19",
          "TypeScript",
          "Vite",
          "React Router 7",
          "Zustand",
          "Axios",
          "i18next",
          "React Hook Form + Zod",
          "Socket.IO Client",
          "Swiper",
          "DOMPurify",
          "Apache (.htaccess)",
        ],
        aiUse:
          "The AI shopping assistant only appears for signed-in shoppers. The backend loads active products, store settings, and the shopper's cart as context; the AI returns [PRODUCT|...] tags that the frontend renders as clickable product cards. It includes quick intents (outfit advice, shipping, returns, compare, sizing, cart summary, contact staff), per-account chat history, and response rating.",
        result:
          "The Nurfia storefront is the system's main demo surface: it shows premium commerce UI, correct handling of variants, stock, coupons, shipping, and payments, and AI tied to the buying flow with real data instead of a generic chatbot. Live at: https://vanhoang.mauweb68.com/",
        outcomes: [
          "Complete buying flow: browse → variant → cart → checkout → order confirmation → order tracking in the account area.",
          "Four payment methods (COD, bank transfer, MoMo, Stripe) with coupons and region-based shipping.",
          "Vietnamese/English, light/dark theme, and responsive across desktop and mobile.",
          "Deployed live on vanhoang.mauweb68.com (Apache with HTTPS, HSTS, and CSP).",
        ],
        relatedBlogSlugs: ["frontend-foundation", "ai-workflow"],
        liveLink: "https://vanhoang.mauweb68.com/",
        quickScan: [
          {
            label: "Main lens",
            text: "The customer-facing surface: product browsing, variant selection, cart, checkout with four payment methods, and AI-assisted shopping.",
          },
          {
            label: "Critical flow",
            text: "Shop filters → product detail with in-stock color/size → cart → checkout with coupon and province-based shipping → payment → order confirmation.",
          },
          {
            label: "Technical signal",
            text: "Filter state lives in the URL, Zustand separates cart/wishlist/compare/auth stores, the Axios client attaches CSRF tokens, and AI renders product cards from the database.",
          },
        ],
        features: [
          "Complete storefront flow: homepage with banners and promo popups, category, shop, product detail, cart drawer, cart page, checkout, and order confirmation.",
          "Shop page filters by price, color, size, brand, and category; sorts by newest, price, name, popularity, and rating; includes active filters, pagination, and recently viewed products.",
          "Search box with debounced autocomplete calling /products/search-suggest while the shopper types.",
          "Product detail with a Shopee-style gallery, lightbox, stock-aware color/size selection, quantity caps, wishlist, compare, buy now, reviews, and related products.",
          "Checkout with province/district/ward address, coupon validation, shipping option selection, and COD / bank transfer / MoMo / Stripe payment.",
          "Customer account: order history, cancel order, reorder, wishlist, address book, password change via email OTP, and forgot/reset password.",
          "Realtime notifications through Socket.IO, a dedicated notifications page, and a header notification bell.",
        ],
        userFlow: [
          "Shoppers land on the homepage or a category, then use autocomplete search or the shop page to filter products.",
          "On product detail, shoppers pick an in-stock color/size combination, check the gallery, reviews, and related products, then Add to Cart or Buy Now.",
          "At checkout, shoppers enter an address, apply a coupon, choose a shipping option (with a free-shipping threshold), and pick a payment method.",
          "After ordering, shoppers see the confirmation page, receive an email, track the order in their account, and get notified when its status changes.",
          "When they need help, shoppers open the AI chat for product suggestions, policy answers, or guidance to contact staff for cases that need a human.",
        ],
        architecture: [
          "React + Vite SPA using React Router 7 for customer and admin branches, with lazy-loaded pages for a lighter first load.",
          "Zustand separates auth, cart, wishlist, compare, notification, and UI stores; dedicated contexts handle theme and site settings.",
          "A shared Axios client sends cookies, fetches CSRF tokens for write requests, and retries when the token expires.",
          "Forms use React Hook Form + Zod; HTML content from the CMS is sanitized with DOMPurify before rendering.",
          "Static build deployed on Apache: .htaccess handles SPA routing, forces HTTPS, and sets HSTS, CSP, X-Frame-Options, nosniff, and Referrer-Policy.",
        ],
        challenges: [
          "Keeping the buying flow clear while layering wishlist, compare, recently viewed products, reviews, popups, and AI chat around it.",
          "Color/size variants must be checked against stock before selection, and quantity cannot exceed variant or base product stock.",
          "Checkout has to coordinate coupons, region-based shipping, and four payment methods that each follow a different flow.",
          "Cookie auth + CSRF means the frontend manages tokens, headers, and retries; if logout fails due to network errors, the session is kept so the user can retry.",
        ],
        deepSections: [
          {
            title: "Commerce surface",
            items: [
              "The storefront includes a homepage (slider, banners, and promo popups configured by admins), category, shop, product detail, cart drawer, cart page, checkout, and order confirmation.",
              "Product cards include hover images, sale badges, wishlist actions, ratings, and detail links; product detail has a Shopee-style thumbnail gallery, lightbox, reviews, and related products.",
              "Beyond buying, there is a blog, a product comparison page, contact + newsletter signup, and policy pages.",
            ],
          },
          {
            title: "Search and filtering",
            items: [
              "The shop page keeps filter, sort, and page state in URL search params, so reloading or sharing a link preserves it.",
              "Price, color, size, brand, and category filter options come from /products/filters instead of being hard-coded in the frontend.",
              "Search autocomplete calls /products/search-suggest with debounce; recently viewed products are stored in localStorage and refreshed through /products/by-ids.",
            ],
          },
          {
            title: "Cart and variants",
            items: [
              "Product detail only allows in-stock color/size combinations, so shoppers cannot add a sold-out variant.",
              "Quantity is capped by the selected variant's actual stock or by the base product stock.",
              "Buy Now reuses the add-to-cart path but goes straight to checkout, while Add to Cart opens the cart drawer for a quick review.",
            ],
          },
          {
            title: "Checkout and payment",
            items: [
              "The address form uses province/district/ward and calls /orders/shipping-options for region-based shipping fees, including a free-shipping threshold.",
              "Coupons are checked through /orders/validate-coupon before ordering: validity dates, minimum order value, usage limit, and maximum discount.",
              "Supports COD, bank transfer (shoppers upload a payment proof image), MoMo e-wallet, and Stripe Checkout; completed orders go to a confirmation page and trigger an email.",
            ],
          },
          {
            title: "Account and realtime",
            items: [
              "The account page includes order history, cancel order, reorder, wishlist, and address book.",
              "Password changes require an email OTP; forgot/reset password works via link; after a password change the user must sign in again because old tokens are revoked.",
              "Socket.IO pushes order and account-status notifications to the header bell and the notifications page.",
            ],
          },
          {
            title: "AI shopping layer",
            items: [
              "The chatbot is only shown to signed-in users, avoiding an uncontrolled public chatbot surface.",
              "Quick intents cover outfit advice, shipping, returns, comparison, size guide, cart summary, and staff contact; chat history is saved per account.",
              "The AI returns [PRODUCT|id|name|price|image|slug] tags, which the frontend renders as clickable product cards inside the chat window.",
            ],
          },
        ],
        nextSteps: [
          "Add a detailed order tracking page with a status and shipping timeline.",
          "Personalized recommendations based on recently viewed products, wishlist, and cart outside the chat window.",
          "Split JS chunks larger than 500 kB to improve first-load speed on mobile.",
        ],
        gallery: [
          { src: "/projects/nurfia-web/01-home.jpg", caption: "Homepage with hero slider and category menu" },
          { src: "/projects/nurfia-web/02-home-products.jpg", caption: "Featured products with New Arrival / Featured / Bestsellers tabs" },
          { src: "/projects/nurfia-web/03-promo-popup.jpg", caption: "Homepage promo popup configured by admins" },
          { src: "/projects/nurfia-web/04-shop-filters.jpg", caption: "Shop page with category, price, color, and size filters" },
          { src: "/projects/nurfia-web/05-product-detail.jpg", caption: "Product detail: color/size, stock, Add to Cart, Buy Now" },
          { src: "/projects/nurfia-web/06-search-autocomplete.jpg", caption: "Autocomplete search suggesting products while typing" },
          { src: "/projects/nurfia-web/07-dark-mode.jpg", caption: "Dark mode interface" },
          { src: "/projects/nurfia-web/08-mobile-home.jpg", caption: "Homepage on mobile", device: "mobile" },
          { src: "/projects/nurfia-web/09-mobile-product.jpg", caption: "Product detail on mobile", device: "mobile" },
        ],
      },
      {
        slug: "nurfia-rest-api",
        category: "backend",
        title: "Nurfia RESTful API",
        shortTitle: "RESTful API",
        eyebrow: "Backend / Service Layer",
        liveLink: "https://web-nurfia.onrender.com/api-docs/",
        liveLinkLabel: "View API Docs",
        description:
          "A Node.js + Express 5 + TypeScript backend using Prisma and PostgreSQL, deployed on Render with Swagger docs: 19 route groups for catalog, cart, orders, MoMo/Stripe payments, uploads, realtime notifications, AI, and an admin area with module-level permissions.",
        summary:
          "One backend serves both the storefront and the admin dashboard, designed around safe transactions, revocable authentication, and layered security.",
        thumbnail: "/projects/nurfia-api.png",
        tags: ["Node.js", "Express 5", "TypeScript", "Prisma", "PostgreSQL", "Swagger"],
        objective:
          "Build an API strict enough to serve the storefront, admin dashboard, and AI at the same time: order and stock data must stay consistent, payments must be verifiable, permissions must be granular, and every input must be validated.",
        role: [
          "Designed the Prisma schema for users, products/variants/attributes, cart, orders, coupons, shipping, inventory, blog, notifications, activity logs, and chat history.",
          "Wrote domain-based routes/controllers, validated body/query/params with Zod, and documented endpoints with Swagger.",
          "Handled order placement inside a transaction (stock deduction, coupon usage, status history) and integrated MoMo IPN and Stripe webhooks.",
          "Built revocable JWT auth (token version), 4 roles + 15 module permissions, rate limiting, CSRF, upload validation, and ran my own security audit.",
        ],
        stack: [
          "Node.js",
          "Express 5",
          "TypeScript",
          "Prisma ORM",
          "PostgreSQL",
          "Zod",
          "JWT",
          "Socket.IO",
          "Swagger",
          "Stripe",
          "MoMo",
          "Cloudinary",
          "Nodemailer",
          "Render",
        ],
        aiUse:
          "A dedicated /api/ai route group calls models through OpenRouter (Gemini 2.5 Flash by default): /ai/chat powers the shopping assistant with lightweight RAG over products, settings, and the cart; /ai/admin/generate helps admins write product, blog, and popup copy. It uses Zod validation, rate limits, timeouts, control-character stripping against prompt injection, blocks JSON/code/table output, and verifies product tags against real products.",
        result:
          "The backend shows I do more than CRUD: I handle real eCommerce problems such as stock transactions, payment verification, session revocation, granular permissions, and placing AI inside a system with clear guards.",
        outcomes: [
          "One backend serves the storefront, admin dashboard, and AI, with public Swagger docs.",
          "Orders run in a Prisma transaction; cancelling restores stock and coupon usage automatically.",
          "MoMo payments verify HMAC signatures; Stripe verifies webhook signatures.",
          "Logout or password change revokes every old JWT, including open Socket.IO connections.",
        ],
        relatedBlogSlugs: ["backend-notes", "ai-workflow"],
        quickScan: [
          {
            label: "Main lens",
            text: "The service layer behind the whole Nurfia ecosystem: storefront, admin dashboard, payments, realtime, and AI.",
          },
          {
            label: "Critical flow",
            text: "Requests pass Helmet → CORS allow-list → rate limit → CSRF → auth/permission → Zod validation → Prisma, returning one consistent error shape.",
          },
          {
            label: "Technical signal",
            text: "Stock transactions, signature-verified MoMo/Stripe callbacks, JWT revocation via token_version, 15 module permissions, and a guarded AI route.",
          },
        ],
        features: [
          "REST APIs for auth, products, categories, cart, orders, wishlist, compare, addresses, payment, banners, popups, blog, contact, settings, notifications, chat, upload, and admin.",
          "Product API supports search, search-suggest, category/brand/color/size/price/on-sale filters, 7 sort modes, pagination, featured/bestsellers/new, by-category, by-ids, and related.",
          "Order API: coupon validation, region-based shipping options, create, cancel, reorder, and upload/view bank transfer proof.",
          "Payments: COD, bank transfer, MoMo (create + IPN), and Stripe Checkout (session + webhook).",
          "Auth: register, login, logout, forgot/reset password, password change via email OTP, and profile.",
          "Swagger UI at /api-docs, health check at /api/health, and Socket.IO for notifications and account status.",
        ],
        userFlow: [
          "The storefront calls product/category APIs for listings, filters, detail, related products, and recently viewed products.",
          "Signed-in shoppers use cart → validate-coupon → shipping-options → POST /orders to place an order.",
          "For MoMo/Stripe, the backend creates a payment session; the gateway calls back via IPN/webhook so the backend can verify and update the order.",
          "The admin dashboard calls /api/admin routes to manage products, inventory, orders, customers, staff, reports, and content.",
          "AI chat calls /api/ai/chat; the backend loads context from the database, calls the model with a timeout, and filters the answer before returning it.",
        ],
        architecture: [
          "Express 5 + TypeScript as the API layer, Prisma as data access for PostgreSQL, deployed on Render.",
          "server.ts composes Helmet (CSP), CORS allow-list, raw body for the Stripe webhook, cookie parsing, API-wide rate limiting, CSRF, Swagger, static uploads, routes, a 404 handler, and the error handler.",
          "Routes/controllers are split by domain, and the validate middleware uses Zod for body, query, and params.",
          "Dedicated services handle auth, mail, notifications, sockets, activity logs, chat retention, and startup migration.",
          "Before opening HTTP/Socket.IO, the server runs an idempotent schema check and refuses to start if it fails.",
        ],
        challenges: [
          "Concurrent orders could push stock negative, so order creation, stock deduction, and coupon usage all run in one transaction with stock checks.",
          "Payment callbacks can be forged, so MoMo IPN verifies signatures with timing-safe comparison and Stripe uses webhook signatures.",
          "JWT is stateless and hard to revoke; the fix is a token_version stored in the DB and checked on both HTTP and Socket.IO.",
          "Admin access needed more than ADMIN/CUSTOMER, and old permission data had to map onto new modules.",
        ],
        deepSections: [
          {
            title: "API contract and catalog",
            items: [
              "19 domain route groups documented in Swagger under 17 tags (Auth, Products, Cart, Orders, Payment, Admin...).",
              "Product filtering handles parent/child categories, search over name/short description, price range, on-sale, featured, and brand slug/name; color/size resolve by attribute name instead of hard-coded IDs.",
              "Invalid public queries are rejected before hitting the DB: page up to 10,000, limit up to 100, prices must be finite and non-negative, and minPrice ≤ maxPrice.",
            ],
          },
          {
            title: "Orders and inventory",
            items: [
              "Order creation runs in a Prisma $transaction: create order + items, check and deduct variant/product stock, increment salesCount and coupon usedCount, and write status history.",
              "PERCENTAGE/FIXED_AMOUNT coupons support start/end dates, usage limits, minimum order value, and maximum discount; shipping is priced by zone with a free-shipping threshold.",
              "Cancelling an order restores stock and coupon usage; after ordering, the system notifies the customer and admins and sends a confirmation email.",
            ],
          },
          {
            title: "Payments",
            items: [
              "Supports four methods: COD, bank transfer, MoMo, and Stripe Checkout.",
              "MoMo IPN returns 503 when keys are missing, checks merchant and HMAC signature with timing-safe comparison, and refuses to confirm wrong amounts or cancelled/already-paid orders.",
              "The Stripe webhook receives the raw body to verify signatures; bank transfer proof images cannot be accessed publicly through /uploads.",
            ],
          },
          {
            title: "Authentication and sessions",
            items: [
              "JWT is read from a cookie or Bearer header, passwords are hashed with bcrypt, and deactivated accounts are blocked immediately.",
              "token_version column: logout, password change, or reset revokes every old JWT on all devices, including tokens pasted into Swagger.",
              "Socket.IO and admin streams close as soon as a token is revoked; other instances recheck the DB every 15 seconds. Password changes require a 6-digit OTP that expires after 10 minutes with up to 5 attempts.",
            ],
          },
          {
            title: "Permissions and security",
            items: [
              "4 roles (CUSTOMER / STAFF / MANAGER / ADMIN) and 15 module permissions; STAFF and MANAGER get default permission sets, and an Owner account is provisioned by a dedicated script.",
              "Helmet + CSP, CORS allow-list, CSRF for write methods, API-wide rate limiting (600 requests/15 min) plus dedicated limits for login (8/15 min), registration, password reset, uploads, and payments.",
              "Uploads check file magic bytes against the MIME type before pushing to Cloudinary; public settings only return allow-listed keys.",
            ],
          },
          {
            title: "AI and safety layer",
            items: [
              "/ai/chat: Zod validation (message ≤ 2,000 chars, history ≤ 12 messages), 10 requests/minute rate limit, and a 15-second model-call timeout.",
              "Lightweight RAG from up to 300 active products, store settings, and the cart; strips control characters, blocks JSON/code/table output, and validates product tags by real ID.",
              "/ai/admin/generate is admin-only: 5 content types, 20 requests/minute, 20-second timeout; chat history is deleted automatically after 30 days.",
            ],
          },
        ],
        nextSteps: [
          "Run the integration test suite (auth, orders, payments, permissions) in CI on every push.",
          "Separate a clearer service layer between controllers and Prisma as business rules grow.",
          "Add request logging, metrics, and production error tracing for the API on Render.",
        ],
        gallery: [
          { src: "/projects/nurfia-api/01-swagger-overview.jpg", caption: "Swagger UI for the Nurfia API on the production server" },
          { src: "/projects/nurfia-api/02-swagger-tags.jpg", caption: "Domain-based route groups in the API docs" },
          { src: "/projects/nurfia-api/03-swagger-try-products.jpg", caption: "Calling GET /api/products directly from Swagger" },
        ],
      },
      {
        slug: "nurfia-admin-dashboard",
        category: "website",
        title: "Nurfia Admin Dashboard",
        shortTitle: "Admin Dashboard",
        eyebrow: "Dashboard / Operations",
        liveLink: "https://vanhoang.mauweb68.com/admin",
        liveLinkLabel: "Open admin panel (account required)",
        description:
          "An admin area with 19 operations modules — products, SKU-level inventory, orders, customers, staff, coupons, shipping, content, reports, and activity logs with rollback — with module-level permissions and AI writing assistance.",
        summary:
          "The dashboard is where I show I understand how an online store is run internally, not only its shopping interface.",
        thumbnail: "/projects/nurfia-dashboard.png",
        tags: ["React", "Recharts", "RBAC", "Inventory", "Reports", "Admin AI"],
        objective:
          "Create an admin layer for day-to-day store operations: quickly read revenue and alerts, handle orders and stock, manage content, assign staff permissions, and trace every change.",
        role: [
          "Built a dedicated AdminLayout with a permission-filtered sidebar and admin pages for each module.",
          "Built the overview dashboard and reports page with Recharts: KPIs, revenue charts, order status distribution, goals, automatic insights, and CSV export.",
          "Built SKU/variant inventory management, order management (status + payment), staff management with module permissions, and activity logs with rollback.",
          "Added an AI Generator button to the product, blog, and popup forms so admins can write content faster.",
        ],
        stack: [
          "React 19",
          "TypeScript",
          "React Router 7",
          "Recharts",
          "Zustand",
          "react-simple-wysiwyg",
          "Server-Sent Events",
          "Socket.IO",
          "OpenRouter (Gemini 2.5 Flash)",
        ],
        aiUse:
          "The AI Generator button in the Products, Blog, and Popups forms calls /api/ai/admin/generate to write short/full product descriptions, blog excerpts/content, and popup messages from the form's current context. The prompt forbids inventing materials, dimensions, discounts, stock, or shipping promises. The Reports page also shows automatic insight cards (performance, leading product, strongest category, goal progress, cancellation risk) computed with rules over the report data.",
        result:
          "The dashboard keeps the portfolio from being storefront-only: it shows I can handle real operations — multi-variant stock, staff permissions, change tracing and rollback, exportable reports — and use AI where it actually saves admins time.",
        outcomes: [
          "19 admin modules, with both sidebar and API checking permissions per module.",
          "SKU/variant inventory with IN/OUT/ADJUSTMENT/RETURN history.",
          "Activity logs record changes and allow rolling back deleted records.",
          "Reports with custom date ranges, automatic insights, and CSV export.",
        ],
        relatedBlogSlugs: ["ai-workflow"],
        quickScan: [
          {
            label: "Main lens",
            text: "Not a shopping page but an internal operations layer: revenue, orders, customers, inventory, staff, and store content.",
          },
          {
            label: "Critical flow",
            text: "Admins scan the dashboard, spot alerts (low stock, new orders), then go to the right module to act, with every action recorded in the activity log.",
          },
          {
            label: "Technical signal",
            text: "15 module permissions for STAFF/MANAGER, Recharts reports with custom ranges and CSV, realtime customer updates via SSE, and AI writing inside forms.",
          },
        ],
        features: [
          "Overview dashboard: total revenue, month revenue, total orders, active customers, 7d/30d/all revenue trend, order status distribution, recent transactions, best sellers, low-stock alerts, and newest customers.",
          "Modules: banners, popups, products, inventory, categories, brands, attributes, orders, customers, staff, reports, blog, contacts, coupons, shipping, reviews, notifications, activity logs, and settings.",
          "Inventory shows stock per SKU/variant, filters by stock status, supports inline editing, and shows stock transaction history.",
          "Orders update order status (PENDING → CONFIRMED → SHIPPING → DELIVERED / CANCELLED) and payment status separately.",
          "Staff: create staff accounts, assign roles and individual permissions, and view each staff member's action history.",
          "Reports: preset and custom date ranges, KPIs with sparklines, revenue/order goals, conversion rate, automatic insights, and CSV export.",
        ],
        userFlow: [
          "Admins open the dashboard to check revenue, orders, customers, top products, and items running low on stock.",
          "When stock is low, admins go to Inventory, filter by SKU, update stock, and review adjustment history.",
          "For new orders, admins confirm in Orders, move them to shipping, and update payment status (for example after approving a bank transfer proof).",
          "When publishing a product or blog post, admins click AI Generator for a draft, then refine it in the rich text editor.",
          "Owners/admins manage staff, assign module permissions, and review activity logs; accidental deletions can be rolled back.",
        ],
        architecture: [
          "Admin is a separate React Router branch with AdminLayout, without the storefront header/footer.",
          "Admin pages share the Axios client, so they inherit cookie auth, CSRF, and error handling from the customer side.",
          "The backend checks requireAdminAccess + requirePermission on every /api/admin route; the frontend sidebar only shows modules the user can access.",
          "The dashboard calls /admin/dashboard by range, Reports calls /admin/reports, and both render with Recharts (area, bar, pie, sparkline).",
          "The customer list receives realtime updates over Server-Sent Events (/admin/customers/stream) with heartbeats, closing automatically when the session expires.",
        ],
        challenges: [
          "The dashboard must show enough signal while staying easy to scan, so KPIs, charts, and alert lists are ordered by decision priority.",
          "Stock exists at both product and variant level, so the UI must avoid editing aggregate stock incorrectly when a product has multiple SKUs.",
          "Sensitive modules (staff, settings, reports) need granular permissions to keep staff out of the wrong areas.",
          "Deletes in an admin panel can lose data, so the activity log must keep snapshots complete enough to restore records.",
        ],
        deepSections: [
          {
            title: "Operations cockpit",
            items: [
              "Main KPIs: total revenue, month revenue, total orders, and active customers.",
              "Revenue trend switches between 7d/30d/all directly on the dashboard without changing pages.",
              "Order status distribution, recent transactions, best sellers, low-stock alerts (combining product and variant stock, sorted by lowest quantity), and newest customers share one screen.",
            ],
          },
          {
            title: "Module system and permissions",
            items: [
              "19 modules: banners, popups, products, inventory, categories, brands, attributes, orders, customers, reviews, staff, reports, coupons, shipping, blog, contacts, notifications, activity logs, settings.",
              "15 permissions (MANAGE_PRODUCTS, MANAGE_ORDERS, VIEW_REPORTS, MANAGE_STAFF...); STAFF defaults to 4 permissions for orders/customers/contacts/reviews, MANAGER has 13, and the Owner has full access.",
              "Legacy permissions are mapped automatically onto new modules, so older permission data does not break when modules are added.",
            ],
          },
          {
            title: "Products, inventory, and orders",
            items: [
              "Products have images, brand, category, color/size attributes, and variants; descriptions are written in a rich text editor.",
              "SKU/variant inventory with low-stock thresholds, inline editing, and IN / OUT / ADJUSTMENT / RETURN stock transaction history.",
              "Orders update order status and payment status separately; each change is written to status history and notifies the customer.",
            ],
          },
          {
            title: "Customers, content, and marketing",
            items: [
              "Customers shows recent orders, lets admins activate/deactivate accounts, and receives realtime updates via SSE.",
              "Contacts can be answered directly by email; Reviews support bulk approve/delete; Coupons support bulk activation.",
              "Manage banners, homepage promo popups, blog posts, zone-based shipping fees, and store settings (bank transfer details, contact info...).",
            ],
          },
          {
            title: "Reports and insights",
            items: [
              "Reports support preset and custom date ranges, blocking future dates and ranges longer than 366 days.",
              "Recharts draws area, bar, and pie charts plus KPI sparklines, along with revenue/order goals and conversion rate.",
              "Automatic insight cards: revenue performance, leading product, strongest category, goal progress, and a warning when cancellation rate exceeds 12%; CSV export includes summary, traffic, top products, sales by category, and status distribution.",
            ],
          },
          {
            title: "Change control and AI assistance",
            items: [
              "Activity logs record admin/staff actions; deleted records can be rolled back from stored snapshots.",
              "Each staff member has a personal action history page so the Owner can review it when needed.",
              "The AI Generator in the Products/Blog/Popups forms creates content from the current form context, limited to 20 requests/minute and only for admin-access accounts.",
            ],
          },
        ],
        nextSteps: [
          "Add drill-down links from dashboard cards into the matching orders, products, or inventory views with filters pre-applied.",
          "Use an LLM to summarize reports in natural language, complementing the current rule-based insights.",
          "Automatic email/notification alerts when stock or revenue crosses important thresholds.",
        ],
      },
    ],
  },
};

export function getProjectBySlug(language: Language, slug: string) {
  return projectCopy[language].items.find((item) => item.slug === slug) || null;
}
