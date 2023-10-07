let discountApplied = false;

// JavaScript functions to update quantity
function updateQuantity(item, action) {
    const quantityElement = document.getElementById(item + "-quantity");
    let quantity = parseInt(quantityElement.textContent);

    if (action === "increment") {
        quantity += 1;
    } else if (action === "decrement" && quantity > 1) {
        quantity -= 1;
    }

    quantityElement.textContent = quantity;

    // Calculate the total cart price and total items
    calculateTotal();
}

// Function to calculate the total cart price and total items
function calculateTotal() {
    const quantities = document.querySelectorAll(".border");
    const prices = document.querySelectorAll(".price");

    let total = 0;
    let totalItems = 0;

    quantities.forEach(function (quantityElement, index) {
        const quantity = parseInt(quantityElement.textContent);
        const priceText = prices[index].textContent.trim();
        const price = parseFloat(priceText.replace('$', ''));
        total += quantity * price;
        totalItems += quantity;
    });

    // Update the total price and total items in the summary
    const subTotalPriceDisplay = document.getElementById("total-price-display");
    subTotalPriceDisplay.textContent = "SUB TOTAL $ " + total.toFixed(2);

    const totalPriceDisplay = document.getElementById("display-total-price");

    // Calculate tax and add it to the total
    const tax = 5;
    total += tax;

    // Apply the discount if it's enabled
    if (discountApplied) {
        total *= 0.9; // 10% discount
    }

    totalPriceDisplay.textContent = "$ " + total.toFixed(2);

    const totalItemsDisplay = document.getElementById("total-items-display");
    totalItemsDisplay.textContent = "ITEMS " + totalItems;
}

// Function to apply the discount
function applyDiscount(event) {
    event.preventDefault(); 
    const codeInput = document.getElementById("code").value;
    console.log("Entered discount code:", codeInput);

    if (codeInput === "DISCOUNT10") {
        discountApplied = true;
        console.log("Discount applied");
        calculateTotal(); // Recalculate the total with the discount
    } else {
        discountApplied = false;
        console.log("Discount not applied");
        calculateTotal(); // Recalculate the total without the discount
    }
}

function removeProduct(closeButton) {
    const productElement = closeButton.closest('.row');
    productElement.remove();

    // Calculate the total cart price and total items after removing the product
    calculateTotal();
}

function navigateToPaymentPage() {
    // Redirect to the payment page when the checkout button is clicked
    window.location.href = "payment.html";
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);
    calculateTotal(); // Calculate the initial total when the page loads
});