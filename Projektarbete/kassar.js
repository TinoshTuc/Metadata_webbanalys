let quantity = 1;

const formToItems = {
    "form_family_bag": {
        item_id: "family_bag",
        item_name: "Familjekassen",
        transaction_id: "GB001",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        price: 899
    },
    "form_vegetarian_bag": {
        item_id: "vegetarian_bag",
        item_name: "Vegetariska kassen",
        transaction_id: "GB002",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        price: 749
    },
    "form_training_bag": {
        item_id: "training_bag",
        item_name: "Träningskassen",
        transaction_id: "GB003",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        price: 829
    },
    "form_quick_bag": {
        item_id: "quick_bag",
        item_name: "Snabbkassen",
        transaction_id: "GB004",
        item_brand: "Giga Bite",
        item_category: "Matkassar",
        price: 749
    }
};

const form = document.querySelector("form[action='purchase']");
const item = formToItems[form.name];

function updateBag() {
    document.getElementById("antal").textContent = quantity;
    document.getElementById("pris").textContent = (quantity * item.price) + " kr";

    const quantityInput = document.getElementById("quantity-input");
    if (quantityInput) {
        quantityInput.value = quantity;
    }
}

function increaseQuantity() {
    quantity++;
    updateBag();
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        updateBag();
    }
}

function handlePurchase(event) {
    event.preventDefault();

    const form = event.target;
    const item = formToItems[form.name];
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

        dataLayer.push({ ecommerce: null });
        dataLayer.push({ event: "purchase", ecommerce: ecommerce });
    }
}

for (const form of document.forms) {
    if (form.action.includes("purchase")) {
        form.onsubmit = handlePurchase;
    }
}

updateBag();