    const debitCreditButton = document.getElementById('debit-credit-button');
    const debitCreditForm = document.getElementById('debit-credit-form');
    const additionalContent = document.getElementById('additional-content');

    debitCreditButton.addEventListener('click', function () {
        if (debitCreditForm.style.display === 'none' || debitCreditForm.style.display === '') {
            debitCreditForm.style.display = 'block';
            additionalContent.style.display = 'block';
        } else {
            debitCreditForm.style.display = 'none';
            additionalContent.style.display = 'none';
        }
    });

    $("#cvv").on("input", function () {
        $(this).val($(this).val().substr(0, 3))
    })
    
    
    const yearDropdown = document.getElementById('yearDropdown');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year.toString();
        option.textContent = year.toString();
        yearDropdown.appendChild(option);
    }
    $("select").formSelect()
;

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

function generatePDF() {
    window.html2canvas=html2canvas;
    const {jsPDF}= window.jspdf;
    
    // Create a new jsPDF instance
   const pdf = new jsPDF();
   pdf.text('Pay the following amount in Stall at the counter', 10,10);
   pdf.text('Total                                $5.00', 10,30);
    // Add content to the PDF
    // var elementHTML= document.querySelector("#pdf-content");
    //     pdf.html(elementHTML,{
    //         callback: function(pdf){
             pdf.save('payment_receipt.pdf');
    //     }, 
    //     margin: [10,10,10,10],
    //     autoPaging:'text',
    //     x:0,
    //     y:0
   // });
}
    const formSubmitted = () => {
        let formData = {};
        formData.cardholder=$('#card-holder').val()
        formData.cardnumber = $('#card-number').val();
        formData.cvv = $('#cvv').val();
        formData.month = $('#month').val();
        formData.year = $('#yearDropdown').val();
        formData.paymentMode= $('#paymentMode').val()
        // formData.paymentDate=new Date().getDate;
        // formData.paymentTime= new Date().getTime
    // Additional content below h4
    console.log(formData);
    postDetails(formData);
    // ... (add more pdf.text lines for your additional content) ...

    // Save the PDF with a specific name

}

const payatStallDetails = () => {
    let formData = {};
    formData.paymentMode= $('#paymentMode').val()
    // formData.paymentDate=new Date().getDate;
    // formData.paymentTime= new Date().getTime
// Additional content below h4
console.log(formData);
postDetails(formData);
}

function postDetails(payment){
    
    console.log(payment);
    $.ajax({
        url:'/api/payment',
        type:'POST',
        data:payment,
       
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('payment successful');
            }
        },
        error: (xhr, status, error) => {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response Text:', xhr.responseText);
    }
})    }
    
$(document).ready(function () {
    $('#card-number').on('blur', function () {
      var inputValue = $(this).val();
      
      if (inputValue.length < 10 || inputValue.length > 16) {
        // Do something, e.g., show a message, disable a button, etc.
       
        alert('Card number must be between 10 and 16 digits.');
        $(this).val('');
      }
    });
  }); 

    $(document).ready(function(){
        $('.materialboxed').materialbox();
        $('#submit').click(()=>{
           console.log('submit')
            formSubmitted();
            alert('Payment Successful');
            window.location.reload()
        });
       
    })