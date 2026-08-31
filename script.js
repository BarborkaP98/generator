let vyraz = "";

function generuj(pocet) {
    const kontejner = document.getElementById("cisla");
    const vysledekDiv = document.getElementById("vysledek");

    kontejner.innerHTML = "";
    vyraz = "";

    aktualizujVyraz();

    if (vysledekDiv) {
        vysledekDiv.textContent = "";
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
    }
}

function zkontroluj() {

    const vysledekDiv = document.getElementById("vysledek");

    if (!vyraz.includes("=")) {
        vysledekDiv.textContent = "Chybi znak =";
        return;
    }

    const casti = vyraz.split("=");

    if (casti.length !== 2) {
        vysledekDiv.textContent = "Neplatny vyraz";
        return;
    }

    let leva = casti[0].trim();
    let prava = casti[1].trim();

    try {

        leva = leva.replaceAll("·", "*");
        leva = leva.replaceAll(".", "*");
        leva = leva.replaceAll(":", "/");

        console.log("Vyhodnocuji:", leva);

        const levaStrana = Function("return (" + leva + ")")();
        const pravaStrana = Number(prava);

        if (levaStrana === pravaStrana) {

            vysledekDiv.style.color = "green";
            vysledekDiv.textContent = "Spravne";

        } else {

            vysledekDiv.style.color = "red";
            vysledekDiv.textContent = "Spatne";

        }

    } catch (e) {

        console.error(e);

        vysledekDiv.style.color = "red";
        vysledekDiv.textContent = "Neplatny vyraz";
    }
}

window.onload = function () {
    generuj(10);
};
