// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var products = [
  {
    name: "Brocoli",
    vegetarian: true,
    glutenFree: true,
    price: 1.99,
    imageUrl: "assets/broccoli.png",
  },
  {
    name: "Bread",
    vegetarian: true,
    glutenFree: false,
    price: 2.35,
    imageUrl: "assets/bread.png",
  },
  {
    name: "Salmon",
    vegetarian: false,
    glutenFree: true,
    price: 10.0,
    imageUrl: "assets/salmon.png",
  },
  {
    name: "Potato",
    vegetarian: true,
    glutenFree: true,
    price: 1.49,
    imageUrl: "assets/potato.png",
  },
  {
    name: "Carrot",
    vegetarian: true,
    glutenFree: true,
    price: 1.29,
    imageUrl: "assets/carrot.png",
  },
  {
    name: "Pasta",
    vegetarian: true,
    glutenFree: false,
    price: 2.99,
    imageUrl: "assets/pasta.png",
  },
  {
    name: "Celery",
    vegetarian: true,
    glutenFree: true,
    price: 1.99,
    imageUrl: "assets/celery.png",
  },
  {
    name: "Chicken",
    vegetarian: false,
    glutenFree: true,
    price: 7.49,
    imageUrl: "assets/chicken.png",
  },
  {
    name: "Rice",
    vegetarian: true,
    glutenFree: true,
    price: 3.99,
    imageUrl: "assets/rice.png",
  },
  {
    name: "Biscuits",
    vegetarian: true,
    glutenFree: false,
    price: 3.49,
    imageUrl: "assets/biscuits.png",
  },
];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
  let product_names = [];
  prods.sort((a, b) => a.price - b.price);
  for (let i = 0; i < prods.length; i += 1) {
    if (
      restriction == "Vegetarian&GlutenFree" &&
      prods[i].vegetarian == true &&
      prods[i].glutenFree == true
    ) {
      product_names.push(prods[i].name);
    } else if (restriction == "Vegetarian" && prods[i].vegetarian == true) {
      product_names.push(prods[i].name);
    } else if (restriction == "GlutenFree" && prods[i].glutenFree == true) {
      product_names.push(prods[i].name);
    } else if (restriction == "None") {
      product_names.push(prods[i].name);
    }
  }
  return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
  var totalPrice = 0.0;
  for (let i = 0; i < products.length; i += 1) {
    if (chosenProducts.indexOf(products[i].name) > -1) {
      totalPrice += products[i].price;
    }
  }
  return totalPrice.toFixed(2);
}
