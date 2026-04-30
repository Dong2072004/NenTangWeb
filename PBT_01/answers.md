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
-Dùng <div> thay cho <header>, <main>, <footer>: không xác định được bố cục trang
-Không dùng <nav> cho menu:  Google không nhận diện được điều hướng
-Không dùng thẻ heading (<h1>, <h2>) cho tiêu đề: giảm khả năng SEO từ khóa
-Sản phẩm không dùng <article>: không xác định nội dung độc lập
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
- Thẻ <div> là block element: luôn chiếm 1 dòng riêng
- Thẻ <span>, <strong> là inline element: hiển thị cùng dòng

---
# Câu A4 - Table
1. Phân biệt <thead>, <tbody>, <tfoot>
    <thead>: chứa phần đầu bảng (tiêu đề cột)
    <tbody>: chứa nội dung chính của bảng
    <tfoot>: chứa phần cuối bảng (tổng kết, ghi chú)
2. Tại sao KHÔNG nên dùng table để tạo layout
- Lý do:
    - Không đúng ngữ nghĩa (semantic): Table dùng cho dữ liệu dạng bảng, không phải để bố cục
    - Khó bảo trì và code rối: Lồng nhiều <table>, <tr>, <td>: code phức tạp, khó sửa
    - Hiển thị kém linh hoạt (responsive kém): Table khó thích nghi với mobile
    - Tải trang chậm hơn
