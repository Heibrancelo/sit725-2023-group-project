function checkValidation() {

    console.log("running validation method");

    //Checking the name input entered by user
    checkName();

     //Checking the date of birth input entered by user
    checkBirthDate();

     //Checking the gender input entered by user
    checkGender();

    //Checking the email input entered by user
    checkEmail();

    //Checking the phone number input entered by user
    checkPhone();

     //Checking the query input entered by user
    checkQuery();

    return false;

}

//Below method will check if name is not empty
function checkName() {

    let name = document.getElementById("name").value;
    let text;

    if (name.length == 0) {

        text = "<em> You did not enter your first name </em>";
    }
    else {
        text = "<em> Valid </em>";
    }

    document.getElementById("nameerror").innerHTML = text;
    return false;
}

//Below method will check if date of birth is not empty
function checkBirthDate() {
    let date = document.getElementById("birth").value;
    let text;
    if (date.length == 0) {

        text = "<em> You did not enter your date of birth </em>";
    }
    else {
        text = "<em> Valid </em>";
    }
    document.getElementById("birthdateerror").innerHTML = text;
    return false;
}

//Below method will check if gender is not empty
function checkGender() {
    let gender = document.getElementById("gender").value;
    let text;
    if (gender == "0") {

        text = "<em> You did not mention your gender </em>";
    }
    else {
        text = "<em> Valid </em>";
    }
    document.getElementById("genderdataerror").innerHTML = text;
    return false;
}

//Below method will check if email contains @deakin.edu.au
function checkEmail() {
    let email = document.getElementById("email").value;
    let text;
    if (email.indexOf('@deakin.edu.au') < 0) {

        text = "<em> Must be your deakin email '@deakin.edu.au' </em>";
    }
    else {
        text = "<em> Valid </em>";
    }
    document.getElementById("emailerror").innerHTML = text;
    return false;
}

//Below method will check if phone number contains 10 numbers with or without space
function checkPhone() {
    let phone = document.getElementById("contact").value;
    let text;
    const myRegex = /^(\d\s*){10}$/;
    if (!myRegex.test(phone)) {

        text = "<em> Phone number must be exactly 10 digits </em>";
    }
    else {
        text = "<em> Valid </em>";
    }
    document.getElementById("contacterror").innerHTML = text;
    return false;
}

function checkQuery() {
    let query = document.getElementById("query").value;
    let text;
    if (query.length == 0) {

        text = "<em> Please enter your query </em>";
    }
    else {
        text = "<em> Valid </em>";
    }
    document.getElementById("queryerror").innerHTML = text;
    return false;
}

//Below method is used to reset the error messages
function checkReset() {
    let reset = document.getElementById("reset").value;
    document.getElementById("nameerror").innerHTML = "";
    document.getElementById("birthdateerror").innerHTML = "";
    document.getElementById("genderdataerror").innerHTML = "";
    document.getElementById("emailerror").innerHTML = "";
    document.getElementById("contacterror").innerHTML = "";
}