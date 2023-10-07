
document.addEventListener("DOMContentLoaded", function () {
    const menuSearch = document.getElementById("menuSearch");
    const vegToggle = document.getElementById("vegToggle");
    const menuItems = document.querySelectorAll(".menu-item");

    vegToggle.addEventListener("change", filterItems);
    menuSearch.addEventListener("input", filterItems);

    function filterItems() {
        const searchValue = menuSearch.value.toLowerCase();
        const showVeg = vegToggle.checked;

        menuItems.forEach(function (item) {
            const itemName = item.querySelector("h3").textContent.toLowerCase();
            const isVeg = item.dataset.veg === "true";

            if (
                itemName.includes(searchValue) &&
                (showVeg ? isVeg : true) &&
                (!showVeg ? !isVeg : true)
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }
});

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemId = item.getAttribute('data-item-id');

        fetch(`/filterItems/${restaurentId}`)
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => console.error(error));
    });
});

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const successMessage = document.getElementById('success-message');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
    event.preventDefault();
    const menuItem = event.target.closest('.menu-item');
    if (!menuItem) return;
    successMessage.style.display = 'block';
    const itemId = menuItem.getAttribute('data-item-id');
    console.log('Added to Cart - Item ID:', itemId);

}

