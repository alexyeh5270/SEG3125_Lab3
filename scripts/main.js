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
}

// MOD: read independent user preferences (vegetarian AND/OR gluten-free + organic)
function getUserRestriction() { // MOD: helper to build restriction object (required)
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
function applyTextSize() { // MOD: single handler for all three options
  const checked = document.querySelector('input[name="textSize"]:checked'); 
  document.body.classList.remove("textSmall", "textMedium", "textLarge"); //  reset

  if (!checked) return; // MOD: supports "cleared" state

  if (checked.value === "small") document.body.classList.add("textSmall");  
  if (checked.value === "medium") document.body.classList.add("textMedium"); 
  if (checked.value === "large") document.body.classList.add("textLarge"); 
}

function clearTextSize() { // MOD: uncheck all radios + reset classes
  document.querySelectorAll('input[name="textSize"]').forEach(r => r.checked = false); 
  document.body.classList.remove("textSmall", "textMedium", "textLarge");
}


// generate a checkbox list from a list of products
function populateListProductChoices(slct1, slct2) {
  // ORIGINAL: var s1 = document.getElementById(slct1);
  var s1 = document.getElementById(slct1); // MOD: kept only for compatibility (filtering no longer relies on select)

  var s2 = document.getElementById(slct2);
  s2.innerHTML = "";
// MOD: use checkbox/radio restrictions (+ organic)instead of select value
  var optionArray = restrictListProducts(products, getUserRestriction());  
  
  for (let i = 0; i < optionArray.length; i++) { 
    var product = products.find((p) => p.name === productName);

    var productItem = document.createElement("div");
    productItem.className = "productItem";
    productItem.style.fontSize = "inherit"; // ensure product list text scales with body text size classes

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "product";
    checkbox.value = productName;

    // ORIGINAL: (no checkbox id)
    // MOD: give checkbox a valid id so label click toggles the checkbox (improves usability)
    checkbox.id = "prod-" + productName.replace(/\s+/g, "-"); // MOD: remove spaces for valid HTML id
    productItem.appendChild(checkbox);

    if (product) {
      var img = document.createElement("img");
      img.src = product.imageUrl;
      img.className = "productImage";
      productItem.appendChild(img);
    }

    var organicTag = product && product.organic ? " (Organic)" : "";

    var label = document.createElement("label");
    label.htmlFor = checkbox.id; // connect label to checkbox id so clicking label toggles it
    label.style.fontSize = "inherit"; // override CSS fixed label font-size so text-size choice affects product list too

    label.appendChild(
      document.createTextNode(productName + organicTag + " - $" + product.price),
    );

    productItem.appendChild(label);
    s2.appendChild(productItem);
  }
}


function selectedItems() {
  var ele = document.getElementsByName("product");
  var chosenProducts = [];

  var c = document.getElementById("displayCart");
  c.innerHTML = "";

  var para = document.createElement("P");
  para.innerHTML = "You selected : ";
  para.appendChild(document.createElement("br"));

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

      var organicTag = product && product.organic ? " (Organic)" : ""; 
      cartItem.appendChild(
        document.createTextNode(ele[i].value + organicTag + " - $" + product.price), 
      );

      para.appendChild(cartItem);
      para.appendChild(document.createElement("br"));
      chosenProducts.push(ele[i].value);
    }
  }

  c.appendChild(para);
  c.appendChild(
    document.createTextNode("Total Price is: $" + getTotalPrice(chosenProducts)),
  );
}

window.addEventListener("DOMContentLoaded", function () { //  auto-open Client tab on load
  const btn = document.getElementById("defaultOpen");     //  get the real tab button
  if (btn) btn.click();                                  //  guard in case id is missing
});