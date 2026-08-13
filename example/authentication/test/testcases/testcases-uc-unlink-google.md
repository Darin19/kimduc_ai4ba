**STT:** 75
**Category:** Truy cập bảo mật tài khoản
**Sub-Category:** Truy cập
**Checklist:** CHK-authentication-091 — Kiểm tra màn hình bảo mật tài khoản có thể truy cập đối với người dùng đã xác thực.
**Ref:** —
**Priority:** 2
**Title:** Kiểm tra màn hình bảo mật tài khoản có thể truy cập đối với người dùng đã xác thực
**Description:** Kiểm chứng: Kiểm tra màn hình bảo mật tài khoản có thể truy cập đối với người dùng đã xác thực.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Đăng nhập bằng tài khoản đã xác thực, rồi mở màn hình bảo mật tài khoản.
**Expected:** Người dùng đã xác thực mở được màn hình `account-security`, nơi SRS xác định có chức năng gỡ liên kết Google. [TBD: cần BA cấp wording]
**Test Data:** —

***

**STT:** 76
**Category:** Truy cập bảo mật tài khoản
**Sub-Category:** Truy cập
**Checklist:** CHK-authentication-092 — Mở tài khoản đã liên kết Google; kiểm tra nút hủy liên kết hiển thị.
**Ref:** FR-authentication-023
**Priority:** 2
**Title:** Mở tài khoản đã liên kết Google; kiểm tra nút hủy liên kết hiển thị
**Description:** Kiểm chứng: Mở tài khoản đã liên kết Google; kiểm tra nút hủy liên kết hiển thị.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Đăng nhập tài khoản đã liên kết Google và mở màn hình bảo mật tài khoản.
**Expected:** Màn hình bảo mật tài khoản cung cấp chức năng gỡ liên kết Google cho tài khoản đang có liên kết Google (FR-authentication-023).
**Test Data:** Email: learner@email.com / Google: đã liên kết

***

**STT:** 77
**Category:** Hủy liên kết bằng mật khẩu
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-093 — Hủy liên kết Google khỏi tài khoản có mật khẩu; kiểm tra liên kết nhà cung cấp bị xóa.
**Ref:** FR-authentication-023
**Priority:** 1
**Title:** Hủy liên kết Google khỏi tài khoản có mật khẩu; kiểm tra liên kết nhà cung cấp bị xóa
**Description:** Kiểm chứng: Hủy liên kết Google khỏi tài khoản có mật khẩu; kiểm tra liên kết nhà cung cấp bị xóa.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Trên màn hình bảo mật tài khoản đã có mật khẩu, thực hiện chức năng gỡ liên kết Google.
**Expected:** Liên kết Google được gỡ khỏi tài khoản; khả năng đăng nhập bằng email và mật khẩu vẫn được giữ lại (FR-authentication-023).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024! / Google: đã liên kết

***

**STT:** 78
**Category:** Hủy liên kết bằng mật khẩu
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-094 — Hủy liên kết Google khỏi tài khoản có mật khẩu; kiểm tra xác nhận thành công xuất hiện.
**Ref:** FR-authentication-023
**Priority:** 2
**Title:** Hủy liên kết Google khỏi tài khoản có mật khẩu; kiểm tra xác nhận thành công xuất hiện
**Description:** Kiểm chứng: Hủy liên kết Google khỏi tài khoản có mật khẩu; kiểm tra xác nhận thành công xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Trên màn hình bảo mật tài khoản đã có mật khẩu, thực hiện chức năng gỡ liên kết Google.
**Expected:** Hệ thống hoàn tất việc gỡ liên kết Google và giữ khả năng đăng nhập bằng email/mật khẩu của tài khoản (FR-authentication-023).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024! / Google: đã liên kết

***

**STT:** 79
**Category:** Hủy liên kết bằng mật khẩu
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-095 — Đăng nhập bằng email sau khi hủy liên kết Google; kiểm tra quyền truy cập ứng dụng thành công.
**Ref:** FR-authentication-023
**Priority:** 1
**Title:** Đăng nhập bằng email sau khi hủy liên kết Google; kiểm tra quyền truy cập ứng dụng thành công
**Description:** Kiểm chứng: Đăng nhập bằng email sau khi hủy liên kết Google; kiểm tra quyền truy cập ứng dụng thành công.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Sau khi đã gỡ liên kết Google, gửi form đăng nhập với email và mật khẩu của tài khoản.
**Expected:** Người dùng vẫn đăng nhập được bằng email/mật khẩu sau khi liên kết Google đã được gỡ, qua đó duy trì quyền truy cập ứng dụng (FR-authentication-023).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

***

**STT:** 80
**Category:** Hủy liên kết bằng mật khẩu
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-096 — Quay lại bảo mật tài khoản sau khi hủy liên kết Google; kiểm tra nút hủy liên kết không còn.
**Ref:** FR-authentication-023
**Priority:** 2
**Title:** Quay lại bảo mật tài khoản sau khi hủy liên kết Google; kiểm tra nút hủy liên kết không còn
**Description:** Kiểm chứng: Quay lại bảo mật tài khoản sau khi hủy liên kết Google; kiểm tra nút hủy liên kết không còn.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Sau khi đã gỡ liên kết Google, mở lại màn hình bảo mật tài khoản.
**Expected:** Tài khoản không còn liên kết Google sau thao tác gỡ liên kết (FR-authentication-023).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

***

**STT:** 81
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Yêu cầu mật khẩu
**Checklist:** CHK-authentication-097 — Chọn hủy liên kết trên tài khoản chỉ dùng Google; kiểm tra biểu mẫu bắt buộc đặt mật khẩu xuất hiện.
**Ref:** FR-authentication-024, E-authentication-010
**Priority:** 1
**Title:** Chọn hủy liên kết trên tài khoản chỉ dùng Google; kiểm tra biểu mẫu bắt buộc đặt mật khẩu xuất hiện
**Description:** Kiểm chứng: Chọn hủy liên kết trên tài khoản chỉ dùng Google; kiểm tra biểu mẫu bắt buộc đặt mật khẩu xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Trên màn hình bảo mật tài khoản chỉ dùng Google, thực hiện chức năng gỡ liên kết Google.
**Expected:** Hệ thống áp dụng trạng thái "Chuyển sang form buộc tạo mật khẩu trước khi cho gỡ liên kết"; liên kết Google chưa bị gỡ (E-authentication-010).
**Test Data:** Tài khoản chỉ dùng Google: learner@email.com

---‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

**STT:** 82
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Yêu cầu mật khẩu
**Checklist:** CHK-authentication-098 — Nhập mật khẩu hợp lệ gồm 8 ký tự vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra mật khẩu được chấp nhận.
**Ref:** FR-authentication-003, FR-authentication-024
**Priority:** 1
**Title:** Nhập mật khẩu hợp lệ gồm 8 ký tự vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra mật khẩu được chấp nhận
**Description:** Kiểm chứng: Nhập mật khẩu hợp lệ gồm 8 ký tự vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra mật khẩu được chấp nhận.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại form buộc tạo mật khẩu, nhập mật khẩu hợp lệ vào trường mật khẩu.
**Expected:** Mật khẩu được chấp nhận khi dài 8–20 ký tự, có ít nhất một chữ hoa, một chữ thường, một ký tự đặc biệt và không chứa local-part của email; sau đó mới có thể gỡ liên kết Google (FR-authentication-003, FR-authentication-024).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

***

**STT:** 83
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Yêu cầu mật khẩu
**Checklist:** CHK-authentication-099 — Nhập mật khẩu không hợp lệ vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra lỗi chính sách nội tuyến xuất hiện.
**Ref:** FR-authentication-003, E-authentication-002
**Priority:** 1
**Title:** Nhập mật khẩu không hợp lệ vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra lỗi chính sách nội tuyến xuất hiện
**Description:** Kiểm chứng: Nhập mật khẩu không hợp lệ vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra lỗi chính sách nội tuyến xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại form buộc tạo mật khẩu, nhập mật khẩu không thỏa chính sách vào trường mật khẩu.
**Expected:** Form hiện lỗi nội tuyến real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
**Test Data:** Email: learner@email.com / Mật khẩu: 123

***

**STT:** 84
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Yêu cầu mật khẩu
**Checklist:** CHK-authentication-100 — Nhập mật khẩu chứa phần cục bộ của email vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra lỗi chính sách nội tuyến xuất hiện.
**Ref:** FR-authentication-003, E-authentication-002
**Priority:** 1
**Title:** Nhập mật khẩu chứa phần cục bộ của email vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra lỗi chính sách nội tuyến xuất hiện
**Description:** Kiểm chứng: Nhập mật khẩu chứa phần cục bộ của email vào biểu mẫu bắt buộc đặt mật khẩu; kiểm tra lỗi chính sách nội tuyến xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại form buộc tạo mật khẩu, nhập mật khẩu có chứa local-part của email vào trường mật khẩu.
**Expected:** Form hiện lỗi nội tuyến real-time "Mật khẩu cần 8-20 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt, và không chứa phần đầu email của bạn" (E-authentication-002).
**Test Data:** Email: learner@email.com / Mật khẩu: Learner2024!

***

**STT:** 85
**Category:** Bảo mật cơ bản
**Sub-Category:** Duy trì quyền truy cập tài khoản
**Checklist:** CHK-authentication-101 — Hoàn tất tạo mật khẩu bắt buộc; kiểm tra thông tin xác thực bằng email tồn tại trước khi xóa nhà cung cấp.
**Ref:** FR-authentication-024, BR-authentication-004
**Priority:** 1
**Title:** Hoàn tất tạo mật khẩu bắt buộc; kiểm tra thông tin xác thực bằng email tồn tại trước khi xóa nhà cung cấp
**Description:** Kiểm chứng: Hoàn tất tạo mật khẩu bắt buộc; kiểm tra thông tin xác thực bằng email tồn tại trước khi xóa nhà cung cấp.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Tại form buộc tạo mật khẩu, nhập mật khẩu hợp lệ và hoàn tất tạo mật khẩu trước khi gỡ liên kết Google.
**Expected:** Thông tin xác thực bằng email/mật khẩu được tạo trước khi liên kết Google được gỡ, để tài khoản vẫn có lối đăng nhập (FR-authentication-024, BR-authentication-004).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024!

***

**STT:** 86
**Category:** Bảo mật cơ bản
**Sub-Category:** Duy trì quyền truy cập tài khoản
**Checklist:** CHK-authentication-102 — Thử xóa nhà cung cấp trước khi tạo mật khẩu; kiểm tra liên kết Google vẫn được lưu.
**Ref:** FR-authentication-024, BR-authentication-004
**Priority:** 1
**Title:** Thử xóa nhà cung cấp trước khi tạo mật khẩu; kiểm tra liên kết Google vẫn được lưu
**Description:** Kiểm chứng: Thử xóa nhà cung cấp trước khi tạo mật khẩu; kiểm tra liên kết Google vẫn được lưu.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Trên tài khoản chỉ dùng Google, thực hiện chức năng gỡ liên kết nhưng không tạo mật khẩu ở form bắt buộc.
**Expected:** Hệ thống buộc tạo mật khẩu trước khi được gỡ liên kết; vì chưa có mật khẩu, liên kết Google vẫn được giữ lại (FR-authentication-024, BR-authentication-004).
**Test Data:** Tài khoản chỉ dùng Google: learner@email.com

***

**STT:** 87
**Category:** Khả năng truy cập cơ bản
**Sub-Category:** Bàn phím và nhãn
**Checklist:** CHK-authentication-103 — Điều hướng bảo mật tài khoản bằng Tab; kiểm tra nút hủy liên kết nhận tiêu điểm bàn phím.
**Ref:** NFR-authentication-009
**Priority:** 3
**Title:** Điều hướng bảo mật tài khoản bằng Tab; kiểm tra nút hủy liên kết nhận tiêu điểm bàn phím
**Description:** Kiểm chứng: Điều hướng bảo mật tài khoản bằng Tab; kiểm tra nút hủy liên kết nhận tiêu điểm bàn phím.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Trên màn hình bảo mật tài khoản có liên kết Google, nhấn Tab để điều hướng đến chức năng gỡ liên kết Google.
**Expected:** Chức năng gỡ liên kết Google nhận được tiêu điểm khi điều hướng bằng bàn phím, đáp ứng hỗ trợ điều hướng bàn phím cho nút chính của màn xác thực (NFR-authentication-009).
**Test Data:** —

***

**STT:** 88
**Category:** Khả năng truy cập cơ bản
**Sub-Category:** Bàn phím và nhãn
**Checklist:** CHK-authentication-104 — Kiểm tra trường bắt buộc đặt mật khẩu bằng trình đọc màn hình; kiểm tra trường cung cấp nhãn lập trình.
**Ref:** NFR-authentication-009
**Priority:** 3
**Title:** Kiểm tra trường bắt buộc đặt mật khẩu bằng trình đọc màn hình; kiểm tra trường cung cấp nhãn lập trình
**Description:** Kiểm chứng: Kiểm tra trường bắt buộc đặt mật khẩu bằng trình đọc màn hình; kiểm tra trường cung cấp nhãn lập trình.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở form buộc tạo mật khẩu và dùng trình đọc màn hình di chuyển tới trường mật khẩu.
**Expected:** Trình đọc màn hình nhận diện được nhãn lập trình gắn với trường mật khẩu, đáp ứng yêu cầu nhãn cho trình đọc màn hình ở các trường của form xác thực (NFR-authentication-009).
**Test Data:** —‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
