
function generateAbaku() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const result = a + b;

    return `${a}${b}${result}`;
}

console.log(generateAbaku());
