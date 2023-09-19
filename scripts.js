// menu.js
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = [];
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const itemId = this.getAttribute('data-item-id');
        const item = Drink.find(item => item._id === itemId);
  
        if (item) {
          cartItems.push(item);
          updateCartUI();
        }
      });
    });
  
    function updateCartUI() {
      // Update the UI to display the cart items
      const cartList = document.getElementById('cart-list');
      cartList.innerHTML = '';
  
      cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = item.itemName;
        cartList.appendChild(cartItem);
      });
    }
  });
  