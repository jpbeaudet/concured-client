$(function(){
    //var word_array = [],
        //wordItems = $('.cloudItems li');
   // $(wordItems).each(function(){
       // var word = $(this).text().replace(/ /g,''),
           // weight = $(this).data('weight');
        //word_array.push({'text': word, 'weight': weight});
    //});
    //console.log(word_array);
    //$("#wordCloud").jQCloud(word_array); 
    if($(window).width()>1000){
        $('.sideNav').css('height', $(document).height());
    }
    $('.tabletMore').on('click', function(e){    
        e.preventDefault();
         $('.sideNavContainer').animate({
             height: ($('.sideNav').children('ul').children('li').length * 80) + 80
         });
    });
    //$('.sideNav a').not('.tabletMore').on('click', function(){
         //$('.sideNavContainer').animate({
           //  height: 60
         //});
    //});
});
