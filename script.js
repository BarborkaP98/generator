let vyraz = "";

function generuj(pocet) {

    const kontejner = document.getElementById("cisla");
    const vysledekDiv = document.getElementById("vysledek");

    kontejner.innerHTML = "";
    vyraz = "";

    aktualizujVyraz();
    const historie = document.getElementById("historie");

    if (historie) {
    historie.innerHTML = "";
}
    if (vysledekDiv) {
        vysledekDiv.textContent = "";
        vysledekDiv.style.color = "";
    }

    for (let i = 0; i < pocet; i++) {

        const cislo = Math.floor(Math.random() * 10);

        const prvek = document.createElement("span");
        prvek.className = "cislo";
        prvek.textContent = cislo;

        prvek.addEventListener("click", function () {

            prvek.classList.add("selected");

            vyraz += cislo;

            aktualizujVyraz();

        });

        kontejner.appendChild(prvek);
    }
}

function pridejOperator(operator) {

    if (vyraz === "") {
        return;
    }

    const posledni = vyraz.slice(-1);

    if (
        posledni === "+" ||
        posledni === "-" ||
        posledni === "·" ||
        posledni === ":" ||
        posledni === "="
    ) {
        return;
    }

    vyraz += operator;

    aktualizujVyraz();
}

function aktualizujVyraz() {

    const pole = document.getElementById("vyraz");

    if (pole) {
        pole.textContent = vyraz;
    }
}

function vymazat() {

    vyraz = "";

    document.querySelectorAll(".cislo").forEach(function (prvek) {
        prvek.classList.remove("selected");
    });

    aktualizujVyraz();

    const vysledekDiv = document.getElementById("vysledek");

    if (vysledekDiv) {
        vysledekDiv.textContent = "";
        vysledekDiv.style.color = "";
    }
}

function zkontroluj() {

    const vysledekDiv = document.getElementById("vysledek");

    if (!vysledekDiv) {
        return;
    }

    if (!vyraz.includes("=")) {
        vysledekDiv.style.color = "red";
        vysledekDiv.textContent = "Chybi znak =";
        return;
    }

    const casti = vyraz.split("=");

    if (casti.length !== 2) {
        vysledekDiv.style.color = "red";
        vysledekDiv.textContent = "Neplatny vyraz";
        return;
    }

    let leva = casti[0].trim();
    let prava = casti[1].trim();

    if (prava === "") {
        vysledekDiv.style.color = "red";
        vysledekDiv.textContent = "Chybi vysledek";
        return;
    }

    try {

        leva = leva.replaceAll("·", "*");
        leva = leva.replaceAll(":", "/");

        const levaStrana = Function(
            "return (" + leva + ");"
        )();

        const pravaStrana = Number(prava);

if (levaStrana === pravaStrana) {

    vysledekDiv.style.color = "green";
    vysledekDiv.textContent = "Správně";

    const historie = document.getElementById("historie");
if (historie) {
    const novyZaznam = document.createElement("div");
    novyZaznam.className = "zaznam";
    novyZaznam.textContent = vyraz;

    historie.prepend(novyZaznam);
}
    vyraz = "";
    aktualizujVyraz();

    document.querySelectorAll(".cislo").forEach(function (prvek) {
          prvek.classList.remove("selected");
    });
    
} else {

    vysledekDiv.style.color = "red";
    vysledekDiv.textContent = "Špatně";

}

    } catch {

        vysledekDiv.style.color = "red";
        vysledekDiv.textContent = "Neplatny vyraz";
    }
}

window.onload = function () {
    generuj(10);
};
