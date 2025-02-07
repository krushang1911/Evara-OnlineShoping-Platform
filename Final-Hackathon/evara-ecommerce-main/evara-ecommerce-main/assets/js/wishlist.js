// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

function addToWishlist(productId, productName, productPrice, productImage) {
  const existingItem = wishlist.find((item) => item.id === productId)
  if (!existingItem) {
    wishlist.push({ id: productId, name: productName, price: productPrice, image: productImage })
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    updateWishlistCount()
    showWishlistConfirmation(productName)
  } else {
    alert("This item is already in your wishlist!")
  }
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => item.id !== productId)
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  updateWishlistCount()
  if (window.location.pathname.includes("wishlist.html")) {
    displayWishlistItems()
  }
}

function updateWishlistCount() {
  const wishlistCount = document.querySelector('.header__action-btn[title="Wishlist"] .count')
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length
  }
}

function showWishlistConfirmation(productName) {
  alert(`${productName} has been added to your wishlist!`)
}

function displayWishlistItems() {
  const wishlistContainer = document.getElementById("wishlistItems")
  if (wishlistContainer) {
    wishlistContainer.innerHTML = ""
    wishlist.forEach((item) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" width="50"></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>In Stock</td>
        <td><button class="add-to-cart" data-product-id="${item.id}">Add to Cart</button></td>
        <td><button class="remove-from-wishlist" data-product-id="${item.id}">Remove</button></td>
      `
      wishlistContainer.appendChild(row)
    })

    // Add event listeners for the new buttons
    wishlistContainer.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id")
        const item = wishlist.find((i) => i.id === productId)
        if (item) {
          addToCart(item.id, item.name, item.price)
        }
      })
    })

    wishlistContainer.querySelectorAll(".remove-from-wishlist").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id")
        removeFromWishlist(productId)
      })
    })
  }
}

// Initialize wishlist count and display on page load
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistCount()
  if (window.location.pathname.includes("wishlist.html")) {
    displayWishlistItems()
  }

  // Add event listeners to "Add to Wishlist" buttons
  const addToWishlistButtons = document.querySelectorAll('.action__btn[aria-label="Add to Wishlist"]')
  addToWishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const productItem = this.closest(".product__item")
      const productId = productItem.dataset.productId
      const productName = productItem.querySelector(".product__title").textContent
      const productPrice = productItem.querySelector(".new__price").textContent
      const productImage = productItem.querySelector(".product__img.default").src
      addToWishlist(productId, productName, productPrice, productImage)
    })
  })
})

// Ensure the addToCart function is available
function addToCart(productId, productName, productPrice) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.push({ id: productId, name: productName, price: productPrice })
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  alert(`${productName} has been added to your cart!`)
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = document.querySelector('.header__action-btn[title="Cart"] .count')
  if (cartCount) {
    cartCount.textContent = cart.length
  }
}