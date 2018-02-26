$('.search').on('submit', function(){

     $('.contain-bear').fadeIn('slow', function(){
              var y = $(window).scrollTop();  //your current y position on the page
$(window).scrollTop(y+200);
               $('.contain-bear').delay(5000).fadeOut();
        $('#more-pets-info').delay(5000).fadeIn("slow", function(){
             $('html,body').animate({
        scrollTop: $("#more-pets-info").offset().top},
        'slow');
        });
            });
 
})
    



$('#close-clicked-pet').on('click', function (){
 $('#more-pets-info').show();
 if ($('#clicked-pet-info').is(':hidden')) {
                   
                   $('#clicked-pet-info').show();
        
                   
   }else {
                   
        $('#clicked-pet-info').hide('slide',{direction:'left'},500);
        $('#more-pets-info').css("opacity", "1");
       $('body').removeClass('stop-scrolling');
       $('body').unbind('touchmove');
       $('#more-pets-info').removeClass('remove-click');
       
    }
});
 




