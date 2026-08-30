let firstNumber = null;
let secondNumber = null;
let resultNumber = null;
let operator = null;
let stage = 1;

function generateDigits(count) {
    const result = document.getElementById("result");
    result.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const digit = Math.floor(Math.random() * 10);

        const span = document.createElement("span");
        span.textContent = digit;
        span.classList.add("digit");

        span.onclick = () => selectNumber(digit);

        result.appendChild(span);
    }

    resetCalculation();
}

function selectNumber(value) {

    if (stage === 1) {
        firstNumber = value;
        stage = 2;
    }
    else if (stage === 3) {
        secondNumber = value;
        stage = 4;
    }
    else if (stage === 5) {
        resultNumber = value;
        checkResult();
    }

    updateDisplay();
}

function selectOperator(op) {

    if (firstNumber === null) return;

    operator = op;
    stage = 3;

    updateDisplay();
}

function updateDisplay() {

    document.getElementById("selected").textContent =
        `${firstNumber ?? ""} ${operator ?? ""} ${secondNumber ?? ""}`;
}

function equalPressed() {

    if (
        firstNumber !== null &&
        secondNumber !== null
    ) {
        stage = 5;
    }
}

function checkResult() {

    let correct;

    switch (operator) {

        case "+":
            correct = firstNumber + secondNumber;
            break;

        case "-":
            correct = firstNumber - secondNumber;
            break;

        case "*":
            correct = firstNumber * secondNumber;
            break;

        case "/":
            correct = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    const message = document.getElementById("message");

    if (correct === resultNumber) {
        message.textContent =
            `✅ Správně! ${firstNumber} ${operator} ${secondNumber} = ${resultNumber}`;
        message.style.color = "green";
    } else {
        message.textContent =
            `❌ Špatně! ${firstNumber} ${operator} ${secondNumber} = ${resultNumber}`;
        message.style.color = "red";
    }

    stage = 1;
}

function resetCalculation() {
    firstNumber = null;
    secondNumber = null;
    resultNumber = null;
    operator = null;
    stage = 1;

    document.getElementById("selected").textContent = "";
    document.getElementById("message").textContent = "";
}
let vybranaCisla = [];

function vyberCislo(element) {
    element.classList.toggle("selected");

    const hodnota = element.dataset.value;

    if (element.classList.contains("selected")) {
        vybranaCisla.push(hodnota);
    } else {
        vybranaCisla = vybranaCisla.filter(x => x !== hodnota);
    }
}
