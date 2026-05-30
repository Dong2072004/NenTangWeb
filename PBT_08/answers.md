# Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

## 1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;

    return { thue, thuc_nhan };
}
```
---

## 2. Function Expression

```javascript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;

    return { thue, thuc_nhan };
};
```

---

## 3. Arrow Function

```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;

    return { thue, thuc_nhan };
};
```

---

# Hoisting khác nhau như thế nào?

## Function Declaration

Function Declaration được hoisting toàn bộ cả phần khai báo và định nghĩa hàm.

Ví dụ:

```javascript
console.log(tinhTong(2, 3));

function tinhTong(a, b) {
    return a + b;
}
```

Kết quả:

```javascript
5
```

Hàm có thể được gọi trước khi khai báo.

---

## Function Expression

Chỉ biến được hoisting, còn giá trị hàm chưa được gán.

Ví dụ:

```javascript
console.log(tinhTong(2, 3));

const tinhTong = function(a, b) {
    return a + b;
};
```

Kết quả:

```javascript
ReferenceError: Cannot access 'tinhTong' before initialization
```

Nếu dùng `var`:

```javascript
console.log(tinhTong);

var tinhTong = function(a, b) {
    return a + b;
};
```

Kết quả:

```javascript
undefined
```

Do biến được hoisting với giá trị ban đầu là `undefined`.

---

## Arrow Function

Arrow Function thường được gán cho `const` hoặc `let`, nên hành vi hoisting giống Function Expression.

Ví dụ:

```javascript
console.log(tinhTong(2, 3));

const tinhTong = (a, b) => a + b;
```

Kết quả:

```javascript
ReferenceError: Cannot access 'tinhTong' before initialization
```

---



- Kết luận

* **Function Declaration** được hoisting hoàn toàn nên có thể gọi trước khi khai báo.
* **Function Expression** và **Arrow Function** không thể gọi trước khi biến chứa hàm được khởi tạo.
* Trong JavaScript hiện đại, **Arrow Function kết hợp với `const`** thường được sử dụng nhiều vì cú pháp ngắn gọn, dễ đọc và hạn chế việc ghi đè hàm ngoài ý muốn.

# Câu A2 (5đ) — Scope & Closure

## Đoạn 1

```javascript
function counter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const c = counter();

console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());
```

### Output

```javascript
1
2
3
2
2
```

### Giải thích

Biến `count` được giữ lại nhờ **Closure**.

* `increment()` tăng `count` lên 1.
* `decrement()` giảm `count` đi 1.
* `getCount()` trả về giá trị hiện tại.

Quá trình:

```javascript
0 → 1 → 2 → 3 → 2
```

nên kết quả cuối là:

```javascript
1
2
3
2
2
```

---

## Đoạn 2

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

### Output

```javascript
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

### Giải thích

* `var` có **Function Scope**, tất cả callback dùng chung một biến `i`. Khi `setTimeout` chạy thì vòng lặp đã kết thúc và `i = 3`.
* `let` có **Block Scope**, mỗi lần lặp tạo một biến `j` riêng nên callback nhớ đúng giá trị `0`, `1`, `2`.

# Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

### 1. Lấy các số chẵn

```javascript
nums.filter(n => n % 2 === 0);
```

### 2. Nhân mỗi số với 3

```javascript
nums.map(n => n * 3);
```

### 3. Tính tổng tất cả

```javascript
nums.reduce((sum, n) => sum + n, 0);
```

### 4. Tìm số đầu tiên > 7

```javascript
nums.find(n => n > 7);
```

### 5. Kiểm tra có số > 10 không

```javascript
nums.some(n => n > 10);
```

### 6. Kiểm tra TẤT CẢ đều > 0

```javascript
nums.every(n => n > 0);
```

### 7. Tạo mảng ["Số 1 là lẻ", ...]

```javascript
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```

### 8. Đảo ngược mảng (không mutate gốc)

```javascript
[...nums].reverse();
```

# Câu A4 (5đ) — Object Destructuring & Spread

## Destructuring

```javascript
console.log(name, price, ram, color);
```

**Output:**

```javascript
iPhone 16 25990000 8 Titan
```

```javascript
console.log(specs);
```

**Output:**

```javascript
ReferenceError: specs is not defined
```

**Giải thích:** Chỉ lấy `ram` và `color` từ `specs`, không tạo biến `specs`.

---

## Spread

```javascript
console.log(updated.price);
console.log(updated.sale);
console.log(product.price);
```

**Output:**

```javascript
23990000
true
25990000
```

**Giải thích:** `updated` là object mới, thay đổi không ảnh hưởng `product`.

---

## Spread Gotcha

```javascript
console.log(product.specs.ram);
```

**Output:**

```javascript
16
```

**Giải thích:** 
Spread chỉ tạo **shallow copy**. `copy.specs` và `product.specs` cùng tham chiếu đến một object nên sửa `copy.specs.ram` cũng làm đổi `product.specs.ram`.
---

# Câu C1 (10đ) — Refactor Code

## Code sau khi refactor

```javascript
const processOrders = (orders) =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

## Giải thích

* **filter()**: Lọc các đơn hàng có `status = "completed"` và `total > 100000`.
* **destructuring**: Lấy trực tiếp `status`, `total`, `id`, `customer` từ object.
* **map()**: Tạo object mới gồm `id`, `customer`, `total`, `discount`, `finalTotal`.
* **sort()**: Sắp xếp theo `finalTotal` giảm dần.
* **arrow function**: Giúp code ngắn gọn và dễ đọc hơn.

# Câu C2 (10đ) — Thiết kế API

## Cài đặt miniArray

```javascript id="7r4hws"
const miniArray = {
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};
```

## Test

```javascript id="5r7rxs"
console.log(
    miniArray.map([1, 2, 3], x => x * 2)
);
// [2, 4, 6]

console.log(
    miniArray.filter([1, 2, 3, 4], x => x > 2)
);
// [3, 4]

console.log(
    miniArray.reduce(
        [1, 2, 3, 4],
        (a, b) => a + b,
        0
    )
);
// 10
```

## Giải thích

* **map()**: Duyệt từng phần tử, áp dụng hàm `fn` rồi đưa kết quả vào mảng mới.
* **filter()**: Duyệt mảng, chỉ giữ lại các phần tử thỏa điều kiện của `fn`.
* **reduce()**: Dùng biến tích lũy (`accumulator`) để gộp các phần tử thành một giá trị duy nhất.

### Output

```javascript id="g6ng7f"
[2, 4, 6]
[3, 4]
10
```
