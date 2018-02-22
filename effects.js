$('#ready-to-adopt').on('click', function(){
  $('#main-div').hide();
  
   if ($('#pet-search').is(':hidden')) {
                   
                   $('#pet-search').show('slide',{direction:'up'},500);
                } 
});

$('#btn-search').on('click', function(){
  
  
   if ($('#pet-search').is(':hidden')) {
                   
                   $('#pet-search').show('slide',{direction:'up'},500);
                } else {
                   
                   $('#pet-search').hide('slide',{direction:'up'},1000);
                }
});




$('.search').submit(function querySearch(e) {
  $('#pet-search').hide();
  $('#test').show().delay(2000).fadeOut();
   if ($('#pet-info').is(':hidden')) {
                   
                   $('#test').show('slide',{direction:'left'},500);
                   
   }
   
});

$('#btn-random-pet').on('click', function(){
  
   if ($('#pet-info').is(':hidden')) {
                   
                   $('#pet-info').show('slide',{direction:'left'},500);
                   
   }else {
                   
                   $('#pet-info').hide('slide',{direction:'left'},1000);
                }
});

$('#close-clicked-pet').on('click', function (){
 $('#more-pets-info').show();
 if ($('#clicked-pet-info').is(':hidden')) {
                   
                   $('#clicked-pet-info').show('slide',{direction:'left'},500);
                   
   }else {
                   
                   $('#clicked-pet-info').hide('slide',{direction:'left'},500);
                  
                }
});




