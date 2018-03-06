$('.search').on('submit', function () {
    $('.paw-prints').fadeIn('slow', function () {
        var y = $(window).scrollTop(); //your current y position on the page
        $(window).scrollTop(y + 200);
        $('.paw-prints').delay(3000).fadeOut();
        petListContainer.delay(3000).fadeIn("slow", function () {
            $('html,body').animate({
                    scrollTop: $("#pet-list-container").offset().top
                },
                'slow');
        });
        $('footer').show();
    });

})



$('#close-clicked-pet').on('click', function () {
    petListContainer.show();
    if ($('#clicked-pet-info').is(':hidden')) {
       clickedPetInfo.show();
    } else {

       clickedPetInfo.hide("clip", {
            direction: "vertical"
        }, 200);
        petListContainer.css("opacity", "1");
        $('body').removeClass('stop-scrolling');
        petListContainer.unbind('touchmove');
        petListContainer.removeClass('remove-click');

    }
});


$('#paw').on('click', function () {
    $('#pet-search').show();
    $('html,body').animate({
            scrollTop: $("#pet-search").offset().top
        },
        'slow');
})


