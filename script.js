let vyraz = "";

function generuj(pocet) {

    const kontejner = document.getElementById("cisla");

    kontejner.innerHTML = "";
    vyraz = "";

    aktualizujVyraz();

    for (let i = 0; i < pocet; i++) {

        const cislo = Math.floor(Math.random() * 10);

        const prvek = document.createElement("span");

        prvek.className = "cislo";
        prvek.textContent = cislo;

        prvek.addEventListener("click", function () {

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

    if (vyraz.trim() === "") {
        return;
    }

    vyraz += " " + operator + " ";

    aktualizujVyraz();
}

function aktualizujVyraz() {

    document.getElementById("vyraz").textContent = vyraz;
}

function vymazat() {

    vyraz = "";
    aktualizujVyraz();
}
function zkontroluj() {

   console.log("zkontroluj spuštěna");
    alert(vyraz);
}

    const casti = vyraz.split("=");

    if (casti.length !== 2) {
        alert("Neplatný výraz");
        return;
    }

    const leva = casti[0].trim();
    const prava = casti[1].trim();

    if (prava === "") {
        alert("Chybí výsledek");
        return;
    }

    try {

        const vypocet = Function(
            "return " + leva
        )();

        const vysledek = Number(prava);

        if (vypocet === vysledek) {
            alert("✅ Správně");
        } else {
            alert("❌ Špatně");
        }

    } catch {
        alert("Neplatný výraz");
    }
}
generuj(10);
