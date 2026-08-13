---
type: skill-explainer
skill: roadmap
updated: 2026-08-01
---

# `/roadmap` là gì và nó chạy như thế nào?‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

## 1. Dùng để làm gì, khi nào nên gõ lệnh này‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Sau khi bạn đã có danh sách các tính năng dự định làm (nằm trong PRD sản phẩm — bảng "Feature Map"), câu hỏi tiếp theo luôn là: **làm cái gì trước, cái gì sau?** `/roadmap` chính là lệnh giúp bạn trả lời câu đó một cách có căn cứ, thay vì xếp theo cảm tính.

Nói đơn giản, `/roadmap`:

- Đọc danh sách tính năng đã có trong PRD (`docs/_product/prd.md`), **không bắt bạn liệt kê lại**.
- Giúp bạn **xếp hạng** tính năng nào đáng làm trước.
- Chia chúng thành các **đợt** — làm ngay bây giờ, làm kế tiếp, hay để sau.
- Ghi tất cả ra một file kế hoạch duy nhất: `docs/_product/roadmap.md`.

`/roadmap` đứng đúng **giữa hai lệnh**: `/prd` (định nghĩa "có những tính năng gì") xảy ra trước, còn `/brainstorm` (đào sâu từng tính năng) xảy ra sau. Roadmap là tấm bản đồ chỉ cho bạn nên `/brainstorm` cái nào đầu tiên.

Vì thế bạn cần chạy `/prd` trước. Nếu chưa có, `/roadmap` sẽ nhắc bạn chạy `/prd` (hoặc, nếu bạn khăng khăng, nó hỏi danh sách tính năng thủ công rồi vẫn làm — nhưng cảnh báo kế hoạch sẽ rời rạc).

Gõ lệnh đơn giản:

```
/roadmap
```

Không cần tham số gì thêm — nó sẽ tự hỏi bạn vài câu cần thiết.

***

## 2. Toàn bộ luồng chạy — sơ đồ‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Điều quan trọng cần nhớ: `/roadmap` **không tự bịa con số nào**. Chỗ nào cần dữ liệu để xếp hạng mà PRD chưa có, nó sẽ **hỏi bạn** — thà hỏi còn hơn đoán bừa.

```
 BẠN GÕ LỆNH
 /roadmap
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 1 — Đọc danh sách tính năng từ PRD          │
 │  Hệ thống mở PRD sản phẩm, lấy sẵn: tên tính năng,    │
 │  mức ưu tiên, tính năng nào phụ thuộc cái nào,        │
 │  rủi ro, cách đo thành công.                          │
 │  Chưa có PRD → nhắc bạn chạy /prd trước.              │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 2 — Hỏi bạn những gì PRD chưa có            │
 │  • Chia kiểu nào? Now/Next/Later hay theo quý?        │
 │  • Mỗi tính năng: chạm bao nhiêu người (Reach),       │
 │    tác động lớn hay nhỏ (Impact), làm nặng hay nhẹ    │
 │    (Effort), tin chắc tới đâu + căn cứ gì (Confidence)│
 │  • Mỗi thứ tính năng phụ thuộc ĐÃ SẴN SÀNG chưa?      │
 │  Không ước lượng được cái nào → ghi "TBD", KHÔNG ép.  │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 3 — Xếp ưu tiên + sắp thứ tự + chia đợt     │
 │  1. Khoanh vùng bằng MoSCoW (Bắt buộc / Nên có /      │
 │     Có thì tốt / Chưa làm) — cái Bắt buộc luôn trước  │
 │  2. Trong nhóm đó, chấm điểm RICE-lite để so tương đối│
 │  3. Sắp thứ tự sao cho "cái nền" luôn đứng trước      │
 │     "cái xây lên trên" (topological sort)             │
 │  4. Xếp mỗi tính năng vào một đợt                     │
 │  Rủi ro cao chỉ CẢNH BÁO, không tự hạ đợt.            │
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 4 — Cho bạn xem trước rồi mới ghi           │
 │  Hệ thống tóm tắt: đợt Now gồm gì, Next gồm gì,       │
 │  cái nào bị đẩy lùi vì phụ thuộc chưa xong, cái nào   │
 │  chưa đủ dữ liệu để chấm điểm. Chờ bạn gật đầu.       │
 │  Nếu file đã có sẵn → cho xem "trước/sau" rồi mới ghi.│
 └──────────────────────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 5 — Ghi file + vẽ sơ đồ phụ thuộc + báo cáo │
 │  Ghi roadmap.md, vẽ sơ đồ tính năng nào phụ thuộc     │
 │  cái nào (tô màu theo đợt), rồi gợi ý bạn nên         │
 │  /brainstorm tính năng nào đầu tiên ở đợt Now.        │
 └──────────────────────────────────────────────────────┘
        │
        ▼
     HOÀN TẤT — có tấm bản đồ để biết làm gì trước
```

***

## 3. Xếp ưu tiên: khoanh vùng MoSCoW trước, rồi mới chấm điểm RICE-lite‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Trước khi chấm điểm bất cứ thứ gì, `/roadmap` khoanh vùng danh sách bằng **MoSCoW** — một cách phân loại độ ưu tiên chia tính năng làm 4 mức: **Must** (bắt buộc phải có), **Should** (nên có), **Could** (có thì tốt), **Won't** (lần này chưa làm). Đây là bước quan trọng và dễ bị quên: nó đảm bảo một tính năng "có thì tốt" (Could) **không bao giờ chen lên trước** một tính năng "bắt buộc" (Must) chỉ vì tình cờ chấm điểm cao. Điểm số chỉ dùng để **so bên trong cùng một mức**, chứ không để một Could nhảy vượt qua nhóm Must/Should.

Sau khi đã khoanh vùng, để so các tính năng *trong cùng một mức*, `/roadmap` dùng một công thức đơn giản tên là **RICE-lite**. Nó chấm mỗi tính năng bằng 4 câu hỏi rất đời thường:

- **Reach** ("chạm tới") — tính năng này ảnh hưởng tới **bao nhiêu người**? Vài chục hay vài nghìn học viên?
- **Impact** ("tác động") — với những người dùng nó, tác động **lớn cỡ nào**? Đổi đời hay chỉ tiện thêm chút?
- **Confidence** ("độ chắc chắn") — bạn **tin chắc tới đâu** về hai con số trên? Đã có dữ liệu thật, hay mới chỉ là phỏng đoán?
- **Effort** ("công sức") — làm ra nó **tốn công cỡ nào**? Nhẹ (S), vừa (M), hay nặng (L)?

Mỗi câu trả lời được quy về một mức trên thang **cố định**: Reach và Impact chấm từ 1 đến 5 (rất ít → rất nhiều / rất nhỏ → rất lớn); Confidence là 1.0 (chắc chắn), 0.8 (khá chắc) hoặc 0.5 (còn mơ hồ); Effort là S=1, M=2, L=3. Điểm được tính bằng:

```
Điểm = (Reach × Impact × Confidence) ÷ Effort
```

Trực giác đằng sau công thức rất dễ hiểu: **chạm nhiều người, tác động lớn, lại chắc chắn thì điểm cao; nhưng nếu tốn quá nhiều công thì điểm bị chia xuống.** Tức là nó ưu tiên "được nhiều, tốn ít".

**Điểm này KHÔNG phải một phép đo tuyệt đối.** Nó chỉ dùng để **xếp hạng tương đối trong một lần chạy** — so tính năng A với tính năng B *trong cùng một roadmap*. Con số `5.3` không có ý nghĩa đo lường gì cả; nó chỉ cho biết "cái này đứng trên cái kia". Bạn **không nên** đem con số của lần chạy này so với lần chạy khác hay so với một sản phẩm khác — không phải vì thang đo đổi (thang cố định như trên), mà vì **dữ liệu và căn cứ bạn dùng để chấm mỗi lần một khác** (lần này còn phỏng đoán, lần sau đã có số thật), nên hai con số không cùng gốc để so. (Thuật ngữ chuyên môn gọi kiểu chấm này là "band ordinal" — nôm na là **chỉ để xếp thứ hạng, không đo độ lớn tuyệt đối**.)

**Vì sao hệ thống thà hỏi bạn còn hơn tự bịa số?** Bốn con số Reach/Impact/Effort/Confidence **không có sẵn trong PRD**. Nếu hệ thống tự "đoán" bừa rồi chấm điểm, bạn sẽ nhận được một bảng xếp hạng trông rất khoa học nhưng thực chất dựa trên số liệu giả — còn nguy hiểm hơn không có gì, vì nó tạo cảm giác chắc chắn sai. Nên hệ thống **luôn hỏi bạn** bằng ngôn ngữ đời thường ("chạm nhiều hay ít người?", "tác động lớn hay nhỏ?", "làm nặng hay nhẹ?"). Tính năng nào bạn thật sự không ước lượng được → nó ghi **TBD** (chưa rõ) và xếp tạm bằng các tín hiệu khác, chứ tuyệt đối không chấm điểm giả.

Một chi tiết nhỏ nhưng quan trọng: **Confidence luôn phải kèm căn cứ.** Khi bạn nói "tôi chắc chắn cao", hệ thống hỏi lại "chắc chắn dựa trên đâu?" — có 3 mức căn cứ: *Giả định* (chỉ là suy đoán), *Tín hiệu gián tiếp* (đối thủ đang làm, có vài phản hồi), hay *Dữ liệu trực tiếp* (số liệu thật từ người dùng của bạn). Nếu bạn nói "chắc chắn cao" nhưng căn cứ chỉ là "giả định" → đó là mâu thuẫn, hệ thống sẽ hỏi lại để bạn xác nhận.

***

## 4. Phụ thuộc là "ràng buộc cứng" — xây móng xong mới xây tường‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Đây là phần thiết kế quan trọng nhất và cũng dễ bị bỏ qua nhất.

Hãy tưởng tượng bạn xây một căn nhà. Dù bạn *rất muốn* sơn tường màu xanh ngay hôm nay, bạn **không thể** — vì chưa có tường. Mà muốn có tường thì phải xây xong móng trước. Thứ tự **móng → tường → sơn** là bắt buộc, không cách nào đảo được, bất kể bạn nóng lòng tới đâu.

Tính năng cũng vậy. Nếu tính năng "Mua gói học Premium" cần có "Tích hợp thanh toán Stripe" làm nền, thì **không đời nào** xếp "Mua gói Premium" vào đợt Now khi Stripe chưa sẵn sàng — cho dù điểm RICE của nó có cao ngất. Đây gọi là **ràng buộc cứng**: phụ thuộc luôn phải đứng trước cái phụ thuộc nó.

`/roadmap` xử lý điều này bằng một kỹ thuật gọi là **topological sort** — nghe học thuật nhưng ý tưởng chỉ là: *sắp thứ tự sao cho cái làm nền luôn đứng trước cái xây lên trên*. Và nó áp cho **toàn chuỗi**, không chỉ một tầng: nếu A cần B, B lại cần C, thì thứ tự phải là C → B → A. Không thể để A ở đợt Now khi C còn nằm ở đợt Later.

Nếu chẳng may có **phụ thuộc vòng** (A cần B, mà B lại cần A — như "móng cần tường, tường cần móng") thì đó là lỗi logic không giải được. Hệ thống sẽ **cảnh báo** và không xếp được cho tới khi bạn gỡ vòng đó ra (thường phải sửa lại ở `/prd`).

### Khác biệt quan trọng: "đã brainstorm" ≠ "phụ thuộc đã sẵn sàng"

Đây là chỗ cực kỳ dễ nhầm. Trong PRD, mỗi tính năng có một cột đánh dấu ✅ nghĩa là "đã brainstorm chi tiết". Nhiều người tưởng dấu ✅ này là "vé vào đợt Now". **Không phải.**

"Đã brainstorm" chỉ có nghĩa là bạn đã *nghĩ kỹ* về tính năng đó — chứ không có nghĩa là **cái nền của nó đã xây xong**. Bạn có thể brainstorm rất kỹ về "Mua gói Premium", nhưng nếu Stripe chưa tích hợp thì vẫn chưa xây được tính năng đó lên.

Vì vậy `/roadmap` **hỏi riêng** về trạng thái sẵn sàng của từng thứ mà tính năng phụ thuộc: *đã có sẵn / đang làm / chưa bắt đầu*. Chỉ khi phụ thuộc **"đã có sẵn"** thì tính năng đứng trên nó mới đủ điều kiện vào Now. Phụ thuộc còn "đang làm" hay "chưa bắt đầu" → tính năng phụ thuộc nó bị đẩy xuống đợt sau, **bất kể điểm cao hay đã brainstorm hay chưa**.

Dấu ✅ vẫn có ích, nhưng ở đúng chỗ của nó: **sau khi** một tính năng đã vượt qua cửa phụ thuộc (không bị cái nền nào chặn), thì trong nhóm "đủ điều kiện" đó, tính năng đã brainstorm chi tiết (✅) hoặc đang làm dở (🔄) **được ưu tiên** xếp vào Now trước — vì nó đã sẵn sàng để bắt tay làm. Còn tính năng chưa brainstorm (⬜) thường lùi về Next/Later. Nói gọn: ✅ là một **tín hiệu ưu tiên mềm** áp *sau* cửa phụ thuộc, không phải cái quyết định trước.‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

***

## 5. Hai cách chia đợt — Now/Next/Later hay theo quý?

`/roadmap` cho bạn chọn một trong hai cách chia. Nếu bạn không nói rõ, nó **hỏi một câu** trước khi tính — không tự mặc định, vì đây là quyết định của bạn.

**Cách 1 — Now / Next / Later ("bây giờ / kế tiếp / để sau"):**
Chia theo **kết quả muốn đạt được**, chưa gắn ngày cụ thể. "Now" là những gì làm ngay để đạt mục tiêu gần nhất; "Next" là đợt kế; "Later" là để dành sau. Đây là cách phù hợp khi bạn **chưa có deadline cứng** — đang ở giai đoạn khám phá, mọi thứ còn linh hoạt.

**Cách 2 — Theo quý (Q1, Q2, Q3...):**
Gắn tính năng vào **các quý cụ thể**. Chỉ nên dùng khi bạn **đã có cam kết ngày thật** — ví dụ hợp đồng pháp lý, ngày ra mắt đã hứa với đối tác, hay mốc marketing đã chốt. Khi chọn cách này, hệ thống còn vẽ thêm một **biểu đồ Gantt** (biểu đồ tiến độ dạng các thanh ngang, mỗi tính năng một thanh trải theo thời gian) cho thấy tính năng nào chạy trong quý nào. Ngược lại, nếu bạn chọn Now/Next/Later thì hệ thống **không** vẽ Gantt — chỉ vẽ sơ đồ phụ thuộc — đúng tinh thần "chưa có ngày cứng thì đừng vẽ lịch giả".

**Lời cảnh báo quan trọng:** đừng chia theo quý khi bạn *chưa thật sự có deadline*. Gắn "tính năng X vào Q3" khi chưa ai cam kết ngày nào chỉ tạo ra **cảm giác chính xác giả** (false precision) — nhìn thì có vẻ kế hoạch rõ ràng, nhưng con số quý đó không dựa trên gì cả. Trong giai đoạn còn khám phá, Now/Next/Later trung thực hơn nhiều. Nếu bạn vẫn khăng khăng chia theo quý, hệ thống làm — nhưng nhắc bạn điều này trước.

***

## 6. Vài nguyên tắc nhỏ nhưng đáng nhớ

- **Rủi ro chỉ là tín hiệu mềm.** Khác với phụ thuộc (ràng buộc cứng, bắt buộc phải theo), rủi ro cao chỉ khiến hệ thống **cảnh báo** — nó không tự động đẩy tính năng xuống đợt sau. Bạn có toàn quyền chấp nhận rủi ro và vẫn làm ngay (ví dụ khi bạn đã có cách phòng ngừa). Hệ thống không quyết thay bạn.

- **Nói kết quả trước, liệt kê tính năng sau (outcome-first).** Mỗi đợt trong roadmap mở đầu bằng câu "đợt này để đạt được gì" — rồi mới liệt kê tính năng bên dưới. Roadmap không phải một bảng tính năng kèm điểm số khô khan, mà là câu chuyện "làm những cái này để đạt điều kia".

- **Chỉ đi một chiều: PRD → roadmap.** `/roadmap` đọc từ PRD nhưng **không bao giờ tự sửa ngược** lại PRD. Muốn thêm/bớt tính năng thì bạn chạy `/prd`, rồi chạy lại `/roadmap`.

- **Cảnh báo "toàn giả định".** Nếu phần lớn tính năng ở đợt Now đều dựa trên "giả định" chưa kiểm chứng, hệ thống nhắc bạn: nên **kiểm chứng trước** (phỏng vấn người dùng, làm một bản mẫu thử cho họ dùng) rồi hãy đầu tư công sức xây dựng. Tránh dồn nguồn lực vào những thứ bạn chỉ mới đoán là đúng. Không chỉ khi "phần lớn" — ngay cả khi **chỉ một tính năng bắt buộc (Must) quan trọng, điểm cao** mà lại dựa trên giả định, hệ thống cũng nhắc riêng, vì đặt cược lớn vào một điều chưa chắc là rủi ro đáng lưu ý.

- **Xem trước rồi mới ghi.** Như mọi lệnh khác, `/roadmap` cho bạn xem kế hoạch trước khi ghi file. Nếu file roadmap đã tồn tại, nó cho bạn xem phần thay đổi (dạng so sánh trước/sau) rồi mới ghi đè.

- **Hỏi bằng đúng từ dự án bạn dùng.** Khi hỏi Reach ("tính năng này chạm bao nhiêu người trong một quý?"), hệ thống dùng đúng từ mà dự án bạn gọi người dùng cuối — *học viên*, *khách hàng*, *tài xế*... Từ này lấy từ **hồ sơ dự án** (`docs/_shared/project-profile.md`), một file dùng chung cho mọi lệnh: hỏi một lần, các lệnh sau dùng lại chứ không hỏi lại bạn. Hồ sơ chưa có thông tin → nó hỏi rồi xin phép ghi vào đó cho lần sau; bạn vẫn duyệt trước khi ghi. Muốn xem/sửa chủ động thì dùng `/update-overview profile`.

- **Một mốc để nhớ quay lại (`next_review`).** Roadmap không phải bản chốt vĩnh viễn — nó ghi kèm một **mốc rà soát lại**, đặt theo độ dài của đợt Now. Đến mốc đó bạn nên chạy lại `/roadmap` để xếp lại theo tình hình mới (phụ thuộc đã xong chưa, ước lượng có đổi không). Chưa rõ mốc nào thì để trống, không bịa ngày.

***

## 7. Ví dụ thực tế

Chị **Hà**, một BA phụ trách sản phẩm app học tiếng Anh, vừa hoàn tất PRD với một Feature Map gồm 6 tính năng: *Bài học hằng ngày*, *Luyện phát âm bằng AI*, *Mua gói Premium*, *Bảng xếp hạng bạn bè*, *Nhắc nhở học tập*, và *Chứng chỉ hoàn thành khóa*. Giờ chị cần biết nên làm cái nào trước. Chị gõ:

```
/roadmap
```

1. Hệ thống đọc PRD, lấy sẵn tên 6 tính năng, mức ưu tiên (MoSCoW), và các phụ thuộc đã ghi — ví dụ *Mua gói Premium* phụ thuộc *Tích hợp thanh toán Stripe*, còn *Chứng chỉ hoàn thành* phụ thuộc *Mua gói Premium*.

2. Hệ thống hỏi chị Hà cách chia. Chị nói: *"Chia Now/Next/Later thôi, tụi mình chưa chốt ngày ra mắt."* — hợp lý, vì sản phẩm còn đang khám phá.

3. Hệ thống hỏi từng tính năng: chạm bao nhiêu người, tác động cỡ nào, làm nặng hay nhẹ, tin chắc tới đâu. Với *Bài học hằng ngày*, chị Hà nói "chạm gần như tất cả học viên, tác động lớn, làm vừa, chắc chắn cao — vì có số liệu thật từ bản thử nghiệm." → điểm RICE cao. Với *Bảng xếp hạng bạn bè*, chị nói "thật ra em cũng không rõ nó chạm được bao nhiêu người, cũng chưa đo được tác động" → hệ thống ghi **TBD**, không ép chị chấm bừa.

4. Hệ thống hỏi trạng thái sẵn sàng của các phụ thuộc. Chị Hà cho biết *Tích hợp Stripe* **mới đang làm, chưa xong**.

5. Hệ thống tính điểm và sắp xếp. *Mua gói Premium* có điểm RICE khá cao, chị Hà cũng đã brainstorm kỹ (dấu ✅), nên thoạt nhìn xứng đáng vào Now. **Nhưng** vì nó phụ thuộc Stripe mà Stripe *chưa sẵn sàng*, hệ thống **đẩy nó xuống Next**. Còn *Chứng chỉ hoàn thành* thì phụ thuộc chính *Mua gói Premium* — nguyên tắc phụ thuộc chỉ đòi nó **không được đứng trước** Premium, nên về lý nó có thể ở cùng Next (làm sau Premium trong quý đó). Nhưng chị Hà cho biết *Chứng chỉ* điểm thấp và đội chưa đủ người làm nhiều thứ một lúc trong đợt Next → vì lý do năng lực đó, hệ thống xếp nó xuống *Later* (chứ không phải tự động vì Premium ở Next).

6. Hệ thống cho chị Hà xem trước bản kế hoạch:
   - **Now:** *Bài học hằng ngày*, *Luyện phát âm bằng AI*, *Nhắc nhở học tập* — đạt mục tiêu "học viên có trải nghiệm học lõi hoàn chỉnh".
   - **Next:** *Mua gói Premium* (chờ Stripe xong).
   - **Later:** *Chứng chỉ hoàn thành* (làm sau Premium, và đội chưa đủ sức làm sớm hơn), *Bảng xếp hạng bạn bè* (chưa đủ dữ liệu).
   
   Kèm ghi chú: *"⏸ Mua gói Premium bị đẩy lùi vì chờ Stripe (đang làm) xong trước"* và *"❓ Bảng xếp hạng bạn bè: chưa đủ dữ liệu cho RICE — bổ sung ước lượng để xếp chính xác hơn."*

7. Chị Hà thấy hợp lý, gõ `Y`. Hệ thống ghi file `roadmap.md`, vẽ sơ đồ phụ thuộc tô màu theo đợt, rồi gợi ý: *"Bắt đầu đào sâu bằng `/brainstorm bai-hoc-hang-ngay` — tính năng đầu tiên ở đợt Now."*

Cuối buổi, chị Hà có một tấm bản đồ rõ ràng: biết làm gì trước, biết vì sao *Premium* phải chờ, và biết *Bảng xếp hạng* cần thêm dữ liệu chứ không bị chấm điểm giả cho có.

***

## Xem thêm

Tài liệu này chỉ giải thích ý tưởng và luồng chạy ở mức dễ hiểu. Muốn xem đầy đủ chi tiết cơ chế (các Phase A-E, công thức chấm điểm, cách dựng sơ đồ phụ thuộc), đọc file gốc: `.claude/skills/roadmap/SKILL.md`.

Các lệnh liên quan ở hai đầu:

- `explain-skills/prd.md` — `/prd` sinh ra PRD sản phẩm (Feature Map) mà `/roadmap` đọc làm nguồn. **Chạy trước** `/roadmap`.
- Sau `/roadmap` thường là `/brainstorm <tính năng>` — đào sâu từng tính năng, bắt đầu từ đợt Now mà roadmap đã xếp.‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền hoangphan.blog</sub>
