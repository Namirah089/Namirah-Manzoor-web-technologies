var cart = [];
var MAX_LIMIT = 3;

document.addEventListener("DOMContentLoaded", function () {
  setupCartUI();
  setupAddToCartButtons();
});

function setupCartUI() {
  var cartBtn = document.querySelector("nav .btn-outline-light");
  if (!cartBtn) return;

  cartBtn.parentElement.style.position = "relative";

  var miniCart = document.createElement("div");
  miniCart.id = "mini-cart";
  miniCart.style.display = "none";
  miniCart.style.position = "absolute";
  miniCart.style.right = "0px";
  miniCart.style.top = "100%";
  miniCart.style.width = "280px";
  miniCart.style.backgroundColor = "white";
  miniCart.style.color = "black";
  miniCart.style.border = "1px solid #ccc";
  miniCart.style.padding = "15px";
  miniCart.style.borderRadius = "8px";
  miniCart.style.zIndex = "10000";

  cartBtn.parentElement.appendChild(miniCart);

  cartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (miniCart.style.display === "none") {
      miniCart.style.display = "block";
    } else {
      miniCart.style.display = "none";
    }
  });
}

function setupAddToCartButtons() {
  var buttons = document.querySelectorAll(".col-12 button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      var buttonClicked = event.target;
      var cardDiv = buttonClicked.parentElement;

      var productName = cardDiv.querySelector("h5").innerText;
      var priceText = cardDiv.querySelector(".fw-bold").innerText;
      var productPrice = parseFloat(priceText.replace("$", ""));

      var count = 0;
      for (var j = 0; j < cart.length; j++) {
        if (cart[j].name === productName) {
          count++;
        }
      }

      if (count < MAX_LIMIT) {
        cart.push({ name: productName, price: productPrice });
        updateCart();

        if (count + 1 >= MAX_LIMIT) {
          buttonClicked.innerText = "Limit reached";
          buttonClicked.disabled = true;
          buttonClicked.style.backgroundColor = "gray";
        }
      }
    });
  }
}

function updateCart() {
  var cartBtn = document.querySelector("nav .btn-outline-light");
  if (cartBtn) {
    cartBtn.innerText = "🛒 Cart (" + cart.length + ")";
  }

  var miniCart = document.getElementById("mini-cart");
  if (!miniCart) return;

  if (cart.length === 0) {
    miniCart.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  var totalPrice = 0;
  var itemsListHtml = "<h6>Your Cart</h6><ul>";

  for (var i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price;
    itemsListHtml +=
      "<li>" +
      cart[i].name +
      " - $" +
      cart[i].price.toFixed(2) +
      " <button onclick='removeItem(" +
      i +
      ")'>Remove</button></li>";
  }

  itemsListHtml += "</ul>";
  itemsListHtml +=
    "<p><strong>Total: $" + totalPrice.toFixed(2) + "</strong></p>";
  itemsListHtml +=
    "<a href='checkout.html' class='btn btn-success btn-sm w-100'>Checkout</a>";

  miniCart.innerHTML = itemsListHtml;
}

function removeItem(index) {
  var removedProduct = cart[index];
  cart.splice(index, 1);

  var cards = document.querySelectorAll(".col-12");
  for (var i = 0; i < cards.length; i++) {
    var cardName = cards[i].querySelector("h5").innerText;
    if (cardName === removedProduct.name) {
      var cardButton = cards[i].querySelector("button");
      cardButton.innerText = "Add to Cart";
      cardButton.disabled = false;
      cardButton.style.backgroundColor = "";
    }
  }

  updateCart();
}
