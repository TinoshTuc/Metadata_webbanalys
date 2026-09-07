let quantity = 1;

const fromToItems = {
    "from_family_bag": {
        itemId: "family_bag",
        itemNamn: "Familjekassen",
        transaction_id: "GB001",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        prisPerBag: 899
    },
    "from_vegetarian_bag": {
        itemId: "vegetarian_bag",
        itemNamn: "Vegetariska kassen",
        transaction_id: "GB002",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        prisPerBag: 749
    },
    "from_training_bag": {
        itemId: "training_bag",
        itemNamn: "Träningskassen",
        transaction_id: "GB003",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        prisPerBag: 829
    },
    "from_quick_bag": {
        itemId: "quick_bag",
        itemNamn: "Snabbkassen",
        transaction_id: "GB004",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        prisPerBag: 749
    }
};

const form = document.querySelector("form[action='purchase']");
const item = formToItems[form.name];

function updateBag() {
    document.getElementById("antal").textContent = quantity;
    document.getElementById("pris").textContent = (quantity * item.price) + " kr";
}

function increaseQuantity() {
    antal++;
    updateBag();
}

function decreaseQuantity() {
    if (antal > 1) {
        antal--;
        updateBag();
    }
} 

function handlePurchase(event) {
    event.preventDefault();
    const form = event.target;
    const item = fromToItems[form.name];
    const data = new FormData(form);
    const quantity = parseInt(data.get("quantity"));

    if (item && quantity && quantity >= 1) {
        item.quantity = quantity;

        const ecommerce = {
            transaction_id: item.transaction_id,
            currency: "SEK",
            items: [item]
        };

        ecommerce.value = item.price * item.quantity;
        dataLayer.push({ ecommerce });
        dataLayer.push({ event: "purchase", ecommerce: ecommerce });
    }

}
for (const form of document.forms) {
    if (form.action.includes("purchase")) {
        form.onsubmit = handlePurchase;
    }
}

updateBag();