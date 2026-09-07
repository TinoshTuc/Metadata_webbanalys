let antal = 1;

const kasse = document.querySelector("form[data-price]");
const prisPerKasse = Number(kasse.dataset.price);
const itemId = kasse.dataset.itemId;
const itemNamn = kasse.dataset.itemName;

function uppdateraKassa() {
    document.getElementById("antal").textContent = antal;

    document.getElementById("pris").textContent =
        new Intl.NumberFormat("sv-SE", {
            style: "currency",
            currency: "SEK",
            maximumFractionDigits: 0
        }).format(antal * prisPerKasse);
}

function okaAntal() {
    antal++;
    uppdateraKassa();
}

function minskaAntal() {
    if (antal > 1) {
        antal--;
        uppdateraKassa();
    }
}

function handlePurchase() {
    const totaltPris = antal * prisPerKasse;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });

    window.dataLayer.push({
        event: "purchase",
        ecommerce: {
            transaction_id: "GB-" + Date.now(),
            currency: "SEK",
            value: totaltPris,
            items: [
                {
                    item_id: itemId,
                    item_name: itemNamn,
                    item_brand: "Giga Bite",
                    item_category: "Matkassar",
                    price: prisPerKasse,
                    quantity: antal
                }
            ]
        }
    });
}

uppdateraKassa();