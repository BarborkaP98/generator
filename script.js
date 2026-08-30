let firstNumber = null;
let secondNumber = null;
let resultNumber = null;
let operator = null;

let stage = "first";
let currentDigits = [];
let selectedIndexes = [];

function generateDigits(count) {

    const result = document.getElementById("result");
    result.innerHTML = "";

    for (let i = 0; i < count; i++) {

        const digit = Math.floor(Math.random() * 10);

        const span = document.createElement("span");

        span.textContent = digit;
        span.className = "digit";
        span.dataset.index = i;

        span.addEventListener("click", function () {
            selectDigit(span, digit);
        });

        result.appendChild(span);
    }

    resetCalculation();
}

function selectDigit(element, digit) {

    const index = Number(element.dataset.index);

    if (selectedIndexes.length > 0) {

        const lastIndex =
            selectedIndexes[selectedIndexes.length - 1];

        if (Math.abs(index - lastIndex) !== 1) {

            alert("Můžeš vybírat pouze sousední číslice.");

            return;
        }
    }

    selectedIndexes.push(index);
    currentDigits.push(digit);

    element.classList.add("selected-digit");

    updateCurrentNumber();
}
function updateCurrentNumber() {

    document.getElementById("currentNumber").textContent =
        currentDigits.join("");
}

function confirmNumber() {

    if (currentDigits.length === 0) return;

    const value = Number(currentDigits.join(""));

    if (stage === "first") {

        firstNumber = value;
        stage = "operator";

    } else if (stage === "second") {

        secondNumber = value;
        stage = "equals";

    } else if (stage === "result") {

        resultNumber = value;
        checkResult();
        return;
    }

    currentDigits = [];

    document.getElementById("currentNumber").textContent = "";

    clearSelectedDigits();

    updateDisplay();
}

function clearSelectedDigits() {

    document.querySelectorAll(".digit").forEach(d => {
        d.classList.remove("selected-digit");
    });
}

function selectOperator(op) {

    if (stage !== "operator") return;

    operator = op;

    stage = "second";

    updateDisplay();
}

function equalPressed() {

    if (stage === "equals") {
        stage = "result";
    }
}

function updateDisplay() {

    document.getElementById("selected").textContent =
        ${firstNumber ?? ""} ${operator ?? ""} ${secondNumber ?? ""};
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
            correct = firstNumb*r * secondNumber;
            brea*;

        case "/":
            c*rrect = firstNumber / secondNumber*
            break;

        defau*t:
            return;
    }

    const message = document.getElementById("message");

    if (correct === resultNumber) {

        message.textContent =
            `✅ Správně! ${firstNumber} ${operator} ${secondNumber} = ${resultNumber}`;

        message.style.color = "green";

    } else {

        message.textContent =
            `❌ Špatně! ${firstNumber} ${operator} ${secondNumber} = ${resultNumber}. Správně je ${correct}`;

        message.style.color = "red";
    }
}

function resetCalculation() {

    firstNumber = null;
    secondNumber = null;
    resultNumber = null;
    operator = null;

    currentDigits = [];
    selectedIndexes = [];

    stage = "first";

    document.getElementById("selected").textContent = "";
    document.getElementById("message").textContent = "";
    document.getElementById("currentNumber").textContent = "";
}
