/* Vider le panier */

let getCart = JSON.parse(localStorage.getItem("cart"));
localStorage.clear("cart");

/* Récupérer le numéro de commande */

let params = new URLSearchParams(window.location.search);
let orderNumber = params.get("id");
let orderId = document.querySelector("#orderId");
orderId.textContent = orderNumber;
