# PHẦN A — ĐỌC HIỂU (20 điểm)

# Câu A1 (10đ) — Grid System

Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

---

## Bảng đáp án

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|---|---|---|---|
| **Số cột** | 1 cột | 2 cột | 4 cột |
| **Box layout** | Box 1 ↓ Box 2 ↓ Box 3 ↓ Box 4 | Box 1 \| Box 2 <br> Box 3 \| Box 4 | Box 1 \| Box 2 \| Box 3 \| Box 4 |

---

# Giải thích

Code:

```html
<div class="col-12 col-md-6 col-lg-3">
```

- `col-12`
  → chiếm toàn bộ 12 cột  
  → mỗi box xuống 1 hàng.

- `col-md-6`
  → từ breakpoint `md` (≥768px), box chiếm 6/12 cột  
  → 1 hàng chứa được 2 box.

- `col-lg-3`
  → từ breakpoint `lg` (≥992px), box chiếm 3/12 cột  
  → 1 hàng chứa được 4 box.

---

# Wireframe minh hoạ

## `< 768px`

```text
[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]
```

---

## `768px - 991px`

```text
[ Box 1 ] [ Box 2 ]
[ Box 3 ] [ Box 4 ]
```

---

## `≥ 992px`

```text
[ Box 1 ][ Box 2 ][ Box 3 ][ Box 4 ]
```

---

# Câu hỏi thêm

## `col-md-6` nghĩa là gì?

- `md` = medium screen (màn hình trung bình, ≥768px)
- `6` = chiếm 6/12 cột của Grid System Bootstrap.

→ Tức là mỗi box chiếm **50% chiều rộng**.

---

## Tại sao không cần viết `col-sm-12`?

Vì Bootstrap dùng kiểu **mobile-first**.

Khi đã viết:

```html
col-12
```

thì mặc định áp dụng cho mọi kích thước nhỏ hơn `md`.

Nên:

```html
col-sm-12
```

là dư thừa vì `col-12` đã bao phủ màn hình nhỏ rồi.

# Câu A2 (10đ) — Utilities & Components

## 1. Giải thích class `d-none d-md-block`

```html
<div class="d-none d-md-block">
```

- `d-none`
  → ẩn element (`display: none`)

- `d-md-block`
  → từ màn hình `md` trở lên (≥768px), element hiển thị dạng `block`

---

## Element hiển thị khi nào? Ẩn khi nào?

| Kích thước màn hình | Trạng thái |
|---|---|
| `< 768px` | Ẩn |
| `≥ 768px` | Hiển thị |

---

# 2. Liệt kê 5 spacing utilities và giải thích

## `mt-3`

- `m` = margin
- `t` = top
- `3` = mức spacing 3

→ Tạo khoảng cách phía trên element.

---

## `mb-auto`

- `m` = margin
- `b` = bottom
- `auto` = tự động

→ Margin-bottom tự động.

---

## `px-4`

- `p` = padding
- `x` = left + right
- `4` = mức spacing 4

→ Tạo padding trái và phải.

---

## `py-2`

- `p` = padding
- `y` = top + bottom
- `2` = mức spacing 2

→ Tạo padding trên và dưới.

---

## `ms-5`

- `m` = margin
- `s` = start (trái trong LTR)
- `5` = mức spacing 5

→ Tạo margin bên trái.

---

# Công thức spacing utilities

```text
{property}{side}-{size}
```

## Property

- `m` = margin
- `p` = padding

## Side

- `t` = top
- `b` = bottom
- `s` = start
- `e` = end
- `x` = left + right
- `y` = top + bottom

## Size

- `0 → 5`
- `auto`

---

# 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

| Class | Đặc điểm |
|---|---|
| `.container` | Có chiều rộng cố định theo từng breakpoint, căn giữa |
| `.container-fluid` | Luôn chiếm 100% chiều rộng màn hình |
| `.container-md` | 100% chiều rộng ở màn hình nhỏ, từ `md` trở lên mới có max-width cố định |

---

# Ví dụ

## `.container`

```html
<div class="container">
```

- Responsive theo breakpoint.
- Có khoảng trắng hai bên.

---

## `.container-fluid`

```html
<div class="container-fluid">
```

- Full width toàn màn hình.

---

## `.container-md`

```html
<div class="container-md">
```

- `<768px` → full width
- `≥768px` → giống `.container`

# PHẦN C — PHÂN TÍCH (20 điểm)

# Câu C1 (10đ) — Tùy biến Bootstrap

## 1. Đổi màu `$primary` từ mặc định sang `#E63946`

### Quy trình thực hiện

Bootstrap dùng SASS variables để quản lý màu sắc.

Để đổi màu `$primary`, cần:

1. Cài Node.js
2. Cài Bootstrap bằng npm
3. Tạo file SCSS riêng
4. Override biến `$primary`
5. Compile SCSS thành CSS

---

# Vì sao phải dùng SASS variables?

Bootstrap xây dựng toàn bộ theme dựa trên variables.

Ví dụ:

```scss
$primary
$success
$danger
$warning
```

Khi đổi variable:

- toàn bộ hệ thống đổi đồng bộ
- dễ maintain
- responsive tốt
- không bị xung đột CSS

---

# 2. Tại sao KHÔNG nên override trực tiếp?

KHÔNG nên viết:

```css
.btn-primary{
    background: red;
}
```

---

# Lý do

## 1. Chỉ đổi được 1 component

Ví dụ trên chỉ đổi:

- `.btn-primary`

Nhưng không đổi:

- `.bg-primary`
- `.text-primary`
- `.alert-primary`
- `.border-primary`

→ giao diện không đồng bộ.

---

## 2. Dễ bị Bootstrap ghi đè

Khi update Bootstrap hoặc load CSS sai thứ tự:

```html
bootstrap.css
custom.css
```

có thể bị conflict.

---

## 3. Khó maintain

Project lớn có nhiều file CSS:

- khó quản lý
- khó debug
- dễ lặp code

---

## 4. Không tận dụng hệ thống theme của Bootstrap

Bootstrap đã hỗ trợ:

- variables
- mixins
- utilities
- responsive classes

Override trực tiếp sẽ phá cấu trúc framework.

---

# Kết luận

NÊN:

```scss
$primary: #E63946;
```

KHÔNG NÊN:

```css
.btn-primary{
    background:red;
}
```

vì SASS variables:

- đồng bộ toàn hệ thống
- dễ maintain
- đúng cách Bootstrap khuyến nghị

---

# Câu C2 (10đ) — So sánh

## CSS thuần vs Bootstrap

Yêu cầu:
- Navbar responsive
- Product card

---

# 1. Số dòng CSS cần viết

| CSS thuần | Bootstrap |
|---|---|
| Nhiều hơn | Ít hơn |
| Phải tự viết layout, media query | Dùng class có sẵn |
| ~200-300 dòng CSS | Có thể gần như không cần CSS |

---

# 2. Thời gian phát triển

| CSS thuần | Bootstrap |
|---|---|
| Chậm hơn | Nhanh hơn |
| Phải tự responsive | Có grid system sẵn |
| Tự viết component | Có card/navbar/modal sẵn |

Bootstrap giúp làm UI nhanh hơn rất nhiều.

---

# 3. Khả năng tùy biến

| CSS thuần | Bootstrap |
|---|---|
| Tùy biến tối đa | Bị giới hạn theo framework |
| Chủ động toàn bộ design | Theo cấu trúc Bootstrap |
| Dễ tạo UI độc đáo | Dễ bị giống template |

---

# 4. Khi nào NÊN dùng Bootstrap?

## NÊN dùng khi:

- Làm nhanh
- Deadline ngắn
- Admin dashboard
- CRUD system
- Prototype
- Website doanh nghiệp đơn giản
- Team frontend nhỏ

---

# 5. Khi nào KHÔNG NÊN dùng Bootstrap?

## KHÔNG nên dùng khi:

- UI/UX custom phức tạp
- Cần animation đặc biệt
- Website cần design độc quyền
- Muốn tối ưu performance tối đa
- Hệ thống design riêng lớn

Ví dụ:

- game UI
- website creative
- landing page cao cấp
- product design system lớn

---

# Kết luận

| Bootstrap | CSS thuần |
|---|---|
| Nhanh | Linh hoạt |
| Code ít | Kiểm soát tốt |
| Responsive sẵn | Tự xây dựng |
| Phù hợp project vừa và nhỏ | Phù hợp custom UI lớn |

Bootstrap phù hợp để phát triển nhanh và responsive tốt.

CSS thuần phù hợp khi cần kiểm soát giao diện chi tiết và tùy biến cao.


# TRACK B — TAILWINDCSS
# Câu A1 (10đ) — Utility Classes

## Giải thích các class TailwindCSS

- `flex` → `display: flex`
- `items-center` → `align-items: center`
- `justify-between` → `justify-content: space-between`
- `p-4` → `padding: 1rem (16px)`
- `bg-white` → nền màu trắng
- `shadow-md` → đổ bóng mức medium
- `rounded-lg` → bo góc lớn
- `hover:shadow-xl` → hover thì bóng lớn hơn
- `transition-shadow` → hiệu ứng chuyển đổi shadow
- `duration-300` → thời gian animation 300ms

---

## Image classes

- `w-16` → width: 4rem (64px)
- `h-16` → height: 4rem (64px)
- `rounded-full` → ảnh hình tròn
- `object-cover` → ảnh tự crop để vừa khung

---

## Text container

- `ml-4` → margin-left: 1rem
- `flex-1` → chiếm toàn bộ khoảng trống còn lại

---

## Text classes

- `text-lg` → font-size lớn
- `font-semibold` → font-weight: 600
- `text-gray-800` → chữ xám đậm
- `truncate` → cắt text bằng dấu `...`

- `text-sm` → font-size nhỏ
- `text-gray-500` → chữ xám nhạt

---

## Button classes

- `px-4` → padding trái phải 1rem
- `py-2` → padding trên dưới 0.5rem
- `bg-blue-500` → nền xanh
- `text-white` → chữ trắng
- `rounded-md` → bo góc vừa
- `hover:bg-blue-600` → hover đổi xanh đậm hơn
- `focus:ring-2` → hiện viền focus 2px
- `focus:ring-blue-300` → viền focus màu xanh nhạt