//this function is called when the "Add selected items to cart" button is clicked
function selectedItems() {
  var ele = document.getElementsByName("product");
  var chosenProducts = [];
  var productQuantities = {};

  var c = document.getElementById("displayCart");
  c.innerHTML = "";

  var para = document.createElement("P");
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
      cartItem.appendChild(document.createTextNode(ele[i].value));
      cartItem.appendChild(document.createElement("br"));
      cartItem.appendChild(document.createTextNode("Qty: " + quantity));
      cartItem.appendChild(document.createElement("br"));
      cartItem.appendChild(
        document.createTextNode(
          "Price: $" + (product.price * quantity).toFixed(2), //sums total price for each item based on quantity
        ),
        document.createTextNode(
          ele[i].value + organicTag + " - $" + product.price,
        ),
      );

      para.appendChild(cartItem);
      para.appendChild(document.createElement("br"));
      chosenProducts.push(ele[i].value);
      productQuantities[ele[i].value] = parseInt(quantity);
    }
  }

  if (chosenProducts.length !== 0) {
    showSnackbar(); // Show notification snackbar
    c.appendChild(para);
    c.appendChild(
      document.createTextNode(
        "Total Price is: $" + getTotalPrice(chosenProducts, productQuantities), //sums all items with quantities
      ),
    );
  } else {
    var emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No items added to cart.";
    emptyMessage.style.fontStyle = "italic";
    emptyMessage.style.color = "#666";
    c.appendChild(emptyMessage);
  }
}
