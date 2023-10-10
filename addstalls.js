
const addStallCards = (stalls) => {

    stalls.forEach(stall => {

        let stallCard = `<div class="col s12 m6 l3"><div class="card" id="stall-${stall._id}">`+

        `<div class="card-image waves-effect waves-block waves-light">`+

        `<img class="activator" src="${stall.imagePath}"></div>`+

        `<div class="card-content"><span class="card-title">${stall.stallName}</span>`+

        `<p>${stall.description}</p></div><div class="card-action center"><a href="#">Enter</a></div></div></div>`

 

 

        $("#stall-section").append(stallCard);

    });

}

 

 

const stallformSubmitted = () => {

    console.log("Form submit initiated.");

 

    let stallformData = {};

    stallformData.stallName = $('#stallName').val();

    stallformData.description = $('#stallDescription').val();

    stallformData.imagePath = $('#imagePath').val();  

 

    console.log("Form data prepared:", stallformData);

    postStall(stallformData);

}

 

 

 

function postStall(stall) {

    $.ajax({

        url: '/api/stallInfo',

        type: 'POST',

        data: JSON.stringify(stall),

        contentType: 'application/json',

        success: (result) => {

            console.log("Server response received:", result);

            if (result.statusCode === 201) {

                alert('Stall added successfully.');

                getAllStalls();

            } else {

                console.error("Unexpected server response:", result);

            }

        },

        error: (xhr, status, error) => {

            console.error("Error in postStall AJAX:", error);

        }

    });

}

 

 

 

 

 

 

function getAllStalls() {

    $.get('/api/stallInfo', (response) => {

        if (response.statusCode === 200) {

            addStallCards(response.data);

        }

    });

}

 

$(document).ready(function () {

    $('.materialboxed').materialbox();

    $('#stall-formSubmit').click(() => {

        stallformSubmitted();

    });

    $('.modal').modal();

    getAllStalls();

});