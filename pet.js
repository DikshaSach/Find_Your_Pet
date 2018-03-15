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

