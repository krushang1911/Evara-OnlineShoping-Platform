document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.querySelector(".btn.btn--sm")
  const wishlistBtn = document.querySelector(".details__action-btn")
  const cartCount = document.querySelector('.header__action-btn[title="Cart"] .count')
  const wishlistCount = document.querySelector('.header__action-btn[title="Wishlist"] .count')
  const reviewForm = document.getElementById("reviewForm")
  const ratingStars = document.querySelectorAll(".rate__product .fi-rs-star")
  let selectedRating = 0

  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const count = Number.parseInt(cartCount.textContent)
    cartCount.textContent = count + 1
    alert("Product added to cart!")
  })

  wishlistBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const count = Number.parseInt(wishlistCount.textContent)
    wishlistCount.textContent = count + 1
    alert("Product added to wishlist!")
  })

  // Handle star rating selection
  ratingStars.forEach((star) => {
    star.addEventListener("click", function () {
      selectedRating = this.dataset.rating
      ratingStars.forEach((s, index) => {
        if (index < selectedRating) {
          s.classList.add("active")
        } else {
          s.classList.remove("active")
        }
      })
    })
  })

  // Handle review submission
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("reviewName").value
    const email = document.getElementById("reviewEmail").value
    const comment = document.getElementById("reviewComment").value

    if (selectedRating === 0) {
      alert("Please select a rating")
      return
    }

    const review = {
      name,
      email,
      comment,
      rating: selectedRating,
      date: new Date().toLocaleString(),
    }

    saveReview(review)
    displayReviews()
    reviewForm.reset()
    selectedRating = 0
    ratingStars.forEach((s) => s.classList.remove("active"))
  })

  function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem("productReviews")) || []
    reviews.push(review)
    localStorage.setItem("productReviews", JSON.stringify(reviews))
  }

  function displayReviews() {
    const reviewsContainer = document.querySelector(".reviews__container")
    const reviews = JSON.parse(localStorage.getItem("productReviews")) || []

    reviewsContainer.innerHTML = reviews
      .map(
        (review) => `
            <div class="review__single">
                <div>
                    <h4 class="review__title">${review.name}</h4>
                </div>
                <div class="review__data">
                    <div class="review__rating">
                        ${Array(5)
                          .fill()
                          .map(
                            (_, index) => `
                            <i class="fi ${index < review.rating ? "fi-rs-star" : "fi-rs-star-o"}"></i>
                        `,
                          )
                          .join("")}
                    </div>
                    <p class="review__description">${review.comment}</p>
                    <span class="review__date">${review.date}</span>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Initial display of reviews
  displayReviews()
})

