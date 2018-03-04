$('.search').on('submit', function () {

    $('.paw-prints').fadeIn('slow', function () {
        var y = $(window).scrollTop(); //your current y position on the page
        $(window).scrollTop(y + 200);
       // $('.paw-prints').delay(3000).fadeOut();
        $('#more-pets-info').delay(3000).fadeIn("slow", function () {
            $('html,body').animate({
                    scrollTop: $("#more-pets-info").offset().top
                },
                'slow');
        });
        $('footer').show();
    });

})









$('#close-clicked-pet').on('click', function () {
    $('#more-pets-info').show();
    if ($('#clicked-pet-info').is(':hidden')) {

        $('#clicked-pet-info').show();


    } else {

        $('#clicked-pet-info').hide("clip", {
            direction: "vertical"
        }, 200);
        $('#more-pets-info').css("opacity", "1");
        $('body').removeClass('stop-scrolling');
        $('body').unbind('touchmove');
        $('#more-pets-info').removeClass('remove-click');

    }
});


$('#paw').on('click', function () {
    $('#pet-search').show();
    $('#paw').removeClass("bounce");
    $('html,body').animate({
            scrollTop: $("#pet-search").offset().top
        },
        'slow');
})


