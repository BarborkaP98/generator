let vyraz = "";

function generuj(pocet) {

    const kontejner = document.getElementById("cisla");

    kontejner.innerHTML = "";
    vyraz = "";

    aktualizujVyraz();

    for (let i = 0; i < pocet; i++) {

        const cislo = Math.floor(Math.random() * 10);

        const prvek = document.createElement("div");

        prvek.className = "cislo";
        prvek.textContent = cislo;

        prvek.addEventListener("click", function () {

            if (prvek.classList.contains("selected")) {
                return;
            }

            prvek.classList.add("selected");

            if (vyraz.length > 0) {
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

    const posledniZnak = vyraz.trim().slice(-1);

    if (
        posledniZnak === "+" ||
        posledniZnak === "-" ||
        posledniZnak === "*" ||
        posledniZnak === "/" ||
        posledniZnak === "="
    ) {
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

    document.querySelectorAll(".cislo").forEach(prvek => {
        prvek.classList.remove("selected");
    });

    aktualizujVyraz();
}

generuj(10);
