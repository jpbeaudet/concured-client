$(function(){
    var word_array = [],
        wordItems = $('.cloudItems li');
    $(wordItems).each(function(){
        var word = $(this).text().replace(/ /g,''),
            weight = $(this).data('weight');
        word_array.push({text: word, weight: weight});
    });
    //console.log(word_array);
    $("#wordCloud").jQCloud(word_array, {removeOverflowing: false});
    $('.sideNav').css("height", $(document).outerHeight());
    
});