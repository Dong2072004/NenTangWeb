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