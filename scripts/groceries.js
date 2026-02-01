// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var products = [
  {
    name: "Brocoli",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 1.99,
    imageUrl: "assets/broccoli.png",
  },
  {
    name: "Bread",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    price: 2.35,
    imageUrl: "assets/bread.png",
  },
  {
    name: "Salmon",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    price: 10.0,
    imageUrl: "assets/salmon.png",
  },
  {
    name: "Potato",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 1.49,
    imageUrl: "assets/potato.png",
  },
  {
    name: "Carrot",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 1.29,
    imageUrl: "assets/carrot.png",
  },
  {
    name: "Pasta",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    price: 2.99,
    imageUrl: "assets/pasta.png",
  },
  {
    name: "Celery",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 1.99,
    imageUrl: "assets/celery.png",
  },
  {
    name: "Chicken",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    price: 7.49,
    imageUrl: "assets/chicken.png",
  },
  {
    name: "Rice",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 3.99,
    imageUrl: "assets/rice.png",
  },
  {
    name: "Biscuits",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    price: 3.49,
    imageUrl: "assets/biscuits.png",
  },
];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
  let product_names = [];
  // sort a shallow copy to avoid mutating the global products array; stable list + sorted by price (required)
  let sortedProds = [...prods].sort((a, b) => a.price - b.price);

  //  ensures display is sorted by price (required)
  for (let i = 0; i < sortedProds.length; i += 1) {
    let p = sortedProds[i];

    // MOD: restriction is now an object: { vegetarian: bool, glutenFree: bool, organicPref: "any"|"organic"|"nonOrganic" }
    let okVeg = !restriction.vegetarian || p.vegetarian === true; // MOD: supports vegetarian OR not
    let okGluten = !restriction.glutenFree || p.glutenFree === true; // MOD: supports gluten-free OR not

    // MOD: apply organic preference (required)
    let okOrganic =
      restriction.organicPref === "any" ||
      (restriction.organicPref === "organic" && p.organic === true) ||
      (restriction.organicPref === "nonOrganic" && p.organic === false);

    // ORIGINAL: long if/else chain on string restriction values...
    // MOD: unified condition supports vegetarian AND/OR gluten-free plus organic preference
    if (okVeg && okGluten && okOrganic) {
      // combined filter logic (required)
      product_names.push(p.name); // keep return type the same (names)
    }
  }

  return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts, productQuantities) {
  var totalPrice = 0.0;
  for (let i = 0; i < products.length; i += 1) {
    if (chosenProducts.includes(products[i].name)) {
      var quantity =
        productQuantities && productQuantities[products[i].name]
          ? productQuantities[products[i].name]
          : 1;
      totalPrice += products[i].price * quantity;
    }
  }
  return totalPrice.toFixed(2);
}
