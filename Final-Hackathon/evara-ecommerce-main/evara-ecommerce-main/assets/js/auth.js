document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login .form")
  const registerForm = document.querySelector(".register .form")
  const loginRegisterLink = document.querySelector(".header__top-action")
  const navLoginLink = document.querySelector('.nav__link[href="login-register.html"]')

  function updateAuthUI(isLoggedIn) {
    if (isLoggedIn) {
      loginRegisterLink.textContent = "Logout"
      loginRegisterLink.href = "#"
      loginRegisterLink.addEventListener("click", logout)

      if (navLoginLink) {
        navLoginLink.textContent = "My Account"
        navLoginLink.href = "accounts.html"
      }
    } else {
      loginRegisterLink.textContent = "Log In / Sign Up"
      loginRegisterLink.href = "login-register.html"
      loginRegisterLink.removeEventListener("click", logout)

      if (navLoginLink) {
        navLoginLink.textContent = "Login"
        navLoginLink.href = "login-register.html"
      }
    }
  }

  function login(email, password) {
    // Here you would typically send a request to your server to authenticate the user
    // For this example, we'll just check if the email and password are not empty
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      updateAuthUI(true)
      alert("Logged in successfully!")
    } else {
      alert("Invalid email or password")
    }
  }

  function logout() {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    updateAuthUI(false)
    alert("Logged out successfully!")
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      const password = this.querySelector('input[type="password"]').value
      login(email, password)
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      const password = this.querySelector('input[type="password"]').value
      const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      // Here you would typically send a request to your server to register the user
      // For this example, we'll just log in the user directly
      login(email, password)
    })
  }

  // Check if user is logged in on page load
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  updateAuthUI(isLoggedIn)
})

