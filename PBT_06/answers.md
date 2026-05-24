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