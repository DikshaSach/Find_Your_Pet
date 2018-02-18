
$('.search').submit(function querySearch(e) {
  e.preventDefault();
  userquery();

  });


function userquery() {
 
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
                count: 100,


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
  for(var i=0; i<100; i++){
     var pet = {
      name: response.petfinder.pets.pet[i].name.$t,
      sex: response.petfinder.pets.pet[i].sex.$t,
      id: response.petfinder.pets.pet[i].id.$t,
      description: response.petfinder.pets.pet[i].description.$t,
      thumbnail: getPicture(i,'pnt', response),
     picture: getPicture(i,'x', response)
    } 
    //created 100 pet objects.
    petDataArr.push(pet);
   }
}

function displayRandomPet(data) {
 console.log('displayRandomPet function ran --> displaying random Pet');
  var random = Math.floor((Math.random() * 100) + 0);
  var currentPet = petDataArr[random];
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
  for (var i = 0; i <10; i++) {
  var testingImg = document.createElement('img');
  testingImg.src = petDataArr[i].thumbnail;
  $('#more-pets-info ul').append(`<li value= ` + i + ` class="pet-details-default" >` + petDataArr[i].name +  testingImg.outerHTML + `</li>`);
  }
 petListClick();
 showMorePets(data);
}



// better way to implement this
function showMorePets(data){
  
 
    for(var i=11; i<data.length; i++){
     var testingImg = document.createElement('img');
  testingImg.src = petDataArr[i].thumbnail;
  $('#more-pets-info ul').append(`<li value= ` + i + ` class="pet-details" >` + petDataArr[i].name  + testingImg.outerHTML + `</li>`);
  }
   $('#next-pg-bttn').on('click', function(){
      lastVisible = $('li:visible:last').index()+1;
    if(lastVisible >= $('li').length) lastVisible = 0;
    $('li').hide();
    $toShow = $('li:hidden').slice(lastVisible,lastVisible+20);
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