console.log('ready');
$('.search').submit(function querySearch(e) {
    e.preventDefault();
    userquery();
    petDataArr = [];
   emptyList();
});

function emptyList(){
   petList.empty();
    petListContainer.hide();
   $('#pet-list-container p').empty();  
};

function userquery() {
    console.log('userquery ran');
    var zipcode = $('.js-query').val();
    var gender = $('#genderpicker').val();
    var agepicker = $('#agepicker').val();
    runpetdata(zipcode, gender, agepicker, function (data) {
        displayPetList(data);
    });
}

function runpetdata(zipcode, genderr, agepicker, callback) {
    var url = 'https://api.petfinder.com/pet.find';
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            'location': zipcode,
            key: "a725757f82f2e11cd58dd82805d2716f",
            animal: 'dog',
            output: 'basic',
            format: 'json',
            sex: genderr,
            age: agepicker,
            count: 20,


        },
        // Here is where we handle the response we got back from Petfinder
        success: function (response) {
            console.log('success function ran');
            createNewPet(response);
            callback(petDataArr);
        }
    });
}



function createNewPet(response) {
 console.log('createNewPet ran --> created new pet Array');
    if(response.petfinder.pets === undefined){
        petListContainer.append('<p>No pets near you! :( <p>');
    }
    for (var i = 0; i < 20; i++) {
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

    }
}



function displayPetList(data) {
    console.log('displayPetList function ran --> displaying multiple random pets');
    for (var y = 0; y < 20; y++) {
        if (typeof petDataArr[y].breed === 'undefined') {
            petDataArr[y].breed = 'Not Stated';
        }
        var testingImg = document.createElement('img');
        testingImg.src = petDataArr[y].thumbnail;
        petList.append(`<div class="col-xl-4 center-block" id= ` + y + `>` +
            `<h3 class='pet-data-name' id= ` + y + `>` + petDataArr[y].name + `</h3>` +
            `<div class='pet-data-image' id= ` + y + `>` + testingImg.outerHTML + `</div>` +

            `<div class='pet-data-age-sex'>` + petDataArr[y].age + ` | ` + petDataArr[y].sex + `</div>` +
            `<div class='pet-data-breed'>Breed: ` + petDataArr[y].breed + `</div>` +

            `</div>`);
    }
    petListClick();
    petShelter(currentPet.dogShelterId);

}



function petListClick() {
    petList.on('click', 'div', function () {
        var x = $(this).attr('id');
        console.log('pet value of clicked petx: ' + x);
        displayClickedPetInfo(x, petDataArr);
        clickedPetShelter(x, petDataArr);
    });
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

    

   clickedPetInfo.show("clip", {
        direction: "vertical"
    }, 200);
    petListContainer.css("opacity", ".1");
    $('body').addClass('stop-scrolling');
    petListContainer.bind('touchmove', function (e) {
        e.preventDefault()
    });
    petListContainer.addClass('remove-click');
    
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
    petListContainer.show();
}



$(document).ready(function () {
    // create new array to hold data for pets
var petDataArr = [];
clickedPetInfo = $('#clicked-pet-info');
petListContainer = $('#pet-list-container');
 petList = $('.pet-list');
$('#more-pets').on('click', morePets);
if (!("ontouchstart" in document.documentElement)) {
document.documentElement.className += " no-touch";
    }
});