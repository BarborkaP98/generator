let vyraz = "";

function generuj(pocet) {

    const kontejner = document.getElementById("cisla");

    kontejner.innerHTML = "";
    vyraz = "";

    aktualizujVyraz();

    const vysledekDiv = document.getElementById("vysledek");

    if (vysledekDiv) {
        vysledekDiv.innerHTML = "";
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

    if ("+-.:=".includes(posledni)) {
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
        vysledekDiv.innerHTML = "";
    }
}

function zkontroluj() {

    const vysledekDiv = document.getElementById("vysledek");

    if (!vysledekDiv) {
        return;
    }

    if (!vyraz.includes("=")) {

        vysledekDiv.innerHTML =
            "<span style='color:red'>Chybi znak =</span>";

        return;
    }

    const casti = vyraz.split("=");

    if (casti.length !== 2) {

        vysledekDiv.innerHTML =
            "<span style='color:red'>Neplatny vyraz</span>";

        return;
    }

    const leva = casti[0].trim();
    const prava = casti[1].trim();

    if (prava === "") {

        vysledekDiv.innerHTML =
            "<span style='color:red'>Chybi vysledek</span>";

        return;
    }

    try {

        let vypocet = leva;

        vypocet = vypocet.replace(/\./g, "*");
        vypocet = vypocet.replace(/:/g, "/");

        console.log("Kontroluji:", vypocet);

        const levaStrana = eval(vypocet);
        const pravaStrana = Number(prava);

        if (levaStrana === pravaStrana) {

            vysledekDiv.innerHTML =
                "<span style='color:green'>Spravne</span>";

        } else {

            vysledekDiv.innerHTML =
                "<span style='color:red'>Spatne</span>";

        }

    } catch (e) {

        console.error(e);

        vysledekDiv.innerHTML =
            "<span style='color:red'>Neplatny vyraz</span>";
    }
}

window.onload = function () {
    generuj(10);
};
