// Random số từ 1 -> 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;
const maxAttempts = 7;

let guessedNumbers = [];

while (attempts < maxAttempts) {

    let input = prompt(
        `Lần ${attempts + 1}/${maxAttempts}\nNhập số từ 1 đến 100:`
    );

    // Kiểm tra user bấm Cancel
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    let guess = Number(input);

    // Validate input
    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        alert("Vui lòng nhập số từ 1 đến 100!");
        continue;
    }

    // Kiểm tra đoán trùng
    let duplicated = false;

    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            duplicated = true;
            break;
        }
    }

    if (duplicated) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);

    attempts++;

    // So sánh kết quả
    if (guess === randomNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        break;
    }
    else if (guess < randomNumber) {
        alert("Cao hơn!");
    }
    else {
        alert("Thấp hơn!");
    }

    // Hết lượt
    if (attempts === maxAttempts) {
        alert(
            `Bạn đã thua!\nĐáp án đúng là: ${randomNumber}`
        );
    }
}