---
type: shared-environment
status: draft
owner: "@ba"
created: 2026-05-09
updated: 2026-06-27
changelog:
  - 2026-06-27 | /update-overview | [env] rewrote from authentication + premium-payment + vocabulary-flashcard docs
  - 2026-05-09 | manual | initial stub
---

# Operating Environment‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

> Môi trường vận hành dùng chung toàn dự án — app học tiếng Anh **english-ai-demo**. Cập nhật khi đổi nền tảng đích, đối tác tích hợp hoặc phạm vi ngôn ngữ.

## Nền tảng đích‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

- **Web responsive** (desktop + mobile), một codebase phục vụ cả 2.
- Mobile breakpoint nhỏ nhất **375px** (iPhone SE). Test 2 viewport phổ biến: **375×667** và **414×896**.
- Tablet: chưa cam kết riêng (responsive web tự co giãn).

## Trình duyệt hỗ trợ‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

- Chrome, Safari, Firefox, Edge — **2 phiên bản major mới nhất**.
- Mobile: **iOS Safari** + **Android Chrome**.

## Lưu ý mobile (rút từ test suite authentication)‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

- Font input **≥16px** để tránh iOS auto-zoom khi focus.
- Touch target **≥44px** (nút, link).
- Bàn phím mobile **không che** field đang focus (auto-scroll khi focus).
- Mọi form **không scroll ngang** ở viewport mobile.

## Người dùng & ngôn ngữ‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

- Người dùng chính: **Learner** học/ôn tiếng Anh (xem [[docs/_shared/definitions.md#Learner-Người-học]]).‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍
- Giao diện **tiếng Việt mặc định**. Toàn bộ wording lỗi/thành công/thông tin bằng tiếng Việt (NFR-authentication-005).

## Đối tác tích hợp ngoài

| Đối tác | Vai trò |
|---------|---------|
| **PayGate** | Thu thẻ một lần (Charge), thuê bao tự gia hạn (Subscription), hoàn tiền (Refund), polling events |
| **MailGate** | Email giao dịch: biên nhận, cảnh báo thanh toán thất bại, email xác nhận |
| **Google OAuth** | Đăng nhập/đăng ký bằng tài khoản Google + auto-link theo email |

## Giả định mạng & phiên

- **Online-first.**
- Đăng nhập **đa thiết bị**, không giới hạn số phiên, phiên **không tự hết hạn**.
- Đặt lại mật khẩu thu hồi mọi phiên (BR-authentication-008); đăng xuất chỉ tác động thiết bị hiện tại.

## Bảo mật vận hành

- Khóa đối tác (PayGate/MailGate) lưu ở **secret store phía server** — KHÔNG nhúng client, KHÔNG log (NFR-premium-payment-004).
- Mật khẩu lưu dạng hash, không bao giờ log plaintext; audit log mọi sự kiện auto-link social (NFR-authentication-001).‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
