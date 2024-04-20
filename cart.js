const items = JSON.parse(localStorage.getItem("cart"));
if (!items || items.length === 0) {
  emp("No items in your cart", "danger");
}

function emp(message, color = "success") {
  const myToast = document.getElementById("myToast");
  const toastBody = myToast.querySelector(".toast-body");
  toastBody.innerText = message;
  myToast.classList.remove("bg-success", "bg-danger"); // Remove previous color classes
  myToast.classList.add(`bg-${color}`); // Add new color class
  const bsToast = new bootstrap.Toast(myToast);
  bsToast.show();
}

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
function generateProductCard(product) {
  return `
        <div class="card mb-3">
          <div class="card-body">
            <div class="row c3">
              <div class="col-lg-4 col-md-8 col-sm-12 pic">
                <img src="companies/${product.cm}.webp" alt="" />
              </div>
              <div class="col-lg-8 col-md-6 col-sm-12 info">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text xyz">Quantity : ${product.quantity} </p>
                <p class="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        </div>
        `;
}

function renderProductCards() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cardHtml = generateProductCard(item);
    cartItemsContainer.innerHTML += cardHtml;
  });
}

// Render product cards when the page loads
window.addEventListener("DOMContentLoaded", renderProductCards);

const placeOrderLink = document.getElementById("pto");

if (!cartItems || cartItems.length === 0) {
  // If cart is empty, change the href attribute
  placeOrderLink.href = "#"; // Set it to a placeholder value or any other link you prefer
  placeOrderLink.classList.add("disabled"); // Optionally disable the link
}

function generateOrdersString() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let ordersString = "";
  cartItems.forEach((item) => {
    ordersString += `Name : ${item.name}\n Quantity : ${item.quantity}\n`;
  });
  return ordersString.trim(); // Remove trailing newline
}

let x = 0;
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    const quantity = item.quantity;
    x += quantity;
    const subtotal = price * quantity;
    console.log(subtotal);
    totalPrice += subtotal;
    console.log(totalPrice);
  });
  return totalPrice;
}
const total = calculateTotalPrice(cartItems);
document.getElementById("pr").innerHTML += " ₹";
document.getElementById("pr").innerHTML += total;

document.getElementById("qu").innerHTML += " " + x;

document.getElementById("orders").value = generateOrdersString();

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("scr").innerHTML =
    'Placing<div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>';

  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("orderForm")),
  })
    .then((response) => {
      // Check if the response is successful before opening the cart page
      if (response.ok) {
        console.log("Success");
        localStorage.clear();
        window.open("home.html", "_self");
      } else {
        // Handle errors if necessary
        alert("PLease try again");
        console.error("Error submitting form:", response.statusText);
      }
    })
    .catch((error) => {
      alert("Please try again");
      console.error("Error submitting form:", error);
    });
});
