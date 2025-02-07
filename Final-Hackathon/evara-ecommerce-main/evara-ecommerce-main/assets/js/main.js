/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});

document.addEventListener('DOMContentLoaded', function() {
  
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartTable = document.querySelector('.cart__table');
  const cartActions = document.querySelector('.cart__actions');
  const cartSummary = document.querySelector('.cart__summary');
  let subtotal = 0;

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartTable.style.display = 'none';
    cartActions.style.display = 'none';
    cartSummary.style.display = 'none';
  } else {
    emptyCartMessage.style.display = 'none';
    cartTable.style.display = 'table';
    cartActions.style.display = 'flex';
    cartSummary.style.display = 'block';

    cart.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        </td>
        <td>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</td>
        <td><button onclick="removeFromCart(${index})" class="btn btn--sm">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);

      subtotal += parseFloat(item.price.replace('$', '')) * item.quantity;
    });
  }

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTotal.textContent = `$${subtotal.toFixed(2)}`;
  updateCartCount();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity = parseInt(newQuantity);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.querySelector('.header__action-btn[title="Cart"] .count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

displayCart();

function randomDate() {
  const start = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to format date as MM/DD/YYYY
function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

// Function to generate random order data
function generateOrderData() {
  const orderStatuses = ['Processing', 'Completed', 'Shipped'];
  return {
    orderId: Math.floor(1000 + Math.random() * 9000),
    date: formatDate(randomDate()),
    status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
    total: (Math.random() * 500 + 50).toFixed(2)
  };
}

// Function to populate the orders table
function populateOrdersTable() {
  const orderTableBody = document.getElementById('orderTableBody');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  // If there are no orders in localStorage, generate some random ones
  if (orders.length === 0) {
    for (let i = 0; i < 5; i++) {
      orders.push(generateOrderData());
    }
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  // Clear existing table rows
  orderTableBody.innerHTML = '';

  // Add order rows to the table
  orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${order.orderId}</td>
      <td>${order.date}</td>
      <td>${order.status}</td>
      <td>$${order.total}</td>
      <td><a href="#" class="view__order">View</a></td>
    `;
    orderTableBody.appendChild(row);
  });

// Call the function to populate the orders table
populateOrdersTable();
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
                let message = '';

                switch(selectedMethod) {
                    case 'upi':
                        const upiId = document.querySelector('#upiFields input').value;
                        message = `Order placed successfully. Payment will be processed via UPI ID: ${upiId}`;
                        break;
                    case 'card':
                        message = 'Order placed successfully. Payment will be processed via the provided card details.';
                        break;
                    case 'cod':
                        message = 'Order placed successfully. Payment will be collected upon delivery.';
                        break;
                }

                alert(message);
                // Here you would typically send the form data to a server
            });

            // Function to display cart items
  function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || []
    const orderTable = document.querySelector(".order__table tbody")
    let subtotal = 0

    // Clear existing rows except the last three (subtotal, shipping, total)
    while (orderTable.rows.length > 3) {
      orderTable.deleteRow(0)
    }

    cartItems.forEach((item) => {
      const row = orderTable.insertRow(0)
      row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" class="order__img" />
                </td>
                <td>
                    <h3 class="table__title">${item.name}</h3>
                    <p class="table__quantity">x ${item.quantity}</p>
                </td>
                <td><span class="table__price">$${(item.price * item.quantity).toFixed(2)}</span></td>
            `
      subtotal += item.price * item.quantity
    })

    // Update subtotal
    orderTable.rows[orderTable.rows.length - 3].cells[1].innerHTML =
      `<span class="table__price">$${subtotal.toFixed(2)}</span>`

    // Update total
    const total = subtotal // Add shipping cost if applicable
    orderTable.rows[orderTable.rows.length - 1].cells[1].innerHTML =
      `<span class="order__grand-total">$${total.toFixed(2)}</span>`
  }

  // Call this function when the page loads
  displayCartItems()

  // Payment method selection
  const paymentMethods = document.getElementsByName("paymentMethod")
  const paymentFields = document.querySelectorAll(".payment-fields")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      paymentFields.forEach((field) => (field.style.display = "none"))
      document.getElementById(`${this.value}Fields`).style.display = "block"
    })
  })

  // Card validation and "Add Card" functionality
  const cardNumber = document.getElementById("cardNumber")
  const cardName = document.getElementById("cardName")
  const cardExpiry = document.getElementById("cardExpiry")
  const cardCVV = document.getElementById("cardCVV")
  const addCardBtn = document.getElementById("addCardBtn") // Declare addCardBtn

  cardNumber.addEventListener("input", function () {
    this.value = this.value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
    validateCard(this.value.replace(/\s/g, ""))
  })

  cardExpiry.addEventListener("input", function () {
    this.value = this.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .substr(0, 5)
    validateExpiry(this.value)
  })

  cardCVV.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").substr(0, 3)
  })

  function validateCard(number) {
    const regex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/
    const isValid = regex.test(number)
    cardNumber.style.borderColor = isValid ? "green" : "red"
  }

  function validateExpiry(expiry) {
    const [month, year] = expiry.split("/")
    const now = new Date()
    const expiryDate = new Date(20 + year, month - 1)
    const isValid = expiryDate > now && month >= 1 && month <= 12
    cardExpiry.style.borderColor = isValid ? "green" : "red"
  }

  addCardBtn.addEventListener("click", () => {
    const cardData = {
      number: cardNumber.value,
      name: cardName.value,
      expiry: cardExpiry.value,
      cvv: cardCVV.value,
    }

    if (validateCardData(cardData)) {
      saveCard(cardData)
      displaySavedCards()
      clearCardFields()
    } else {
      alert("Please enter valid card details.")
    }
  })

  function validateCardData(cardData) {
    return (
      cardData.number.replace(/\s/g, "").length === 16 &&
      cardData.name.trim() !== "" &&
      cardData.expiry.length === 5 &&
      cardData.cvv.length === 3
    )
  }

  function saveCard(cardData) {
    const savedCards = JSON.parse(localStorage.getItem("savedCards")) || []
    savedCards.push(cardData)
    localStorage.setItem("savedCards", JSON.stringify(savedCards))
  }

  function displaySavedCards() {
    const savedCards = JSON.parse(localStorage.getItem("savedCards")) || []
    const savedCardsContainer = document.getElementById("savedCardsContainer") // Assuming this element exists
    savedCardsContainer.innerHTML = savedCards
      .map(
        (card, index) => `
            <div class="saved-card">
                <span>Card ending in ${card.number.slice(-4)}</span>
                <button onclick="selectCard(${index})">Use this card</button>
            </div>
        `,
      )
      .join("")
  }

  function clearCardFields() {
    cardNumber.value = ""
    cardName.value = ""
    cardExpiry.value = ""
    cardCVV.value = ""
  }

  window.selectCard = (index) => {
    const savedCards = JSON.parse(localStorage.getItem("savedCards")) || []
    const selectedCard = savedCards[index]
    cardNumber.value = selectedCard.number
    cardName.value = selectedCard.name
    cardExpiry.value = selectedCard.expiry
    cardCVV.value = selectedCard.cvv
  }

  // Initial display of saved cards
  displaySavedCards()

  // Form submission
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value
    let message = ""

    switch (selectedMethod) {
      case "upi":
        const upiId = document.querySelector("#upiFields input").value
        message = `Order placed successfully. Payment will be processed via UPI ID: ${upiId}`
        break
      case "card":
        message = "Order placed successfully. Payment will be processed via the provided card details."
        break
      case "cod":
        message = "Order placed successfully. Payment will be collected upon delivery."
        break
    }

    alert(message)
    // Here you would typically send the form data to a server
    // After successful order placement, clear the cart
    localStorage.removeItem("cart")
    displayCartItems() // Refresh the display
  })

  // Function to display cart items in the checkout page
  function displayCheckoutItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || []
    const orderTableBody = document.getElementById("orderTableBody")
    let subtotal = 0

    // Clear existing product rows
    while (orderTableBody.rows.length > 3) {
      orderTableBody.deleteRow(0)
    }

    // Add cart items to the table
    cartItems.forEach((item) => {
      const row = orderTableBody.insertRow(0)
      row.innerHTML = `
        <td>
          <img src="${item.image}" alt="${item.name}" class="order__img" />
        </td>
        <td>
          <h3 class="table__title">${item.name}</h3>
          <p class="table__quantity">x ${item.quantity}</p>
        </td>
        <td><span class="table__price">$${(item.price * item.quantity).toFixed(2)}</span></td>
      `
      subtotal += item.price * item.quantity
    })

    // Update subtotal and total
    document.getElementById("orderSubtotal").textContent = `$${subtotal.toFixed(2)}`
    document.getElementById("orderTotal").textContent = `$${subtotal.toFixed(2)}`
  }

  // Call the function when the page loads
  if (document.getElementById("orderTableBody")) {
    displayCheckoutItems()
  }

  // Handle form submission
  const checkoutForm = document.getElementById("checkoutForm")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the form data to a server
      alert("Order placed successfully!")
      // Clear the cart after successful order placement
      localStorage.removeItem("cart")
      displayCheckoutItems() // Refresh the display
    })
  }

});

