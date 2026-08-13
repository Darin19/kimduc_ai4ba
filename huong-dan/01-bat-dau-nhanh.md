# 01 — Bắt đầu nhanh: chạy thử trong 15 phút‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

> Chương này để các bạn **thấy nó chạy** trước đã. Chưa cần hiểu cơ chế, chưa cần quyết định giữ skill nào. Cài, chạy một feature giả, xem output, rồi mới tính tiếp.
>
> **Chưa muốn cài gì?** Mở thư mục [`example/`](../example/README.md) — có sẵn hai feature đã chạy qua bộ skill, hơn 130 file output thật. Xem trước cho biết mình sắp nhận được cái gì.

***

## Claude Code là gì‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Nếu các bạn mới chỉ dùng ChatGPT hay Claude trên trình duyệt, thì đây là điểm khác quan trọng nhất.

**Claude Code chạy trên máy các bạn** và **nhìn thấy thư mục dự án**. Nó đọc được file, ghi ra file mới, chạy được lệnh — trong khi bản chat trên trình duyệt chỉ nhìn thấy đúng thứ các bạn dán vào ô chat.

Có ba cách dùng, chọn cái nào cũng được:

| Cách dùng | Hợp với ai |
|---|---|
| **Ứng dụng Claude trên máy** — Claude Code nằm sẵn trong đó | Không quen gõ lệnh, muốn giao diện bấm được |
| **Extension trong VS Code** | Đã quen VS Code, muốn AI làm việc ngay cạnh file |
| **Terminal** (Mac) / PowerShell (Windows) | Quen dòng lệnh, hoặc muốn chạy trên máy chủ |

Cả ba đều dùng chung một bộ skill và đọc cùng thư mục `.claude/` — chọn theo thói quen, không ảnh hưởng gì tới nội dung hướng dẫn này.

Tài liệu này minh họa bằng **Terminal** vì nó ngắn gọn và không phụ thuộc giao diện. Dùng ứng dụng hay extension thì các bạn không cần gõ mấy dòng `claude` — chỉ cần mở đúng thư mục dự án rồi gõ lệnh `/tên-skill` vào ô chat.

Đó chính là lý do bộ skill này chạy trên Claude Code chứ không phải trên chat — chương [09](09-vi-sao-khong-hop-ai-chat.md) nói kỹ hơn.

> **Về chi phí:** các bạn trả tiền trực tiếp cho Anthropic (nhà làm ra Claude), không trả cho mình. Có gói thuê bao tháng và có kiểu trả theo lượng dùng. Xem [claude.com/claude-code](https://claude.com/claude-code) để biết gói hiện tại.

***

## Bước 1 — Cài Claude Code‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Làm theo hướng dẫn chính thức: [claude.com/claude-code](https://claude.com/claude-code) — trang này có đủ cả ba cách (ứng dụng, extension VS Code, dòng lệnh).

**Dùng ứng dụng Claude hoặc extension VS Code:** cài xong là dùng được luôn, bỏ qua phần kiểm tra dưới đây.

**Dùng dòng lệnh:** mở Terminal rồi kiểm tra:

```bash
claude --version
```

Ra được số phiên bản là ổn.

> **Terminal ở đâu?**
> Mac: nhấn `Cmd + dấu cách`, gõ "Terminal", Enter.
> Windows: nhấn phím Windows, gõ "PowerShell", Enter.

***

## Bước 2 — Tạo một thư mục thử‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

**Đừng thử ngay trên dự án thật.** Tạo một thư mục riêng để nghịch — đặt tên `ba-kit-thu` cho dễ nhớ.

Tạo bằng Finder/Explorer cũng được, hoặc gõ:

```bash
mkdir ~/ba-kit-thu
cd ~/ba-kit-thu
git init
```

Dòng `git init` đáng làm: nó biến thư mục này thành nơi có thể hoàn tác được. Nếu AI ghi ra thứ gì các bạn không thích, quay lại được.

> Không quen dòng lệnh thì tạo thư mục bằng tay, rồi ở bước sau nhờ AI chạy `git init` hộ.

***

## Bước 3 — Copy bộ tối thiểu‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍

Chỉ lấy **4 skill** để bắt đầu: `/brainstorm`, `/srs`, `/user-flow`, `/userstory`.

Nhưng đừng copy tay. Mỗi skill còn kéo theo một loạt rule và template mà nó cần — riêng bốn skill này đã là **23 file phụ thuộc**. Copy thiếu một cái là skill chạy sai mà không báo lỗi rõ ràng.

Cách đúng là để AI dò và copy.

Mở Claude Code **trong thư mục `~/ba-kit-thu` vừa tạo**:

* **Ứng dụng Claude:** mở app, chọn thư mục `~/ba-kit-thu`
* **VS Code:** mở thư mục `~/ba-kit-thu`, rồi mở panel Claude
* **Terminal:** `cd ~/ba-kit-thu` rồi gõ `claude`

> Mở **đúng thư mục** là điểm quan trọng nhất — Claude Code chỉ thấy file trong thư mục các bạn mở.

Rồi dán prompt này:

```text
Tôi vừa mua bộ BA-Kit, giải nén ở: <đường-dẫn-ba-kit>

Copy giúp tôi 4 skill để chạy thử: brainstorm, srs, user-flow, userstory.

Làm theo thứ tự sau:

1. Với MỖI skill, mở <đường-dẫn-ba-kit>/claude-code/.claude/skills/<tên>/SKILL.md
   và tìm mọi dòng bắt đầu bằng @ (thường ở mục References cuối file) —
   đó là danh sách file nó phụ thuộc.

2. Dò ĐỆ QUY: mỗi rule tìm được cũng có thể tham chiếu rule khác. Lặp lại
   cho tới khi không ra thêm gì mới.

3. Kiểm xem skill có gọi agent nào không (tìm chữ "Task tool", "reviewer",
   "senior-ba", "subagent_type" trong SKILL.md).

4. Cho tôi xem DANH SÁCH đầy đủ những file sắp copy trước khi copy.

5. Sau khi tôi duyệt: copy mọi thứ sang thư mục hiện tại, giữ đúng cấu trúc
   (.claude/skills/, .claude/rules/, .claude/agents/, _templates/).

6. Kiểm lại: với mỗi skill vừa copy, xác nhận mọi đường dẫn @ trong đó đều
   trỏ tới file có thật. Báo tôi nếu còn thiếu.

Chưa copy gì cả — đưa danh sách trước.
```

Câu cuối quan trọng: xem danh sách trước rồi mới cho copy.

> **Vì sao chỉ 4 skill?** Xem [chương 04](04-skill-preload-va-token.md) — cài nhiều thì tốn tiền ở mọi phiên chat. Bắt đầu nhỏ, thêm dần khi thật sự thiếu.
>
> **Copy về dự án thật sau này?** [Chương 06](06-copy-skill-ve-du-an.md) có prompt đầy đủ hơn — kèm bước rà chỗ hard-code và viết lại `CLAUDE.md`.

***

## Bước 4 — Chạy thử

Vẫn ở phiên Claude Code vừa nãy (đang mở trong `~/ba-kit-thu`), gõ:

```
/brainstorm quản lý đặt phòng họp cho công ty
```

**Chuyện gì sẽ xảy ra:**

1) Skill hỏi các bạn vài câu để làm rõ ý tưởng — ai dùng, giải quyết vấn đề gì, có ràng buộc gì. Cứ trả lời bằng tiếng Việt bình thường.
2) Chỗ nào các bạn chưa biết, cứ nói "chưa rõ" — nó sẽ ghi thành **open question** thay vì tự bịa. Đây là điểm đáng chú ý nhất, để ý xem nó có làm đúng không.
3) Trước khi ghi file, nó hiện **kế hoạch**: sắp tạo file nào, nội dung gì. Các bạn gõ `Y` để đồng ý.
4) File xuất hiện trong `docs/quan-ly-dat-phong-hop/brainstorms/`.

Mở file đó ra xem. Đó là output thật của bộ này.

***

## Bước 5 — Chạy tiếp một bước nữa

Để thấy các skill nối nhau thế nào:

```
/srs quan-ly-dat-phong-hop
```

Skill này **đọc file brainstorm vừa tạo** làm nguồn, rồi hỏi tiếp những gì còn thiếu để viết đặc tả.

Đó là ý tưởng cốt lõi của cả bộ: **output của bước trước là input của bước sau.** Không phải mỗi skill làm việc riêng lẻ rồi các bạn tự ghép lại.

***

## Các bạn vừa thấy gì

Nếu mọi thứ chạy đúng, các bạn vừa quan sát được bốn thứ:

| Điều xảy ra | Ý nghĩa |
|---|---|
| Skill **hỏi lại** thay vì đoán bừa | Có rule chặn AI tự điền thông tin nó không có |
| Nó hiện **kế hoạch trước khi ghi file** | Cổng duyệt L1 — AI không ghi sau lưng các bạn |
| File ra đúng thư mục, đúng cấu trúc | Quy ước đặt tên được áp tự động |‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍
| Skill sau **đọc được** output của skill trước | Các skill nối thành chuỗi, không rời rạc |

Bốn thứ đó là khác biệt giữa "bộ skill" và "một tập prompt viết kỹ".

***

## Không biết dùng skill nào? Hỏi thẳng AI

Bộ này **tự mô tả được chính nó**. Không cần học thuộc 57 skill — chỉ cần chỉ cho AI đọc thư mục gói rồi hỏi bằng lời thường.

Điểm mấu chốt: **luôn đưa đường dẫn thư mục gói vào câu hỏi.** Không có nó, AI đoán từ trí nhớ và bịa ra tên skill không tồn tại.

### Hỏi theo việc cần làm

Cách hỏi tự nhiên nhất — mô tả việc, để AI chọn skill:

```text
Đọc <đường-dẫn-ba-kit>/claude-code/.claude/skills/ và
<đường-dẫn-ba-kit>/explain-skills/.

Việc tôi cần làm: [mô tả bằng lời thường, ví dụ "vẽ sơ đồ quy trình duyệt
đơn hàng có 3 vai trò: khách, kho, admin"]

Hãy:
1. Liệt kê những skill bạn đã CÂN NHẮC, nói rõ vì sao chọn/bỏ từng cái
2. Cho tôi cú pháp gọi chính xác của skill được chọn
3. Nói trước nó sẽ hỏi tôi gì và tạo ra file nào

Chỉ nói về skill có thật trong thư mục đó. Chưa chạy gì — tôi xem trước rồi tự chạy.
```

Mục 1 bắt AI **cho thấy nó đã so sánh** thay vì phán một cái tên — bộ này có bốn skill cùng vẽ quy trình có nhánh, biết vì sao nó loại ba cái kia giúp các bạn tự chọn được lần sau.

Câu cuối chống bịa. Không có nó, AI hay "sáng tạo" thêm skill nghe rất hợp lý nhưng không tồn tại.

### Vài câu hỏi khác, dùng luôn được

Đổi phần trong ngoặc vuông:

```text
Liệt kê tất cả skill trong <đường-dẫn-ba-kit>/claude-code/.claude/skills/,
nhóm theo mục đích. Chỉ skill có thật.
```

```text
Đọc SKILL.md và explain-skills của /<tên-skill> trong <đường-dẫn-ba-kit>.
Giải thích đơn giản: nó làm gì, hỏi tôi gì, tạo file nào, cần chạy skill nào
trước, và ba chỗ dễ sai nhất. Trích dẫn file làm bằng chứng.
```

```text
Nhìn thư mục docs/ của tôi và bộ skill ở <đường-dẫn-ba-kit>, gợi ý 2-3 bước
hợp lý tiếp theo. Mục tiêu của tôi: [ví dụ "có wireframe và backlog cho dev"].
Mỗi gợi ý nói rõ cần file nào làm nguồn — tôi đã có đủ chưa.
```

```text
Đọc <đường-dẫn-ba-kit>/example/. Cho tôi xem một feature hoàn chỉnh trông
thế nào: file nào do skill nào sinh ra, file nào đáng đọc trước.
```

### Ba cách kiểm AI không "diễn"

AI nói rất trôi chảy về những thứ nó chưa đọc:

* **Kiểm tên skill có thật:** hỏi *"Liệt kê thư mục `.claude/skills/`"* rồi đối chiếu
* **Bắt trích dẫn:** *"Trích đúng dòng trong SKILL.md làm bằng chứng"*
* **Chặn trước khi ghi:** *"Chưa tạo hay sửa gì — liệt kê file sẽ tác động trước"*

AI là tra cứu viên nhanh, không phải nguồn sự thật. Nó chỉ đường. Các bạn là người quyết.

***

## Nếu có trục trặc

| Triệu chứng | Xử lý |
|---|---|
| Gõ `/brainstorm` không thấy gì | Kiểm xem Claude Code có đang mở **đúng thư mục** `~/ba-kit-thu` không. Rồi hỏi AI: *"Liệt kê các skill trong .claude/skills/ giúp tôi"* |
| Skill báo thiếu file | Copy sót phụ thuộc. Hỏi AI: *"Kiểm mọi đường dẫn @ trong .claude/skills/ xem file nào chưa có, rồi copy nốt từ `<đường-dẫn-ba-kit>`"* |
| Skill ghi file mà không hỏi | Thiếu `approval-gate.md` trong `.claude/rules/` |
| Skill hỏi kiểu kỹ thuật (tên bảng, tên API) | Thiếu `ba-conventions.md` |
| Muốn xoá hết làm lại | Hỏi AI: *"Xoá hết file vừa copy, đưa thư mục về trạng thái sạch"* — hoặc gõ `git clean -fd && git restore .` |

***

## Cài thêm công cụ (chỉ khi cần)

Bốn skill ở trên chạy được ngay, không cần cài gì thêm. Nhưng vài skill khác cần công cụ ngoài:

| Công cụ | Skill cần nó | Cài thế nào |
|---|---|---|
| Node.js | `/bpmn`, `/kg`, kiểm cú pháp sơ đồ | [nodejs.org](https://nodejs.org) |
| `@mermaid-js/mermaid-cli` | Render sơ đồ ra ảnh PNG | `npm install -g @mermaid-js/mermaid-cli` |
| `d2` | `/d2-activity`, `/d2-erd`, `/d2-architect` | [d2lang.com](https://d2lang.com) |
| `pandoc` | `/export` ra file DOCX | [pandoc.org](https://pandoc.org) |

Một số skill có **engine** riêng cần cài thư viện trước khi dùng:

```bash
cd .claude/skills/bpmn/engine
npm ci
```

> `npm ci` là lệnh tải các thư viện mà engine cần (giống cài phần mềm phụ trợ). Cần có Node.js trước. Chỉ chạy một lần cho mỗi engine.
>
> Không quen gõ lệnh thì nhờ AI: *"Cài engine cho skill /bpmn giúp tôi"* — nó chạy hộ và báo nếu thiếu Node.js.

Chưa cần cài mấy thứ này ngay. Khi nào dùng tới skill tương ứng thì quay lại.

***

## Về quyền và dữ liệu

Câu hỏi hay gặp: **cấp quyền đọc file cho AI thì dữ liệu công ty đi đâu?**

Hai điều cần biết:

**1. Các bạn kiểm soát được phạm vi.** File `.claude/settings.json` khai báo AI được đọc gì, ghi gì. Ví dụ:

```json
"permissions": {
  "allow": ["Read(*)", "Edit(docs/**)"],
  "deny":  ["Edit(.git/**)"]
}
```

Dòng `Edit(docs/**)` nghĩa là chỉ được sửa file trong `docs/`, không đụng được chỗ khác.

**2. Chính sách dữ liệu là của Anthropic, không phải của bộ skill này.** Bộ skill chỉ là file text hướng dẫn — nó không gửi dữ liệu đi đâu cả. Việc dữ liệu có được dùng để huấn luyện hay không phụ thuộc gói các bạn đăng ký với Anthropic. Đọc điều khoản của họ trước khi dùng với tài liệu nhạy cảm.

**Nguyên tắc an toàn:** đừng để file chứa khoá API, mật khẩu hay dữ liệu khách hàng thật trong thư mục dự án khi thử nghiệm.

***

## Bước tiếp theo

Chạy thử xong rồi, giờ mới đến lúc quyết định giữ gì:

| Muốn gì | Đọc chương |
|---|---|
| Hiểu skill/rule/hook khác nhau ra sao, sửa ở đâu | [02](02-hieu-cau-truc-bo-kit.md) |
| Biết cài bao nhiêu skill là hợp lý | [04](04-skill-preload-va-token.md) |
| Ghép luồng làm việc của riêng mình | [03](03-chon-pipeline-cua-ban.md) |
| Mang skill về dự án thật | [06](06-copy-skill-ve-du-an.md) |

***

## Tóm tắt

* Claude Code chạy **trên máy các bạn** và **đọc/ghi được file dự án** — dùng qua **ứng dụng Claude**, **extension VS Code**, hoặc **dòng lệnh**, cả ba như nhau.
* Thử trên **thư mục riêng** trước, có `git init` để hoàn tác được.
* Bắt đầu với **4 skill**, đừng copy cả bộ. **Nhờ AI dò phụ thuộc rồi copy** — bốn skill đó kéo theo 23 file, copy tay là thiếu.
* Chạy `/brainstorm` rồi `/srs` để thấy skill nối nhau.
* Bốn dấu hiệu bộ chạy đúng: **hỏi lại khi thiếu**, **xin phép trước khi ghi**, **file ra đúng chỗ**, **skill sau đọc được output skill trước**.
* Không biết dùng skill nào thì **hỏi thẳng AI** — nhớ **đưa đường dẫn thư mục gói** vào câu hỏi, và bắt nó **trích dẫn file** làm bằng chứng.

***

Chương tiếp: [02 — Bộ Kit gồm những gì, và sửa ở đâu](02-hieu-cau-truc-bo-kit.md)‍‌‌​​‌‌​​‌‌‌​‌‌‌‌​​‌​‌​‌‌‌‌‌​‌​​‌​​​‌​​​​‌​​​​‌​​​​​​​‌‌‌​‌‌​​​‌​​‌​​​​‌​​‌‌‌‌‌​​‌‌‌‌​‌‌‌​​​​​‌‌‌​​‌​‌‌‌‌​‌‌​​‌​‌‌​​​​​‌​‌‌​​‌‌​‌‍


<!-- wm:2b9af6c9b691879b1ddb7a04d29a1c88 -->
<sub>Tài liệu thuộc bộ AI4BA BA-Kit — bản quyền ai4ba.com</sub>
