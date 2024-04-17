function addToCart() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  let productName = document.getElementById("nam").innerHTML.trim();
  let productPrice = document
    .querySelector(".detail-value:last-child")
    .textContent.trim();
  let c = document.getElementById("cm").innerHTML.trim();

  let q = cartItems.findIndex((item) => item.name === productName);
  if (q !== -1) {
    cartItems[q].quantity++;
  } else {
    let product = {
      name: productName,
      price: productPrice,
      cm: c,
      quantity: 1,
    };

    cartItems.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));

  alert("Product successfully added to cart!");
}

document.getElementById("add").addEventListener("click", addToCart);
