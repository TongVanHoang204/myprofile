# Tong Van Hoang Portfolio

Portfolio cá nhân được xây dựng bằng Next.js 16, React 19 và Tailwind CSS 4 để giới thiệu hồ sơ, dự án FeShenShop, CV, kỹ năng, FAQ AI và form liên hệ.

## Tính năng chính

- Giao diện portfolio đa ngôn ngữ `VI / EN`
- Trang chủ, giới thiệu, dự án, năng lực, FAQ, CV và liên hệ
- Avatar và ảnh dự án cá nhân đã được map trực tiếp từ asset thật
- Loading page dùng video
- FAQ AI gọi qua API nội bộ, hỗ trợ `Gemini` và fallback `Ollama`
- Form liên hệ gửi mail qua `SMTP` hoặc `Resend`
- Route công khai đã có kiểm tra same-origin, JSON content-type và rate limit cơ bản
- Script đóng gói deploy `.zip` không kèm `.env`

## Công nghệ sử dụng

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js / React Three Fiber / Drei
- Nodemailer

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run package:deploy
```

## Chạy local

1. Cài dependency:

```bash
npm install
```

2. Tạo file môi trường:

```bash
copy .env.example .env
```

3. Điền các biến cần thiết trong `.env`

4. Chạy project:

```bash
npm run dev
```

Mở `http://localhost:3000`.

## Biến môi trường

Các biến mẫu nằm trong [`.env.example`](./.env.example).

Nhóm chính:

- `FAQ_AI_PROVIDER`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `OLLAMA_BASE_URL`
- `OLLAMA_MODEL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_OG_IMAGE`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_LOCATION`
- `NEXT_PUBLIC_GITHUB_URL`

## Cấu trúc chính

```text
app/
  api/
    contact/
    faq-ai/
  components/
  context/
  data/
  lib/
  about/
  certificates/
  contact/
  cv/
  faq/
  projects/
public/
  documents/
  profile/
  projects/
  videos/
scripts/
  create-deploy-zip.ps1
```

## Deploy an toàn

Để tạo file `.zip` deploy mà không lộ secret local:

```bash
npm run package:deploy
```

File zip sẽ nằm trong thư mục `dist/` và không chứa:

- `.env`
- các file `.env.*` chứa secret
- `.next`
- `node_modules`
- log và build artifact local

Sau khi upload lên server:

1. Giải nén file zip
2. Copy `.env.example` thành `.env`
3. Điền key thật trực tiếp trên server
4. Chạy:

```bash
npm install
npm run build
npm run start
```

Chi tiết thêm xem tại [DEPLOY.md](./DEPLOY.md).

## Lưu ý bảo mật

- Không commit `.env`
- Không nhét secret vào file `.zip` deploy
- Nếu key đã từng bị lộ qua chat hoặc log, hãy tạo key mới trước khi deploy production

## Ghi chú

Repo này là source code cho portfolio cá nhân của Tống Văn Hoàng, không còn dùng phần admin/auth cũ.
