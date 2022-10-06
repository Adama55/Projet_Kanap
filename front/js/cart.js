
// recuperation depuis local storage 
let cart = JSON.parse(localStorage.getItem("cart"));

let arrayQuantity= [];
let arrayPrix = [];
let arrayProduitId = [];

/* afficher le contenu de notre panier */

if (cart != null && cart.length != 0){
    for( let i = 0; i < cart.length; i++) {

        const lienProduits = fetch("http://localhost:3000/api/products/"+`${cart[i].id}`);

        lienProduits.then(async function(res) {
            try{
                let produitRecuperes = await res.json();

                /* création de la fonction afficher */
                function afficherProduits(){

                     // création et insertion des elements 
                    const cart__items = document.querySelector("#cart__items");
                    const article =document.createElement("article");
                    article.className = "cart__item";
                    article.dataset.id = cart[i].id;
                    article.dataset.color = cart[i].color;

                    cart__items.appendChild(article);

                    /**** */
                    const divItemImg = document.createElement("div");                    
                    divItemImg.className = "cart__item__img";
                    const image = document.createElement("img");                    
                    image.src = produitRecuperes.imageUrl;
                    image.alt = produitRecuperes.altTxt;

                    article.appendChild(divItemImg);
                    divItemImg.appendChild(image);

                    /** */
                    const divItemContent = document.createElement("div");                    
                    divItemContent.className = "cart__item__content";

                    article.appendChild(divItemContent);

                    /***** */
                    const divDescrip = document.createElement("div");
                    divDescrip.className = "cart__item__content__description";
                    const nomProduit = document.createElement("h2");
                    nomProduit.textContent = produitRecuperes.name;
                    const colorProduit = document.createElement("p");
                    colorProduit.textContent = cart[i].color;
                    const prixProduit = document.createElement("p");
                    prixProduit.textContent = Number(produitRecuperes.price) + " €";

                    divItemContent.appendChild(divDescrip);
                    divDescrip.appendChild(nomProduit);
                    divDescrip.appendChild(colorProduit);
                    divDescrip.appendChild(prixProduit);

                    /*** */
                    const divItemSetting = document.createElement("div");
                    divItemSetting.className = "cart__item__content__settings";

                    divItemContent.appendChild(divItemSetting);

                    /*** */
                    const divItemQuantity = document.createElement("div");
                    divItemQuantity.className = "cart__item__content__settings__quantity";
                    const qte = document.createElement("p");
                    qte.textContent = "Qté : ";
                    const setInput = document.createElement("input");
                    setInput.type ="number";
                    setInput.className = "itemQuantity";
                    setInput.name ="itemQuantity";
                    setInput.min = "1";
                    setInput.max = "100";
                    setInput.value = cart[i].quantity;
                    setInput.textContent = cart[i].quantity

                    divItemSetting.appendChild(divItemQuantity);
                    divItemQuantity.appendChild(qte)
                    divItemQuantity.appendChild(setInput);
                    
                    /*** */
                    const divItemSettingDelete = document.createElement("div");
                    divItemSettingDelete.className ="cart__item__content__settings__delete";
                    divItemContent.appendChild(divItemSettingDelete);

                    const supprimer = document.createElement("p");
                    supprimer.className = "deleteItem";
                    supprimer.textContent = "Supprimer";
                    divItemSettingDelete.appendChild(supprimer);

                    /* modiffier la quantité des articles disponible dans le pannier */

                    function modiffierQuantite() {
                        setInput.addEventListener("change", modificationQuantite);
                        
                        function modificationQuantite() {
                            if( parseInt(setInput.value, 10) < 1) {
                                alert(" Veuillez renseigner la quantité de produits souhaité, au minimum un articl");
                            }
                            else if (parseInt(setInput.value, 10) > 100) {
                                alert(" votre commande depasse la limite autorisée, qui est de 100 articles ");
                                setInput.value = "100";
                            }
                            else {
                                let cart = JSON.parse(localStorage.getItem("cart"));
                                cart[i].quantity = parseInt(setInput.value, 10);
                                localStorage.setItem("cart", JSON.stringify(cart));
                                window.location.reload();
                            }
                        }
                    }

                    /** fonction supprimer */
                    function supprimerProduit(){
                        supprimer.addEventListener("click", actualiserLePanier);

                        function actualiserLePanier(){
                          let cart = JSON.parse(localStorage.getItem("cart"));
                          cart.splice(i, 1);
                          localStorage.setItem("cart", JSON.stringify(cart));
                          window.location.reload();
                        }
                    }

                    /** affichage du total article */
                    function afficherTotalArticles() {
                        arrayQuantity.push(parseInt(cart[i].quantity));
                        const totalArtiles = arrayQuantity.reduce((val1, val2)  => val1 + val2, 0);
                        const totalQuantity = document.querySelector("#totalQuantity");
                        totalQuantity.textContent = totalArtiles;
                    }

                    /** affichage du prix total*/
                    function afficherPrixTotal() {
                        arrayPrix.push(cart[i].quantity * produitRecuperes.price)
                        const prixTotal = arrayPrix.reduce((val1, val2)  => val1 + val2, 0);
                        const totalPrice = document.querySelector("#totalPrice");
                        totalPrice.textContent = prixTotal;
                    }

                    /** execution des fonctions */
                    //--- modifier la quantité du produit dans le panier
                    modiffierQuantite();
                    //-- supprimer un promer du panier
                    supprimerProduit();
                    //-- afficher le total des articles diponibles dans le panier
                    afficherTotalArticles()
                    //-- afficher le prix total des artiles 
                    afficherPrixTotal();
                    arrayProduitId.push(cart[i].id);
                }

                /* affichons maintent les produits dans le panier */
                afficherProduits();
            }
            catch (err){
                console.log(err)
            }
        })

    }
}
else {
    const cart__items = document.querySelector("#cart__items");
    cart__items.textContent = "Vous n'avez d'article dans votre panier";
    const totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = "0";
    const totalPrice = document.querySelector("#totalPrice");
    totalPrice.textContent = "0";
}

/** du panier au passage à la commande */
// on declare nos varibles
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

let clientForm = [ firstName, lastName, address, city, email ];
  
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
const emailErrorMsg = document.querySelector("#emailErrorMsg");

let errorMsg = [firstNameErrorMsg, lastNameErrorMsg, addressErrorMsg, cityErrorMsg, emailErrorMsg ];

let textRegExp = new RegExp("^[A-Za-zÀ-ÿ '-]+[^0-9_!¿/+=@#$%&(){}|~<>;:]$");
let addressRegExp = new RegExp("^[0-9a-zA-ZÀ-ÿ',-. ]+$");
let emailRegExp = new RegExp("[A-Za-z0-9]+@[A-Za-z.-]+[.]+[A-Za-z]{2,3}$");


function verificationInput() {

    let arrayTests = [
      textRegExp.test(firstName.value),
      textRegExp.test(lastName.value),
      addressRegExp.test(address.value),
      textRegExp.test(city.value),
      emailRegExp.test(email.value)
    ]
  
    /* Signaler les champs valides ou erronées */
  
    for (let i = 0; i < arrayTests.length; i++) {
      
      let validInput = "solid green";
      let invalidInput = "solid red";
  
      if (arrayTests[i] == true){
        clientForm[i].style.border = validInput;
        errorMsg[i].textContent = "";
      } else {
        clientForm[i].style.border = invalidInput;
        errorMsg[i].textContent = "Erreur de saisie"
      }
    } 
}

  /* Vérifier si le formulaire est correctement rempli */

function validatationForm () {
    if (textRegExp.test(firstName.value) == true &&
        textRegExp.test(lastName.value) == true &&
        addressRegExp.test(address.value) == true &&
        textRegExp.test(city.value) == true &&
        emailRegExp.test(email.value) == true) {
      return true
    } else {
      return false
    }
}

/* action commander*/

function saisiClient() {
    const orderClick = document.querySelector("#order");
    orderClick.addEventListener("click", sendOrder);
  
    function sendOrder(submit) {
      submit.preventDefault();
  
      if (cart.length == 0){
        alert("Vous n'avez aucun article dans le panier")
      } else {
  
        verificationInput();
        validatationForm ();
        
        /* Valider la commande */
  
        if (validatationForm() == true) {
  
          const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
          }
  
          const data = {
            products : arrayProduitId,
            contact : contact
          }
          
          const orderPost = fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {
              'Accept': 'application/json',
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
          })
  
          orderPost.then(async function (res) {
            const order = await res.json();
            window.location.href = `../html/confirmation.html?id=${order.orderId}`;
          });
        } else {
          alert("Veuillez vérifier le formulaire")
        }
      }
    }
}
saisiClient();
