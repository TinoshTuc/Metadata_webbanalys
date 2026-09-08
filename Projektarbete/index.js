setTimeout(() => {
    newsletter_popup.showModal();
}, 2000);

newsletter_popup.getElementsByTagName("button")[0].onclick = () => {
    newsletter_popup.close();
};