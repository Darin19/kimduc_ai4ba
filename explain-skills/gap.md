---
type: skill-explainer
skill: gap
updated: 2026-07-16
---

# /gap là gì và nó chạy như thế nào?‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

`/gap` trả lời __đúng một câu hỏi__: *"tính năng này còn __thiếu luồng nghiệp vụ__ nào không?"*

__Ví dụ vàng để nhớ cả đời:__ tài liệu ghi rõ *"sai mật khẩu 5 lần thì khóa tài khoản"* — nhưng đọc hết cả feature __không thấy chỗ nào mở khóa lại__. Vậy là người dùng bị khóa vĩnh viễn, không có đường ra. Đó chính là __thiếu luồng nghiệp vụ__. Máy tính không báo "thiếu file" — vì mọi file vẫn đủ. Nhưng nghiệp vụ thì __cụt__.

Vài tình huống điển hình nên gõ `/gap`:

* Có màn thanh toán thành công, nhưng __thiếu nhánh thẻ bị từ chối giữa chừng__.
* Có luồng gửi mã OTP, nhưng __không có luồng gửi lại OTP khi hết hạn__.
* Có "tạo đơn hàng", nhưng __không thấy đâu hủy đơn / hoàn tiền__.

Nói gọn: **gõ `/gap` khi bạn muốn hỏi "mình đã bỏ sót đường nào chưa vẽ chưa?"** trước khi đưa tài liệu cho dev.

> Ngoài cách dùng chính (soi 1 tính năng) ở trên, `/gap` còn một chế độ phụ ít dùng hơn: gõ `/gap --product` để đối chiếu __danh sách tính năng của cả sản phẩm__ với __lộ trình (roadmap)__ — xem có tính năng nào đã lên kế hoạch mà quên xếp vào lộ trình, hoặc ngược lại. Phần còn lại của tài liệu này nói về cách dùng chính.

## 2. Cách nó tìm — hai người thợ, không ai được bịa‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

`/gap` dùng __hai người thợ__. Người thứ nhất (cái máy) chạy trước để khoanh vùng, người thứ hai (trợ lý đọc hiểu) soi tiếp phần chữ. Mỗi người giỏi một kiểu, và __cả hai đều bị buộc phải kèm bằng chứng — không được phán suông__.

### Thợ thứ nhất: cái máy dò (chạy bằng thuật toán)‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Cái máy này __đọc sơ đồ trạng thái__ của tính năng (file `states.md` — bản vẽ mô tả mỗi thứ có những trạng thái nào và đi qua lại ra sao). Nó dò __mấy kiểu lỗ hổng bằng máy__ — hai kiểu đầu soi thuần hình học (đếm mũi tên, chắc chắn), hai kiểu sau đối chiếu chữ (dễ báo nhầm hơn, nên máy tự hạ mức):

   +--------------------------------------------------------------+
   |   CAC KIEU LO HONG MAY DO DUOC (soi hinh ve + doi chieu chu) |
   +--------------------------------------------------------------+
   |                                                              |
   |  (a) VAO DUOC MA KHONG RA DUOC                               |
   |      Co mui ten di VAO trang thai "locked" nhung             |
   |      KHONG co mui ten nao di RA.                             |
   |      -> nghi "locked" thieu luong thoat (mo khoa?)          |
   |                                                              |
   |  (b) KET, KHONG TOI DUOC DIEM KET THUC                       |
   |      Di long vong mai ma khong bao gio cham vao             |
   |      diem "xong" -> nghi bi ket vong lap.                   |
   |                                                              |
   |  (c) CO CHIEU DI, THIEU CHIEU VE                             |
   |      Co "khoa" thi thuong phai co "mo khoa";                |
   |      co "logout" thi phai co "login". Thay 1 chieu           |
   |      ma khong thay chieu nguoc lai -> nghi thieu.           |
   |                                                              |
   |  (d) DOI TUONG THIEU THAO TAC                                |
   |      Moi doi tuong (don hang, tai khoan...) thuong           |
   |      can du: tao / xem / sua / xoa. Thay co "tao" ma         |
   |      khong thay "xoa" -> hoi lai cho chac.                   |
   |                                                              |
   +--------------------------------------------------------------+

__Vì sao máy đáng tin hơn ở kiểu (a) và (b)?__ Vì đó là chuyện __hình học thuần__: mũi tên có hay không, ai cũng đếm ra như nhau. Kiểu (c) yếu hơn — nó chỉ khớp __chữ__ ("khóa"/"mở khóa"), nên đôi khi báo nhầm. Vì vậy máy tự chia mức __mạnh / yếu / cần xác nhận__.

### Thợ thứ hai: trợ lý biết ĐỌC HIỂU (`@flow-reviewer`)‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Máy chỉ thấy __cái đã vẽ thành sơ đồ__. Nhiều nhánh nghiệp vụ lại nằm trong __chữ__ — trong bảng lỗi, trong mô tả use case, trong wireframe. Nên có thêm một __trợ lý biết đọc hiểu__ đi soi phần chữ đó.

Trợ lý này bắt được thứ máy không thấy, ví dụ: **bảng lỗi có mã `E-payment-012` "thẻ hết hạn", nhưng không màn hình nào hiển thị thông báo đó** — tức là lỗi được định nghĩa mà người dùng chẳng bao giờ được báo. Máy đếm mũi tên không tìm ra loại này; người đọc hiểu thì thấy ngay.

## 3. Chống bịa — luật quan trọng nhất

Đây là chỗ dễ hỏng nhất của mọi công cụ "tìm thiếu sót": __trích được "có khóa" thì DỄ, nhưng kết luận "thiếu mở khóa" thì NGUY HIỂM__ — vì "mở khóa" có thể nằm ở một file chưa đọc, hoặc máy đọc sót.

Nên `/gap` bắt buộc __mỗi phát hiện phải chứng minh CẢ HAI vế__:

* __Vế "có A":__ chỉ ra dòng nào, file nào. Ví dụ `states.md:31` có câu "khóa sau 5 lần sai".
* __Vế "chưa thấy B":__ đã __tìm những từ nào__ (mở khóa, gỡ khóa, unlock...) trên __những file nào__, và đã đọc hết chưa.

Nếu chưa tìm đủ các cách gọi, hoặc chưa đọc hết file → __KHÔNG được phép nói "THIẾU"__.

Và cách nói cũng phải __giọng nghi vấn, không phán xanh rờn__:

> ❌ Sai: "__THIẾU luồng mở khóa.__"
>
> ✅ Đúng: "Có luồng khóa tài khoản (`states.md:31`), đã tìm 'mở khóa'/'unlock' trên 8 file không thấy — __anh xác nhận là cố ý bỏ qua, hay cần bổ sung?__"

__Người chốt luôn là BA, không phải máy.__ `/gap` chỉ đưa ra *nghi vấn có bằng chứng*, còn "đây có thật là thiếu sót không" thì bạn quyết. Nếu không tìm ra gì, nó nói thẳng __"không phát hiện"__ — chứ không nặn ra cho có.

## 4. Kết quả xếp thế nào

Phát hiện được __xếp theo mức tin cậy__, mạnh lên đầu:

* __mạnh__ — thuần hình học (vào-không-ra-được, kẹt không tới điểm kết thúc). Đáng xem trước.
* __yếu__ — tên gợi ý đây là điểm kết thúc tự nhiên (`expired`, `used`, `revoked` thường đúng là dừng ở đó, tài liệu chỉ thiếu ghi dấu "kết thúc"). Xếp cuối, gợi ý bổ sung nhẹ nhàng.
* __cần xác nhận__ — máy chỉ khớp chữ, có thể nhầm.

Cuối cùng nó ghi một __ma trận truy vết__ (bảng đối chiếu ai nối với ai: yêu cầu ↔ story ↔ màn hình ↔ lỗi) vào `docs/_shared/traceability.md`, để lần sau soi tiếp cho nhanh.

## 5. Một BA thật dùng `/gap` như thế nào

> __Lan (BA)__ vừa viết xong tài liệu tính năng đăng nhập, sắp đưa dev. Gõ:
>
>     /gap authentication
>
> Vài giây sau, `/gap` báo:
>
> - __[mạnh]__ "Trạng thái `locked` vào được nhưng không có đường ra (`states.md:31`) — có luồng nào đưa nó tới điểm kết thúc không?"‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍
> - __[yếu]__ "`expired` không có đường ra — tên gợi ý đây là kết thúc tự nhiên, có thể chỉ cần ghi dấu `--> [*]`."
> - __[trợ lý đọc]__ "Mã lỗi `E-auth-007` 'tài khoản bị khóa' có trong bảng lỗi nhưng không màn nào hiển thị — người dùng bị khóa mà không biết vì sao?"
>
> Lan đọc, gật gù: cái `locked` đúng là __quên mất màn mở khóa qua email__ — thiếu thật. Cái `expired` thì cố ý, chỉ ghi thêm dấu kết thúc. Cái mã lỗi thì phải thêm màn thông báo.
>
> Lan không sửa trong `/gap` (nó chỉ báo cáo). Cô gõ tiếp `/cr "thêm luồng mở khóa tài khoản qua email"` để sửa cho đúng quy trình.

__Điểm mấu chốt:__ `/gap` không tự sửa gì cả. Nó là __cái đèn pin soi lỗ hổng__, còn vá lỗ thì dùng `/cr`.

## 6. Toàn bộ luồng chạy — sơ đồ

   +-----------------------------------------------------------+
   |  Ban go:  /gap authentication                             |
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [1] Chon tinh nang (go san ten thi dung luon)            |
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [2] MAY DO chay tren so do trang thai + doi chieu chu    |
   |      - vao-khong-ra-duoc   (manh)                         |
   |      - ket, khong toi ket thuc  (manh)                    |
   |      - co chieu di thieu chieu ve  (can xac nhan)         |
   |      - doi tuong thieu thao tac tao/xem/sua/xoa (nhe)     |
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [3] DOC chu that: use case, bang loi, wireframe          |
   |      (in ro da doc file nao -> ban thay do phu)           |
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [4] TRO LY doc hieu (@flow-reviewer) bat nhanh thieu     |
   |      ma may khong thay (loi co trong bang, khong man hien)|
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [5] Loc theo 3 nhan: chua-toi-buoc (im) /               |
   |      thieu-that (bao) / mau-thuan (bao)                   |
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [6] Xep manh -> yeu, moi phat hien KEM BANG CHUNG,       |
   |      noi giong NGHI VAN (chua co X - xac nhan?)           |
   +-----------------------------------------------------------+
                          |
                          v
   +-----------------------------------------------------------+
   |  [7] Xem truoc (L1) -> ghi ma tran truy vet               |
   |      vao docs/_shared/traceability.md                     |
   +-----------------------------------------------------------+
                          |
                          v
                 Ban chot -> viec vao dung
                 thi go /cr de sua

## 7. Khi chưa có đủ dữ liệu

Nếu tính năng __chưa có sơ đồ trạng thái__ (`states.md`), cái máy dò không có gì để soi. `/gap` __báo thẳng__:

> "Tính năng này chưa có sơ đồ trạng thái nên chưa soi được luồng trạng thái — chạy `/state` để vẽ trước."

Nó __KHÔNG bịa__ ra "luồng thiếu" từ con số không. Tương tự, chưa có sơ đồ luồng người dùng thì nó gợi ý chạy `/user-flow`. Nguyên tắc bất di bất dịch: __không có nguồn thì không đoán__ — thà nói "chưa đủ dữ liệu" còn hơn nặn ra một danh sách nghe hợp lý mà sai.

Cũng cần biết: `docs/` hiện tại phần lớn là __tài liệu demo cũ__, nên đôi khi `/gap` báo vài gap "giả" do dữ liệu demo thiếu liên kết — đó là lỗi của dữ liệu mẫu, không phải lỗi tính năng thật của bạn.

## Xem thêm

* Chi tiết kỹ thuật đầy đủ: `.claude/skills/gap/SKILL.md`‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
