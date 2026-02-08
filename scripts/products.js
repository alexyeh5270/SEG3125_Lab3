// Global variable to store product selections and quantities across tab switches
var productSelections = {};

// Returns dictionary of products, key: category, value: products in categoryu
function categorizeProducts() {
  var categories = {};
  products.forEach(function (product) { //Loops through each product
    if (!categories[product.category]) {  //If category not in dictionary, initialize empty array 
      categories[product.category] = [];
    }
    categories[product.category].push(product.name); //Push product.name to its category
  });
  return categories;
}

// Generates a checkbox list of products based on user preferences
function populateListProductChoices(slct1, slct2) {
  var s1 = document.getElementById(slct1);
  var s2 = document.getElementById(slct2);
  if (!s2) return;

  // Save current selections and quantities before clearing
  var checkboxes = s2.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(function (checkbox) {
    var productName = checkbox.value;
    var productItem = checkbox.parentElement;
    var quantityInput = productItem.querySelector("input[type='number']");

    if (checkbox.checked) {
      productSelections[productName] = {
        checked: true,
        quantity: quantityInput ? quantityInput.value : "1",
      };
    } else if (productSelections[productName]) {
      // Remove from storage if unchecked
      delete productSelections[productName];
    }
  });

  s2.innerHTML = "";

  var optionArray = restrictListProducts(products, getUserRestriction());

  // Sort products based on selected sort option
  var sortSelect = document.getElementById("sortSelect");
  var sortValue = sortSelect ? sortSelect.value : "low-high";

  optionArray.sort(function (aName, bName) {
    var a = products.find((p) => p.name === aName);
    var b = products.find((p) => p.name === bName);
    if (!a || !b) return 0;
    if (sortValue === "high-low") {
      return b.price - a.price;
    }
    return a.price - b.price;
  });

  var searchInput = document.getElementById("searchBar");
  var searchValue = searchInput ? searchInput.value.trim().toLowerCase() : "";
  if (searchValue) {
    optionArray = optionArray.filter(function (name) {
      return name.toLowerCase().includes(searchValue);
    });
  }

  // Categorize all the products in the optionArray in dictionary with key:value category:product
  categories = categorizeProducts();

  // Copy optionArray
  var tempOptionArray = [];
  for (let x = 0; x < optionArray.length; x++) {
    tempOptionArray.push(optionArray[x]);
  }

// Iterates through each category
for (var category in categories) {
  optionArray = tempOptionArray.filter(function (name) {
    return categories[category].includes(name);
  });

 // creates a new section for each category
  if (optionArray.length > 0) {
    var sectionItem = document.createElement("section");
    sectionItem.className = "categorySection";
    var categoryHeader = document.createElement("h4");
    categoryHeader.textContent = category;
    s2.appendChild(categoryHeader);
  }
  //iterates through the options array and sets up elements for the display of products
  for (let i = 0; i < optionArray.length; i++) {
    let productName = optionArray[i];
    let product = products.find((p) => p.name === productName);

    var productItem = document.createElement("div");
    productItem.className = "productItem";
    productItem.style.fontSize = "inherit";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "product";
    checkbox.value = productName;
    checkbox.addEventListener("change", addQuantityInput);
    checkbox.id = "prod-" + productName.replace(/\s+/g, "-");
    checkbox.style.display = "none";

    // Restore previous selection state
    if (productSelections[productName]) {
      checkbox.checked = true;
    }

    if (product) {
      var img = document.createElement("img");
      img.src = product.imageUrl;
      img.className = "productImage";
      productItem.appendChild(img);
    }

    var organicTag = product && product.organic ? " (Organic)" : "";

    var label = document.createElement("label");
    label.style.fontSize = "inherit";

    label.appendChild(
      document.createTextNode(
        productName + organicTag + " - $" + product.price,
      ),
    );

    let addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.textContent = "+";
    addBtn.className = "quantityAdd";
    addBtn.addEventListener("click", function () {
      checkbox.checked = true;
      addQuantityInput({ target: checkbox });
    });

    productItem.appendChild(label);
    productItem.appendChild(addBtn);
    productItem.appendChild(checkbox);

    // Restore quantity input if product was previously selected
    if (productSelections[productName]) {
      var quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.name = "quantity_" + productName;
      quantityInput.min = "1";
      quantityInput.value = productSelections[productName].quantity;
      quantityInput.style.width = "60px";
      quantityInput.style.marginLeft = "8px";

      // Save quantity changes
      quantityInput.addEventListener("input", function () {
        if (productSelections[productName]) {
          productSelections[productName].quantity = quantityInput.value;
        }
      });

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "X";
      removeBtn.className = "quantityRemove";
      removeBtn.addEventListener("click", function () {
        quantityRow.remove();
        checkbox.checked = false;
        addBtn.style.display = "";
        delete productSelections[productName];
      });
      var quantityRow = document.createElement("div");
      quantityRow.className = "quantityRow";

      addBtn.style.display = "none";
      quantityRow.appendChild(removeBtn);
      quantityRow.appendChild(quantityInput);
      productItem.appendChild(quantityRow);
    }

    sectionItem.appendChild(productItem);
    
  }
  s2.appendChild(sectionItem);
}
}

//adds a quantity input field when a product is selected
function addQuantityInput(event) {
  var checkbox = event.target;
  var productItem = checkbox.parentElement;
  var productName = checkbox.value;

  //check if a quantity input already exists
  var existingQuantity = productItem.querySelector("input[type='number']");

  if (checkbox.checked) {
    var addBtn = productItem.querySelector(".quantityAdd");
    if (addBtn) {
      addBtn.style.display = "none";
    }
    //if no quantity input exists, create one
    if (!existingQuantity) {
      var quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.name = "quantity_" + productName;
      quantityInput.min = "1";
      quantityInput.value = "1";
      quantityInput.style.width = "60px";
      quantityInput.style.marginLeft = "8px";

      // Save quantity changes
      quantityInput.addEventListener("input", function () {
        if (productSelections[productName]) {
          productSelections[productName].quantity = quantityInput.value;
        }
      });

      var quantityRow = document.createElement("div");
      quantityRow.className = "quantityRow";
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "X";
      removeBtn.className = "quantityRemove";
      removeBtn.addEventListener("click", function () {
        quantityRow.remove();
        checkbox.checked = false;
        if (addBtn) {
          addBtn.style.display = "";
        }
        delete productSelections[productName];
      });

      quantityRow.appendChild(removeBtn);
      quantityRow.appendChild(quantityInput);
      productItem.appendChild(quantityRow);
    }

    // Save selection
    productSelections[productName] = {
      checked: true,
      quantity: existingQuantity ? existingQuantity.value : "1",
    };
  } else {
    //if unchecked, remove the quantity input
    if (existingQuantity) {
      var existingRow = productItem.querySelector(".quantityRow");
      if (existingRow) {
        existingRow.remove();
      } else {
        existingQuantity.remove();
      }
    }
    var addBtn = productItem.querySelector(".quantityAdd");
    if (addBtn) {
      addBtn.style.display = "";
    }
    // Remove from selections
    delete productSelections[productName];
  }
}
