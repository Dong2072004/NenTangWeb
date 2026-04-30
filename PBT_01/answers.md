# Câu A1- HTTP & Browser
1. Khi gõ `https://shopee.vn` và nhấn Enter, trình duyệt thực hiện các bước sau:

1. **DNS Lookup**: Trình duyệt tìm kiếm địa chỉ IP của tên miền `shopee.vn`.
2. **Thiết lập kết nối**: Trình duyệt thực hiện bắt tay TCP/IP (và TLS cho HTTPS) để kết nối với server.
3. **Gửi Request**: Trình duyệt gửi HTTP Request đến Server của Shopee để yêu cầu nội dung trang web.
4. **Nhận Response**: Server xử lý và gửi ngược lại HTTP Response (chứa mã 200 OK và các file HTML/CSS/JS).
5. **Rendering**: Trình duyệt đọc code và hiển thị giao diện hoàn chỉnh lên màn hình.


2. Trong DevTools của Chrome, tab Network cho thấy thông tin gì? Hãy mở một trang web bất kỳ, chụp screenshot tab Network và đánh dấu (vẽ mũi tên/khoanh tròn) vào:
Status Code của request đầu tiên
Tổng thời gian load trang
Một request trả về file CSS
![ảnh](./screenshots/network_shopee.png)

---
# Câu A2- Semantic HTML
Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê ít nhất 4 lỗi semantic và sửa lại.
```html
<div class="header">
    <div class="logo">ShopTLU</div>
    <div class="menu">
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </div>
</div>
<div class="main">
    <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <div class="image"><img src="iphone.jpg"></div>
    </div>
</div>
<div class="footer">© 2026 ShopTLU</div>
```

Các lỗi chính:
-Dùng `<div>` thay cho `<header>`, `<main>`, `<footer>`: không xác định được bố cục trang

-Không dùng `<nav>` cho menu:  Google không nhận diện được điều hướng

-Không dùng thẻ heading `(<h1>, <h2>)` cho tiêu đề: giảm khả năng SEO từ khóa

-Sản phẩm không dùng `<article>`: không xác định nội dung độc lập

-Ảnh không có alt: Google không hiểu nội dung hình

→ Kết quả: Google index kém, xếp hạng thấp.
  Code sau khi sửa
```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<main>
    <article class="product">
        <h2>iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <img src="iphone.jpg" alt="iPhone 16 Pro">
    </article>
</main>
<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

---
# Câu A3- Semantic HTML
```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
``` 

![Kết quả](./image/CauA3.png)
- Thẻ `<div>` là block element: luôn chiếm 1 dòng riêng
`
- Thẻ `<span>`, `<strong>` là inline element: hiển thị cùng dòng

---
# Câu A4 - Table
1. Phân biệt `<thead>`, `<tbody>`, `<tfoot>`
    `<thead>`: chứa phần đầu bảng (tiêu đề cột)
    `<tbody>`: chứa nội dung chính của bảng
    `<tfoot>`: chứa phần cuối bảng (tổng kết, ghi chú)

2. Tại sao KHÔNG nên dùng table để tạo layout
- Lý do:
    - Không đúng ngữ nghĩa (semantic): Table dùng cho dữ liệu dạng bảng, không phải để bố cục

    - Khó bảo trì và code rối: Lồng nhiều `<table>`, `<tr>`, `<td>`: code phức tạp, khó sửa

    - Hiển thị kém linh hoạt (responsive kém): Table khó thích nghi với mobile

    - Tải trang chậm hơn

---
# Câu B3: Debug HTML
Lỗi 1: Dòng 1 – Sai cú pháp khai báo DOCTYPE – Cách sửa: Đổi thành <!DOCTYPE html>.

Lỗi 2: Dòng 3 – Thiếu thẻ đóng `</title>` – Cách sửa: Thêm `</title>` sau chữ "Trang web".

Lỗi 3: Dòng 4 – Thuộc tính charset viết sai giá trị – Cách sửa: Đổi utf8 thành utf-8.

Lỗi 4: Dòng 7 – Sai thẻ đóng `<h1>` thành `<h1>` – Cách sửa: Đổi thẻ đóng thành `</h1>`.

Lỗi 5: Dòng 11 – Sai thẻ đóng `<a>` thành `<a>` – Cách sửa: Đổi thẻ đóng thành `</a>`.

Lỗi 6: Dòng 17 – Thuộc tính src không có dấu ngoặc kép – Cách sửa: Đổi thành src="iphone.jpg".

Lỗi 7: Dòng 19 – Sai thứ tự đóng thẻ `<b> `và `<p>` – Cách sửa: Đóng theo thứ tự `<b>...</b></p>`.

Lỗi 8: Dòng 24 – Sử dụng thẻ `<td>` cho tiêu đề bảng – Cách sửa: Đổi thành thẻ `<th>` (Semantic).

Lỗi 9: Dòng 33 – Sử dụng thẻ `<main>` lần thứ hai – Cách sửa: Một trang chỉ có một thẻ `<main>`, nội dung sidebar nên dùng thẻ `<aside>`.

Lỗi 10: Dòng 37 – Thiếu thẻ đóng `</p>` và `</footer>` – Cách sửa: Thêm đầy đủ các thẻ đóng.

---
# Câu B4:
Tại `Shopee.vn`
1. Chụp screenshot tab Elements
Thẻ `<header>`: Phần đầu của trang web
![ảnh](./screenshots/header.png)
Thẻ `<nav>`: Khối liên kết điều hướng
![ảnh](./screenshots/nav.png) 
Thẻ `<footer>`: Phần cuối trang web
![ảnh](./screenshots/footer.png)
2. Thẻ `<table>`: em ko tìm thấy
3. Thẻ `<form>`
Không khai báo trực tiếp `method/action` trong HTML (xử lý qua JS), mặc định trình duyệt hiểu là `method="get"` và `action` là trang hiện tại.
input: text
![ảnh](./screenshots/form.png)
