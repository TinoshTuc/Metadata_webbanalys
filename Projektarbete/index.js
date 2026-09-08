setTimeout(() => {
    newsletter_popup.showModal();
}, 2000);

const newsletterPopup = document.getElementById("newsletter_popup");
const closeButton = document.querySelector(".newsletter-modal__close");

closeButton.addEventListener("click", () => {
    newsletterPopup.close();
});