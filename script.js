let vyraz = "";

function generuj(pocet) {

    const kontejner = document.getElementById("cisla");

    if (!kontejner) {
        console.error("Chybí element s id='cisla'");
        return;
    }

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

            if (vyraz !== "") {
                vyraz += " ";
            }

            vyraz += cislo;

            aktualizujVyraz();
        });

        kontejner.appendChild(prvek);
    }
}

function pridejOperator(operator) {

    if (vyraz.length === 0) {
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
        console.error("Chybí div s id='vysledek'");
        return;
    }

    if (!vyraz.includes("=")) {

        vysledekDiv.innerHTML =
            "<span style='color:red'>Chybí '='</span>";

        return;
    }

    const casti = vyraz.split("=");

    if (casti.length !== 2) {

        vysledekDiv.innerHTML =
            "<span style='color:red'>Neplatný výraz</span>";

        return;
    }

    const leva = casti[0].trim();
    const prava = casti[1].trim();

    try {

        let vyrazProVypocet = leva;

        vyrazProVypocet = vyrazProVypocet.replace(/\s+/g, "");
        vyrazProVypocet = vyrazProVypocet.replace(/·/g, "*");
        vyrazProVypocet = vyrazProVypocet.replace(/×/g, "*");
        vyrazProVypocet = vyrazProVypocet.replace(/:/g, "/");

        const vysledekLeve = eval(vyrazProVypocet);
        const vysledekPrave = Number(prava);

        if (vysledekLeve === vysledekPrave) {

            vysledekDiv.innerHTML =
                "<span style='color:green'>✅ Správně</span>";

        } else {

            vysledekDiv.innerHTML =
                "<span style='color:red'>❌ Špatně</span>";

        }

    } catch (e) {

        console.error(e);

        vysledekDiv.innerHTML =
            "<span style='color:red'>Neplatný výraz</span>";
    }
}

window.onload = function () {
    generuj(10);
};
