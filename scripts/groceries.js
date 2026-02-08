// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var products = [
  {
    name: "Broccoli",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    category: "Vegetables",
    price: 4.49,
    imageUrl: "assets/broccoli.png",
  },
  {
    name: "Bread",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    category: "Grains",
    price: 4.29,
    imageUrl: "assets/bread.png",
  },
  {
    name: "Salmon",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    category: "Seafood",
    price: 16.99,
    imageUrl: "assets/salmon.png",
  },
  {
    name: "Potatoes",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    category: "Vegetables",
    price: 3.49,
    imageUrl: "assets/potato.png",
  },
  {
    name: "Carrot",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    category: "Vegetables",
    price: 3.49,
    imageUrl: "assets/carrot.png",
  },
  {
    name: "Pasta",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    category: "Grains",
    price: 4.49,
    imageUrl: "assets/pasta.png",
  },
  {
    name: "Celery",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    category: "Vegetables",
    price: 3.79,
    imageUrl: "assets/celery.png",
  },
  {
    name: "Chicken",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    category: "Meat",
    price: 11.99,
    imageUrl: "assets/chicken.png",
  },
  {
    name: "Rice",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    category: "Grains",
    price: 6.99,
    imageUrl: "assets/rice.png",
  },
  {
    name: "Biscuits",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    category: "Snacks",
    price: 5.49,
    imageUrl: "assets/biscuits.png",
  },
];

// Filters and sorts products based on user restrictions
function restrictListProducts(prods, restriction) {
  let product_names = [];
  let sortedProds = [...prods].sort((a, b) => a.price - b.price);

  for (let i = 0; i < sortedProds.length; i += 1) {
    let p = sortedProds[i];

    let okVeg = !restriction.vegetarian || p.vegetarian === true;
    let okGluten = !restriction.glutenFree || p.glutenFree === true;
    let okOrganic =
      restriction.organicPref === "any" ||
      (restriction.organicPref === "organic" && p.organic === true) ||
      (restriction.organicPref === "nonOrganic" && p.organic === false);

    if (okVeg && okGluten && okOrganic) {
      product_names.push(p.name);
    }
  }

  var searchBar = document.getElementById("searchBar");
  var searchValue = searchBar ? searchBar.value : "";
  return searchProducts(product_names, searchValue);
}

function searchProducts(prods, searchTerm) {
  let product_names = [];
  let lowerSearchTerm = searchTerm.toLowerCase();

  for (let i = 0; i < prods.length; i += 1) {
    let p = prods[i];
    if (p.toLowerCase().includes(lowerSearchTerm)) {
      product_names.push(p);
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
