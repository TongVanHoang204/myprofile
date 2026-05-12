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
      "Mỗi phần của Nurfia được tóm tắt theo đúng bản chất công việc: storefront tập trung vào trải nghiệm mua hàng, API tập trung vào contract và guard, dashboard tập trung vào vận hành.",
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
        quickScan: [
          {
            label: "Điểm nhìn chính",
            text: "Bề mặt người dùng nhìn thấy đầu tiên: browse sản phẩm, chọn biến thể, giỏ hàng, checkout và AI hỗ trợ mua sắm.",
          },
          {
            label: "Luồng quan trọng",
            text: "Từ shop filter đến product detail, user có thể chọn màu/size hợp lệ, add to cart hoặc buy now mà không rời khỏi flow mua hàng.",
          },
          {
            label: "Điểm kỹ thuật nổi bật",
            text: "Frontend giữ URL filter state, quản lý cart/wishlist/compare bằng store riêng và render product card do AI gợi ý.",
          },
        ],
        features: [
          "Luồng storefront đầy đủ: homepage, category, shop, product detail, cart drawer, cart page, checkout và order confirmation.",
          "Shop page có filter theo giá, màu, size, brand, category; sort theo mới nhất, giá và rating; pagination và recently viewed.",
          "Product detail hỗ trợ gallery, lightbox, biến thể màu/size, giới hạn số lượng theo tồn kho, wishlist, compare, buy now và review.",
          "AI chatbot chỉ xuất hiện khi user đăng nhập, có quick intents, lịch sử chat, feedback, handoff cho staff và render product card từ tag AI trả về.",
          "Axios client tự chọn API URL theo môi trường, gửi cookie, thêm CSRF token cho request ghi dữ liệu và retry khi token hết hạn.",
        ],
        userFlow: [
          "Người dùng bắt đầu từ homepage hoặc category, sau đó vào shop để lọc sản phẩm theo nhu cầu.",
          "Khi mở product detail, người dùng chọn màu/size hợp lệ, xem tồn kho, ảnh gallery, review và sản phẩm liên quan.",
          "Người dùng có thể thêm vào wishlist/compare, mở cart drawer để kiểm tra nhanh hoặc đi thẳng checkout bằng Buy Now.",
          "Nếu cần tư vấn, AI chat dùng context sản phẩm và cart để gợi ý sản phẩm, trả lời chính sách hoặc chuyển sang staff khi câu hỏi cần người xử lý.",
        ],
        architecture: [
          "React + Vite storefront dùng React Router cho route customer và admin, lazy-load page để giảm tải ban đầu.",
          "Zustand tách state cho auth, cart, wishlist, compare, notification và UI modal/toast.",
          "Storefront gọi REST API qua Axios client chung, backend Express/Prisma xử lý product, cart, order, wishlist, compare, notification, chat và AI.",
          "AI chat đi qua route /api/ai/chat có validate bằng Zod, optional auth, rate limit và context sản phẩm lấy từ database.",
          "Socket.IO được dùng cho notification/account status, giúp storefront phản ứng với trạng thái realtime từ backend.",
        ],
        challenges: [
          "Phải giữ flow mua hàng rõ ràng dù có nhiều tính năng phụ như wishlist, compare, recently viewed, review và AI chat.",
          "Variant màu/size cần kiểm tra tồn kho trước khi cho add to cart hoặc buy now để tránh chọn tổ hợp không còn hàng.",
          "AI không được bịa sản phẩm hoặc lộ dữ liệu nhạy cảm, nên backend giới hạn domain, chặn JSON/code/table/list và chỉ cho render product tag hợp lệ từ database.",
          "Cart và các request thay đổi dữ liệu cần dùng cookie/CSRF, nên frontend phải tự lấy token, gắn header và retry khi token lỗi.",
        ],
        deepSections: [
          {
            title: "Bề mặt thương mại",
            items: [
              "Storefront không chỉ là product grid: có homepage, category, shop, product detail, cart drawer, cart page, checkout và order confirmation.",
              "Product card có hover image, sale badge, wishlist action, rating và link vào detail để giữ cảm giác shopping rõ ràng.",
              "Product detail có gallery, lightbox, review, related products và recently viewed để người dùng không bị kẹt ở một trang đơn lẻ.",
            ],
          },
          {
            title: "Luồng quyết định mua hàng",
            items: [
              "Shop page dùng URL search params cho filter/sort/page, giúp trạng thái lọc có thể chia sẻ và reload vẫn giữ được.",
              "Filter theo price, color, size, brand và category được nối với API thay vì hard-code ở frontend.",
              "Recently viewed lưu localStorage rồi gọi /products/by-ids để lấy lại product data mới nhất từ backend.",
            ],
          },
          {
            title: "Trải nghiệm giỏ hàng và biến thể",
            items: [
              "Product detail kiểm tra tổ hợp color/size còn hàng trước khi cho chọn, tránh add nhầm variant hết stock.",
              "Quantity bị giới hạn theo stock thực tế của selected variant hoặc product gốc.",
              "Buy Now dùng cùng add-to-cart flow nhưng chuyển thẳng sang checkout, còn Add to Cart mở cart drawer để kiểm tra nhanh.",
            ],
          },
          {
            title: "Lớp AI mua sắm",
            items: [
              "AI chatbot chỉ hiển thị khi user đăng nhập, tránh biến storefront thành chatbot công khai không kiểm soát.",
              "Chatbot có quick intents cho outfit advice, shipping, return policy, compare, size guide, cart summary và contact staff.",
              "AI response có thể render product card bằng custom tag, nên gợi ý sản phẩm nằm ngay trong flow mua hàng thay vì chỉ là text.",
            ],
          },
        ],
        nextSteps: [
          "Thêm visual search bằng ảnh như một flow riêng trong storefront thay vì chỉ mô tả ở case study.",
          "Bổ sung payment thật, tracking đơn hàng và email transactional đầy đủ hơn.",
          "Tối ưu recommendation dựa trên recently viewed, wishlist và cart thay vì chỉ dựa vào context chat.",
        ],
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
        quickScan: [
          {
            label: "Điểm nhìn chính",
            text: "Service layer đứng sau toàn bộ hệ sinh thái Nurfia, phục vụ storefront, admin dashboard, mobile client và AI features.",
          },
          {
            label: "Luồng quan trọng",
            text: "API nhận request từ nhiều client, validate dữ liệu, kiểm tra auth/permission, truy vấn Prisma và trả response thống nhất.",
          },
          {
            label: "Điểm kỹ thuật nổi bật",
            text: "Có CSRF, Helmet, CORS allow-list, JWT guard, module permission, product filtering phức tạp và AI route có rate limit.",
          },
        ],
        features: [
          "REST API cho product, category, cart, order, wishlist, compare, address, contact, payment, notification, blog, settings và upload.",
          "Product API hỗ trợ search, filter theo category/brand/màu/size/price, sort theo giá, rating, độ phổ biến và phân trang.",
          "Auth dùng JWT qua cookie hoặc Bearer token, có optional auth cho AI/chat và guard riêng cho customer/admin/staff/manager.",
          "Admin permission tách theo module như products, inventory, orders, customers, reports, coupons, shipping, blog, contacts và settings.",
          "Có Swagger, global error handler, CSRF protection, helmet, CORS whitelist, upload protection và Socket.IO cho realtime.",
        ],
        userFlow: [
          "Storefront gọi product/category API để hiển thị danh sách, filter, product detail, related products và recently viewed.",
          "User đăng nhập rồi dùng cart/order/wishlist/compare API để đi từ browse tới checkout.",
          "Admin dashboard và các màn quản trị gọi nhóm /api/admin để quản lý sản phẩm, đơn hàng, tồn kho, coupon, blog và báo cáo.",
          "AI chat gọi /api/ai/chat, backend lấy context sản phẩm/cart/settings từ database rồi trả về câu trả lời đã được giới hạn an toàn.",
        ],
        architecture: [
          "Express 5 + TypeScript làm API layer, Prisma làm data access layer cho MySQL schema.",
          "server.ts gom middleware bảo mật, Swagger, static uploads, API routes, not-found handler và Socket.IO server.",
          "Middleware stack gồm helmet, CORS theo allowed origins, cookie parser, body parser, CSRF cho unsafe methods và error handler chung.",
          "Route/controller tách theo domain để storefront, dashboard và mobile có thể dùng chung service layer.",
          "AI route có Zod validation, rate limit, optional auth, timeout khi gọi model và kiểm tra product tag trả về phải thuộc database.",
        ],
        challenges: [
          "Giữ API đủ rộng cho storefront, dashboard và mobile nhưng không trộn toàn bộ logic vào một controller lớn.",
          "Product filter phải xử lý category con, brand slug/name, attribute màu/size và pagination mà vẫn giữ response nhất quán.",
          "Admin cần phân quyền chi tiết hơn chỉ ADMIN/CUSTOMER, nên backend có role STAFF/MANAGER và permission theo module.",
          "AI route cần bảo vệ khỏi prompt injection, output format nguy hiểm và hallucinated product card.",
        ],
        deepSections: [
          {
            title: "Hợp đồng API",
            items: [
              "Public API tách các domain chính: products, categories, cart, orders, wishlist, compare, addresses, payment, notifications, chat và AI.",
              "Product listing trả kèm pagination thống nhất, product detail include images, category, brand, variants và approved reviews.",
              "Các route by-category, by-ids, featured, bestsellers và new giúp storefront không phải tự lọc dữ liệu lớn ở client.",
            ],
          },
          {
            title: "Logic truy vấn và catalog",
            items: [
              "Product filter xử lý category cha/con, search theo name/shortDescription, price range, on-sale, featured và brand slug/name.",
              "Color/size filter không hard-code ID mà dò product attributes theo tên Color/Size hoặc biến thể tiếng Việt.",
              "Sort hỗ trợ newest, price asc/desc, name asc/desc, popular và rating để cùng một endpoint phục vụ nhiều màn shop.",
            ],
          },
          {
            title: "Ranh giới xác thực và phân quyền",
            items: [
              "Auth lấy token từ Bearer header, cookie hoặc query token cho stream endpoint, sau đó verify JWT và kiểm tra user active.",
              "Backend tách requireCustomer, requireAdminAccess và requirePermission để API customer và admin không dùng chung guard mơ hồ.",
              "Permission aliases giúp dữ liệu permission cũ vẫn map sang module mới như inventory, reviews, contacts và activity logs.",
            ],
          },
          {
            title: "Lớp AI và an toàn",
            items: [
              "AI chat route có Zod validation, optional auth, rate limit 10 request/phút và timeout 15 giây khi gọi model.",
              "Backend dựng RAG nhẹ từ tối đa 300 active products, settings cửa hàng và cart context của user đã đăng nhập.",
              "AI output bị chặn JSON/code/table/list và product tag được validate theo product ID thật để tránh gợi ý sản phẩm bịa.",
            ],
          },
        ],
        nextSteps: [
          "Bổ sung test tích hợp cho auth, cart/order, product filter và permission guard.",
          "Tách service layer rõ hơn giữa controller và Prisma khi số lượng business rules tăng.",
          "Thêm observability cho API như request logging, metrics và tracing lỗi production.",
        ],
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
        quickScan: [
          {
            label: "Điểm nhìn chính",
            text: "Không phải trang bán hàng, mà là lớp vận hành nội bộ để admin theo dõi doanh thu, đơn hàng, khách hàng và tồn kho.",
          },
          {
            label: "Luồng quan trọng",
            text: "Admin scan dashboard, phát hiện vấn đề như low stock hoặc order status, rồi đi vào module tương ứng để xử lý.",
          },
          {
            label: "Điểm kỹ thuật nổi bật",
            text: "AdminLayout tách khỏi storefront, navigation lọc theo permission, report có chart, custom range và export CSV.",
          },
        ],
        features: [
          "Dashboard tổng quan có KPI doanh thu, doanh thu tháng, tổng đơn hàng, khách hàng active và biểu đồ revenue trend.",
          "Có order status distribution, recent transactions, best sellers, inventory alerts và newest customers.",
          "Admin area có nhiều module: products, inventory, categories, brands, attributes, orders, customers, staff, reports, blog, coupons, shipping, contacts, reviews, notifications và settings.",
          "Inventory screen hỗ trợ xem stock theo SKU/variant, lọc trạng thái tồn kho, inline edit và audit lịch sử nhập/xuất/điều chỉnh.",
          "Admin dùng cùng API/auth layer với storefront nhưng có permission guard theo vai trò và từng module.",
        ],
        userFlow: [
          "Admin vào dashboard để scan doanh thu, đơn hàng, khách hàng, top products và tồn kho thấp.",
          "Khi thấy sản phẩm tồn kho thấp, admin chuyển sang Inventory để lọc SKU, chỉnh stock và xem lịch sử điều chỉnh.",
          "Khi cần xử lý vận hành, admin đi vào Orders, Customers, Reviews, Contacts hoặc Coupons theo permission được cấp.",
          "Manager/Admin có thể quản lý staff, phân quyền module và theo dõi activity logs để kiểm soát thay đổi trong hệ thống.",
        ],
        architecture: [
          "Admin dashboard là route riêng trong React Router, dùng AdminLayout và không dùng header/footer storefront.",
          "Các trang admin dùng API client chung nên được hưởng cookie auth, CSRF token và error handling như phần customer.",
          "Dashboard lấy /admin/dashboard theo range 7d/30d/all và render chart bằng Recharts.",
          "Backend tính dữ liệu vận hành từ order, customer, product, inventory và trả về response tổng hợp cho dashboard.",
          "Navigation admin lọc item theo permission của user để staff/manager chỉ thấy module được phép.",
        ],
        challenges: [
          "Dashboard cần đủ thông tin vận hành nhưng vẫn scan nhanh, nên phải gom KPI, chart và list cảnh báo theo thứ tự ưu tiên.",
          "Inventory có product-level và variant-level stock, nên UI phải tránh chỉnh nhầm tổng stock khi sản phẩm có nhiều SKU.",
          "Admin panel có nhiều module, cần permission guard để tránh staff truy cập nhầm khu vực nhạy cảm.",
          "Dữ liệu vận hành thay đổi liên tục, nên dashboard cần range filter và realtime/notification support thay vì chỉ là trang thống kê tĩnh.",
        ],
        deepSections: [
          {
            title: "Bảng điều khiển vận hành",
            items: [
              "Dashboard gom KPI quan trọng nhất: total revenue, month revenue, total orders và active customers.",
              "Revenue trend có range 7d/30d/all để admin đổi góc nhìn mà không rời khỏi dashboard.",
              "Order status distribution, recent transactions, best sellers, low-stock alerts và newest customers được đặt cùng một màn để scan nhanh.",
            ],
          },
          {
            title: "Hệ thống module quản trị",
            items: [
              "AdminLayout là nhánh route riêng, không dùng header/footer storefront và có sidebar theo module vận hành.",
              "Navigation lọc theo permission của user, nên Staff/Manager chỉ thấy module được cấp quyền.",
              "Module admin bao phủ banners, products, inventory, categories, brands, attributes, orders, customers, reviews, staff, reports, coupons, shipping, blog, contacts, notifications, activity logs và settings.",
            ],
          },
          {
            title: "Kiểm soát tồn kho và đơn hàng",
            items: [
              "Inventory có màn stock theo SKU/variant, status filter, low-stock threshold, inline edit và lịch sử điều chỉnh.",
              "Dashboard lấy low-stock từ cả product stock và variant stock, sau đó sort theo số lượng thấp nhất để ưu tiên xử lý.",
              "Orders có luồng cập nhật order status và payment status, giúp dashboard không chỉ đọc số liệu mà nối được sang vận hành.",
            ],
          },
          {
            title: "Luồng báo cáo",
            items: [
              "Reports page có preset range, custom date range, validation không cho vượt quá 366 ngày hoặc chọn ngày tương lai.",
              "Recharts được dùng cho area chart, bar chart, pie chart, sparkline KPI và tooltip riêng.",
              "Admin có thể export CSV gồm summary, traffic series, top products, sales by category và status distribution.",
            ],
          },
        ],
        nextSteps: [
          "Thêm drill-down từ dashboard card sang đúng màn orders/products/inventory với filter sẵn.",
          "Bổ sung AI insight thực sự dựa trên doanh thu, tồn kho và hành vi khách hàng thay vì chỉ mô tả ở mức concept.",
          "Thêm export report, audit comparison và cảnh báo tự động khi stock hoặc doanh thu vượt ngưỡng.",
        ],
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
      "Each Nurfia layer is summarized by what that layer actually owns: storefront for buying experience, API for contracts and guards, dashboard for operations.",
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
        quickScan: [
          {
            label: "Main lens",
            text: "The customer-facing surface: product browsing, variant selection, cart, checkout, and AI-assisted shopping.",
          },
          {
            label: "Critical flow",
            text: "From shop filters to product detail, users can choose valid color/size variants, add to cart, or buy now without leaving the buying flow.",
          },
          {
            label: "Technical signal",
            text: "The frontend keeps filter state in the URL, separates cart/wishlist/compare state, and renders AI-recommended product cards.",
          },
        ],
        features: [
          "Complete storefront flow: homepage, category, shop, product detail, cart drawer, cart page, checkout, and order confirmation.",
          "Shop page supports price, color, size, brand, and category filters, plus sorting, pagination, active filters, and recently viewed products.",
          "Product detail supports gallery, lightbox, color/size variants, stock-aware quantity limits, wishlist, compare, buy now, and reviews.",
          "AI chatbot is gated behind login and includes quick intents, saved history, feedback, staff handoff, and product-card rendering from AI product tags.",
          "Shared Axios client detects environment API URLs, sends cookies, attaches CSRF tokens for unsafe requests, and retries after CSRF failures.",
        ],
        userFlow: [
          "Users start from the homepage or a category, then enter the shop page to filter products around a specific need.",
          "On product detail, users choose valid color/size variants, inspect stock, gallery images, reviews, and related products.",
          "Users can add items to wishlist or compare, review the cart drawer quickly, or go straight to checkout with Buy Now.",
          "When users need help, AI chat uses product and cart context to recommend items, answer policy questions, or hand off to staff for cases that need human review.",
        ],
        architecture: [
          "React + Vite storefront uses React Router for customer and admin routes, with lazy-loaded pages for a lighter first load.",
          "Zustand separates auth, cart, wishlist, compare, notification, and UI state instead of keeping all commerce state in one component tree.",
          "The storefront talks to one REST API through a shared Axios client; the Express/Prisma backend owns products, cart, orders, wishlist, compare, notifications, chat, and AI.",
          "AI chat goes through /api/ai/chat with Zod validation, optional auth, rate limiting, and product context pulled from the database.",
          "Socket.IO supports realtime notification and account-status updates so the storefront can react to backend-side changes.",
        ],
        challenges: [
          "Keeping the buying flow clear while layering wishlist, compare, recently viewed products, reviews, and AI chat around it.",
          "Handling color/size variants safely so users cannot add unavailable variant combinations or quantities above stock.",
          "Constraining AI so it does not invent products or expose sensitive data; the backend limits domain, blocks unsafe output formats, and validates product tags against database product IDs.",
          "Protecting state-changing requests with cookie auth and CSRF, which required the frontend client to fetch tokens, attach headers, and retry after CSRF errors.",
        ],
        deepSections: [
          {
            title: "Commerce surface",
            items: [
              "The storefront is more than a product grid: it includes homepage, category, shop, product detail, cart drawer, cart page, checkout, and order confirmation.",
              "Product cards include hover images, sale badges, wishlist actions, ratings, and direct links into detail pages.",
              "Product detail includes gallery, lightbox, reviews, related products, and recently viewed products so users are not trapped in one isolated page.",
            ],
          },
          {
            title: "Shopping decision flow",
            items: [
              "The shop page stores filter, sort, and page state in URL search params so the state survives reloads and can be shared.",
              "Price, color, size, brand, and category filters are backed by the API instead of being hard-coded in the frontend.",
              "Recently viewed products are stored in localStorage, then refreshed through /products/by-ids to load current product data from the backend.",
            ],
          },
          {
            title: "Cart and variant UX",
            items: [
              "Product detail checks valid color/size combinations before selection so users cannot add an unavailable variant.",
              "Quantity is capped by the selected variant stock or by the base product stock.",
              "Buy Now reuses the add-to-cart path but routes directly to checkout, while Add to Cart opens the cart drawer for quick review.",
            ],
          },
          {
            title: "AI shopping layer",
            items: [
              "The AI chatbot is only shown to authenticated users, avoiding an uncontrolled public chatbot surface.",
              "Quick intents cover outfit advice, shipping, return policy, product compare, size guide, cart summary, and staff contact.",
              "AI responses can render product cards through a custom tag, so recommendations sit inside the shopping flow instead of staying as plain text.",
            ],
          },
        ],
        nextSteps: [
          "Add image-based visual search as a dedicated storefront flow instead of only describing it in the case study.",
          "Expand real payment handling, order tracking, and transactional email coverage.",
          "Improve recommendations using recently viewed products, wishlist, and cart signals instead of relying mainly on chat context.",
        ],
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
        quickScan: [
          {
            label: "Main lens",
            text: "The service layer behind the Nurfia ecosystem, serving the storefront, admin dashboard, mobile client, and AI features.",
          },
          {
            label: "Critical flow",
            text: "The API receives requests from multiple clients, validates input, checks auth/permissions, queries Prisma, and returns consistent responses.",
          },
          {
            label: "Technical signal",
            text: "It includes CSRF, Helmet, CORS allow-listing, JWT guards, module permissions, advanced product filtering, and a rate-limited AI route.",
          },
        ],
        features: [
          "REST APIs for products, categories, cart, orders, wishlist, compare, addresses, contact, payment, notifications, blog, settings, and uploads.",
          "Product API supports search, category/brand/color/size/price filters, sorting by price, rating, popularity, and pagination.",
          "Auth uses JWT through cookies or Bearer tokens, with optional auth for AI/chat and separate guards for customer, admin, staff, and manager roles.",
          "Admin permissions are split by module, including products, inventory, orders, customers, reports, coupons, shipping, blog, contacts, and settings.",
          "Includes Swagger, a global error handler, CSRF protection, Helmet, CORS allow-listing, upload protection, and Socket.IO for realtime behavior.",
        ],
        userFlow: [
          "The storefront calls product/category APIs for listings, filters, product detail, related products, and recently viewed products.",
          "Authenticated users use cart, order, wishlist, and compare APIs to move from browsing to checkout.",
          "The admin dashboard and management screens call /api/admin routes to manage products, orders, inventory, coupons, blog content, and reports.",
          "AI chat calls /api/ai/chat, where the backend loads product, cart, and store-setting context from the database before returning a constrained response.",
        ],
        architecture: [
          "Express 5 + TypeScript provides the API layer, with Prisma as the data access layer for the MySQL schema.",
          "server.ts composes security middleware, Swagger, static uploads, API routes, the API not-found handler, and Socket.IO.",
          "The middleware stack includes Helmet, origin-based CORS, cookie parsing, body parsing, CSRF for unsafe methods, and a shared error handler.",
          "Routes and controllers are split by domain so the storefront, dashboard, and mobile client can share the same service surface.",
          "The AI route uses Zod validation, rate limiting, optional auth, model-call timeout, and validates returned product tags against database product IDs.",
        ],
        challenges: [
          "Keeping the API broad enough for storefront, dashboard, and mobile without collapsing all business logic into one large controller.",
          "Product filtering has to handle child categories, brand slug/name matching, color/size attributes, and pagination while keeping response shape consistent.",
          "Admin access needed more than a simple ADMIN/CUSTOMER split, so the backend supports STAFF/MANAGER roles and module-level permissions.",
          "The AI route needs protection against prompt injection, unsafe output formats, and hallucinated product cards.",
        ],
        deepSections: [
          {
            title: "API contract",
            items: [
              "Public APIs are split by domain: products, categories, cart, orders, wishlist, compare, addresses, payment, notifications, chat, and AI.",
              "Product listing returns a consistent pagination shape, while product detail includes images, category, brand, variants, and approved reviews.",
              "Routes such as by-category, by-ids, featured, bestsellers, and new let the storefront avoid heavy client-side filtering.",
            ],
          },
          {
            title: "Query and catalog logic",
            items: [
              "Product filtering handles parent/child categories, search over name and short description, price range, on-sale, featured, and brand slug/name.",
              "Color and size filters do not hard-code IDs; they resolve product attributes by Color/Size names and Vietnamese variants.",
              "Sorting supports newest, price asc/desc, name asc/desc, popular, and rating so one endpoint can power multiple shop views.",
            ],
          },
          {
            title: "Auth and permission boundary",
            items: [
              "Auth reads tokens from Bearer headers, cookies, or query tokens for stream endpoints, then verifies JWT and active-user state.",
              "The backend separates requireCustomer, requireAdminAccess, and requirePermission so customer and admin APIs do not share a vague guard.",
              "Permission aliases keep older permission data compatible with newer modules such as inventory, reviews, contacts, and activity logs.",
            ],
          },
          {
            title: "AI and safety layer",
            items: [
              "The AI chat route uses Zod validation, optional auth, a 10-request-per-minute rate limit, and a 15-second model-call timeout.",
              "The backend builds lightweight RAG from up to 300 active products, store settings, and authenticated cart context.",
              "AI output is blocked from returning JSON/code/tables/lists, and product tags are validated against real database product IDs.",
            ],
          },
        ],
        nextSteps: [
          "Add integration tests for auth, cart/order, product filtering, and permission guards.",
          "Separate a clearer service layer between controllers and Prisma as business rules grow.",
          "Add API observability such as request logging, production metrics, and error tracing.",
        ],
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
        quickScan: [
          {
            label: "Main lens",
            text: "An internal operations layer, not a shopping page, for tracking revenue, orders, customers, inventory, and store activity.",
          },
          {
            label: "Critical flow",
            text: "Admins scan the dashboard, detect issues such as low stock or order status changes, then move into the right module to act.",
          },
          {
            label: "Technical signal",
            text: "AdminLayout is separate from the storefront, navigation is permission-filtered, and reports support charts, custom ranges, and CSV export.",
          },
        ],
        features: [
          "Overview dashboard with revenue, monthly revenue, total orders, active customers, and a revenue trend chart.",
          "Includes order status distribution, recent transactions, best sellers, inventory alerts, and newest customers.",
          "Admin area covers products, inventory, categories, brands, attributes, orders, customers, staff, reports, blog, coupons, shipping, contacts, reviews, notifications, and settings.",
          "Inventory screen supports SKU/variant stock views, stock-status filters, inline editing, and audit history for stock movements.",
          "Admin uses the same API/auth layer as the storefront, but with role and module-level permission guards.",
        ],
        userFlow: [
          "Admins start on the dashboard to scan revenue, orders, customers, top products, and low-stock issues.",
          "When a low-stock product appears, admins move into Inventory to filter by SKU, update stock, and inspect adjustment history.",
          "For day-to-day operations, admins enter Orders, Customers, Reviews, Contacts, or Coupons depending on their permissions.",
          "Managers and admins can manage staff, assign module permissions, and review activity logs to control system changes.",
        ],
        architecture: [
          "The admin dashboard is a separate React Router branch using AdminLayout, without the customer storefront header/footer.",
          "Admin pages use the shared API client, so they inherit cookie auth, CSRF token handling, and shared error behavior.",
          "Dashboard requests /admin/dashboard with 7d, 30d, or all-time ranges and renders charts with Recharts.",
          "The backend aggregates operational data from orders, customers, products, and inventory into one dashboard response.",
          "Admin navigation filters items by the current user's permissions so staff and managers only see allowed modules.",
        ],
        challenges: [
          "The dashboard has to show enough operational signal while staying easy to scan, so KPI, chart, and alert lists are ordered by decision priority.",
          "Inventory has both product-level and variant-level stock, so the UI must avoid editing aggregate stock incorrectly when a product has multiple SKUs.",
          "The admin panel has many modules, so permission guards are needed to keep staff out of sensitive areas.",
          "Operational data changes constantly, so the dashboard needs range filters and realtime/notification support instead of being a static stats page.",
        ],
        deepSections: [
          {
            title: "Operations cockpit",
            items: [
              "The dashboard collects the highest-priority KPIs: total revenue, month revenue, total orders, and active customers.",
              "Revenue trend supports 7d, 30d, and all-time ranges so admins can change perspective without leaving the dashboard.",
              "Order status distribution, recent transactions, best sellers, low-stock alerts, and newest customers sit on one screen for fast scanning.",
            ],
          },
          {
            title: "Admin module system",
            items: [
              "AdminLayout is a separate route branch, without the storefront header/footer, and uses a module-based operations sidebar.",
              "Navigation is filtered by the user's permissions, so Staff and Manager users only see modules they can access.",
              "The admin area covers banners, products, inventory, categories, brands, attributes, orders, customers, reviews, staff, reports, coupons, shipping, blog, contacts, notifications, activity logs, and settings.",
            ],
          },
          {
            title: "Inventory and order control",
            items: [
              "Inventory includes SKU/variant stock views, status filters, low-stock thresholds, inline editing, and stock movement history.",
              "The dashboard pulls low-stock alerts from both product stock and variant stock, then sorts by lowest remaining quantity.",
              "Orders support order-status and payment-status updates, so the dashboard connects back into operational workflows.",
            ],
          },
          {
            title: "Reporting workflow",
            items: [
              "Reports support preset ranges, custom date ranges, and validation that blocks future dates or ranges longer than 366 days.",
              "Recharts powers area charts, bar charts, pie charts, KPI sparklines, and custom tooltips.",
              "Admins can export CSV containing summary data, traffic series, top products, sales by category, and status distribution.",
            ],
          },
        ],
        nextSteps: [
          "Add drill-down links from dashboard cards into the matching orders, products, or inventory views with filters pre-applied.",
          "Implement real AI insight based on revenue, stock, and customer behavior instead of keeping it mostly at concept level.",
          "Add report export, audit comparison, and automatic alerts when stock or revenue crosses important thresholds.",
        ],
      },
    ],
  },
};

export function getProjectBySlug(language: Language, slug: string) {
  return projectCopy[language].items.find((item) => item.slug === slug) || null;
}
