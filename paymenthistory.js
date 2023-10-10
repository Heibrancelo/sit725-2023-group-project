document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display payment history data when the page loads
    fetchPaymentHistory();
    // displayPaymentHistory(result.data);
});

function fetchPaymentHistory() {
    // Replace the URL below with the correct endpoint
    $.ajax({
        url: '/api/payment-history',
        type: 'GET',
        success: function (result) {
            console.log('Success!');  // Add this line
            // Populate the payment history table with the retrieved data
            displayPaymentHistory(result.data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching payment history:');
            console.error('Status:', status);
            console.error('Response Text:', xhr.responseText);
            console.error('Error:', error);
        }
    });
}
function displayPaymentHistory(paymentHistory) {
    const tableBody = $('#payment-history-table');
    tableBody.empty(); // Clear existing rows

    // Iterate through the payment history and append rows to the table
    paymentHistory.forEach(payment => {
        const row = `<tr>
                        <td>${payment.paymentMode}</td>
                        <td>${payment.paymentDate}</td>
                        <td>${payment.paymentTime}</td>
                    </tr>`;
        tableBody.append(row);
    });
}
