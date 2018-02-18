console.log('ready');
$('.search').submit(function querySearch(e) {
  e.preventDefault();
  userquery();
});


function userquery() {
  console.log('userquery ran');
        const searchedVal = $('.js-query').val();
        const genderr = $('input[name=gender]:checked', '.search').val();
        const agepicker = $('#agepicker').val();
        runpetdata(searchedVal, genderr, agepicker, function(data) {
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
                count: 200,


            },
            // Here is where we handle the response we got back from Petfinder
            success: function(response) {
              console.log('success function ran');
            newpetfunc(response);
            callback(petDataArr);

            }
        });
    }
       
var petDataArr = [];
function newpetfunc(response) {

  console.log('newPetFunction ran --> created new pet Array');
  for(var i=0; i<200; i++){
     var pet = {
      name: response.petfinder.pets.pet[i].name.$t,
      sex: response.petfinder.pets.pet[i].sex.$t,
      id: response.petfinder.pets.pet[i].id.$t,
      description: response.petfinder.pets.pet[i].description.$t,
      thumbnail: getPicture(i,'pn', response),
     picture: getPicture(i,'x', response)
    } 
    //created 200 pet objects.
    petDataArr.push(pet);
   }
}

function displayRandomPet(data) {
 console.log('displayRandomPet function ran --> displaying random Pet');
  var random = Math.floor((Math.random() * 200) + 0);
  var currentPet = petDataArr[random];
  $('#link-pet').html(`<a href='https://www.petfinder.com/petdetail/` +currentPet.id + `'>Curious about ` + currentPet.name+ `? Find more Info Here! </a>`)
   $('.name').html(currentPet.name);
  $('.petSex').html(currentPet.sex);
  $('.petId').html(currentPet.id);
  $('.desc').html(currentPet.description);
  var petImg = document.createElement('img');
  petImg.src = currentPet.picture;
 
 // console.log($('#pet-image').html()); 
   $('#pet-image').html(petImg.outerHTML);
}

function displayClickedPetInfo(x, petDataArr){
  
  var clickedPet = petDataArr[x];
  $('.name').html(clickedPet.name);
  $('.petSex').html(clickedPet.sex);
  $('.petId').html(clickedPet.id);
  $('.desc').html(clickedPet.description);
   $('#link-pet').html(`<a href='https://www.petfinder.com/petdetail/` +clickedPet.id + `'>Curious about ` + clickedPet.name+ `? Find more Info Here! </a>`)
  var petImg = document.createElement('img');
  petImg.src = clickedPet.picture;
  
 // console.log($('#pet-image').html()); 
   $('#pet-image').html(petImg.outerHTML);
    $('#more-pets-info').hide();
    $('#pet-info').show();
    $('#more-pets').text('Close');
    
}

function displayPetList(data) {
  console.log('displayPetList function ran --> display multiple random pets');
$('#more-pets-info h1:first-child').after(`<p> Was that pet not cute enough for you? Click this to see even more adorable pets.</p>`);
 petListClick();
 showMorePets(data);
}

function showMorePets(data){
    for(var i=0; i<data.length; i++){
     var testingImg = document.createElement('img');
  testingImg.src = petDataArr[i].thumbnail;
  $('#more-pets-info ul').append(`<li value= ` + i + ` class="pet-details" >` + petDataArr[i].name  + testingImg.outerHTML + `</li>`);
  }
   $('#next-pg-bttn').on('click', function(){
     $('#more-pets-info p').remove();
      lastVisible = $('.more-pets-list-ul li:visible:last').index()+1;
    if(lastVisible >= $('.more-pets-list-ul li').length) lastVisible = 0;
    $('.more-pets-list-ul li').hide();
    $toShow = $('.more-pets-list-ul li:hidden').slice(lastVisible,lastVisible+10);
    $toShow.show() 
});
}

 function petListClick(){
  $('#more-pets-info ul').on('click','li', function(){
    var x = $(this).val();
    console.log('pet value of clicked pet: ' + x);
   return displayClickedPetInfo(x, petDataArr);
    });
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
  $('#pet-info').hide();
  $('#more-pets-info').show();
  }

    

    
$(document).ready(function() {
  $('#more-pets-info').hide();
  $('#more-pets').on('click', morePets);
  
  

});