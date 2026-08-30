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

    for (let i = 0; i < pocet; i++) {

        const cislo = Math.floor(Math.random() * 10);

        const prvek = document.createElement("span");

        prvek.className = "cislo";
        prvek.textContent = cislo;

        prvek.addEventListener("click", function () {

            if (prvek.classList.contains("selected")) {
                return;
            }

            prvek.classList.add("selected");

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
}

function zkontroluj() {

    if (!vyraz.includes("=")) {
        alert("Chybí '='");
        return;
    }

    const casti = vyraz.split("=");

    if (casti.length !== 2) {
        alert("Neplatný výraz");
        return;
    }

    const leva = casti[0];
    const prava = casti[1];

    try {

        const vysledekLeve = eval(leva);
        const vysledekPrave = Number(prava);

        if (vysledekLeve === vysledekPrave) {

            alert("✅ Správně");

        } else {

            alert(
                "❌ Špatně\n\n" +
                vysledekLeve +
                " ≠ " +
                vysledekPrave
            );

        }

    } catch (e) {

        console.error(e);
        alert("Neplatný výraz");

    }
}

window.onload = function () {
    generuj(10);
};
