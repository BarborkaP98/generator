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

generuj(10);
