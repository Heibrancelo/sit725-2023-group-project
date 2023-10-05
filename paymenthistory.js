// Add this function to payment.js
function recordPayment(mode) {
    const totalPrice = '50$';
    const dateTime = new Date().toLocaleString(); // Get the current date and time

    // Call the function to save payment history
    savePaymentHistory(mode, totalPrice, dateTime);
}

const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

        // Display payment history
        const paymentList = document.getElementById('payment-list');
        paymentHistory.forEach(payment => {
            const listItem = document.createElement('li');
            listItem.textContent = `Mode: ${payment.mode}, Total Price: ${payment.totalPrice}, Date/Time: ${payment.dateTime}`;
            paymentList.appendChild(listItem);
        });