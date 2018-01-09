( function($){

    requestCheckAuth("information");
    var html = "";
    var pictures = [];

    $('.information-left').children().each( function(){
        html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
        pictures.push({ src : $(this).find('img').attr('src') });
    });

    $('.information-right').children().each( function(){
        html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
        pictures.push({ src : $(this).find('img').attr('src') });
    });
    $('.information-slider').html(html);

    $('.information-slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,

    });


    $('button[data-action]').click( function(){
        if($(this).attr('data-action') == "next" )
            $('.information-slider').slick('slickNext');
        else
            $('.information-slider').slick('slickPrev');
    });


    $('section.information').on('click' , 'a[id-picture]' , function(){

        $.fancybox.open( pictures , {
            loop : true,
            index: $(this).attr('id-picture'),
        });
    });





})(jQuery);