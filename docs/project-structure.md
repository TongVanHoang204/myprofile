# Hướng dẫn tìm và sửa file

## Cấu trúc thư mục

```text
my-portfolio/
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── layout.tsx            # Layout chung, metadata và provider
│   ├── globals.css           # CSS toàn website
│   ├── about/, bio/, blog/, certificates/, contact/, cv/, faq/, owner/, projects/
│   │                         # Trang và route tương ứng với URL
│   ├── api/                  # API; mỗi endpoint có route.ts
│   ├── components/
│   │   ├── analytics/        # Thống kê lượt truy cập và dashboard chủ website
│   │   ├── bio/              # Avatar, kỹ năng và timeline
│   │   ├── blog/             # Giao diện bài viết
│   │   ├── contact/          # Thành phần form liên hệ
│   │   ├── effects/          # Con trỏ, hiệu ứng cuộn, chữ và 3D
│   │   ├── faq/              # Trợ lý AI và chat bubble
│   │   ├── layout/           # Navbar, Footer và AppChrome
│   │   ├── loaders/          # Màn hình chờ và chuyển trang
│   │   ├── music/            # Trình phát nhạc
│   │   ├── projects/         # Card, danh sách và case study dự án
│   │   ├── providers/        # Ngôn ngữ, theme và nút chuyển đổi
│   │   ├── sections/         # Các section trên trang chủ
│   │   └── ui/               # Thành phần giao diện dùng chung
│   ├── data/                 # Nội dung tĩnh và bản dịch VI/EN
│   ├── hooks/                # Hook dùng lại giữa các component
│   ├── lib/
│   │   ├── analytics/        # Ghi nhận, lưu trữ và tổng hợp thống kê
│   │   ├── contact/          # Gửi mail, phản hồi và giới hạn form
│   │   ├── faq/              # Logic AI, kiểu dữ liệu và giới hạn chat
│   │   ├── security/         # Bảo vệ request và cấu hình liên quan
│   │   └── spotify/          # Tích hợp Spotify
│   └── store/                # State dùng chung của trình phát nhạc
├── public/                   # Tài nguyên tĩnh, truy cập trực tiếp qua URL
│   ├── documents/            # CV dạng PDF
│   ├── profile/              # Ảnh cá nhân
│   ├── projects/             # Ảnh dự án
│   └── videos/               # Video và poster
├── scripts/                  # Script chạy thủ công để hỗ trợ phát triển
├── tests/                    # Kiểm thử tự động
├── docs/                     # Tài liệu dành cho người sửa dự án
└── .vscode/settings.json     # Cấu hình Explorer và tìm kiếm cho dự án
```

## Muốn sửa gì thì mở file nào?

| Phần cần sửa | File hoặc thư mục |
| --- | --- |
| Bố cục và phần giới thiệu trang chủ | `app/page.tsx` |
| Các khối About, Projects, Blog, Contact trên trang chủ | `app/components/sections/` |
| Nội dung và bản dịch VI/EN | `app/data/dictionaries.ts` |
| Thông tin liên hệ, mạng xã hội | `app/data/contact.ts` |
| Nội dung dự án | `app/data/projects.ts` |
| Giao diện dự án | `app/components/projects/` |
| Nội dung blog | `app/data/blog.ts` |
| Giao diện bài viết | `app/components/blog/BlogArticlePage.tsx` |
| Thanh điều hướng và footer | `app/components/layout/` |
| Màu sắc, CSS chung | `app/globals.css` |
| Chuyển ngôn ngữ và theme | `app/components/providers/` |
| Hiệu ứng và màn hình loading | `app/components/effects/`, `app/components/loaders/` |
| Form liên hệ | `app/contact/page.tsx`, `app/components/sections/ContactSection.tsx` |
| Gửi email và giới hạn gửi form | `app/api/contact/route.ts`, `app/lib/contact/`, `app/hooks/useContactCooldown.ts` |
| Chat AI | `app/components/faq/`, `app/api/faq-ai/route.ts`, `app/lib/faq/` |
| Trình phát nhạc | `app/components/music/SpotifyPlayer.tsx`, `app/store/musicStore.ts` |
| API Spotify và tìm nhạc | `app/api/spotify/`, `app/api/music/`, `app/lib/spotify/` |
| Dashboard thống kê | `app/owner/page.tsx`, `app/components/analytics/`, `app/lib/analytics/` |
| CV và avatar | `public/documents/tong-van-hoang-cv.pdf`, `public/profile/tong-van-hoang-avatar.jpg` |
| SEO, tiêu đề trang, favicon | `app/layout.tsx` |
| Cấu hình Next.js và HTTP header | `next.config.ts` |
| Kiểm tra request trước khi vào route | `proxy.ts`, `app/lib/security/` |

## Quy ước khi thêm hoặc di chuyển file

- Đặt component trong nhóm chức năng tương ứng; dùng `ui/` cho thành phần dùng chung.
- Đặt nội dung tĩnh trong `app/data/` để sửa nội dung độc lập với giao diện.
- Đặt logic xử lý trong `app/lib/<chức-năng>/`; giữ `route.ts` làm điểm vào API.
- Component dùng tên PascalCase, ví dụ `ProjectCard.tsx`; hook dùng tiền tố `use`, ví dụ `useContactCooldown.ts`.
- Import nội bộ bằng đường dẫn `@/app/...`. Khi di chuyển file, cập nhật cả import và đường dẫn đọc file trong test/script.
- Giữ các file route của Next.js (`page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `head.tsx`) trong thư mục route tương ứng.
- Giữ tên và vị trí tài nguyên trong `public/` nếu đang dùng URL đó; khi đổi tên cần cập nhật mọi nơi tham chiếu.
- Các file cấu hình công cụ như `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `vercel.json` và `proxy.ts` nằm ở gốc dự án.

## Chạy và kiểm tra

Chạy từ thư mục gốc dự án:

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

`npm run lint` hiện chạy `tsc --noEmit` để kiểm tra TypeScript. `npm test` chạy bộ test giới hạn chat AI. `npm run build` kiểm tra bản build production.

Các script trong `scripts/` chạy thủ công: `capture-screenshots.js` chụp ảnh dự án (cần Playwright và Chromium), `test-email-safe.js` gửi email thử, `clear-cooldowns.js` xóa khóa cooldown liên hệ trong Redis. Hai script liên hệ đọc cấu hình từ `.env`.

Trong VS Code, dùng `Ctrl+P` để tìm nhanh theo tên file và `Ctrl+Shift+F` để tìm nội dung. Cấu hình dự án ẩn thư mục build/dependency khỏi Explorer và tìm kiếm; các file vẫn nằm trên ổ đĩa.
