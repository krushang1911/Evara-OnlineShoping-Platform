document.addEventListener('DOMContentLoaded', function() {
  const orderSummaryList = document.getElementById('orderSummaryList');
  const orderTotal = document.getElementById('orderTotal');
  const orderForm = document.getElementById('orderForm');

  function getCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  function updateOrderSummary() {
    const cart = getCartFromLocalStorage();
    orderSummaryList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      orderSummaryList.innerHTML = '<li class="summary__item">Your cart is empty</li>';
    } else {
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'summary__item';
        li.innerHTML = `
          <span class="item__name">${item.name}</span>
          <span class="item__quantity">x${item.quantity}</span>
          <span class="item__price">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummaryList.appendChild(li);
        total += item.price * item.quantity;
      });
    }

    orderTotal.textContent = `$${total.toFixed(2)}`;
  }

  updateOrderSummary();

  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(orderForm);
    const orderData = {
      customer: {
        name: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country')
      },
      paymentMethod: formData.get('payment'),
      items: getCartFromLocalStorage(),
      total: parseFloat(orderTotal.textContent.replace('$', ''))
    };

    // Here you would typically send the orderData to your server
    console.log('Order data:', orderData);
    alert('Order placed successfully!');
    
    // Clear the cart after successful order
    localStorage.removeItem('cart');
    updateOrderSummary();
  });
});