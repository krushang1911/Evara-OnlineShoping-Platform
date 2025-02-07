function displayCompareItems() {
  const compareList = JSON.parse(localStorage.getItem("compareList")) || []
  const compareContainer = document.getElementById("compareItems")
  const noCompareItems = document.getElementById("noCompareItems")

  if (compareList.length === 0) {
    compareContainer.innerHTML = ""
    noCompareItems.style.display = "block"
    return
  }

  noCompareItems.style.display = "none"

  compareContainer.innerHTML = compareList
    .map(
      (product, index) => `
        <tr>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="removeFromCompare(${index})">Remove</button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function addToCompare(event) {
  event.preventDefault()
  const name = document.getElementById("productName").value
  const price = document.getElementById("productPrice").value
  const description = document.getElementById("productDescription").value

  const newProduct = { name, price, description }

  const compareList = JSON.parse(localStorage.getItem("compareList")) || []
  compareList.push(newProduct)
  localStorage.setItem("compareList", JSON.stringify(compareList))

  displayCompareItems()
  document.getElementById("addProductForm").reset()
}

function removeFromCompare(index) {
  const compareList = JSON.parse(localStorage.getItem("compareList")) || []
  compareList.splice(index, 1)
  localStorage.setItem("compareList", JSON.stringify(compareList))
  displayCompareItems()
}

document.addEventListener("DOMContentLoaded", () => {
  displayCompareItems()
  document.getElementById("addProductForm").addEventListener("submit", addToCompare)
})

