document.addEventListener("DOMContentLoaded", () => {
  // Track Order Form Submission
  const trackOrderForm = document.querySelector(".track-order__form")
  if (trackOrderForm) {
    trackOrderForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const orderId = document.getElementById("order-id").value
      const email = document.getElementById("email").value
      // Here you would typically send a request to your server to get the order status
      // For this example, we'll just show the order status section
      document.getElementById("order-status").classList.remove("hidden")
    })
  }

  // Order Form Submission
  const orderForm = document.querySelector(".order__form")
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the order data to your server
      alert("Order placed successfully!")
    })
  }

  // Help Page Search
  const helpSearchInput = document.querySelector(".help__search-input")
  const helpSearchBtn = document.querySelector(".help__search-btn")
  if (helpSearchBtn) {
    helpSearchBtn.addEventListener("click", () => {
      const searchQuery = helpSearchInput.value
      // Here you would typically send the search query to your server or filter results
      alert(`Searching for: ${searchQuery}`)
    })
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq__question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      this.classList.toggle("active")
      const answer = this.nextElementSibling
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px"
      }
    })
  })
})

