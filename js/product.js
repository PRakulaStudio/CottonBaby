/**
 * Created by Иван on 27.12.2017.
 */
( function ($) {

    requestCheckAuth("product");

    $('div.item-slider').slick({
        infinite: false,
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: false,
        verticalSwiping: true,

    }).on('click', '.slick-slide' , function(){
        $(this).siblings('div.slick-slide').find('div').removeClass('item-activ');
        $(this).find('div').addClass('item-activ').end();
        $('#product').find('img').attr('src' , $(this).find('img').attr('src'));
    });

    $('div.product-slider').slick({
        infinite: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        responsive: [
            {
                breakpoint : 950,
                settings : {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint : 640,
                settings : {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    })

    //подгрузка слайдов(пока не работает)
    $("div.product-slider").on("afterChange", function(event, slick, currentSlide){

        //тут надо вызывать создание элемента, плюс необходимо его добавить
        //$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
    });

    //создание элемента в слайдере
    function createItem(items)
    {
        var html = "";


            html += "<div data-id-block='"+items[key].product_id+"'>" +
                         "<div><img src='"+items[key].img_link+"' /></div>" + //картинка
                         "<div><p>"+items[key].price+" руб.</p></div>" + //цена
                         "<div><button action='toogle-favorite' class='favorites-off'></button><button action='toogle-favorite' class='favorites-on'></button></div>" +// избранное
                         "<div>" +
                            "<a href='"+items[key].link+"'>"+items[key].name+"</a>" +
                            "<p>"+items[key].description+"</p>" +
                        "</div>" +
                        "<a href='"+items[key].link+"'>" +
                            "<img src='/images/icons/request.png' />Подробно" +
                        "</a>" +
                    "</div>";

        return html;
        //надо переделать

    }


    function requestCheckItemOnCart()
    {

        $.ajax({
            data : {  'wishlist' : 'check' , 'id' : product_id},
            dataType : 'JSON',
            type : "POST",
            url : '/akula/system/plugins/SecArgonia/cabinet/',
            success : function ( result , status ) {
                if(result.status)
                {
                    button.hide().siblings('button').show();
                }
            },
        });
    }

    //прокрутка слайдера
    $('div.product-slider-box button[data-action]').click( function(){
        if($(this).attr('data-action') == "next" )
            $('div.product-slider').slick('slickNext');
        else
            $('div.product-slider').slick('slickPrev');


    });

    $("a#product").fancybox();


    //событие на клик изменения кол-ва размера товара
    $('div.product-size').on('click' , 'div.size-block button' , function () {

        let number =  parseInt( $(this).siblings('span').text() );

        //кликнули на плюс
        if( $(this).prev().length )
        {
            $(this).prev().text( number + 1  );
            $(this).parents('div.size-block').addClass('size-block-activ');
        }
        else
        {

            if( number > 0 )
            {

                 $(this).next().text( number - 1 );
                 if( $(this).next().text() == 0 )
                 {
                     $(this).parents('div.size-block').removeClass('size-block-activ');
                 }
            }
        }

        //проверить, что выбран хотя бы один размер
        if( $(this).parents('div.size-box').find('div.size-block-activ').length)
           $('div.price-basket').find('button').show();
        else
           $('div.price-basket').find('button').hide();


        //дальше будут запросы

    });

    var productInterval = setInterval( function () {

        if(IS_AUTH != "undefined")
        {

            clearInterval(productInterval);
            if(IS_AUTH)
               $('div.no-authorization').remove();
            else
               $('div.price-basket').remove();

        }
    } , 500);




} )(jQuery);