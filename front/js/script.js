
/*Récupérer le contenu*/
const lienProduits = fetch("http://localhost:3000/api/products/");

lienProduits.then(async function(res) {
  try{
    let produitRecuperes = await res.json();
  
    /*Affichage des produits */

    function afficherProduits() {
      for (let i = 0; i < produitRecuperes.length; i++) {

        /*inserer le contenu HTML de la section .items */

        const items = document.querySelector("#items");

        const lien = document.createElement("a");
        lien.href = `../html/product.html?id=${produitRecuperes[i]._id}`;
        items.appendChild(lien);

        const article = document.createElement("article");
        lien.appendChild(article);

        const image = document.createElement("img");
        image.src = produitRecuperes[i].imageUrl;
        image.alt = produitRecuperes[i].altTxt;
        article.appendChild(image);

        const titre = document.createElement("h3");
        titre.textContent = produitRecuperes[i].name;
        article.appendChild(titre);

        const descrip = document.createElement("p");
        descrip.textContent = produitRecuperes[i].description;
        article.appendChild(descrip);

      }
    }
    afficherProduits();
  } catch (err) {
    console.log(err);
  }
})

  



