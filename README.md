# Tong Van Hoang Portfolio

Đây là website portfolio cá nhân của tôi, được xây dựng để giới thiệu hồ sơ, kỹ năng, CV, blog kỹ thuật và các case study dự án trong hệ sinh thái Nurfia.

## Phát triển và chỉnh sửa

Xem [hướng dẫn cấu trúc dự án và tìm file cần sửa](docs/project-structure.md).

- `app/data/`: nội dung, bản dịch, dự án và blog.
- `app/components/`: giao diện được chia theo chức năng.
- `app/lib/`: logic xử lý được chia theo chức năng.
- `app/api/`: các endpoint; `public/`: ảnh, video và CV.
- `scripts/`, `tests/`, `docs/`: công cụ hỗ trợ, kiểm thử và tài liệu.

```sh
npm ci
npm run dev
```

Kiểm tra thay đổi bằng `npm run lint` (TypeScript), `npm test` và `npm run build`.

## Giới Thiệu

Website này đóng vai trò như một hồ sơ trực tuyến, giúp người xem nắm nhanh:

- Tôi là ai và đang tập trung vào lĩnh vực nào
- Kỹ năng frontend, backend, mobile, UI/UX và AI integration của tôi
- Các dự án tôi đã trực tiếp xây dựng
- CV, thông tin liên hệ và những câu hỏi thường gặp
- Ghi chú/blog kỹ thuật liên quan đến quá trình tôi xây sản phẩm

## Nội Dung Chính

### Trang Chủ

Giới thiệu ngắn gọn về tôi, định hướng phát triển web, các kỹ năng chính và lối dẫn đến dự án, blog, CV và liên hệ.

### Dự Án Nurfia

Phần dự án tập trung vào hệ thống thương mại điện tử thời trang Nurfia mà tôi đã xây dựng, được tách thành các case study riêng:

- **Nurfia Web Storefront**: giao diện mua sắm, product listing, product detail, cart, checkout và AI shopping assistant.
- **Nurfia RESTful API**: backend service layer cho storefront, dashboard, mobile client và các tính năng AI.
- **Nurfia Admin Dashboard**: khu vực quản trị nội bộ cho doanh thu, đơn hàng, khách hàng, tồn kho, báo cáo và phân quyền.

Mỗi case study trình bày rõ mục tiêu, vai trò của tôi, stack, cách tôi đưa AI vào sản phẩm, kết quả và các chi tiết kỹ thuật tôi đã trực tiếp thực hiện.

### Blog Kỹ Thuật

Blog ghi lại các ghi chú của tôi về cách xây dựng Nurfia, kiến trúc full-stack, RESTful API, AI workflow và hướng phát triển portfolio.

### Bio Và CV

Phần Bio và CV tóm tắt thông tin cá nhân của tôi, quá trình học tập, kỹ năng, kinh nghiệm thực tập và các điểm nổi bật trong hồ sơ.

### FAQ Và Liên Hệ

FAQ giúp người xem hỏi nhanh về kỹ năng, dự án và mục tiêu hiện tại của tôi. Trang liên hệ cho phép gửi tin nhắn trực tiếp để kết nối với tôi.

### Giới Hạn Chat AI

API `/api/faq-ai` cho phép tối đa **12 lượt gọi mỗi 10 phút trên mỗi IP**, với khoảng cách **10 giây** giữa các lượt. Bộ đếm bắt đầu từ lượt đầu tiên, tính cả lượt gọi gặp lỗi để hạn chế spam. Các thiết bị dùng chung IP sẽ dùng chung hạn mức.

Khi hết lượt, API trả `429` kèm `Retry-After`. Giao diện VI/EN hiển thị thời gian chờ, khóa nút gửi và câu hỏi gợi ý; thời gian chờ được lưu qua tải lại trang và đồng bộ giữa các tab.

Trên Vercel/production, cấu hình `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN` trong Environment Variables rồi redeploy. Redis kiểm tra và cập nhật hạn mức trong một thao tác nguyên tử để các instance dùng chung bộ đếm. Nếu thiếu cấu hình hoặc Redis lỗi, API tạm trả `503` và không gọi model AI. Khi chạy development không có Redis, bộ đếm RAM chỉ dùng cho tiến trình local. Nếu tự host phía sau reverse proxy, proxy phải ghi đè `X-Forwarded-For` bằng IP client đáng tin cậy.

## Mục Tiêu Của Website

Tôi thiết kế website này để nó không chỉ là một landing page giới thiệu bản thân, mà là một portfolio có cấu trúc rõ ràng, tập trung vào bằng chứng sản phẩm thật. Nurfia là trọng tâm của website, giúp người xem thấy được cách tôi suy nghĩ về frontend, backend, admin workflow, AI integration và việc triển khai một hệ thống web hoàn chỉnh.
