function createCart() {
    let items = [];
    let discount = 0;
    let fixedDiscount = 0;

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(
                item => item.id === product.id
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        removeItem(productId) {
            items = items.filter(
                item => item.id !== productId
            );
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(
                item => item.id === productId
            );

            if (item) {
                item.quantity = newQuantity;
            }
        },

        getTotal() {
            const total = items.reduce(
                (sum, item) =>
                    sum +
                    item.price * item.quantity,
                0
            );

            return total * (1 - discount) - fixedDiscount;
        },

        applyDiscount(code) {
            discount = 0;
            fixedDiscount = 0;

            switch (code) {
                case "SALE10":
                    discount = 0.1;
                    break;

                case "SALE20":
                    discount = 0.2;
                    break;

                case "FREESHIP":
                    fixedDiscount = 30000;
                    break;
            }
        },

        printCart() {
            console.table(
                items.map(item => ({
                    "Sản phẩm": item.name,
                    "SL": item.quantity,
                    "Đơn giá":
                        item.price.toLocaleString("vi-VN") +
                        "đ",
                    "Tổng":
                        (
                            item.price *
                            item.quantity
                        ).toLocaleString("vi-VN") + "đ"
                }))
            );

            console.log(
                "Tổng cộng:",
                this.getTotal().toLocaleString(
                    "vi-VN"
                ) + "đ"
            );
        },

        getItemCount() {
            return items.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );
        },

        clearCart() {
            items = [];
            discount = 0;
            fixedDiscount = 0;
        }
    };
}

// ===== TEST =====

const cart = createCart();

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.addItem(
    { id: 3, name: "AirPods Pro", price: 6990000 },
    2
);

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);

console.log(
    "Sau xóa:",
    cart.getItemCount()
);

