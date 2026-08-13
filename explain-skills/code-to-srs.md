---
type: skill-explainer
skill: code-to-srs
updated: 2026-07-22
---

# `/code-to-srs` là gì và nó chạy như thế nào?‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

`/code-to-srs` là lệnh dùng để **dựng lại một bộ tài liệu đặc tả (SRS) có cấu trúc từ chính SOURCE CODE của một hệ thống đang chạy**. Bạn chỉ cho nó đường dẫn tới một codebase — một repo, một thư mục con, hay một file — và hệ thống đọc mã nguồn (route, controller, service, model, validator, guard, migration — **và cả test, file ngôn ngữ i18n**), gom lại theo từng tính năng, rồi viết ra cho mỗi tính năng một bộ tài liệu đặc tả: yêu cầu chức năng, quy tắc nghiệp vụ, danh sách lỗi, sơ đồ luồng, sơ đồ trạng thái, sơ đồ dữ liệu và use case.

Đây là **anh em song sinh của `/reverse-doc`**. Cả hai cùng làm một việc — đọc ngược để dựng lại đặc tả — và cho ra cùng một loại kết quả. Khác biệt duy nhất nằm ở **nguồn**:

- `/reverse-doc` đọc **tài liệu cũ** (Word, PDF, ảnh chụp, ghi chú).
- `/code-to-srs` đọc **mã nguồn** — thứ sự thật cuối cùng về việc hệ thống thực sự làm gì.

Đây là bước phù hợp khi:

- Bạn tiếp quản một hệ thống cũ **không có tài liệu nào**, chỉ có code đang chạy.
- Tài liệu (nếu có) đã lỗi thời so với code, và bạn muốn biết hệ thống **thực sự** đang làm gì.
- Bạn cần một bản đặc tả nghiệp vụ để đội mới, PO, hay QC hiểu hệ thống — nhưng chỉ có mã nguồn trong tay.
- Bạn muốn đối chiếu "code đang làm thế này" với "tài liệu nói thế kia" để tìm chỗ lệch.

Bạn gõ kèm đường dẫn tới codebase:

```
/code-to-srs ~/code/my-app
/code-to-srs ./backend/src
/code-to-srs @app/api/auth/route.ts
```

Nếu chỉ gõ `/code-to-srs` không kèm gì, hệ thống sẽ hỏi bạn **codebase nằm ở đâu** — đây là câu hỏi duy nhất về nghiệp vụ nó hỏi bạn trong lúc xử lý (xem Mục 8). Lưu ý quan trọng: nó **không** tự lấy thư mục hiện tại làm codebase, vì thư mục hiện tại là nơi ghi kết quả ra (workspace của bạn), không phải nguồn để đọc ngược.

Sau khi có bộ tài liệu tái lập, bạn thường đi tiếp sang `/srs` để biến nó thành đặc tả chính thức đã được duyệt.

---

## 2. Toàn bộ luồng chạy — sơ đồ‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Điểm quan trọng nhất cần nhớ: **hệ thống chạy một mạch, không dừng lại hỏi bạn về nghiệp vụ giữa chừng.** Mọi chỗ code không nói rõ, nó tự ghi thành câu hỏi mở thay vì hỏi bạn. Nó chỉ dừng để bạn tham gia ở ba chỗ: **(a)** khi codebase quá lớn, nó dừng để bạn chọn làm nhóm tính năng nào trước (Bước 2 — xem Mục 7); **(b)** xem trước rồi đồng ý cho ghi file (Bước 5); **(c)** sau khi ghi xong thì hỏi bạn có muốn giải quyết các câu hỏi mở ngay không — bạn có thể bỏ qua (Bước 6). Cả ba đều là hỏi *bạn muốn làm gì tiếp*, **không phải** tra hỏi bạn về nghiệp vụ.

```
 BẠN GÕ LỆNH
 /code-to-srs <đường dẫn codebase>
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 1 — Đọc bản đồ codebase (nhẹ, không đọc sâu)    │
 │  Hệ thống dò công nghệ đang dùng (Next.js, NestJS,   │
 │  Django, Spring...), đếm quy mô, và chỉ liệt kê các  │
 │  điểm vào (route, màn, controller) để có KHUNG tính  │
 │  năng — CHƯA đọc sâu thân file. Repo rỗng thì báo.   │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 2 — Gom tính năng + (nếu repo lớn) hỏi bạn chọn │
 │  Gom code theo VIỆC user làm được (không theo module),│
 │  bằng bằng chứng gọi chéo repo. In BẢNG tính năng.   │
 │  Nếu codebase LỚN → cảnh báo "nặng, nên làm lần lượt"│
 │  + để BẠN chọn nhóm nào làm trước (xem Mục 7).       │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 3 — Viết bộ tài liệu cho từng tính năng          │
 │  Với mỗi tính năng đã chọn, đọc SÂU code — kể cả      │
 │  TEST (lấy ranh giới/edge chính xác) và file i18n    │
 │  (lấy câu lỗi thật) — rồi viết đặc tả đầy đủ. Mỗi câu│
 │  gắn nhãn tin cậy + ghi rõ dòng code (file:line).    │
 │  Code KHẲNG ĐỊNH → chắc; code KHÔNG NÓI (vì sao/cho  │
 │  ai) → "cần xác nhận". Code chết/tắt → nghi ngờ.     │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 4 — Rà lại ngược về code                         │
 │  Một lượt kiểm tra độc lập: từng câu trong tài liệu   │
 │  có thật sự truy được về đúng dòng code không? Câu    │
 │  nào không neo được thì bị hạ độ tin cậy. Đặc biệt:  │
 │  câu nào đang nói "vì sao/mục tiêu" mà để nhãn chắc   │
 │  chắn thì bị ép hạ xuống — vì code không chứng minh   │
 │  được ý định.                                         │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 5 — Xem trước rồi ghi                            │
 │  Hệ thống trình bày sẽ tạo file gì, mỗi tính năng có │
 │  bao nhiêu điểm chắc chắn / suy đoán / cần xác nhận. │
 │  Bạn gõ Y để đồng ý thì nó mới ghi.                  │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ BƯỚC 6 — Xử lý câu hỏi mở, tổng kết, chỉ đường        │
 │  Hệ thống hỏi bạn có muốn giải quyết ngay các câu     │
 │  hỏi mở không (đa số là "vì sao/cho ai" mà code câm).│
 │  Bạn có thể bỏ qua. Rồi báo cáo số tính năng, số câu │
 │  hỏi mở còn treo, và gợi ý bước tiếp theo.           │
 └──────────────────────────────────────────────────────┘
        │
        ▼
     HOÀN TẤT — có một bộ tài liệu đặc tả có cấu trúc,
     mỗi câu truy được về đúng dòng code, kèm danh sách
     rõ ràng những chỗ code không giải thích được
```

---

## 3. Kết quả bạn nhận được trông như thế nào?‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Với mỗi tính năng, hệ thống tạo một thư mục riêng trong `docs/_reverse/{tên-tính-năng}/` — **giống hệt cấu trúc của `/reverse-doc`**, gồm:

| File | Nội dung |
|------|----------|
| `{tên}-reverse-spec.md` | **File chính** — bản đặc tả đầy đủ theo 12 mục: phạm vi, người dùng, yêu cầu chức năng, yêu cầu phi chức năng, quy tắc nghiệp vụ, bảng lỗi, tiêu chí thành công, dữ liệu, luồng, màn hình, ràng buộc, câu hỏi mở. Mỗi bảng có cột "Nguồn" và cột "Nhãn". |
| `reverse-sources.md` | **Danh mục nguồn** — liệt kê mọi file code đã đọc, kèm phần code chính. Đây là chỗ để truy ngược mỗi câu trong đặc tả về đúng file:dòng gốc. |
| `reverse-gaps.md` | **Danh sách chỗ chưa chắc** — mọi câu hỏi mở, chỗ code không giải thích, chỗ mâu thuẫn, test bị tắt, và chỗ nghi là code chết. Đây là chỗ bạn đọc để biết cần xác nhận điều gì với PO/BA. |
| `_evidence.md` | **Bản truy vết kỹ thuật code → luồng** — mỗi yêu cầu/lỗi/quy tắc trong đặc tả neo về đúng dòng code nào, và đặc biệt phần **"cross-repo hops"**: một hành động ở nơi này kích hoạt luồng ở nơi khác (ví dụ *màn A ghi file → tiến trình nền B đọc và xử lý*). Đây là chỗ trả lời "một điểm nghiệp vụ sinh từ code này liên quan tới luồng/repo nào". Dành cho ai cần soi kỹ thuật; bản đặc tả chính vẫn đọc bằng ngôn ngữ nghiệp vụ. |
| `srs/{tên}-reverse-flows.md` | Sơ đồ luồng nghiệp vụ (các bước, các nhánh rẽ khi có lỗi) — dựng từ luồng có trong code. |
| `srs/{tên}-reverse-states.md` | Sơ đồ trạng thái (ví dụ tài khoản: chưa xác thực → bình thường → tạm khoá). |
| `srs/{tên}-reverse-erd.md` | Sơ đồ dữ liệu (các đối tượng nghiệp vụ và quan hệ) — suy từ model/migration. |
| `usecases/uc-{tên}.md` | Use case chi tiết cho từng chức năng chính. |
| `usecases/{tên}-reverse-usecase-index.md` | Danh mục use case + bảng truy vết. |

Toàn bộ nằm trong `docs/_reverse/` — **tách riêng** khỏi tài liệu chính thức, nên nó không bao giờ đè lên hay làm hỏng tài liệu đã có. Và nó **không bao giờ ghi bất cứ thứ gì vào cây source code của bạn** — code chỉ được đọc, không bị đụng tới.

---

## 4. Điểm cốt lõi: "nhãn bất đối xứng" — vì sao code mạnh chỗ này, yếu chỗ kia‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Đây là điều **quan trọng nhất** để hiểu `/code-to-srs`, và cũng là chỗ nó khác `/reverse-doc`.

Mã nguồn là một loại nguồn rất đặc biệt. Nó **cực kỳ chắc chắn về "hệ thống làm gì và làm thế nào"**, nhưng **hoàn toàn câm về "vì sao lại làm vậy, cho ai, mục tiêu nghiệp vụ là gì"**.

Ví dụ, code có dòng: `if (failedAttempts >= 10) throw 'Account locked. Try again in 24 hours.'`

- Việc **khóa tài khoản sau 10 lần sai, trong 24 giờ** — đây là **sự thật chắc như đinh đóng cột**. Con số 10, con số 24, câu thông báo lỗi đều nằm ngay trong code. → nhãn **✅ chắc chắn**, kèm ghi rõ dòng code.
- Nhưng **vì sao lại chọn 10 lần chứ không phải 5? Vì sao 24 giờ? Có yêu cầu bảo mật hay compliance nào đằng sau không?** — code **không hề nói**. Một lập trình viên đã gõ những con số này vì một lý do nghiệp vụ, nhưng lý do đó không nằm trong code. → nhãn **🟡 cần xác nhận**, kèm một câu hỏi mở để PO/BA trả lời.

Ba nhãn hệ thống dùng:

| Nhãn | Ý nghĩa khi đọc code |
|------|----------------------|
| ✅ **chắc chắn** | Code khẳng định điều này: một validator, một hằng số, một guard, một cột trong migration, một câu lỗi nguyên văn. |
| 🔵 **suy đoán** | Suy ra để nối mạch nghiệp vụ, và có **từ 2 chỗ trong code trở lên** hậu thuẫn. |
| 🟡 **cần xác nhận** | Chưa chắc — hoặc chỉ suy từ **một chỗ** code, hoặc là loại thông tin code **không bao giờ** chứa (vì sao / cho ai / mục tiêu / độ ưu tiên). |

Nguyên tắc vàng: **đọc được code KHÔNG có nghĩa là hiểu được nghiệp vụ.** Mọi thứ thuộc về "ý định" — vì sao, cho ai, để đạt mục tiêu gì — luôn bị hạ xuống 🟡 và biến thành câu hỏi mở, dù code có rõ đến đâu. Đây chính là hàng rào chống việc hệ thống "nhìn một đoạn code rồi tự tin bịa ra cả một mục tiêu nghiệp vụ".

---

## 5. Ba nguồn đặc biệt hệ thống đọc trong code (mà nhiều công cụ bỏ sót)

Ngoài code sản phẩm thông thường, hệ thống cố ý đọc thêm ba loại nguồn — mỗi loại vá đúng một điểm yếu.

**(a) TEST — nguồn duy nhất trong code *bớt câm* về hành vi mong đợi.** Code sản phẩm hay mơ hồ ở ranh giới: `failedAttempts >= 10` là "khóa ở lần thứ 10 hay thứ 11"? Nhưng một dòng test — `it('không khóa ở lần sai thứ 9')`, `it('khóa ở lần sai thứ 10')`, `it('reset bộ đếm khi đăng nhập thành công')` — nói thẳng ranh giới chính xác, cả những quy tắc ngược mà code sản phẩm rải rác khó ráp. Vì vậy hệ thống đọc test và coi hành vi test khẳng định là **✅** (kèm ghi rõ dòng test). Hai lưu ý:
- Nếu một test **đang bị tắt** (skip/todo) → hệ thống hạ xuống **🟡** và ghi vào danh sách chỗ chưa chắc ("test có nhưng đang tắt — chưa chắc hành vi thật").
- Test cho biết *hành vi gì xảy ra*, vẫn **không** cho biết *vì sao*. Nên `it('khóa sau 10 lần')` vẫn không trả lời "vì sao 10" — cái đó vẫn 🟡. Và hệ thống **không chạy** test, chỉ đọc.

**(b) File ngôn ngữ (i18n) — để lấy câu lỗi THẬT.** Trong code thật, câu thông báo lỗi thường không nằm ngay chỗ ném lỗi, mà là một *mã khóa* (`throw t('errors.account_locked')`), câu chữ thật nằm ở file ngôn ngữ. Hệ thống đi tìm file đó, tra mã ra **câu thật** (*"Tài khoản của bạn đã bị khóa. Thử lại sau 24 giờ."*) rồi mới ghi vào bảng lỗi — chứ không ghi trơ mã khóa. Không tìm ra câu thật thì nó ghi rõ "chưa tra được câu", không bịa.

**(c) Code chết / tính năng đã tắt — để không tái lập nhầm thứ không còn chạy.** Một route bị đánh dấu `@Deprecated`, một nhánh `if (false)`, một cờ tính năng đang tắt, hay một endpoint **không nơi nào gọi tới** — nếu vô tư đọc, hệ thống sẽ dựng cả một đặc tả cho tính năng đã chết. Vì vậy khi nghi ngờ, nó **không** tái lập như tính năng chắc chắn, mà hạ 🟡 và ghi câu hỏi mở kèm bằng chứng đã tìm ("tìm mã `login-legacy` trong toàn frontend — không nơi nào gọi"). Nó cũng phân biệt rõ "**đã tìm mà không thấy**" với "**chưa tìm**".

---

## 6. Vì sao tài liệu đọc như tài liệu nghiệp vụ, không phải tài liệu kỹ thuật?

Dù đọc code, hệ thống viết ra tài liệu bằng **ngôn ngữ nghiệp vụ**, cho người làm nghiệp vụ (IT-BA, PO, QC) đọc — không phải cho lập trình viên.

Cụ thể: tên hàm, tên endpoint, tên bảng dữ liệu, tên SDK **chỉ được phép xuất hiện ở cột "Nguồn"** (để truy vết), **không bao giờ lọt vào phần mô tả yêu cầu**. Ví dụ:‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

- ✅ Hệ thống viết: *"Hệ thống xác minh mật khẩu người dùng nhập."* — kèm cột Nguồn ghi `auth.service.ts:12`.
- ❌ Hệ thống KHÔNG viết: *"Gọi hàm `bcrypt.compare()` để so khớp hash."*

Nhờ vậy tài liệu đọc như một bản đặc tả nghiệp vụ thật sự, chứ không phải một bản chú giải code. Đây cũng là lý do hệ thống **cố ý không tạo** các phụ lục kỹ thuật kiểu "danh sách API" hay "sơ đồ bảng dữ liệu chi tiết" — những đối tượng dữ liệu được đưa vào sơ đồ ERD nghiệp vụ, không đẻ ra file kỹ thuật riêng.

---

## 7. Codebase lớn thì sao? — hệ thống để bạn chọn làm dần

Đa số dự án thật là repo lớn (hàng nghìn file, nhiều repo). Nếu cố đọc hết trong một lượt, hệ thống sẽ hoặc bỏ sót tính năng, hoặc quá tải. Vì vậy nó chia làm hai nhịp:

1. **Nhịp nhẹ (đầu):** ở Bước 1–2 nó **chưa** đọc sâu thân file. Nó chỉ đếm quy mô và liệt kê các điểm vào (route, màn, controller) để dựng **khung tính năng** — việc này rẻ, không quá tải, và **không cắt xén** (một repo có hàng trăm màn là bình thường, nó liệt kê hết chứ không lấy mẫu).

2. **Điểm dừng cho bạn chọn:** nếu codebase lớn (nhiều tính năng / nhiều file / nhiều repo), hệ thống **in bảng tất cả tính năng tìm được, cảnh báo "nặng, nên làm lần lượt", rồi để BẠN chọn** làm nhóm nào trước — tất cả, một danh sách cụ thể, hay theo nhóm ưu tiên (xác thực trước, rồi nghiệp vụ lõi, rồi quản trị). Chỉ những tính năng bạn chọn mới được đọc sâu và viết đặc tả; phần còn lại được đánh dấu "để sau", và **lần chạy kế tiếp sẽ làm tiếp phần còn lại** mà không phải bắt đầu lại.

Lưu ý: đây là hệ thống hỏi bạn *muốn làm phạm vi nào*, **không phải** hỏi bạn về nghiệp vụ — nguyên tắc "code là bằng chứng, không tra hỏi nghiệp vụ" vẫn nguyên vẹn.

Cách gom tính năng cũng dựa trên **bằng chứng thật**: một màn hình và controller mà nó thực sự gọi tới thì gộp thành một tính năng; một tiến trình nền đọc dữ liệu mà màn kia ghi ra thì nhập vào cùng luồng. Nó **không** gộp hai thứ chỉ vì tên gần giống nhau — thiếu bằng chứng nối thì để riêng và ghi chú rõ.

---

## 8. Vì sao hệ thống không hỏi lại bạn về nghiệp vụ?

Giống `/reverse-doc`, nguyên tắc nền là: **code chính là bằng chứng.** Hệ thống bám vào code mà viết, và **không hỏi lại bạn để làm rõ nghiệp vụ** giữa chừng. Về nghiệp vụ, nó chỉ hỏi đúng một câu ở đầu — "codebase của bạn nằm ở đâu?" — khi bạn chưa chỉ ra đường dẫn.

Vậy những chỗ code không nói thì sao? Thay vì dừng lại hỏi bạn, hệ thống **ghi lại thành câu hỏi mở** trong `reverse-gaps.md`. Và vì đọc code, phần lớn câu hỏi mở sẽ rơi vào dạng "vì sao / cho ai / mục tiêu gì" — đúng những thứ code câm. Bạn đọc file này một lượt để biết chính xác cần hỏi PO/BA điều gì.

---

## 9. Khi tài liệu đã có và code nói khác nhau thì sao?

Rất thường gặp: tài liệu cũ nói "khóa 30 phút", nhưng code thực tế lại là "khóa 24 giờ". Trong trường hợp này **code thường đáng tin hơn** (nó là thứ đang chạy), nhưng hệ thống **không tự quyết**. Nếu tính năng bạn đang tái lập trùng với một tính năng đã có tài liệu chính thức, hệ thống thêm một bảng "Khác biệt" ở đầu file đặc tả, liệt kê từng điểm mà code nói khác với tài liệu — để bạn thấy ngay chỗ cần đối chiếu. Tài liệu chính thức vẫn không bị đụng tới; việc quyết định thường đi qua bước tạo yêu cầu thay đổi (`/cr`).

---

## 10. Vì sao dừng ở đây rồi chuyển sang `/srs`?

`/code-to-srs` viết ra một bộ tài liệu **đầy đủ về hình thức nhưng chưa được duyệt**. Mọi câu vẫn mang nhãn tin cậy, và trạng thái luôn là "bản nháp" — không bao giờ tự đóng dấu "đã duyệt".

Điều này đặc biệt quan trọng với tài liệu dựng từ code: những chỗ 🟡 (vì sao / cho ai / mục tiêu) là những chỗ **con người phải trả lời**, code không thể. Nếu chain thẳng sang `/srs` mà bỏ qua, các câu 🟡 sẽ bị nâng thành yêu cầu chắc nịch — tức là bịa ra ý định nghiệp vụ mà không ai xác nhận. Nên `/code-to-srs` giữ lại các nhãn, dừng ở đây, và để `/srs` cùng bạn chốt từng chỗ 🟡 trước khi đóng dấu chính thức.

Vị trí của `/code-to-srs` trong dây chuyền:

```
 Source code của hệ thống đang chạy (repo)
        │
        ▼
   /code-to-srs  →  bộ SRS tái lập (có nhãn ✅/🔵/🟡, chưa duyệt)
        │
        ▼
      /srs  →  đặc tả chính thức đã xác nhận (con người trả lời các câu 🟡)
        │
        ▼
   /gap, /cr  →  đối chiếu và xử lý khác biệt với tài liệu đã có
```

---

## 11. Những gì `/code-to-srs` không làm

Để giữ đúng phạm vi và đúng vai IT-BA, có vài thứ hệ thống **cố ý không tạo**:

- **Không vẽ wireframe hay prototype** — chỉ tóm tắt màn hình bằng chữ.
- **Không viết tài liệu tích hợp API.**
- **Không viết user story.**
- **Không tạo phụ lục kỹ thuật** — không có file "danh sách API" hay "sơ đồ bảng dữ liệu" kiểu dev. Endpoint và bảng chỉ dùng để truy vết nguồn; đối tượng dữ liệu đi vào ERD nghiệp vụ.
- **Không đụng tới cây source code** — code chỉ được đọc, không bị sửa hay xóa. Kết quả luôn ghi vào workspace của bạn (nơi có `CLAUDE.md` + `.claude/`), thường ở một ổ/repo khác với code. **Không bao giờ** tạo `docs/_reverse/` bên trong repo source.
- **Không đọc lộ credential** — nếu gặp file cấu hình chứa secret, nó chỉ ghi tên biến, không bao giờ copy giá trị vào tài liệu.

---

## 12. So sánh nhanh với `/reverse-doc`

| | `/reverse-doc` | `/code-to-srs` |
|---|---|---|
| **Nguồn** | Tài liệu cũ (Word, PDF, ảnh, ghi chú) | Source code (route, service, model, migration...) |
| **Kết quả** | Bộ SRS tái lập trong `docs/_reverse/{feature}/` | **Giống hệt** |
| **Nhãn tin cậy** | ✅/🔵/🟡 đều đặn theo số nguồn | **Bất đối xứng**: fact code = ✅ mạnh; ý định = 🟡 luôn |
| **Điểm mạnh của nguồn** | Có thể nói cả "vì sao" (nếu tài liệu ghi) | Cực chắc "làm gì/thế nào"; câm hoàn toàn "vì sao" |
| **Nguồn phụ đặc thù** | — | Đọc thêm **test** (ranh giới/edge), **i18n** (câu lỗi thật), phát hiện **code chết** |
| **Repo lớn** | Ít gặp | Có điểm dừng cho bạn chọn nhóm làm dần |
| **Bước tiếp** | `/srs` | `/srs` |

Nói ngắn gọn: hai lệnh này là một cặp. Có tài liệu cũ thì dùng `/reverse-doc`; chỉ có code thì dùng `/code-to-srs`; có cả hai thì chạy cả hai rồi đối chiếu.

---

## Ví dụ thực tế

Anh **Minh** tiếp quản một ứng dụng học tiếng Anh từ một đội cũ. Đội cũ giải tán, tài liệu gần như không có — chỉ còn lại một repo NestJS đang chạy trên production. Anh cần dựng lại một bản đặc tả để đội mới hiểu hệ thống đang làm gì.

Anh gõ:

```
/code-to-srs ~/code/my-app/backend
```

Hệ thống đọc bản đồ codebase, nhận ra đây là NestJS, tìm thấy các controller và service. Nó gom code lại thành các tính năng theo góc nhìn user: `login`, `register`, `password-reset`, `subscription`. Nó cũng nhận ra `login` trùng nghiệp vụ với phần xác thực đã có tài liệu trong dự án, nên đánh dấu để đối chiếu.

Vì đây là repo lớn (mấy trăm file, nhiều màn), hệ thống dừng lại sau khi liệt kê các tính năng và bảo: *"Codebase khá lớn — anh muốn làm nhóm nào trước?"* Anh Minh chọn làm nhóm xác thực trước (`login`, `register`, `password-reset`). Các tính năng còn lại được đánh dấu "để sau" — lần chạy kế tiếp anh làm tiếp mà không mất công.

Sau đó nó viết bộ tài liệu cho `login`. Từ code sản phẩm, nó bóc ra nhiều sự thật chắc chắn: đăng nhập bằng email và mật khẩu, khóa tài khoản sau 10 lần sai trong 24 giờ (đọc từ hằng số `MAX_LOGIN_ATTEMPTS = 10` và `LOCKOUT_DURATION_H = 24`), chặn tài khoản chưa xác thực email — tất cả gắn nhãn ✅.

Rồi nó **đọc thêm ba nguồn đặc biệt**. Từ **test**, nó lấy được những chi tiết code sản phẩm không nói rõ: lần sai thứ 9 chưa khóa, đúng lần thứ 10 mới khóa, và bộ đếm reset khi đăng nhập thành công — đều ✅. Có một test kiểm "trong 24 giờ khóa vẫn không mở dù nhập đúng mật khẩu" nhưng **đang bị tắt**, nên nó chỉ ghi 🟡 kèm câu hỏi "hành vi này còn đúng không?". Từ **file ngôn ngữ**, nó tra mã lỗi `errors.account_locked` ra câu thật *"Your account is locked. Try again in 24 hours."* để ghi vào bảng lỗi, thay vì ghi trơ mã. Và nó phát hiện một route `login-legacy` bị đánh dấu `@Deprecated` mà **không màn nào gọi** — nên không dựng đặc tả cho nó, chỉ ghi câu hỏi "route này còn dùng không?" kèm bằng chứng đã tìm.

Có những chỗ code không trả lời được. **Vì sao là 10 lần chứ không phải 5? Vì sao 24 giờ?** Code chỉ có con số, không có lý do — hệ thống để thành câu hỏi mở, cần Security/PO quyết. **Câu lỗi dùng chung cho cả "sai email" lẫn "sai mật khẩu" — có phải chủ đích chống dò email không?** Đây là "ý định", chỉ suy từ một chỗ code, nên nó đánh 🟡 và ghi thành câu hỏi mở.

Ngoài file đặc tả chính, hệ thống còn vẽ sơ đồ luồng, trạng thái, dữ liệu, use case đăng nhập — và một file `_evidence.md` truy vết. Trong đó, phần "cross-repo hops" cho anh Minh thấy một điều đắt giá: mỗi lần đăng nhập thành công, phần backend ghi một bản ghi mà một tiến trình nền ở **repo khác** đọc để giám sát — tức tính năng khóa-tài-khoản này còn liên quan tới luồng audit anh chưa để ý.

Cuối cùng hệ thống cho anh Minh xem trước rồi ghi file. Anh mở `reverse-gaps.md` và thấy ngay danh sách cần chốt — "vì sao con số này", "test đang tắt còn đúng không", "route cũ còn dùng không". Anh không phải đọc lại từng dòng code để đoán; hệ thống đã tách sẵn "cái code làm" (đã chắc) khỏi "cái con người phải giải thích" (câu hỏi mở). Với bộ tài liệu này, anh chạy tiếp `/srs login` để chốt từng điểm 🟡 và biến nó thành đặc tả chính thức.

---

## Xem thêm

Tài liệu này chỉ giải thích ý tưởng và luồng chạy ở mức dễ hiểu. Muốn xem đầy đủ chi tiết kỹ thuật (các bước map codebase, quy tắc gắn nhãn bất đối xứng, cách bóc fact theo từng stack, cách rà lại ngược về `file:line`), đọc các file gốc: `.claude/skills/code-to-srs/SKILL.md` (skill chính), `.claude/skills/code-explorer/SKILL.md` (map + gom feature) và `.claude/skills/stacks-reference/SKILL.md` (recipe đọc code theo stack). Người anh em của nó là `/reverse-doc` — xem `explain-skills/reverse-doc.md`.‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
