---
type: skill-explainer
skill: ask
updated: 2026-07-18
---

# `/ask` là gì và nó chạy như thế nào?‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

`/ask` trả lời __đúng một câu hỏi__: *"nghiệp vụ này __đang__ hoạt động thế nào?"*

Bạn có cả một kho tài liệu (yêu cầu, use case, luồng, bảng lỗi, màn hình...) trải trên hàng chục file. Khi cần __hiểu nhanh một tính năng chạy ra sao__, bình thường bạn phải mở lần lượt từng file, ghép mảnh lại trong đầu. `/ask` làm hộ bạn việc đó: gõ 1 câu hỏi, nó __đọc đúng những file liên quan__ rồi trả lời gọn __ngay trong khung chat__ — kèm __sơ đồ luồng__ để bạn nhìn thấy đường đi, không phải tự vẽ trong đầu.

Vài lúc nên gõ `/ask`:

* Bạn mới nhận bàn giao một feature, muốn __nắm tổng quan__ nó làm gì: `/ask authentication`.
* Bạn quên __một luồng cụ thể__ chạy sao: `/ask "luồng quên mật khẩu hoạt động thế nào"`.
* Bạn thấy một mã trong tài liệu và muốn biết __nó là gì__: `/ask FR-authentication-011`.
* Họp xong, ai đó hỏi "khóa tài khoản khi nào?", bạn cần __trả lời có căn cứ trong 30 giây__.

Nói gọn: **gõ `/ask` khi bạn muốn hỏi "cái này chạy thế nào?" và cần câu trả lời dễ hiểu, có dẫn nguồn, ngay lập tức.**

> `/ask` __chỉ đọc và giải thích — không sửa gì cả.__ Nó không tạo file, không đổi tài liệu. Giống như hỏi một đồng nghiệp đã đọc hết hồ sơ: họ giải thích cho bạn nghe, chứ không viết lại hồ sơ.

## 2. Nó tìm câu trả lời như thế nào — "tra mục lục trước, đọc sách sau"‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Điều quan trọng nhất cần hiểu: `/ask` __không đoán từ trí nhớ__. Nó luôn đi hai bước theo đúng thứ tự.

__Bước 1 — Tra tấm bản đồ (Knowledge Graph) để CHỌN file.__
Vault có một tấm bản đồ liên kết mọi tài liệu (xem thêm lệnh `/kg`). `/ask` hỏi bản đồ: *"câu hỏi này liên quan tới những file nào?"* — và bản đồ trả về một __danh sách rút gọn__ các file đáng đọc, thay vì bắt nó lật cả tủ hồ sơ. Tùy câu hỏi, nó tra theo kiểu khác nhau:

| Bạn hỏi kiểu | Bản đồ trả về |
|---|---|
| Cả một feature (`/ask authentication`) | __Lộ trình đọc__ theo thứ tự phụ thuộc: đọc yêu cầu gốc trước, rồi use case, rồi luồng... |
| Một luồng/khía cạnh cụ thể ("luồng đăng nhập") | Danh sách yêu cầu / use case / màn hình khớp với chủ đề đó |
| Một mã cụ thể (`FR-authentication-011`) | Đúng dòng, đúng file định nghĩa nó + những thứ liên quan tới nó |
| Câu hỏi về __quá khứ__ ("yêu cầu này TỪNG ghi gì", "ai đổi khi nào", "CR nào sửa") | Bản đồ __lịch sử__ (`history`/`asof`) trả về chuỗi thay đổi + bản cũ nguyên văn — xem `explain-skills/kg.md` Mục 10 |

__Bước 2 — Đọc nguyên văn các file đó để KẾT LUẬN.__
Bản đồ chỉ nói "A nối với B", nó __không chứa nội dung thật__ (rule, con số, câu chữ lỗi). Nên sau khi chọn được file, `/ask` __đọc thật từng file__ rồi mới diễn giải. Đây là luật vàng:

> __Bản đồ để CHỌN đúng sách. Câu trả lời LUÔN dựa trên việc đọc thật quyển sách đó — không ai tóm tắt hộ rồi bảo bạn tin.__

Nhờ vậy nó vừa nhanh (không đọc thừa cả tủ hồ sơ), vừa chính xác (mọi kết luận đều từ chữ thật).

## 3. Câu trả lời trông như thế nào‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

`/ask` trình bày cho __người làm nghiệp vụ__ đọc, không phải cho lập trình viên. Một câu trả lời đầy đủ thường có:

1) __Một câu tóm tắt__ — chốt ngay ý chính.
2) __Sơ đồ luồng bằng ký tự__ (giống output của `/brainstorm`) — vẽ các bước bằng khung `┌─┐│▼`, có cả nhánh "đúng thì đi đâu / sai thì báo gì". Đặt sớm để bạn nhìn thấy đường đi trước.
3) __Diễn giải từng bước__ — kèm dẫn nguồn kiểu `(FR-004, spec.md dòng 43)` để bạn tra lại được.
4) __Các quy tắc + ngưỡng__ — ví dụ "khóa 24h sau 5 lần sai".
5) __Các nhánh lỗi__ — thông báo lỗi thật người dùng sẽ thấy.
6) __Nguồn đã đọc__ — liệt kê file để bạn biết câu trả lời dựa trên đâu.

Câu hỏi càng hẹp (chỉ hỏi 1 con số) thì trả lời càng gọn — nó __không ép vẽ sơ đồ__ khi không cần.

## 4. Chống bịa — luật quan trọng nhất‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Cũng như `/gap`, `/ask` bị buộc __không được phán suông__. Ba nguyên tắc:

* **Mọi con số, mọi câu chữ lỗi, mọi quy tắc → phải có dẫn nguồn `file:dòng`.** Không nhớ chính xác → đọc lại file, tuyệt đối không "đoán cho hợp lý".
* __Không có trong tài liệu → nói thẳng "cái này tài liệu chưa ghi"__, và chỉ bạn lệnh nào tạo ra nó (ví dụ chưa có sơ đồ trạng thái → gợi ý chạy `/state`). Nó __không nặn ra__ cho đủ ý.
* __Không lạc sang chuyện kỹ thuật.__ Bạn là người làm nghiệp vụ, nên nó trả lời bằng ngôn ngữ nghiệp vụ ("hệ thống so khớp thông tin", "tạo phiên đăng nhập") — không lôi ra chuyện cơ sở dữ liệu, mã hóa, hay tên hàm. Nếu bạn hỏi thẳng vào kỹ thuật, nó trả ở mức nghiệp vụ rồi ghi chú "chi tiết triển khai là việc của `/srs` và dev".

## 5. Một BA thật dùng `/ask` như thế nào‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

> __Minh (BA)__ vừa được giao tiếp quản feature đăng nhập của người khác, chưa nắm gì. Gõ:
>
>     /ask authentication
>
> `/ask` tra bản đồ, thấy đây là câu hỏi tổng quan → lấy __lộ trình đọc__ (yêu cầu gốc → use case → luồng), đọc thật các file, rồi trả về: một câu tóm tắt ("3 cách đăng nhập, email là danh tính duy nhất..."), __một sơ đồ luồng__ vẽ cả 6 luồng, rồi giải thích từng nhóm kèm nguồn, và bảng 6 luồng phủ happy/error/edge.
>
> Minh đọc 2 phút là nắm được bức tranh — thay vì mở 15 file ghép trong đầu. Thấy chỗ "auto-link Google", anh tò mò, hỏi tiếp:
>
>     /ask "luồng auto-link Google khi email trùng chạy thế nào"
>
> Lần này câu hỏi hẹp hơn → `/ask` chỉ lấy đúng vài file liên quan, trả lời chi tiết một luồng đó.
>
> Cuối cùng Minh phát hiện tài liệu có nhắc "rủi ro chiếm tài khoản" nhưng chưa rõ xử lý sao. `/ask` nói thẳng: *"phần này còn là câu hỏi mở OQ-3, tài liệu chưa chốt"* — không bịa ra câu trả lời.

__Điểm mấu chốt:__ `/ask` giúp bạn __hiểu nhanh và đúng__, và khi tài liệu chưa có câu trả lời thì nó __thành thật nói chưa có__, chứ không nặn ra.

## 6. Toàn bộ luồng chạy — từng bước

Bạn gõ `/ask authentication` (hoặc một câu hỏi, hoặc một mã ID). `/ask` đi lần lượt 4 bước:

__Bước 1 — Hiểu bạn đang hỏi gì.__
Nó phân loại: bạn hỏi *cả một feature*, hay *một luồng cụ thể*, hay *một mã ID*? Nếu câu hỏi mơ hồ hoặc không rõ hỏi về feature nào, nó __hỏi lại một câu ngắn__ chứ không đoán bừa.

⬇️

__Bước 2 — Tra bản đồ (KG) để chọn đúng file cần đọc.__
* Hỏi cả feature → lấy __lộ trình đọc__ theo thứ tự.
* Hỏi một luồng → lấy __danh sách file khớp chủ đề__.
* Hỏi một mã ID → lấy __đúng dòng định nghĩa__ nó và những thứ liên quan.

⬇️

__Bước 3 — Đọc nguyên văn các file vừa chọn.__
Mọi quy tắc, con số, câu chữ lỗi đều lấy từ __chữ thật__ trong tài liệu, kèm dẫn nguồn `file:dòng`.

⬇️

__Bước 4 — Tổng hợp câu trả lời cho người làm nghiệp vụ.__
Gồm: câu tóm tắt + __sơ đồ luồng bằng ký tự__ + diễn giải từng bước + quy tắc + các nhánh lỗi + danh sách nguồn đã đọc.

⬇️

__Kết quả in thẳng ra khung chat. Hết. Không tạo hay sửa bất kỳ file nào.__

## 7. Khi chưa có đủ dữ liệu

Nếu bạn gõ tên một feature __chưa tồn tại__, `/ask` không bịa — nó __liệt kê các feature đang có__ và hỏi "ý bạn là cái nào?". Nếu câu hỏi __quá mơ hồ__ (không rõ hỏi về feature nào), nó cũng __hỏi lại một câu ngắn__ thay vì đoán bừa.

Nếu một phần câu hỏi __chưa được tài liệu ghi lại__ (ví dụ hỏi về trạng thái mà feature chưa vẽ sơ đồ trạng thái), nó nói thẳng phần đó chưa có + gợi ý lệnh tạo ra nó. Nguyên tắc bất di bất dịch: __không có nguồn thì không đoán.__

Cũng cần biết: `docs/` hiện phần lớn là __tài liệu demo cũ__, nên một số file có thể đọc thiếu — khi đó `/ask` sẽ đọc bù trực tiếp và (nếu ảnh hưởng câu trả lời) ghi chú nhẹ một dòng, chứ không im lặng bỏ qua.

## Xem thêm

* Chi tiết kỹ thuật đầy đủ: `.claude/skills/ask/SKILL.md`
* Tấm bản đồ mà `/ask` tra để chọn file: `explain-skills/kg.md`
* Người anh em soi lỗ hổng: `explain-skills/gap.md`‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
