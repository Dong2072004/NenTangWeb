# Câu A1 (5đ) — DOM Tree

## 1. DOM Tree

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
```

---

## 2. Query Selector

### a. Chọn thẻ `<h1>`

```javascript
document.querySelector("h1");
```

---

### b. Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

---

### c. Chọn tất cả `.todo-item`

```javascript
document.querySelectorAll(".todo-item");
```

---

### d. Chọn link đang active

```javascript
document.querySelector("a.active");
```

---

### e. Chọn `<li>` đầu tiên trong `#todoList`

```javascript
document.querySelector("#todoList li:first-child");
```

---

### f. Chọn tất cả `<a>` bên trong `<nav>`

```javascript
document.querySelectorAll("nav a");
```

# Câu A2 (5đ) — innerHTML vs textContent

## 1. Sự khác nhau giữa innerHTML và textContent

| innerHTML | textContent |
|------------|------------|
| Đọc hoặc ghi nội dung dưới dạng HTML | Đọc hoặc ghi nội dung dưới dạng văn bản thuần (text) |
| Các thẻ HTML sẽ được trình duyệt phân tích và render | Các thẻ HTML được hiển thị như văn bản |
| Có thể chèn HTML động | Không thể chèn HTML |
| Có nguy cơ gây XSS nếu dữ liệu đến từ người dùng | An toàn hơn vì không thực thi HTML/JavaScript |

---

## 2. Ví dụ sử dụng

### Dùng innerHTML

Khi muốn chèn thêm HTML vào trang:

```javascript
document.querySelector("#message").innerHTML =
    "<strong>Đăng nhập thành công!</strong>";
```

Kết quả hiển thị:

**Đăng nhập thành công!**

---

### Dùng textContent

Khi chỉ muốn hiển thị văn bản:

```javascript
document.querySelector("#message").textContent =
    "<strong>Đăng nhập thành công!</strong>";
```

Kết quả hiển thị:

```text
<strong>Đăng nhập thành công!</strong>
```

---

## 3. Tại sao innerHTML có thể gây lỗ hổng XSS?

XSS (Cross-Site Scripting) xảy ra khi dữ liệu do người dùng nhập được chèn trực tiếp vào trang web dưới dạng HTML.

Vì `innerHTML` sẽ phân tích và thực thi các thẻ HTML nên kẻ tấn công có thể chèn mã JavaScript độc hại.

---

## 4. Ví dụ mã nguy hiểm

Người dùng nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

Code:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Trình duyệt sẽ hiểu đây là một thẻ `<img>`.

Do ảnh không tồn tại (`src=x`), sự kiện `onerror` được kích hoạt:

```javascript
alert("Hacked!");
```

=> Đây là một cuộc tấn công XSS.

---

## 5. Cách sửa an toàn

Sử dụng `textContent` thay vì `innerHTML`:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Kết quả:

```text
<img src=x onerror="alert('Hacked!')">
```

Chuỗi trên chỉ được hiển thị như văn bản, không được thực thi.

---
# Câu A3 (5đ) — Event Bubbling

Khi click vào button, sự kiện sẽ bubble từ phần tử con lên phần tử cha.

## Không dùng `stopPropagation()`

Output:

```text
BUTTON
INNER
OUTER
```

Giải thích:
- Click vào `button` → chạy event của button.
- Sau đó bubble lên `inner`.
- Cuối cùng bubble lên `outer`.

## Có dùng `stopPropagation()`

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
```

Output:

```text
BUTTON
```

Giải thích:
`stopPropagation()` chặn sự kiện lan truyền lên các phần tử cha nên chỉ chạy event của button.