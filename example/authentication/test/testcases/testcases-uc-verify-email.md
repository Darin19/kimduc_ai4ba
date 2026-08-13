**STT:** 89
**Category:** Truy cập xác minh
**Sub-Category:** Liên kết xác nhận
**Checklist:** CHK-authentication-021 — Mở liên kết xác nhận hợp lệ; kiểm tra trang kết quả xác minh tải thành công.
**Ref:** FR-authentication-005
**Priority:** 2
**Title:** Mở liên kết xác nhận hợp lệ; kiểm tra trang kết quả xác minh tải thành công
**Description:** Kiểm chứng: Mở liên kết xác nhận hợp lệ; kiểm tra trang kết quả xác minh tải thành công.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở liên kết xác nhận chưa dùng, còn hiệu lực 24 giờ trong email xác nhận.
**Expected:** Trang `verify-result-success` tải và hiển thị "Xác nhận email thành công! Vui lòng đăng nhập.", rồi chuyển về màn đăng nhập (FR-authentication-005).
**Test Data:** Liên kết xác nhận chưa dùng, được tạo dưới 24 giờ cho learner@email.com

***

**STT:** 90
**Category:** Xác nhận email
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-022 — Dùng liên kết xác nhận chưa dùng còn hiệu lực; kiểm tra trạng thái tài khoản chuyển thành đã xác minh.
**Ref:** FR-authentication-005
**Priority:** 1
**Title:** Dùng liên kết xác nhận chưa dùng còn hiệu lực; kiểm tra trạng thái tài khoản chuyển thành đã xác minh
**Description:** Kiểm chứng: Dùng liên kết xác nhận chưa dùng còn hiệu lực; kiểm tra trạng thái tài khoản chuyển thành đã xác minh.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Mở liên kết xác nhận chưa dùng, còn hiệu lực 24 giờ của tài khoản `unverified`.
**Expected:** Hệ thống chuyển trạng thái tài khoản từ `unverified` sang `verified` sau khi xử lý liên kết (FR-authentication-005).
**Test Data:** Tài khoản `unverified`: learner@email.com; liên kết xác nhận chưa dùng, được tạo dưới 24 giờ

***

**STT:** 91
**Category:** Xác nhận email
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-023 — Dùng liên kết xác nhận hợp lệ; kiểm tra mã thông báo được đánh dấu là đã dùng.
**Ref:** FR-authentication-005
**Priority:** 1
**Title:** Dùng liên kết xác nhận hợp lệ; kiểm tra mã thông báo được đánh dấu là đã dùng
**Description:** Kiểm chứng: Dùng liên kết xác nhận hợp lệ; kiểm tra mã thông báo được đánh dấu là đã dùng.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Mở liên kết xác nhận chưa dùng, còn hiệu lực 24 giờ và kiểm tra lại trạng thái mã thông báo sau khi xác nhận.
**Expected:** Hệ thống đánh dấu link xác nhận là đã dùng; mã thông báo có trạng thái `used` và không còn có thể xác nhận lại (FR-authentication-005).
**Test Data:** Liên kết xác nhận chưa dùng, được tạo dưới 24 giờ cho learner@email.com

***

**STT:** 92
**Category:** Xác nhận email
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-024 — Dùng liên kết xác nhận hợp lệ; kiểm tra thông báo thành công được hiển thị.
**Ref:** FR-authentication-005
**Priority:** 2
**Title:** Dùng liên kết xác nhận hợp lệ; kiểm tra thông báo thành công được hiển thị
**Description:** Kiểm chứng: Dùng liên kết xác nhận hợp lệ; kiểm tra thông báo thành công được hiển thị.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở liên kết xác nhận chưa dùng, còn hiệu lực 24 giờ trong email xác nhận.
**Expected:** Trang kết quả hiển thị "Xác nhận email thành công! Vui lòng đăng nhập." (FR-authentication-005).
**Test Data:** Liên kết xác nhận chưa dùng, được tạo dưới 24 giờ cho learner@email.com

***

**STT:** 93
**Category:** Xác nhận email
**Sub-Category:** Luồng thành công
**Checklist:** CHK-authentication-025 — Dùng liên kết xác nhận hợp lệ; kiểm tra đích đến đăng nhập được cung cấp.
**Ref:** FR-authentication-005
**Priority:** 2
**Title:** Dùng liên kết xác nhận hợp lệ; kiểm tra đích đến đăng nhập được cung cấp
**Description:** Kiểm chứng: Dùng liên kết xác nhận hợp lệ; kiểm tra đích đến đăng nhập được cung cấp.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở liên kết xác nhận chưa dùng, còn hiệu lực 24 giờ và theo luồng chuyển tiếp từ trang kết quả thành công.
**Expected:** Sau khi hiển thị "Xác nhận email thành công! Vui lòng đăng nhập.", trang kết quả chuyển người dùng về màn đăng nhập (FR-authentication-005).
**Test Data:** Email: learner@email.com / Mật khẩu: Hoc2024! / Liên kết xác nhận chưa dùng, được tạo dưới 24 giờ

***

**STT:** 94
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Liên kết không hợp lệ
**Checklist:** CHK-authentication-026 — Mở liên kết xác nhận sau 24 giờ; kiểm tra kết quả liên kết hết hạn xuất hiện.
**Ref:** FR-authentication-006, E-authentication-006
**Priority:** 1
**Title:** Mở liên kết xác nhận sau 24 giờ; kiểm tra kết quả liên kết hết hạn xuất hiện
**Description:** Kiểm chứng: Mở liên kết xác nhận sau 24 giờ; kiểm tra kết quả liên kết hết hạn xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở liên kết xác nhận đã được tạo quá 24 giờ.
**Expected:** Trang kết quả hiện "Link đã hết hạn hoặc đã được sử dụng. [Gửi lại link xác nhận]" (E-authentication-006).
**Test Data:** Liên kết xác nhận đã hết hạn (được tạo quá 24 giờ) cho learner@email.com

***

**STT:** 95
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Liên kết không hợp lệ
**Checklist:** CHK-authentication-027 — Mở lại liên kết xác nhận đã dùng; kiểm tra kết quả liên kết đã dùng xuất hiện.
**Ref:** FR-authentication-006, E-authentication-006
**Priority:** 1
**Title:** Mở lại liên kết xác nhận đã dùng; kiểm tra kết quả liên kết đã dùng xuất hiện
**Description:** Kiểm chứng: Mở lại liên kết xác nhận đã dùng; kiểm tra kết quả liên kết đã dùng xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Mở lại liên kết xác nhận đã được dùng để xác nhận tài khoản.
**Expected:** Trang kết quả hiện "Link đã hết hạn hoặc đã được sử dụng. [Gửi lại link xác nhận]" (E-authentication-006).
**Test Data:** Liên kết xác nhận có trạng thái `used` cho learner@email.com

***

**STT:** 96
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Giới hạn gửi lại
**Checklist:** CHK-authentication-028 — Mở trạng thái đã gửi xác nhận; kiểm tra nút gửi lại hiển thị.
**Ref:** FR-authentication-007
**Priority:** 2
**Title:** Mở trạng thái đã gửi xác nhận; kiểm tra nút gửi lại hiển thị
**Description:** Kiểm chứng: Mở trạng thái đã gửi xác nhận; kiểm tra nút gửi lại hiển thị.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Hoàn tất gửi email xác nhận và mở trang trạng thái `verify-sent`.
**Expected:** Trang `verify-sent` hiển thị "Đã gửi email xác nhận tới {email}…" và có nút gửi lại để yêu cầu link xác nhận mới (FR-authentication-007).
**Test Data:** Email: learner@email.com

---‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

**STT:** 97
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Giới hạn gửi lại
**Checklist:** CHK-authentication-029 — Yêu cầu gửi lại được phép; kiểm tra email xác nhận mới được gửi đi.
**Ref:** FR-authentication-007
**Priority:** 1
**Title:** Yêu cầu gửi lại được phép; kiểm tra email xác nhận mới được gửi đi
**Description:** Kiểm chứng: Yêu cầu gửi lại được phép; kiểm tra email xác nhận mới được gửi đi.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Tại trang trạng thái đã gửi xác nhận, bấm nút gửi lại khi đã qua cooldown và chưa đạt giới hạn ngày.
**Expected:** Hệ thống gửi lại email xác nhận chứa một link mới tới địa chỉ email đã đăng ký (FR-authentication-007).
**Test Data:** Email: learner@email.com; lần gửi lại thứ 2 trong ngày, cách lần trước trên 60 giây

***

**STT:** 98
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Giới hạn gửi lại
**Checklist:** CHK-authentication-030 — Yêu cầu gửi lại được phép; kiểm tra liên kết mới có thời hạn hiệu lực 24 giờ.
**Ref:** FR-authentication-007
**Priority:** 1
**Title:** Yêu cầu gửi lại được phép; kiểm tra liên kết mới có thời hạn hiệu lực 24 giờ
**Description:** Kiểm chứng: Yêu cầu gửi lại được phép; kiểm tra liên kết mới có thời hạn hiệu lực 24 giờ.
**Auto:** No
**Preconditions:** —

**Step:** 1
**Action:** Tại trang trạng thái đã gửi xác nhận, bấm nút gửi lại khi đã qua cooldown và kiểm tra link trong email mới.
**Expected:** Hệ thống gửi một link xác nhận mới; link này có hạn 24 giờ kể từ thời điểm tạo (FR-authentication-007).
**Test Data:** Email: learner@email.com; lần gửi lại thứ 2 trong ngày, cách lần trước trên 60 giây

***

**STT:** 99
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Giới hạn gửi lại
**Checklist:** CHK-authentication-031 — Yêu cầu gửi lại hai lần trong vòng 60 giây; kiểm tra lỗi thời gian chờ xuất hiện.
**Ref:** FR-authentication-007, E-authentication-007
**Priority:** 2
**Title:** Yêu cầu gửi lại hai lần trong vòng 60 giây; kiểm tra lỗi thời gian chờ xuất hiện
**Description:** Kiểm chứng: Yêu cầu gửi lại hai lần trong vòng 60 giây; kiểm tra lỗi thời gian chờ xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại trang trạng thái đã gửi xác nhận, bấm nút gửi lại hai lần; lần thứ hai thực hiện trong vòng 60 giây sau lần đầu.
**Expected:** Nút gửi lại tạm vô hiệu và hệ thống hiển thị thông báo còn thời gian chờ (E-authentication-007).
**Test Data:** Email: learner@email.com; lần gửi lại thứ hai trong vòng 60 giây

***

**STT:** 100
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Giới hạn gửi lại
**Checklist:** CHK-authentication-032 — Yêu cầu gửi lại sau năm lần gửi trong một ngày; kiểm tra lỗi giới hạn hằng ngày xuất hiện.
**Ref:** FR-authentication-007, E-authentication-007
**Priority:** 2
**Title:** Yêu cầu gửi lại sau năm lần gửi trong một ngày; kiểm tra lỗi giới hạn hằng ngày xuất hiện
**Description:** Kiểm chứng: Yêu cầu gửi lại sau năm lần gửi trong một ngày; kiểm tra lỗi giới hạn hằng ngày xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Sau khi đã gửi lại email xác nhận 5 lần trong ngày, bấm nút gửi lại thêm một lần.
**Expected:** Nút gửi lại tạm vô hiệu và hệ thống hiển thị thông báo đã đạt giới hạn ngày (E-authentication-007).
**Test Data:** Email: learner@email.com; đã có 5 lần gửi lại email xác nhận trong ngày

***

**STT:** 101
**Category:** Xử lý xác thực và lỗi
**Sub-Category:** Giới hạn gửi lại
**Checklist:** CHK-authentication-033 — Kích hoạt thời gian chờ gửi lại; kiểm tra gợi ý thời gian chờ còn lại được hiển thị.
**Ref:** FR-authentication-007, E-authentication-007
**Priority:** 3
**Title:** Kích hoạt thời gian chờ gửi lại; kiểm tra gợi ý thời gian chờ còn lại được hiển thị
**Description:** Kiểm chứng: Kích hoạt thời gian chờ gửi lại; kiểm tra gợi ý thời gian chờ còn lại được hiển thị.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Bấm nút gửi lại, sau đó quan sát trạng thái nút trong thời gian cooldown 60 giây.
**Expected:** Nút gửi lại tạm vô hiệu và hệ thống hiển thị thông báo còn thời gian chờ (E-authentication-007).
**Test Data:** Email: learner@email.com; vừa gửi lại email xác nhận

***

**STT:** 102
**Category:** Bảo mật cơ bản
**Sub-Category:** Dùng một lần
**Checklist:** CHK-authentication-034 — Dùng một mã thông báo xác nhận từ thiết bị thứ hai sau khi đã dùng; kiểm tra kết quả liên kết đã dùng xuất hiện.
**Ref:** FR-authentication-006, E-authentication-006
**Priority:** 1
**Title:** Dùng một mã thông báo xác nhận từ thiết bị thứ hai sau khi đã dùng; kiểm tra kết quả liên kết đã dùng xuất hiện
**Description:** Kiểm chứng: Dùng một mã thông báo xác nhận từ thiết bị thứ hai sau khi đã dùng; kiểm tra kết quả liên kết đã dùng xuất hiện.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Dùng liên kết xác nhận trên thiết bị A, rồi mở đúng liên kết đó trên thiết bị B.
**Expected:** Trên thiết bị B, trang kết quả hiện "Link đã hết hạn hoặc đã được sử dụng. [Gửi lại link xác nhận]" (E-authentication-006).
**Test Data:** Một liên kết xác nhận chưa dùng cho learner@email.com; trình duyệt/thiết bị A và B

***

**STT:** 103
**Category:** Khả năng truy cập cơ bản
**Sub-Category:** Bàn phím
**Checklist:** CHK-authentication-035 — Điều hướng kết quả xác minh bằng Tab; kiểm tra nút gửi lại nhận tiêu điểm bàn phím.
**Ref:** NFR-authentication-009
**Priority:** 3
**Title:** Điều hướng kết quả xác minh bằng Tab; kiểm tra nút gửi lại nhận tiêu điểm bàn phím
**Description:** Kiểm chứng: Điều hướng kết quả xác minh bằng Tab; kiểm tra nút gửi lại nhận tiêu điểm bàn phím.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Tại trang kết quả liên kết hết hạn có "[Gửi lại link xác nhận]", nhấn Tab để điều hướng đến nút này.
**Expected:** SRS chỉ yêu cầu hỗ trợ điều hướng bàn phím cho form đăng nhập/đăng ký, không quy định khả năng nhận tiêu điểm Tab của nút gửi lại trên trang kết quả xác minh. [TBD: cần BA cấp wording]
**Test Data:** Liên kết xác nhận đã hết hạn

***

**STT:** 104
**Category:** Trường hợp biên
**Sub-Category:** Cổng truy cập
**Checklist:** CHK-authentication-036 — Thử mở nội dung học tập được bảo vệ trước khi xác minh; kiểm tra quyền truy cập bị từ chối.
**Ref:** BR-authentication-001
**Priority:** 1
**Title:** Thử mở nội dung học tập được bảo vệ trước khi xác minh; kiểm tra quyền truy cập bị từ chối
**Description:** Kiểm chứng: Thử mở nội dung học tập được bảo vệ trước khi xác minh; kiểm tra quyền truy cập bị từ chối.
**Auto:** Yes
**Preconditions:** —

**Step:** 1
**Action:** Dùng tài khoản `unverified` để truy cập một nội dung học tập được bảo vệ.
**Expected:** Hệ thống từ chối quyền truy cập nội dung học tập cho đến khi email của tài khoản được xác nhận (BR-authentication-001).
**Test Data:** Tài khoản `unverified`: learner@email.com; một URL nội dung học tập được bảo vệ‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
