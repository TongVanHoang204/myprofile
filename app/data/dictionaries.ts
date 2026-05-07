export type Language = "vi" | "en";

export const dictionaries = {
  vi: {
    nav: {
      home: "Trang chủ",
      projects: "Dự án",
      about: "Giới thiệu",
      threeD: "BIO",
      certificates: "Năng lực",
      faq: "FAQ",
      cv: "CV",
      contact: "Liên hệ",
    },
    hero: {
      greeting: "XIN CHÀO, TÔI LÀ",
      role_prefix: "Kỹ năng",
      description:
        "Sinh viên ngành Công nghệ thông tin / Kỹ thuật phần mềm tại HUTECH, tập trung vào phát triển web. Tôi đã chủ động xây dựng dự án cá nhân full-stack để rèn kỹ năng frontend, backend, mobile, UI/UX, AI integration và quy trình làm việc với Git, đồng thời hiện đang thực tập và tiếp tục phát triển sản phẩm thực tế.",
      view_projects: "Xem dự án",
      contact: "Liên hệ",
      available: "Hiện đang thực tập",
      roles: [
        "UI/UX",
        "Frontend",
        "Backend",
        "Mobile App",
        "AI Integration",
        "Full-Stack",
        "Minecraft Plugin Dev"
      ],
      highlights: ["UI/UX", "Frontend", "Backend", "Mobile", "AI", "Plugin Dev"],
    },
    projects: {
      title: "Dự án từ CV",
      subtitle:
        "Những phần việc tôi đã trực tiếp xây dựng trong dự án FeShenShop, bám sát nội dung CV.",
      all: "Tất cả",
      filters: {
        all: "Tất cả",
        website: "Trang web",
        backend: "Backend",
        mobile: "Ứng dụng di động",
      },
      view_project: "Xem thêm",
      empty_title: "Chưa có dự án cho bộ lọc này",
      empty_description: "Hãy chọn danh mục khác để xem thêm nội dung.",
      items: [
        {
          title: "Giao diện web FeShenShop",
          description:
            "Storefront responsive xây bằng React và TypeScript, có tích hợp AI chat tư vấn mua sắm, visual search từ ảnh tải lên và luồng gợi ý sản phẩm phù hợp với hành vi người dùng.",
          tags: ["React", "TypeScript", "AI Chat", "Visual Search"],
          thumbnail: "/projects/feshenshop-web.png",
          category: "website",
        },
        {
          title: "FeShenShop RESTful API",
          description:
            "Backend Node.js, Express và TypeScript với các route AI cho chat, generate nội dung và visual search; có phân quyền theo role, rate limit, gọi Ollama/Gemini và fallback pHash plus color histogram khi AI vision không sẵn sàng.",
          tags: ["Node.js", "Express", "AI Routes", "Ollama"],
          thumbnail: "/projects/feshenshop-api.png",
          category: "backend",
        },
        {
          title: "Ứng dụng mua sắm FeShenShop",
          description:
            "Ứng dụng Flutter mở rộng cùng hệ thống FeShenShop lên mobile, có màn AI shopping assistant riêng để hỏi sản phẩm, tư vấn size và kiểm tra đơn hàng trực tiếp trên điện thoại.",
          tags: ["Flutter", "Mobile UI", "AI Chat", "E-commerce"],
          thumbnail: "/projects/feshenshop-mobile.png",
          category: "mobile",
        },
      ],
    },
    about: {
      title: "Về bản thân",
      subtitle: "Tóm tắt học vấn, định hướng và kỹ năng thực hành từ CV.",
      summary:
        "Tôi là sinh viên yêu thích phát triển web và chủ động học qua dự án thực tế. Trong quá trình học và đi thực tập, tôi đã thực hành frontend, backend, mobile, UI/UX, tích hợp AI và sử dụng Git/GitHub để quản lý mã nguồn theo quy trình rõ ràng hơn.",
      timeline_title: "Hành trình",
      skills_title: "Kỹ năng thực hành",
      skills: [
        "JavaScript",
        "TypeScript",
        "PHP",
        "Java",
        "React",
        "Node.js",
        "Express",
        "Flutter",
        "MySQL",
        "Git",
        "GitHub",
        "Prompt AI",
      ],
      timeline: [
        {
          year: "Hiện tại",
          title: "Sinh viên HUTECH đang thực tập và phát triển sản phẩm web",
          place: "HUTECH University of Technology",
          description:
            "Theo học ngành Công nghệ thông tin / Kỹ thuật phần mềm, đồng thời đang thực tập để áp dụng kiến thức vào môi trường thực tế và cải thiện kỹ năng triển khai sản phẩm.",
        },
        {
          year: "Dự án cá nhân",
          title: "Xây dựng hệ thống FeShenShop",
          place: "Dự án tự thực hiện",
          description:
            "Tự triển khai web app, backend API và mobile app cho hệ thống bán hàng thời trang để rèn tư duy full-stack.",
        },
        {
          year: "Năng lực cốt lõi",
          title: "Thực hành Git, REST API và UI responsive",
          place: "Quá trình tự học",
          description:
            "Có thể quản lý source code bằng Git/GitHub, xây dựng API cơ bản với Express và phát triển giao diện responsive với React.",
        },
      ],
    },
    contact: {
      title: "Liên hệ",
      subtitle:
        "Nếu bạn muốn trao đổi về dự án, công nghệ hoặc quá trình tôi đang thực tập và phát triển sản phẩm, tôi sẵn sàng kết nối.",
      name_label: "Họ và tên",
      email_label: "Email",
      message_label: "Nội dung",
      send_btn: "Gửi tin nhắn",
      sending: "Đang gửi...",
      name_required: "Vui lòng nhập họ và tên.",
      email_invalid: "Vui lòng nhập email hợp lệ.",
      message_required: "Vui lòng nhập nội dung.",
      send_error: "Gửi tin nhắn thất bại.",
      network_error: "Không thể gửi tin nhắn. Vui lòng thử lại.",
      config_error:
        "Biểu mẫu liên hệ chưa hoàn tất cấu hình email. Hãy thêm biến môi trường còn thiếu.",
      success_title: "Gửi thành công",
      success_msg: "Cảm ơn bạn. Tôi sẽ phản hồi sớm nhất có thể.",
      info_title: "Thông tin liên hệ",
      social_title: "Liên kết",
    },
    faq: {
      title: "Câu hỏi thường gặp",
      subtitle:
        "Các câu trả lời dưới đây được viết lại từ nội dung CV để nhà tuyển dụng xem nhanh hồ sơ của tôi.",
      search_placeholder: "Tìm câu hỏi...",
      filters: {
        all: "Tất cả",
        tech: "Kỹ năng",
        experience: "Dự án",
        work: "Mục tiêu",
      },
      items: [
        {
          id: "q1",
          category: "tech",
          question: "Stack chính của bạn là gì?",
          answer:
            "Tôi đang thực hành với **JavaScript**, **TypeScript**, **React**, **Node.js**, **Express**, **Flutter**, **MySQL** và **Prompt AI**. Ngoài ra tôi cũng quen với **Git/GitHub**, **REST API** và **MVC Architecture**.",
        },
        {
          id: "q2",
          category: "experience",
          question: "Bạn đã làm dự án nào trong CV?",
          answer:
            "Dự án chính trong CV là **FeShenShop**, một hệ thống thương mại điện tử thời trang gồm **web app**, **backend API** và **mobile app**.",
        },
        {
          id: "q3",
          category: "tech",
          question: "Bạn đã dùng Git như thế nào?",
          answer:
            "Tôi dùng **Git** và **GitHub** để quản lý source code cho dự án cá nhân, theo dõi thay đổi và duy trì workflow phát triển rõ ràng.",
        },
        {
          id: "q4",
          category: "work",
          question: "Mục tiêu hiện tại của bạn là gì?",
          answer:
            "Hiện tại tôi đang **thực tập tại doanh nghiệp** và tiếp tục phát triển kỹ năng **frontend**, **backend**, **UI/UX**, **AI integration** và quy trình triển khai sản phẩm thực tế.",
        },
        {
          id: "q5",
          category: "experience",
          question: "Bạn đã làm phần backend nào?",
          answer:
            "Trong FeShenShop, tôi xây dựng **RESTful APIs** cho quản lý sản phẩm và người dùng, thiết lập cấu trúc route và cấu hình **CORS** cho backend service.",
        },
        {
          id: "q6",
          category: "work",
          question: "Bạn đang học ở đâu?",
          answer:
            "Tôi là sinh viên tại **HUTECH University of Technology**, chuyên ngành **Công nghệ thông tin / Kỹ thuật phần mềm**.",
        },
      ],
      cta: {
        title: "Cần thêm thông tin?",
        subtitle:
          "Bạn có thể liên hệ trực tiếp hoặc mở CV PDF để xem đầy đủ nội dung hồ sơ.",
        email_btn: "Gửi email",
        cv_btn: "Mở CV PDF",
      },
    },
    admin: {
      dashboard: "Tổng quan",
      welcome: "Quản lý nhanh nội dung portfolio của bạn.",
      stats: {
        projects: "Dự án",
        certificates: "Năng lực",
        skills: "Kỹ năng",
        experience: "Kinh nghiệm",
      },
      recent_activity: "Hoạt động gần đây",
      no_activity: "Chưa có hoạt động nào được ghi nhận.",
      pro_tip: {
        title: "Gợi ý",
        content:
          "Ưu tiên thêm dự án thật và mô tả rõ trách nhiệm để portfolio thuyết phục hơn.",
        btn: "Thêm dự án",
      },
      sidebar: {
        panel_name: "Admin Panel",
        dashboard: "Tổng quan",
        profile: "Hồ sơ",
        projects: "Dự án",
        skills: "Kỹ năng",
        certificates: "Năng lực",
        experience: "Kinh nghiệm",
        settings: "Cài đặt",
        logout: "Đăng xuất",
      },
      header: {
        role: "Quản trị viên",
        search_placeholder: "Tìm kiếm nhanh...",
      },
      profile: {
        title: "Chỉnh sửa hồ sơ",
        subtitle: "Cập nhật thông tin cá nhân và ảnh đại diện.",
        avatar_title: "Ảnh đại diện",
        avatar_desc: "Hỗ trợ JPG, PNG hoặc GIF. Tối đa 2MB.",
        display_name: "Tên hiển thị",
        job_title: "Chức danh",
        bio: "Giới thiệu",
        save_btn: "Lưu thay đổi",
        saving: "Đang lưu...",
        success: "Cập nhật thành công.",
        error: "Không thể lưu hồ sơ.",
      },
      projects: {
        title: "Dự án",
        subtitle: "Quản lý các dự án hiển thị trên portfolio.",
        add_btn: "Thêm dự án",
        empty_title: "Chưa có dự án nào",
        empty_desc: "Hãy thêm dự án đầu tiên.",
      },
      skills: {
        title: "Kỹ năng",
        subtitle: "Quản lý danh sách kỹ năng và năng lực.",
        add_btn: "Thêm kỹ năng",
        empty_title: "Chưa có kỹ năng nào",
        empty_desc: "Hãy thêm các kỹ năng nổi bật của bạn.",
      },
      certificates: {
        title: "Năng lực",
        subtitle: "Quản lý các cột mốc học vấn và thành tích.",
        add_btn: "Thêm mục mới",
        empty_title: "Chưa có dữ liệu",
        empty_desc: "Hãy thêm thông tin học vấn hoặc thành tích.",
      },
      experience: {
        title: "Kinh nghiệm",
        subtitle: "Theo dõi quá trình học tập và dự án.",
        add_btn: "Thêm kinh nghiệm",
        empty_title: "Chưa có kinh nghiệm nào",
        empty_desc: "Hãy thêm thông tin hành trình của bạn.",
      },
    },
    footer: {
      text: "Portfolio được xây dựng từ nội dung CV và dự án thực tế của Tống Văn Hoàng.",
    },
    certificates: {
      tag: "Hồ sơ năng lực",
      collection_title: "Năng lực & Cột mốc",
      collection_desc:
        "Tổng hợp học vấn, dự án và kỹ năng thực hành được trình bày trực tiếp từ CV.",
      total_count: "Tổng mục",
      certs_unit: "mục",
      meta_label: "Nhóm",
      details: "Chi tiết",
      showing: "Hiển thị",
      filters: {
        all: "Tất cả",
        education: "Học vấn",
        project: "Dự án",
        skill: "Kỹ năng",
        certificate: "Chứng chỉ",
      },
      items: [
        {
          id: "EDU-HUTECH",
          title: "Công nghệ thông tin / Kỹ thuật phần mềm",
          issuer: "HUTECH University of Technology",
          desc: "Đang theo học chuyên ngành Công nghệ thông tin / Kỹ thuật phần mềm và tập trung vào phát triển web.",
          meta: "Học vấn",
          category: "education",
        },
        {
          id: "PRJ-FESHEN",
          title: "FeShenShop - Hệ thống thương mại điện tử thời trang",
          issuer: "Dự án cá nhân",
          desc: "Hệ thống full-stack gồm web application và mobile application cho cửa hàng thời trang.",
          meta: "Dự án",
          category: "project",
        },
        {
          id: "SKILL-API",
          title: "Phát triển RESTful API",
          issuer: "Node.js + Express + TypeScript",
          desc: "Xây dựng API quản lý sản phẩm và người dùng, cấu trúc route rõ ràng và cấu hình CORS cho backend service.",
          meta: "Kỹ năng",
          category: "skill",
        },
        {
          id: "SKILL-WEB",
          title: "Giao diện web responsive với React",
          issuer: "React + TypeScript",
          desc: "Phát triển giao diện website responsive cho trải nghiệm mua sắm trên nhiều kích thước màn hình.",
          meta: "Kỹ năng",
          category: "skill",
        },
        {
          id: "SKILL-MOBILE",
          title: "Ứng dụng mua sắm di động cơ bản",
          issuer: "Flutter",
          desc: "Thực hành mở rộng hệ thống thương mại điện tử sang mobile bằng ứng dụng mua sắm cơ bản.",
          meta: "Kỹ năng",
          category: "skill",
        },
        {
          id: "SKILL-GIT",
          title: "Quản lý mã nguồn",
          issuer: "Git & GitHub",
          desc: "Quản lý mã nguồn dự án bằng Git và GitHub trong toàn bộ quá trình phát triển.",
          meta: "Kỹ năng",
          category: "skill",
        },
        {
          id: "CERT-GEMINI",
          title: "Gemini Certified University Student",
          issuer: "Google for Education",
          desc: "Chứng chỉ xác nhận kiến thức nền tảng về generative AI và khả năng sử dụng các tính năng, năng lực cốt lõi của Gemini trong bối cảnh giáo dục.",
          meta: "Chứng chỉ",
          category: "certificate",
          issuedOn: "30/03/2026",
          expiresOn: "30/03/2029",
          url: "https://edu.google.accredible.com/f15fd4e8-7a4b-447a-8ed3-938de9664d14#acc.T4xFON9J",
        },
      ],
    },
    cv: {
      download_btn: "Tải CV PDF",
      profile: {
        name: "Tống Văn Hoàng",
        role: "Web Developer Intern",
        tag: "Sinh viên Công nghệ thông tin",
        summary:
          "Yêu thích phát triển web, chủ động rèn luyện qua dự án cá nhân và hiện đang thực tập để tiếp tục phát triển kỹ năng triển khai sản phẩm thực tế.",
      },
      skills_title: "Công nghệ chính",
      tech_stack: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "Flutter",
        "MySQL",
        "Prompt AI",
        "Git",
        "GitHub",
      ],
      strengths_title: "Năng lực nổi bật",
      strengths: [
        "Xây dựng RESTful API cơ bản cho người dùng và sản phẩm",
        "Thiết kế giao diện web responsive bằng React",
        "Phát triển ứng dụng di động cơ bản bằng Flutter",
        "Quản lý mã nguồn bằng Git và GitHub",
      ],
      quick_info_title: "Thông tin nhanh",
      quick_info: [
        { label: "Điện thoại", value: "0935 818 922", icon: "phone" },
        {
          label: "Email",
          value: "tongvanhoang782004@gmail.com",
          icon: "mail",
        },
        {
          label: "GitHub",
          value: "github.com/TongVanHoang204",
          icon: "github",
        },
      ],
      main_content: {
        about_title: "Giới thiệu",
        about_content:
          "Tôi là sinh viên yêu thích phát triển web. Tôi xây dựng dự án cá nhân để rèn luyện kỹ năng, thực hành các chức năng ở cả frontend, backend, mobile và AI integration. Tôi cũng sử dụng Git để quản lý mã nguồn. Hiện tại, tôi đang thực tập và tiếp tục cải thiện khả năng giải quyết các bài toán thực tế trong sản phẩm.",
        education_title: "Học vấn",
        education: [
          {
            title: "Chuyên ngành: Công nghệ thông tin / Kỹ thuật phần mềm",
            school: "HUTECH University of Technology",
            meta: "Đang theo học",
            description:
              "Định hướng phát triển theo mảng phát triển web và tích lũy kinh nghiệm qua dự án cá nhân.",
          },
        ],
        experience_title: "Dự án cá nhân",
        experience: [
          {
            title: "FeShenShop",
            company: "Hệ thống thương mại điện tử thời trang",
            time: "Dự án cá nhân",
            desc: [
              "Hệ thống full-stack gồm một ứng dụng web và một ứng dụng di động cho cửa hàng thời trang.",
              "Công nghệ sử dụng: React, TypeScript, Node.js, Express, Flutter, MySQL.",
              "Xây dựng RESTful API cho quản lý sản phẩm và người dùng.",
              "Thiết lập cấu trúc route và cấu hình CORS cho dịch vụ backend.",
              "Phát triển giao diện web responsive bằng React.",
              "Xây dựng ứng dụng mua sắm cơ bản bằng Flutter.",
              "Quản lý mã nguồn bằng Git và GitHub.",
            ],
          },
        ],
        technical_title: "Hồ sơ kỹ thuật",
        technical_groups: [
          {
            label: "Ngôn ngữ",
            items: ["JavaScript", "TypeScript", "PHP", "Java"],
          },
          {
            label: "Framework / Thư viện",
            items: ["React", "Node.js", "Express", "Flutter"],
          },
          {
            label: "Cơ sở dữ liệu",
            items: ["MySQL"],
          },
          {
            label: "Khái niệm & Công cụ",
            items: ["Git", "GitHub", "REST API", "MVC Architecture"],
          },
        ],
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      threeD: "BIO",
      certificates: "Capabilities",
      faq: "FAQ",
      cv: "Resume",
      contact: "Contact",
    },
    hero: {
      greeting: "HELLO, I AM",
      role_prefix: "Skills",
      description:
        "An Information Technology / Software Engineering student at HUTECH focused on Web Development. I have been building a personal full-stack project that covers frontend, backend, mobile, UI/UX, AI integration, and Git workflow, and I am currently interning while continuing to ship real product work.",
      view_projects: "View projects",
      contact: "Contact me",
      available: "Currently interning",
      roles: [
        "UI/UX",
        "Frontend",
        "Backend",
        "Mobile App",
        "AI Integration",
        "Full-stack",
      ],
      highlights: ["UI/UX", "Frontend", "Backend", "Mobile", "AI"],
    },
    projects: {
      title: "Projects From My CV",
      subtitle:
        "The actual areas I built inside the FeShenShop project, mapped directly from my CV.",
      all: "All",
      filters: {
        all: "All",
        website: "Website",
        backend: "Backend",
        mobile: "Mobile App",
      },
      view_project: "Learn more",
      empty_title: "No projects match this filter",
      empty_description: "Try another category to see more work.",
      items: [
        {
          title: "FeShenShop Web Storefront",
          description:
            "A responsive React and TypeScript storefront with an AI shopping chat widget, image-based visual search, and personalized product suggestion flows.",
          tags: ["React", "TypeScript", "AI Chat", "Visual Search"],
          thumbnail: "/projects/feshenshop-web.png",
          category: "website",
        },
        {
          title: "FeShenShop RESTful API",
          description:
            "A Node.js, Express, and TypeScript backend with AI chat, content generation, and visual-search routes, plus role-based access, rate limiting, Ollama integration, and an algorithmic fallback for image matching.",
          tags: ["Node.js", "Express", "AI Routes", "Ollama"],
          thumbnail: "/projects/feshenshop-api.png",
          category: "backend",
        },
        {
          title: "FeShenShop Mobile Shopping App",
          description:
            "A Flutter shopping app that extends the same system to mobile, including a dedicated AI shopping assistant for product discovery, size guidance, and order help.",
          tags: ["Flutter", "Mobile UI", "AI Chat", "E-commerce"],
          thumbnail: "/projects/feshenshop-mobile.png",
          category: "mobile",
        },
      ],
    },
    about: {
      title: "About Me",
      subtitle: "Education, direction, and hands-on skills taken from my CV.",
      summary:
        "I enjoy learning Web Development by building real projects. Through project work and my current internship, I have practiced frontend, backend, mobile, UI/UX, AI integration, and Git/GitHub workflow in a more structured way.",
      timeline_title: "Journey",
      skills_title: "Hands-on skills",
      skills: [
        "JavaScript",
        "TypeScript",
        "PHP",
        "Java",
        "React",
        "Node.js",
        "Express",
        "Flutter",
        "MySQL",
        "Git",
        "GitHub",
        "Prompt AI",
      ],
      timeline: [
        {
          year: "Current",
          title: "HUTECH student currently interning and building web products",
          place: "HUTECH University of Technology",
          description:
            "Studying Information Technology / Software Engineering while interning and applying what I learn to real product work.",
        },
        {
          year: "Personal Project",
          title: "Built the FeShenShop system",
          place: "Self-driven practice",
          description:
            "Created a web app, backend API, and mobile app for a fashion store to strengthen my full-stack fundamentals.",
        },
        {
          year: "Core abilities",
          title: "Practicing Git, REST APIs, and responsive UI",
          place: "Learning workflow",
          description:
            "Comfortable using Git/GitHub, building basic Express APIs, and creating responsive interfaces with React.",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle:
        "If you want to discuss a project, technology, or the work I am doing during my internship, I am ready to connect.",
      name_label: "Name",
      email_label: "Email",
      message_label: "Message",
      send_btn: "Send message",
      sending: "Sending...",
      name_required: "Please enter your name.",
      email_invalid: "Please enter a valid email address.",
      message_required: "Please enter a message.",
      send_error: "Could not send your message.",
      network_error: "Unable to send your message. Please try again.",
      config_error:
        "The contact form email setup is incomplete. Add the missing environment variables.",
      success_title: "Sent successfully",
      success_msg: "Thank you. I will get back to you as soon as possible.",
      info_title: "Contact info",
      social_title: "Links",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "These answers are rewritten directly from my CV so recruiters can scan my profile faster.",
      search_placeholder: "Search questions...",
      filters: {
        all: "All",
        tech: "Skills",
        experience: "Project",
        work: "Goals",
      },
      items: [
        {
          id: "q1",
          category: "tech",
          question: "What is your main stack?",
          answer:
            "I am practicing with **JavaScript**, **TypeScript**, **React**, **Node.js**, **Express**, **Flutter**, **MySQL**, and **Prompt AI**. I am also comfortable with **Git/GitHub**, **REST APIs**, and **MVC Architecture**.",
        },
        {
          id: "q2",
          category: "experience",
          question: "What project is in your CV?",
          answer:
            "My main CV project is **FeShenShop**, a fashion e-commerce system that includes a **web app**, **backend API**, and **mobile app**.",
        },
        {
          id: "q3",
          category: "tech",
          question: "How do you use Git?",
          answer:
            "I use **Git** and **GitHub** to manage source code for my personal project, track changes, and keep my workflow organized.",
        },
        {
          id: "q4",
          category: "work",
          question: "What is your current goal?",
          answer:
            "I am currently **interning at a company** and continuing to strengthen my **frontend**, **backend**, **UI/UX**, **AI integration**, and real product delivery skills.",
        },
        {
          id: "q5",
          category: "experience",
          question: "What backend work have you done?",
          answer:
            "In FeShenShop, I built **RESTful APIs** for product and user management, set up routing structure, and configured **CORS** for backend services.",
        },
        {
          id: "q6",
          category: "work",
          question: "Where do you study?",
          answer:
            "I am a student at **HUTECH University of Technology**, majoring in **Information Technology / Software Engineering**.",
        },
      ],
      cta: {
        title: "Need more information?",
        subtitle:
          "You can contact me directly or open the PDF resume for the full profile.",
        email_btn: "Send email",
        cv_btn: "Open PDF resume",
      },
    },
    admin: {
      dashboard: "Dashboard",
      welcome: "Quickly manage your portfolio content.",
      stats: {
        projects: "Projects",
        certificates: "Capabilities",
        skills: "Skills",
        experience: "Experience",
      },
      recent_activity: "Recent activity",
      no_activity: "No activity recorded yet.",
      pro_tip: {
        title: "Tip",
        content:
          "Prioritize real projects and clear responsibilities to make the portfolio more convincing.",
        btn: "Add project",
      },
      sidebar: {
        panel_name: "Admin Panel",
        dashboard: "Dashboard",
        profile: "Profile",
        projects: "Projects",
        skills: "Skills",
        certificates: "Capabilities",
        experience: "Experience",
        settings: "Settings",
        logout: "Sign out",
      },
      header: {
        role: "Administrator",
        search_placeholder: "Quick search...",
      },
      profile: {
        title: "Edit profile",
        subtitle: "Update your personal information and avatar.",
        avatar_title: "Avatar",
        avatar_desc: "Supports JPG, PNG, or GIF. Max 2MB.",
        display_name: "Display name",
        job_title: "Job title",
        bio: "Bio",
        save_btn: "Save changes",
        saving: "Saving...",
        success: "Profile updated successfully.",
        error: "Could not save profile.",
      },
      projects: {
        title: "Projects",
        subtitle: "Manage projects shown in the portfolio.",
        add_btn: "Add project",
        empty_title: "No projects yet",
        empty_desc: "Add your first project.",
      },
      skills: {
        title: "Skills",
        subtitle: "Manage your skills and strengths.",
        add_btn: "Add skill",
        empty_title: "No skills yet",
        empty_desc: "Add your top skills.",
      },
      certificates: {
        title: "Capabilities",
        subtitle: "Manage education and milestone items.",
        add_btn: "Add item",
        empty_title: "No data yet",
        empty_desc: "Add education or achievement details.",
      },
      experience: {
        title: "Experience",
        subtitle: "Track your learning and project journey.",
        add_btn: "Add experience",
        empty_title: "No experience yet",
        empty_desc: "Add your journey details.",
      },
    },
    footer: {
      text: "This portfolio is built from the real CV and project work of Tong Van Hoang.",
    },
    certificates: {
      tag: "Capability Profile",
      collection_title: "Capabilities & Milestones",
      collection_desc:
        "A concise view of the education, project work, and hands-on skills presented in my CV.",
      total_count: "Total items",
      certs_unit: "items",
      meta_label: "Group",
      details: "Details",
      showing: "Showing",
      filters: {
        all: "All",
        education: "Education",
        project: "Project",
        skill: "Skills",
        certificate: "Certificate",
      },
      items: [
        {
          id: "EDU-HUTECH",
          title: "Information Technology / Software Engineering",
          issuer: "HUTECH University of Technology",
          desc: "Currently studying Information Technology / Software Engineering with a strong focus on Web Development.",
          meta: "Education",
          category: "education",
        },
        {
          id: "PRJ-FESHEN",
          title: "FeShenShop Fashion E-commerce System",
          issuer: "Personal Project",
          desc: "A full-stack system that includes a web application and a mobile application for a fashion store.",
          meta: "Project",
          category: "project",
        },
        {
          id: "SKILL-API",
          title: "RESTful API Development",
          issuer: "Node.js + Express + TypeScript",
          desc: "Built APIs for product and user management, route structure, and CORS configuration.",
          meta: "Skill",
          category: "skill",
        },
        {
          id: "SKILL-WEB",
          title: "Responsive Web UI with React",
          issuer: "React + TypeScript",
          desc: "Built responsive website interfaces to support shopping experiences across screen sizes.",
          meta: "Skill",
          category: "skill",
        },
        {
          id: "SKILL-MOBILE",
          title: "Basic Mobile Shopping App",
          issuer: "Flutter",
          desc: "Practiced extending the same e-commerce system to mobile through a basic shopping app.",
          meta: "Skill",
          category: "skill",
        },
        {
          id: "SKILL-GIT",
          title: "Source Code Management",
          issuer: "Git & GitHub",
          desc: "Managed project source code with Git and GitHub throughout development.",
          meta: "Skill",
          category: "skill",
        },
        {
          id: "CERT-GEMINI",
          title: "Gemini Certified University Student",
          issuer: "Google for Education",
          desc: "Certification validating foundational generative AI knowledge and the ability to use Gemini core features and capabilities in an educational context.",
          meta: "Certificate",
          category: "certificate",
          issuedOn: "March 30, 2026",
          expiresOn: "March 30, 2029",
          url: "https://edu.google.accredible.com/f15fd4e8-7a4b-447a-8ed3-938de9664d14#acc.T4xFON9J",
        },
      ],
    },
    cv: {
      download_btn: "Download PDF resume",
      profile: {
        name: "Tong Van Hoang",
        role: "Web Developer Intern",
        tag: "Information Technology Student",
        summary:
          "Passionate about Web Development, self-driven through personal projects, and currently interning while continuing to improve real product delivery skills.",
      },
      skills_title: "Core Stack",
      tech_stack: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "Flutter",
        "MySQL",
        "Prompt AI",
        "Git",
        "GitHub",
      ],
      strengths_title: "Key strengths",
      strengths: [
        "Built basic RESTful APIs for product and user management",
        "Created responsive website interfaces with React",
        "Developed a basic shopping app with Flutter",
        "Managed source code using Git and GitHub",
      ],
      quick_info_title: "Quick info",
      quick_info: [
        { label: "Phone", value: "0935 818 922", icon: "phone" },
        {
          label: "Email",
          value: "tongvanhoang782004@gmail.com",
          icon: "mail",
        },
        {
          label: "GitHub",
          value: "github.com/TongVanHoang204",
          icon: "github",
        },
      ],
      main_content: {
        about_title: "Profile",
        about_content:
          "I am a student passionate about Web Development. I have built personal projects to practice my skills across frontend, backend, mobile, and AI integration. I also use Git to manage source code. Right now, I am interning and continuing to improve how I solve real product problems in practice.",
        education_title: "Education",
        education: [
          {
            title: "Major: Information Technology / Software Engineering",
            school: "HUTECH University of Technology",
            meta: "Current Student",
            description:
              "Focused on Web Development and gaining practical experience through personal projects.",
          },
        ],
        experience_title: "Personal Project",
        experience: [
          {
            title: "FeShenShop",
            company: "Fashion E-commerce System",
            time: "Personal Project",
            desc: [
              "Full-stack system including a web application and a mobile application for a fashion store.",
              "Tech Stack: React, TypeScript, Node.js, Express, Flutter, MySQL.",
              "Developed RESTful APIs for product and user management.",
              "Implemented routing structure and configured CORS for backend services.",
              "Built responsive user interfaces for the website using React.",
              "Developed a basic mobile shopping application using Flutter.",
              "Managed source code using Git and GitHub.",
            ],
          },
        ],
        technical_title: "Technical Profile",
        technical_groups: [
          {
            label: "Languages",
            items: ["JavaScript", "TypeScript", "PHP", "Java"],
          },
          {
            label: "Frameworks / Libraries",
            items: ["React", "Node.js", "Express", "Flutter"],
          },
          {
            label: "Database",
            items: ["MySQL"],
          },
          {
            label: "Concepts & Tools",
            items: ["Git", "GitHub", "REST API", "MVC Architecture"],
          },
        ],
      },
    },
  },
};
