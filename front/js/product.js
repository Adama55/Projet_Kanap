
/* on va recuperer l'id à partir de l'url de la page*/

let urlPage = (new URL(window.location.href))
              .searchParams;
let produitId = urlPage.get("id");

const lienProduits = fetch("http://localhost:3000/api/products/"+`${produitId}`);
console.log(lienProduits);

lienProduits.then(async function(res) {
    try {
      if (res.ok) {
        let produitRecupere = await res.json();
  
        /* Créer le contenu HTML dans la section .item */
  
        function afficherProduit() {

          const itemImage = document.querySelector(".item__img");
          const image = document.createElement("img");
          image.src = produitRecupere.imageUrl;
          image.alt = produitRecupere.altTxt;
          itemImage.appendChild(image);
  
          const itemTitre = document.querySelector("#title");
          itemTitre.textContent = produitRecupere.name;
  
          const itemPrix = document.querySelector("#price");
          itemPrix.textContent = produitRecupere.price;
  
          const itemDescription = document.querySelector("#description");
          itemDescription.textContent = produitRecupere.description;
  
         
          let listOption = document.querySelector("#colors");
          for (let i = 0; i < produitRecupere.colors.length; i++) {
            let option = document.createElement("option");
            listOption.appendChild(option);
            option.value = produitRecupere.colors[i];
            option.textContent = produitRecupere.colors[i];
          } 
        }
        afficherProduit();
      }
    } catch (err) {
      console.log(console.error());
    }
  })


/*** stocker le produit dans le panier***/

function enregistrementDansLePanier() {

  let cart = JSON.parse(localStorage.getItem("cart"));
  const click = document.querySelector("#addToCart");
  click.addEventListener("click", sauvegardePannier);

  /********* */
  function sauvegardePannier() {
    const option = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    const choixProduitInfo = {
      id: produitId,
      color : option,
      quantity: parseInt(quantity, 10)
    }

    if (cart == null) {
      cart = [];
    }

    /** on fait les test liés aux exigeances **/

    //on verifie si une donnée correcte a été choisie ou non
    if (option === "" || parseInt(quantity, 10) < 1) {
      alert("SVP renseigner la couleur et la quantité entre 1-100 articles");
    } 
    
    else if (parseInt(quantity, 10) > 100){
      alert("Désolé! Vous ne pouvez pas commander plus de 100 articles");
    }
    else {
      // on reccupère les produits disponibles dans le pannier s'il en existe. 
      let produitDejaDansLePanier = cart.find (elemt => elemt.id == choixProduitInfo.id && elemt.color == choixProduitInfo.color);

      if (produitDejaDansLePanier != undefined && (produitDejaDansLePanier.quantity + choixProduitInfo.quantity) > 100){
        alert("Maximum d'articles est atteint");
        produitDejaDansLePanier.quantity = "100";
      } 
      else if (produitDejaDansLePanier != undefined && (produitDejaDansLePanier.quantity + choixProduitInfo.quantity) <= 100) {
        produitDejaDansLePanier.quantity = produitDejaDansLePanier.quantity + choixProduitInfo.quantity;
      } 
      else {
        cart.push(choixProduitInfo);
      }

      alert(`${quantity}`+ "article(s) ajouté(s) au panier");
      window.location.reload();
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  /***** */
}

enregistrementDansLePanier(); 
