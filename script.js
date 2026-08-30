function generateDigits(count) {
    let numbers = [];

    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }

    document.getElementById("result").textContent = numbers.join(" ");
}
