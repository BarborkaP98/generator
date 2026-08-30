function generateDigits(count) {
    let result = "";

    for (let i = 0; i < count; i++) {
        result += Math.floor(Math.random() * 10);
    }

    document.getElementById("result").textContent = result;
}
