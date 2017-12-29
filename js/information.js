( function($){

    requestCheckAuth("information");
    var html = "";

    $('.information-left').children().each( function(){
        html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
    });

    $('.information-right').children().each( function(){
        html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
    });
    $('.information-slider').html(html);

    $('.information-slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,

    });

    $("a#example1").fancybox();

    $('button[data-action]').click( function(){
        if($(this).attr('data-action') == "next" )
            $('.information-slider').slick('slickNext');
        else
            $('.information-slider').slick('slickPrev');


    });

})(jQuery);