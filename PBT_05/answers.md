# Câu A1  — Viewport & Mobile-First
1. Thẻ `<meta viewport>` chuẩn
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Giải thích:
- `width=device-width` Yêu cầu trình duyệt render chiều rộng trang web bằng đúng chiều rộng vật lý của màn hình thiết bị

- `initial-scale=1.0`: Đặt mức độ thu phóng (zoom) ban đầu là 100% khi trang vừa tải xong

2. Nếu THIẾU thẻ viewport thì iPhone sẽ hiển thị như thế nào?
- Nếu không có thẻ viewport: 
- iPhone sẽ giả lập trang web như màn hình desktop (~980px).
- Website bị thu nhỏ toàn bộ để vừa màn hình điện thoại.
- Chữ rất nhỏ.
- Người dùng phải zoom để đọc.
- Layout responsive/media query có thể hoạt động sai.

Ví dụ:
- Một website desktop mở trên iPhone sẽ nhìn như “bản thu nhỏ” của máy tính.
3. Mobile-First và Desktop-First khác nhau thế nào?
- Mobile-First
- Viết CSS cho điện thoại trước.
- Sau đó dùng min-width để mở rộng cho màn hình lớn hơn.

Ví dụ breakpoint 768px:
```html
/* Mobile trước */
.container {
    font-size: 14px;
}

/* Tablet/Desktop */
@media (min-width: 768px) {
    .container {
        font-size: 18px;
    }
}
```
Desktop-First
- Viết CSS cho desktop trước.
- Sau đó dùng max-width để chỉnh cho màn hình nhỏ hơn.

Ví dụ breakpoint 768px:
```html
/* Desktop trước */
.container {
    font-size: 18px;
}

/* Mobile */
@media (max-width: 768px) {
    .container {
        font-size: 14px;
    }
}
```
Vì sao Mobile-First được khuyên dùng?
- Điện thoại hiện là thiết bị truy cập web phổ biến nhất.
- Tối ưu hiệu năng cho màn hình nhỏ trước.
- CSS gọn và dễ mở rộng hơn.
- Responsive tự nhiên hơn với min-width.
- Google ưu tiên Mobile-First Indexing.

# Câu A2  — Breakpoints
| Breakpoint | Kích thước pixel | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|---|---|---|---|
| Extra Small (xs) | `< 576px` | Điện thoại nhỏ | 1 cột |
| Small (sm) | `≥ 576px` | Điện thoại lớn | 2 cột |
| Medium (md) | `≥ 768px` | Tablet | 2–3 cột |
| Large (lg) | `≥ 992px` | Laptop | 3–4 cột |
| Extra Large (xl) | `≥ 1200px` | Desktop lớn | 4 cột |
| Extra Extra Large (xxl) | `≥ 1400px` | Màn hình rất lớn / TV | 5–6 cột |

---
# Câu A3 — Media Queries

| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

---
# Câu A4  — SCSS Basics

## 1. Variables (Biến)

SCSS cho phép tạo biến để lưu giá trị và tái sử dụng nhiều lần.

Ví dụ:

```scss
$primary-color: blue;

button {
    background-color: $primary-color;
}
```

Ý nghĩa:
- `$primary-color` lưu màu chính.
- Khi cần đổi màu chỉ cần sửa một chỗ.

---

## 2. Nesting (CSS lồng nhau)

SCSS cho phép viết CSS theo dạng lồng nhau giống cấu trúc HTML.

Ví dụ:

```scss
.card {
    padding: 20px;

    h2 {
        color: red;
    }

    p {
        font-size: 14px;
    }
}
```

Sau khi compile thành CSS:

```css
.card {
    padding: 20px;
}

.card h2 {
    color: red;
}

.card p {
    font-size: 14px;
}
```

Ý nghĩa:
- Code gọn hơn.
- Dễ đọc và dễ quản lý.

---

## 3. Mixins (`@mixin`, `@include`)

Mixin giúp tái sử dụng nhiều đoạn CSS.

Ví dụ:

```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    @include flex-center;
}
```

Sau khi compile:

```css
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Ý nghĩa:
- Tránh lặp code.
- Viết CSS nhanh hơn.

---

## 4. `@extend` / Inheritance

Cho phép một class kế thừa style từ class khác.

Ví dụ:

```scss
.button {
    padding: 10px;
    border-radius: 5px;
}

.primary-button {
    @extend .button;
    background: blue;
}
```

Sau khi compile:

```css
.button,
.primary-button {
    padding: 10px;
    border-radius: 5px;
}

.primary-button {
    background: blue;
}
```

Ý nghĩa:
- Tái sử dụng style.
- Giảm lặp CSS.

---

## Tại sao trình duyệt KHÔNG đọc được file `.scss`?

- Trình duyệt chỉ hiểu CSS.
- `.scss` là ngôn ngữ mở rộng của CSS nên trình duyệt không thể chạy trực tiếp.

---

## Cần bước gì để chuyển SCSS → CSS?

Cần dùng SCSS Compiler để biên dịch (compile) file `.scss` thành `.css`.

Ví dụ công cụ:
- Sass
- Live Sass Compiler (VS Code)
- Webpack / Vite

Ví dụ lệnh:

```bash
sass style.scss style.css
```

Sau đó HTML sẽ liên kết tới file CSS:

```html
<link rel="stylesheet" href="style.css">
```