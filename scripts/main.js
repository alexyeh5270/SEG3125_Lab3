// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Repopulate products when switching to Products tab
  if (tabName === "Products") {
    populateListProductChoices("dietSelect", "displayProduct");
  }
}

// MOD: read independent user preferences (vegetarian AND/OR gluten-free + organic)
function getUserRestriction() {
  // MOD: helper to build restriction object (required)
  var vegEl = document.getElementById("chkVegetarian"); // MOD: new checkbox id
  var glutenEl = document.getElementById("chkGlutenFree"); // MOD: new checkbox id
  var organicEl = document.querySelector('input[name="organicPref"]:checked'); // MOD: new radio group

  return {
    vegetarian: vegEl ? vegEl.checked : false, // MOD: supports OR by being independent
    glutenFree: glutenEl ? glutenEl.checked : false, // MOD
    organicPref: organicEl ? organicEl.value : "any", // MOD: "any" | "organic" | "nonOrganic"
  };
}

// MOD (optional): Lucie large text toggle
function applyTextSize() {
  // MOD: single handler for all three options
  const checked = document.querySelector('input[name="textSize"]:checked');
  document.body.classList.remove("textSmall", "textMedium", "textLarge"); //  reset

  if (!checked) return; // MOD: supports "cleared" state

  if (checked.value === "small") document.body.classList.add("textSmall");
  if (checked.value === "medium") document.body.classList.add("textMedium");
  if (checked.value === "large") document.body.classList.add("textLarge");
}

function clearTextSize() {
  // MOD: uncheck all radios + reset classes
  document
    .querySelectorAll('input[name="textSize"]')
    .forEach((r) => (r.checked = false));
  document.body.classList.remove("textSmall", "textMedium", "textLarge");
}

// generate a checkbox list from a list of products
function populateListProductChoices(slct1, slct2) {
  // ORIGINAL: var s1 = document.getElementById(slct1);
  var s1 = document.getElementById(slct1); // MOD: kept for compatibility; filtering now uses checkboxes/radios

  var s2 = document.getElementById(slct2);
  if (!s2) return;
  s2.innerHTML = "";

  // ORIGINAL: var optionArray = restrictListProducts(products, getUserRestriction());
  // MOD: keep your existing filter output (names), then map to product objects for categorization
  var optionArray = restrictListProducts(products, getUserRestriction()); // MOD: diet + gluten + organic (already sorted by price)
  var filteredProds = optionArray.map((nm) => products.find((p) => p.name === nm)).filter(Boolean); // MOD: convert names -> product objects

  // MOD: group filtered products by category (structure requirement)
  var byCat = {}; // MOD
  for (let i = 0; i < filteredProds.length; i++) { // MOD: block-scoped i
    var p = filteredProds[i]; // MOD
    var cat = p.category ? p.category : "Other"; // MOD: fallback category
    if (!byCat[cat]) byCat[cat] = []; // MOD
    byCat[cat].push(p); // MOD
  }

  var categories = Object.keys(byCat); // MOD
  categories.sort(); // MOD: predictable category order

  // MOD: build accordion UI (one category visible at a time)
  for (let c = 0; c < categories.length; c++) { // MOD
    var catName = categories[c]; // MOD

    var btn = document.createElement("button"); // MOD
    btn.type = "button"; // MOD
    btn.className = "accordion"; // MOD
    btn.textContent = catName; // MOD
    s2.appendChild(btn); // MOD

    var panel = document.createElement("div"); // MOD
    panel.className = "panel"; // MOD

    var inner = document.createElement("div"); // MOD
    inner.className = "panelInner"; // MOD

    var grid = document.createElement("div"); // MOD
    grid.className = "productGrid"; // MOD: use grid inside category

    // MOD: ensure each category is sorted by price (even after grouping)
    byCat[catName].sort((a, b) => a.price - b.price); // MOD

    // MOD: create product cards inside this category panel
    for (let j = 0; j < byCat[catName].length; j++) { // MOD
      var product = byCat[catName][j]; // MOD
      var productName = product.name; // MOD

      var productItem = document.createElement("div");
      productItem.className = "productItem";
      productItem.style.fontSize = "inherit"; // MOD: allow text-size choice to affect product entries

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "product";
      checkbox.value = productName;
      checkbox.addEventListener("change", addQuantityInput); // MOD: keep your quantity behavior

      checkbox.id = "prod-" + productName.replace(/\s+/g, "-"); // MOD
      productItem.appendChild(checkbox);

      var img = document.createElement("img"); // MOD
      img.src = product.imageUrl; // MOD
      img.className = "productImage"; // MOD
      productItem.appendChild(img); // MOD

      var organicTag = product.organic ? " (Organic)" : ""; // MOD

      var label = document.createElement("label");
      label.htmlFor = checkbox.id; // MOD
      label.style.fontSize = "inherit"; // MOD

      label.appendChild(
        document.createTextNode(productName + organicTag + " - $" + product.price),
      );
      productItem.appendChild(label);

      grid.appendChild(productItem); // MOD
    }

    inner.appendChild(grid); // MOD
    panel.appendChild(inner); // MOD
    s2.appendChild(panel); // MOD
  }

  // MOD: wire accordion behavior (close others when one opens)
  var acc = s2.getElementsByClassName("accordion"); // MOD
  for (let k = 0; k < acc.length; k++) { // MOD
    acc[k].addEventListener("click", function () { // MOD
      for (let m = 0; m < acc.length; m++) { // MOD
        if (acc[m] !== this) { // MOD
          acc[m].classList.remove("active"); // MOD
          var otherPanel = acc[m].nextElementSibling; // MOD
          if (otherPanel) otherPanel.style.maxHeight = null; // MOD
        }
      }

      this.classList.toggle("active"); // MOD
      var panel = this.nextElementSibling; // MOD
      if (!panel) return; // MOD
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null; // MOD: collapse
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px"; // MOD: expand to fit content
      }
    });
  }

  // MOD: open the first category by default (so user sees items immediately)
  if (acc.length > 0) acc[0].click(); // MOD
}

//adds a quantity input field when a product is selected
function addQuantityInput(event) {
  var checkbox = event.target;
  var productItem = checkbox.parentElement;

  //check if a quantity input already exists
  var existingQuantity = productItem.querySelector("input[type='number']");

  if (checkbox.checked) {
    //if no quantity input exists, create one
    if (!existingQuantity) {
      var quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.name = "quantity_" + checkbox.value;
      quantityInput.min = "1";
      quantityInput.value = "1";
      quantityInput.style.width = "60px";
      quantityInput.style.marginLeft = "8px";
      productItem.appendChild(quantityInput);
    }
  } else {
    //if unchecked, remove the quantity input
    if (existingQuantity) {
      existingQuantity.remove();
    }
  }
}

//this function is called when the "Add selected items to cart" button is clicked
function selectedItems() {
  var ele = document.getElementsByName("product");
  var chosenProducts = [];
  var productQuantities = {};

  var c = document.getElementById("displayCart");
  c.innerHTML = "";

  var para = document.createElement("P");
  para.innerHTML = "You selected : ";
  para.appendChild(document.createElement("br"));

  //iterates through all the checkboxes to see which were selected
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      var product = products.find((p) => p.name === ele[i].value);

      var cartItem = document.createElement("div");
      cartItem.className = "cartItem";

      if (product) {
        var img = document.createElement("img");
        img.src = product.imageUrl;
        img.className = "cartImage";
        cartItem.appendChild(img);
      }

      //adds organic tag if applicable
      var organicTag = product && product.organic ? " (Organic)" : "";
      // Get the quantity value for this product
      var productItem = ele[i].parentElement;
      var quantityInput = productItem.querySelector("input[type='number']");
      var quantity = quantityInput ? quantityInput.value : "1";

      // add product name with quantity and price on separate lines
      var qty = quantityInput ? parseInt(quantityInput.value, 10) : 1; 
      var unitPrice = product.price.toFixed(2); 
      var line1 = document.createElement("span"); 
      line1.textContent = ele[i].value + organicTag + " - $" + unitPrice + " each"; 
      cartItem.appendChild(line1);

      cartItem.appendChild(document.createElement("br")); 
      cartItem.appendChild(document.createElement("br")); 

      var line2 = document.createElement("span"); 
      line2.textContent = "Qty: " + qty; 
      cartItem.appendChild(line2); 

      cartItem.appendChild(document.createElement("br"));
      cartItem.appendChild(document.createElement("br")); 

      var line3 = document.createElement("span");
      line3.textContent = "Price: $" + (product.price * qty).toFixed(2);
      cartItem.appendChild(line3);

      para.appendChild(cartItem);
      para.appendChild(document.createElement("br"));
      chosenProducts.push(ele[i].value);
      productQuantities[ele[i].value] = parseInt(quantity);
    }
  }

  c.appendChild(para);
  c.appendChild(
    document.createTextNode(
      "Total Price is: $" + getTotalPrice(chosenProducts, productQuantities), //sums all items with quantities
    ),
  );
}

window.addEventListener("DOMContentLoaded", function () {
  //  auto-open Client tab on load
  const btn = document.getElementById("defaultOpen"); //  get the real tab button
  if (btn) btn.click(); //  guard in case id is missing

  // Populate products list on page load
  populateListProductChoices("dietSelect", "displayProduct");
});
