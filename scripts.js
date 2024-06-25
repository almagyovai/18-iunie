const products = [
  { id: 1, name: "Product 1", price: 10, quantity: 3},
  { id: 2, name: "Product 2", price: 20, quantity: 5},
  { id: 3, name: "Product 3", price: 30, quantity: 0},
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
          <div class="col-md-4 mb-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">$${product.price}</p>
                      <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                      <button type="button" class="btn btn-primary">
  In Stock <span class="badge badge-light">${product.quantity}</span>
</button>
                  </div>
              </div>
          </div>
      `
    )
    

    .join("");

  // selectez toate elementele cu clasa "add-to-card"
  document
    .querySelectorAll(".add-to-cart")
    // le parcurg
    .forEach((button) => {
      // fiecarui button ii spun ce sa faca la "click"
      button.addEventListener("click", (event) => {
        // ma uit in attribute - acolo am pus id-ul produsului ca informatie
        // si preiau cu getAttribute acea valoare
        const productId = parseInt(event.target.getAttribute("data-id"));

        // o pasez functiei addToCart ca parametru
        addToCart(productId);
      });
    });
}
 
function renderCart() {
  // cart-list fiind un element in index.html
  const cartList = document.getElementById("cart-list");

  // ii dictez ce sa contina
  cartList.innerHTML =
    // folosind cart object, iterand prin el cu map
    cart
      .map(
        // plus fiecarui element ii spun cum sa arate cu niste HTML si bootstrap classes
        (item) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} - $${item.price}
              <button class="btn btn-danger btn-primary remove-from-cart" data-id="${item.id}">Remove</button>
          </li>
      `
      )
      
      // iar la final facem join, ca din array (prin cart.map)
      // sa devina un string, stringul fiind cel asteptat in .innerHTML (ceva de genul: "<li>test</li><li>test</li><li>test</li>")
      .join("");

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    //  TODO: implementeaza ce sa faca remove from cart ✔

      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  // TODO: "impinge" produsul in lista de cart ✔
  // asta trebuie sa faci tu :)
  if (product && product.quantity > 0) {
    // Decrease stock quantity
    product.quantity -= 1;

    // Pushing the product into the cart
    cart.push({ ...product });

    // Updating the display
    renderCart();
  } else {
    alert("Product is out of stock");
  }

  renderProducts();
  renderCart();
  // ca sa afisez actualizat - practic fac override la ce am deja in innerHTML

}

function removeFromCart(productId) {
  // filtreaza-mi tot ce e diferit ce input "productId"
  // obtin un array fara ce am pasat in input
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    const removedProduct = cart.splice(index, 1)[0];

    // Find the corresponding product in products array
    const originalProduct = products.find((p) => p.id === removedProduct.id);
    if (originalProduct) {
      originalProduct.quantity += 1; // Increment quantity back
    }

    renderProducts();
    renderCart();
}
}

// Function to calculate the total price of the cart
function getTotal() {
  const initialTotalValue = 0; // initially, the total is 0 RON

  const calculationLogic = (total, product) => {
    const calculatedTotal = Math.round(total + product.price);
    return calculatedTotal;
  };

  return cart.reduce(calculationLogic, initialTotalValue);
}

// Function to count the number of products in the cart
function countProducts() {
  return cart.length;
}

// Function to get the list of product names from the cart
function getProductsFromCart() {
  return cart.map(product => product.name).join(', ');
}

// Function to provide checkout information
function getCheckoutInfo() {
  const total = getTotal();
  const numberOfProducts = countProducts();
  const productsList = getProductsFromCart();
  const description = "Your cart contains: " + productsList;

  return {
    total,
    numberOfProducts,
    productsList,
    descriptionMessage: description,
  };
}

// Function to handle the checkout process
function checkout() {
  // Check if the cart is empty
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return "Your cart is empty.";
  }

  // Get checkout information
  const checkoutInfo = getCheckoutInfo();

  // Construct the alert message
  const alertMessage = `
    Total Price: $${checkoutInfo.total}
    Number of Products: ${checkoutInfo.numberOfProducts}
    Products: ${checkoutInfo.productsList}
  `;

  // Display the alert message
  alert(alertMessage);

  // Return the checkout information for further use if needed
  return checkoutInfo;
}


document.getElementById("checkout-btn").addEventListener("click", checkout);

renderProducts();

document.getElementById("checkout-btn").addEventListener("click", 'show');


