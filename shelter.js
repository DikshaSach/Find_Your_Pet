function petShelter(petShelterId) {

    var url = 'https://api.petfinder.com/shelter.get';
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            format: 'json',
            key: "a725757f82f2e11cd58dd82805d2716f",
            id: petShelterId


        },
        // Here is where we handle the response we got back from Petfinder
        success: function (shelterData) {

            latLongFunc(shelterData);

        },
        error: function () {
            console.log('didnt work');
        }

    });
}




function latLongFunc(shelterData) {

    var petlat = shelterData.petfinder.shelter.latitude.$t;
    var petlong = shelterData.petfinder.shelter.longitude.$t;
    var shelterName = shelterData.petfinder.shelter.name.$t;

    console.log("pets long and long is:" + petlat + "," + petlong);
    loadMap(petlat, petlong, shelterName);


}



function loadMap(petlat, petlong, shelterName) {

    var mapOptions = {
        center: new google.maps.LatLng(petlat, petlong),
        zoom: 12,

    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(petlat, petlong),
        animation: google.maps.Animation.DROP,
        map: map,

    });

    var infowindow = new google.maps.InfoWindow({
        content: shelterName
    });

    infowindow.open(map, marker);


}




