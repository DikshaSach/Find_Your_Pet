console.log('ready');
$('.search').submit(function querySearch(e) {
    e.preventDefault();
    userquery();
    petDataArr = [];
    $('.more-pets-list').empty();
    $('#more-pets-info').hide();
    $('#more-pets-info h1').empty();



});


function userquery() {
    console.log('userquery ran');
    const searchedVal = $('.js-query').val();
    const genderr = $('#genderpicker').val();
    const agepicker = $('#agepicker').val();

    runpetdata(searchedVal, genderr, agepicker, function (data) {

        displayRandomPet(data);

        displayPetList(data);


    });
}

function runpetdata(searchedVal, genderr, agepicker, callback) {
    var url = 'https://api.petfinder.com/pet.find';
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            'location': searchedVal,
            key: "a725757f82f2e11cd58dd82805d2716f",
            animal: 'dog',
            output: 'basic',
            format: 'json',
            sex: genderr,
            age: agepicker,
            count: 100,


        },
        // Here is where we handle the response we got back from Petfinder
        success: function (response) {
            console.log('success function ran');
            newpetfunc(response);
            callback(petDataArr);
        }
    });
}

var petDataArr = [];

function newpetfunc(response) {

    console.log('newPetFunction ran --> created new pet Array');
    if(response.petfinder.pets === undefined){
        $('#more-pets-info h1').append('<p>No pets near you! :( <p>');
    }
    for (var i = 0; i < 100; i++) {
        var pet = {
            name: response.petfinder.pets.pet[i].name.$t,
            sex: response.petfinder.pets.pet[i].sex.$t,
            id: response.petfinder.pets.pet[i].id.$t,
            description: response.petfinder.pets.pet[i].description.$t,
            thumbnail: getPicture(i, 'pn', response),
            picture: getPicture(i, 'x', response),
            age: response.petfinder.pets.pet[i].age.$t,
            breed: getBreed(i, response),
            dogShelterId: response.petfinder.pets.pet[i].shelterId.$t

        }
        //created 200 pet objects.
        petDataArr.push(pet);
    }
}

function getBreed(position, response) {
    if (response.petfinder.pets.pet[position].breeds !== undefined) {
        var breedArr = response.petfinder.pets.pet[position].breeds.breed.$t;
        return breedArr;

    } else {

        return 'getBreed not working.';

    }
}

function displayRandomPet(data) {
    console.log('displayRandomPet function ran --> displaying random Pet');
    var random = Math.floor((Math.random() * 100) + 0);
    var currentPet = petDataArr[random];
    $('#link-pet').html(`<a href='https://www.petfinder.com/petdetail/` + currentPet.id + `'>Curious about ` + currentPet.name + `? Find more Info Here! </a>`)
    $('.name').html(currentPet.name);
    $('.petSex').html(currentPet.sex);
    $('.petId').html(currentPet.id);
    $('.desc').html(currentPet.description);
    var petImg = document.createElement('img');
    petImg.src = currentPet.picture;

    // console.log($('#pet-image').html()); 
    $('#pet-image').html(petImg.outerHTML);
    petShelter(currentPet.dogShelterId);
}

function displayClickedPetInfo(x, petDataArr) {

    var clickedPet = petDataArr[x];
    $('.clicked-pet-name').html(clickedPet.name);
    $('.clicked-petSex').html(clickedPet.sex);
    $('.clicked-petID').html(clickedPet.id);
    $('.clicked-pet-desc').html(clickedPet.description);

    $('.clicked-link-pet').html(`<a href='https://www.petfinder.com/petdetail/` + clickedPet.id + `'>Curious about ` + clickedPet.name + `? Find more Info Here! </a>`)
    var petImg = document.createElement('img');
    petImg.src = clickedPet.picture;
    $('.clicked-pet-image').html(petImg.outerHTML);

    

    $('#clicked-pet-info').show("clip", {
        direction: "vertical"
    }, 200);
    $('#more-pets-info').css("opacity", ".1");
    $('body').addClass('stop-scrolling');
    $('#more-pets-info').bind('touchmove', function (e) {
        e.preventDefault()
    });
    $('#more-pets-info').addClass('remove-click');
    
}

function displayPetList(data) {
  
    console.log('displayPetList function ran --> display multiple random pets');

    for (var y = 0; y < 20; y++) {
        if (typeof petDataArr[y].breed === 'undefined') {
            petDataArr[y].breed = 'Not Stated';

        }
        var testingImg = document.createElement('img');
        testingImg.src = petDataArr[y].thumbnail;
        $('.more-pets-list').append(`<div class="col-xl-4 center-block" id= ` + y + `>` +
            `<h3 class='pet-data-name' id= ` + y + `>` + petDataArr[y].name + `</h3>` +
            `<div class='pet-data-image' id= ` + y + `>` + testingImg.outerHTML + `</div>` +

            `<div class='pet-data-age-sex'>` + petDataArr[y].age + ` | ` + petDataArr[y].sex + `</div>` +
            `<div class='pet-data-breed'>Breed: ` + petDataArr[y].breed + `</div>` +

            `</div>`);
    }
    petListClick();

}





function petListClick() {
    $('.more-pets-list').on('click', 'div', function () {

        var x = $(this).attr('id');

        console.log('pet value of clicked petx: ' + x);

        displayClickedPetInfo(x, petDataArr);

        clickedPetShelter(x, petDataArr);
    });
}

function clickedPetShelter(x, petDataArr) {

var clickedPetShelter = petDataArr[x];
var petShelterId = clickedPetShelter.dogShelterId;
petShelter(petShelterId);
}









function getPicture(position, size, response) {

    if (response.petfinder.pets.pet[position].media.photos !== undefined) {
        var pictureArr = response.petfinder.pets.pet[position].media.photos.photo;
        for (var i = 0; i < pictureArr.length; i++) {
            var picture = pictureArr[i];
            if (picture['@size'] == size) {
                return picture['$t'];
            }
        }
    } else {
        return 'http://laoblogger.com/images/dog-clipart-easy-9.jpg';
    }
}

function morePets() {
    console.log('morePets function ran');
    //$('#pet-info').hide();
    $('#more-pets-info').show();
}









$(document).ready(function () {
    // $('#more-pets-info').hide();
    $('#more-pets').on('click', morePets);
    //  $('#pet-info').hide();
if (!("ontouchstart" in document.documentElement)) {
document.documentElement.className += " no-touch";
}


});