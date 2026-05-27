# Câu A1 (5đ) — var / let / const
- Đoạn 1: in ra undefined vì var được hoisting.

- Đoạn 2: báo ReferenceError vì let không được dùng trước khi khai báo.

- Đoạn 3: báo TypeError vì const không thể gán lại giá trị.

- Đoạn 4: in ra [1, 2, 3, 4] vì const vẫn cho phép thay đổi nội dung array.

- Đoạn 5:
```
Trong block: 2
Ngoài block: 1
```

vì let có phạm vi block scope.
---
# Câu A2 (5đ) — Data Types & Coercion
1. Dự đoán kết quả:
- `console.log(typeof null);`        // "object"
- `console.log(typeof undefined);`   // "undefined"
- `console.log(typeof NaN);`         // "number"

- `console.log("5" + 3);`            // "53"
- `console.log("5" - 3);`            // 2
- `console.log("5" * "3");`          // 15

- `console.log(true + true);`        // 2

- `console.log([] + []);`            // ""
- `console.log([] + {});`            // "[object Object]"
- `console.log({} + []);`            // 0

2. Giải thích sự khác biệt giữa "5" + 3 và "5" - 3:
- Biểu thức "5" + 3 cho kết quả "53" vì toán tử + gặp chuỗi sẽ ưu tiên nối chuỗi, nên số 3 được ép thành string "3". 
- Ngược lại, "5" - 3 cho kết quả 2 vì toán tử - chỉ dùng cho phép toán số học nên JavaScript tự ép "5" thành số 5 để thực hiện phép trừ. "5" * "3" cũng tương tự nên cho kết quả 15 

---
# Câu A3 (5đ) — So sánh == vs ===
1. Dự đoán: 
- `console.log(5 == 5);`         // true
- `console.log(5 === "5");`         // false

- `console.log(null == undefined);` // true
- `console.log(null === undefined);`// false

- `console.log(NaN == NaN); `       // false

- `console.log(0 == false); `       // true
- `console.log(0 === false); `      // false

- `console.log("" == false);`       // true

2. Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?
- Từ giờ trở đi nên ưu tiên dùng === vì đây là phép so sánh nghiêm ngặt, vừa so sánh giá trị vừa so sánh kiểu dữ liệu nên kết quả rõ ràng và dễ kiểm soát hơn. Trong khi đó == có cơ chế tự động ép kiểu nên đôi khi cho ra các kết quả khó hiểu như 0 == false hoặc "" == false đều là true. Việc dùng === giúp tránh lỗi logic, code dễ đọc và an toàn hơn khi làm dự án thực tế.
---
# Câu A4 (5đ) — Truthy & Falsy
1. Các giá trị Falsy trong JavaScript gồm:
- false
- 0
- -0
- 0n (BigInt zero)
- "" (chuỗi rỗng)
- null
- undefined
- NaN (Mọi giá trị khác không nằm trong danh sách này đều là Truthy).
2. Dự đoán
- `if ("0") console.log("A");`   // In
- `if ("") console.log("B");`    // Không in
- `if ([]) console.log("C");`    // In
- `if ({}) console.log("D");`    // In
- `if (null) console.log("E");`  // Không in
- `if (0) console.log("F");`     // Không in
- `if (-1) console.log("G");`    // In
- `if (" ") console.log("H");`   // In

Giải thích:

- "0" là chuỗi có ký tự nên là Truthy.
- "" là chuỗi rỗng nên là Falsy.
- [] và {} dù rỗng vẫn là object nên là Truthy.
- null là Falsy.
- 0 là Falsy.
- -1 là số khác 0 nên là Truthy.
- " " chứa dấu cách nên không phải chuỗi rỗng, vì vậy là Truthy.

# Câu A5 (5đ) — Template Literals
```js
// Cách 1
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```


----
# Câu C1
- Sai toán tử so sánh: if (giaSauGiam = 0) dùng toán tử gán = thay vì so sánh. Sửa thành: if (giaSauGiam === 0).

- Sai kiểu dữ liệu đầu vào: tinhGiaGiamGia("100000", 20) truyền chuỗi thay vì số. Sửa thành: tinhGiaGiamGia(100000, 20).

- Thiếu kiểm tra dữ liệu đầu vào: Hàm chưa kiểm tra giaBan và phanTramGiam có phải number hay không. Cần thêm điều kiện validate.

- Xử lý lỗi chưa tốt: Hàm trả về chuỗi lỗi làm dữ liệu trả về không đồng nhất. Có thể dùng throw new Error().

- Khai báo biến chưa phù hợp: Dùng var là cách cũ, nên đổi sang let hoặc const.

- Lỗi “ẩn” của var trong vòng lặp: var có function scope nên tất cả setTimeout() dùng chung biến i, kết quả in ra Item 5 5 lần. Sửa bằng let vì let có block scope nên mỗi vòng lặp có biến i riêng.

Code sau khi sửa:
```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {

    // Kiểm tra kiểu dữ liệu
    if (
        typeof giaBan !== "number" ||
        typeof phanTramGiam !== "number"
    ) {
        return "Dữ liệu không hợp lệ";
    }

    // Kiểm tra phần trăm giảm
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    // Tính giảm giá
    let giamGia = giaBan * phanTramGiam / 100;

    let giaSauGiam = giaBan - giamGia;

    // Kiểm tra miễn phí
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}


// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log(`Giá sau giảm: ${gia}đ`);

const gia2 = tinhGiaGiamGia(50000, 110);
console.log(`Giá: ${gia2}`);


// Sửa var -> let
for (let i = 0; i < 5; i++) {

    setTimeout(function () {
        console.log("Item " + i);
    }, 1000);

}
```