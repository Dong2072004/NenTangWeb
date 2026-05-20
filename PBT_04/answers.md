# Câu A1 — 5 Loại Positioning
|Position | Chiếm chỗ? | Tham chiếu vị trí | Cuốn theo trang? |	Use case|
|static |Có	| Không dùng top/left |	Có| Mặc định|
|relative | Có | Chính nó |	Có |	Dịch nhẹ, làm mốc cho absolute|
|absolute | Không | Cha relative gần nhất |	Có | Badge, dropdown, tooltip|
|fixed | Không | Viewport | Không | Chat button, modal overlay|
|sticky | Ban đầu có nhưng đến cuối thì không | Viewport (khi dính) | 1 phần: Cuộn đến ngưỡng thì dính | Sticky header, sidebar|

- Câu hỏi thêm: Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu `parent`? Giải thích khái niệm "nearest positioned ancestor".

  Nearest Positioned Ancestor: Là phần tử bọc ngoài gần nhất (cha, ông, cố...) có thuộc tính `position` mang giá trị khác với `static` (như `relative`, `absolute`, `fixefixe`, `sticky`). Nó được dùng làm mốc tọa độ (0,0) để định vị phần tử con.

  Tham chiếu `parent`: Khi phần tử cha trực tiếp được thiết lập `position` khác `static` (thường dùng nhất là `position: relative;`).

  Tham chiếu `body`: Khi tất cả các phần tử tổ tiên bọc ngoài nó đều không được định vị (đều giữ `position: static` mặc định), phần tử absolute sẽ tìm ngược lên cho đến khi lấy khung tài liệu ngoài cùng (`body` / `html`) làm điểm tựa.

- Tài liệu tham chiếu: tuan_2_css_core/12_css_positioning.md
----
# Câu A2 — Flexbox vs Grid
- Trường hợp 1
```html
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */
```
* `.container` có `display: flex` mặc định sắp xếp các phần tử theo hàng ngang (`flex-direction: row`).
* Cả 4 items đều có `flex: 1` (viết tắt của `flex-grow: 1`), nghĩa là chúng sẽ tự động co giãn và chia đều khoảng trống để có kích thước bằng nhau 100%.
```text
+-------------------------------------------------------+
| [ Item 1 ] | [ Item 2 ] | [ Item 3 ] | [ Item 4 ]     |
+-------------------------------------------------------+
```
- Trường hợp 2
```html
/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? (mấy hàng, mấy cột?) */
```
* Mỗi item chiếm `width: 45%` + `margin: 2.5%` cho cả bên trái và phải -> Tổng không gian một item chiếm theo chiều ngang là 45% + 2.5% + 2.5% = 50%.
* Vì có `flex-wrap: wrap`, khi tổng chiều ngang vượt quá 100%, các item tiếp theo sẽ tự động nhảy xuống hàng mới.
* Mỗi hàng chứa vừa khít đúng 2 items (50% x 2 = 100). Với 6 items, chúng ta sẽ có chính xác 3 hàng, mỗi hàng 2 cột.
```text
+-------------------------------------------------------+
|  +------------+             +------------+            |
|  |   Item 1   |             |   Item 2   |            |
|  +------------+             +------------+            |
|  +------------+             +------------+            |
|  |   Item 3   |             |   Item 4   |            |
|  +------------+             +------------+            |
|  +------------+             +------------+            |
|  |   Item 5   |             |   Item 6   |            |
|  +------------+             +------------+            |
+-------------------------------------------------------+
```
- Trường hợp 3
```html 
/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */

```
* `justify-content: space-between` đẩy item đầu tiên sát lề trái, item cuối cùng sát lề phải, và item ở giữa nằm chính xác ở trung tâm của khoảng trống còn lại.

* `align-items: center` căn chỉnh cả 3 items nằm chính giữa theo chiều dọc của container.

* Đây là bố cục kinh điển của các thanh Header/Navbar.
```text
+-------------------------------------------------------+
|                                                       |
| [Item 1]               [Item 2]               [Item 3]|
|                                                       |
+-------------------------------------------------------+
```
- Trường hợp 4
``` html
/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */
```
* `grid-template-columns: 200px 1fr 200px` chia container thành 3 cột riêng biệt.

* Cột 1 và cột 3 có độ rộng cố định là `200px`. Cột 2 (ở giữa) sử dụng `1fr` nên sẽ tự động giãn ra chiếm toàn bộ không gian còn lại.

* Giữa các cột có một khoảng cách  `gap: 20px`. Với 3 items, layout sẽ nằm trọn vẹn trên 1 hàng.

```text
+-------------------------------------------------------+
| <-200px-> | <- - - - - - -  1fr  - - - - - - -> | <-200px-> |
| +-------+   +---------------------------------+   +-------+ |
| |Item 1 |   |             Item 2              |   |Item 3 | |
| +-------+   +---------------------------------+   +-------+ |
+-------------------------------------------------------+
```
- Trường hợp 5
```html
/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */
```
* `grid-template-columns: repeat(3, 1fr)` tạo ra cấu trúc lưới luôn có đúng 3 cột bằng nhau.

* Giữa các ô có khoảng cách `gap: 10px`.

```text
+-------------------------------------------------------+
| +--------------+   +--------------+   +--------------+ |
| |    Item 1    |   |    Item 2    |   |    Item 3    | |
| +--------------+   +--------------+   +--------------+ |
| +--------------+   +--------------+   +--------------+ |
| |    Item 4    |   |    Item 5    |   |    Item 6    | |
| +--------------+   +--------------+   +--------------+ |
| +--------------+                                       |
| |    Item 7    |                                       |
| +--------------+                                       |
+-------------------------------------------------------+
```
