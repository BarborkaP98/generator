let vyraz = "";

function generuj(pocet) {

    const kontejner = document.getElementById("cisla");

    kontejner.innerHTML = "";
    vyraz = "";

    aktualizujVyraz();

    document.getElementById("vysledek").textContent = "";

    for (let i = 0; i < pocet; i++) {

        const cislo = Math.floor(Math.random() * 10);

        const prvek = document.createElement("span");

        prvek.className = "cislo";
        prvek.textContent = cislo;

        prvek.onclick = function () {

            prvek.classList.add("selected");

            vyraz += cislo;

            aktualizujVyraz();
        };

        kontejner.appendChild(prvek);
    }
}

function pridejOperator(op) {

    if (vyraz.length === 0) return;

    vyraz += op;

    aktualizujVyraz();
}

function aktualizujVyraz() {

    document.getElementById("vyraz").textContent = vyraz;
}

function vymazat() {

    vyraz = "";

    document.getElementById("vyraz").textContent = "";

    document.getElementById("vysledek").textContent = "";

    document.querySelectorAll(".cislo").forEach(prvek => {
        prvek.classList.remove("selected");
    });
}

function zkontroluj() {

    const vysledekDiv = document.getElementById("vysledek");

    if (!vyraz.includes("=")) {
        vysledekDiv.innerHTML = "<span style='color:red'>Chybí '='</span>";
        return;
    }

    const casti = vyraz.split("=");

    if (casti.length !== 2) {
        vysledekDiv.innerHTML = "<span style='color:red'>Neplatný výraz</span>";
        return;
    }

    const leva = casti[0];
    const prava = Number(casti[1]);

    let operator = null;

    if (leva.includes("+")) operator = "+";
    if (leva.includes("-")) operator = "-";
    if (leva.includes("×")) operator = "×";
    if (leva.includes(":")) operator = ":";

    if (!operator) {
        vysledekDiv.innerHTML = "<span style='color:red'>Chybí operátor</span>";
        return;
    }

    const hodnoty = leva.split(operator);

    if (hodnoty.length !== 2) {
        vysledekDiv.innerHTML = "<span style='color:red'>Neplatný výraz</span>";
        return;
    }

    const a = Number(hodnoty[0]);
    const b = Number(hodnoty[1]);

    let spravne;

    switch (operator) {

        case "+":
            spravne = a + b;
            break;

        case "-":
            spravne = a - b;
            break;

        case "×":
            spravne = a * b;
            break;

        case ":":
            spravne = a / b;
            break;
    }

    if (spravne === prava) {

        vysledekDiv.innerHTML =
            "<span style='color:green'>✅ Správně</span>";

    } else {

        vysledekDiv.innerHTML =
            "<span style='color:red'>❌ Špatně</span>";
    }
}

window.onload = function () {
    generuj(10);
};
