// restaurant_bill.js

const foods = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

const isWednesday = true; // Thứ 4?
const hasTip = true;

// Tính tổng
let total = 0;

for (let i = 0; i < foods.length; i++) {
    total += foods[i].price * foods[i].quantity;
}

// Giảm giá
let discountPercent = 0;

if (total > 1000000) {
    discountPercent = 15;
}
else if (total > 500000) {
    discountPercent = 10;
}

// Giảm thêm thứ 4
if (isWednesday) {
    discountPercent += 5;
}

let discount = total * discountPercent / 100;

let afterDiscount = total - discount;

// VAT
let vat = afterDiscount * 0.08;

// Tip
let tip = 0;

if (hasTip) {
    tip = afterDiscount * 0.05;
}

// Thanh toán
let finalTotal = afterDiscount + vat + tip;


// ===================
// In hóa đơn
// ===================

console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG            ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < foods.length; i++) {

    let item = foods[i];

    let itemTotal = item.price * item.quantity;

    console.log(
        `║ ${i + 1}. ${item.name.padEnd(10)} x${item.quantity} @${item.price / 1000}k = ${itemTotal / 1000}k ║`
    );
}

console.log("╠══════════════════════════════════════╣");

console.log(
    `║ Tổng cộng:        ${total.toLocaleString()}đ ║`
);

console.log(
    `║ Giảm giá (${discountPercent}%):   ${discount.toLocaleString()}đ ║`
);

console.log(
    `║ VAT (8%):          ${vat.toLocaleString()}đ ║`
);

console.log(
    `║ Tip (5%):          ${tip.toLocaleString()}đ ║`
);

console.log("╠══════════════════════════════════════╣");

console.log(
    `║ THANH TOÁN:      ${finalTotal.toLocaleString()}đ ║`
);

console.log("╚══════════════════════════════════════╝");