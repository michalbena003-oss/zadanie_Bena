function nacitajKnihy() {
  const hladat = document.getElementById("hladatInput").value;
  const zoradit = document.getElementById("zoraditSelect").value;
  const smer = document.getElementById("smerSelect").value;

  const params = new URLSearchParams({ hladat, zoradit, smer });

  fetch("/api/knihy?" + params.toString())
    .then(odpoved => odpoved.json())
    .then(knihy => {
      const zoznam = document.getElementById("zoznam");
      zoznam.innerHTML = "";
      knihy.forEach(kniha => {
        const riadok = document.createElement("tr");
        [kniha.id, kniha.nazov, kniha.autor, kniha.rok, kniha.cena]
          .forEach(hodnota => {
            const bunka = document.createElement("td");
            bunka.textContent = hodnota;
            riadok.appendChild(bunka);
          });
        const bunka = document.createElement("td");
        const tlacidlo = document.createElement("button");
        tlacidlo.textContent = "Vymazat";
        tlacidlo.onclick = () => {
          fetch("/api/knihy/" + kniha.id, { method: "DELETE" })
            .then(() => nacitajKnihy());
        };
        const cenaBtn = document.createElement("button");
        cenaBtn.textContent = "Zmeniť cenu";
        cenaBtn.onclick = () => {
          const uprava = document.createElement("span");
          uprava.className = "price-edit";
          const vstup = document.createElement("input");
          vstup.type = "number";
          vstup.step = "0.01";
          vstup.value = "5";
          vstup.setAttribute("aria-label", "O koľko zmeniť cenu v eurách");
          const ulozitBtn = document.createElement("button");
          ulozitBtn.type = "button";
          ulozitBtn.textContent = "Uložiť";
          const zrusitBtn = document.createElement("button");
          zrusitBtn.type = "button";
          zrusitBtn.textContent = "Zrušiť";

          cenaBtn.hidden = true;
          uprava.append(vstup, ulozitBtn, zrusitBtn);
          bunka.appendChild(uprava);
          vstup.focus();

          zrusitBtn.onclick = () => {
            uprava.remove();
            cenaBtn.hidden = false;
          };
          ulozitBtn.onclick = async () => {
            if (vstup.value.trim() === "") return alert("Zadaj sumu zmeny.");
            const zmena = Number(vstup.value);
            if (!Number.isFinite(zmena)) return alert("Zadaj platné číslo.");

            try {
              const odpoved = await fetch("/api/knihy/" + kniha.id + "/cena", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ zmena })
              });
              if (!odpoved.ok) throw new Error(await odpoved.text());
              nacitajKnihy();
            } catch (error) {
              alert("Cenu sa nepodarilo zmeniť: " + error.message);
            }
          };
        };

        const upravitBtn = document.createElement("button");
        upravitBtn.type = "button";
        upravitBtn.textContent = "Upraviť";
        upravitBtn.onclick = () => {
          const polia = [
            { bunka: riadok.cells[1], hodnota: kniha.nazov, typ: "text", nazov: "Názov" },
            { bunka: riadok.cells[2], hodnota: kniha.autor, typ: "text", nazov: "Autor" },
            { bunka: riadok.cells[3], hodnota: kniha.rok, typ: "number", nazov: "Rok" }
          ];
          const vstupy = polia.map(pole => {
            const vstup = document.createElement("input");
            vstup.type = pole.typ;
            vstup.value = pole.hodnota;
            vstup.setAttribute("aria-label", pole.nazov);
            if (pole.typ === "number") vstup.step = "1";
            pole.bunka.textContent = "";
            pole.bunka.appendChild(vstup);
            return vstup;
          });
          const ulozitBtn = document.createElement("button");
          ulozitBtn.type = "button";
          ulozitBtn.textContent = "Uložiť";
          const zrusitBtn = document.createElement("button");
          zrusitBtn.type = "button";
          zrusitBtn.textContent = "Zrušiť";

          const ukoncitUpravu = () => {
            polia.forEach(pole => {
              pole.bunka.textContent = pole.hodnota;
            });
            ulozitBtn.remove();
            zrusitBtn.remove();
            tlacidlo.hidden = false;
            cenaBtn.hidden = false;
            upravitBtn.hidden = false;
          };

          tlacidlo.hidden = true;
          cenaBtn.hidden = true;
          upravitBtn.hidden = true;
          bunka.append(ulozitBtn, zrusitBtn);
          vstupy[0].focus();

          zrusitBtn.onclick = ukoncitUpravu;
          ulozitBtn.onclick = async () => {
            const nazov = vstupy[0].value.trim();
            const autor = vstupy[1].value.trim();
            const rok = Number(vstupy[2].value);
            if (!nazov || !autor || vstupy[2].value.trim() === "" || !Number.isInteger(rok)) {
              return alert("Zadaj názov, autora a platný celý rok.");
            }

            try {
              const odpoved = await fetch("/api/knihy/" + kniha.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nazov, autor, rok })
              });
              if (!odpoved.ok) throw new Error(await odpoved.text());
              nacitajKnihy();
            } catch (error) {
              alert("Knihu sa nepodarilo upraviť: " + error.message);
            }
          };
        };
        
        bunka.appendChild(tlacidlo);
        riadok.appendChild(bunka);
        zoznam.appendChild(riadok);
        bunka.appendChild(cenaBtn);
        bunka.appendChild(upravitBtn);
      });
    });
}

const formular = document.getElementById("formular");
formular.addEventListener("submit", event => {
    event.preventDefault();
    const kniha = {
        nazov: document.getElementById("nazov").value,
        autor: document.getElementById("autor").value,
        rok: Number(document.getElementById("rok").value),
        cena: Number(document.getElementById("cena").value)
    };
    fetch("/api/knihy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kniha)
    }).then(() => {
        formular.reset();
        nacitajKnihy();
    });
});

nacitajKnihy();

document.getElementById("hladatInput").addEventListener("input", nacitajKnihy);
document.getElementById("zoraditSelect").addEventListener("change", nacitajKnihy);
document.getElementById("smerSelect").addEventListener("change", nacitajKnihy);

document.getElementById("resetFilterBtn").addEventListener("click", () => {
  document.getElementById("hladatInput").value = "";
  document.getElementById("zoraditSelect").value = "id";
  document.getElementById("smerSelect").value = "ASC";
  nacitajKnihy();
});

function zobrazPrihlasenehoPouzivatela() {
  const infoEl = document.getElementById("prihlasenyInfo");
  const ulozeny = sessionStorage.getItem("prihlasenyPouzivatel");
  infoEl.innerHTML = "";

  if (ulozeny) {
    const pouzivatel = JSON.parse(ulozeny);
    infoEl.textContent = `Prihlaseny pouzivatel: ${pouzivatel.meno} (${pouzivatel.email})`;
  } else {
    infoEl.append("Nie ste prihlaseny. ");
    const odkaz = document.createElement("a");
    odkaz.href = "prihlasenie.html";
    odkaz.textContent = "Prihlasit sa";
    infoEl.appendChild(odkaz);
  }
}

zobrazPrihlasenehoPouzivatela();
