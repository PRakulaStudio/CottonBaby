/**
 * Created by Иван on 27.12.2017.
 */
( function ($) {


    var css = {
        sizeActive : "size-block-activ",
        itemActive : 'item-activ',
    };



    function requestGetItemsSlider(filter)
    {
        return [];
    }


    function requestCheckInBasket()
    {
        var data = new FormData();
            data.append('id' , 1);

        return fetch(window.pms.config.cabinetAPI + 'order/getItem' , { method: 'POST', credentials: 'same-origin', body: data })
            .then( response => {
                let responseData = false;
                try{
                    responseData = response.json();
                }
                catch(e) {
                    responseData = {status: false, statusText: "Произошла ошибка при соединении"};
                    response.text().then(console.debug);
                }

                return responseData;
            })
            .then(response => {
               if(response.status)
               {

                 
                   addFavoriteButtons( $('div.product-box'), response.data.wishes  );

                   if(response.data.modifications)
                   {
                       $sizeBox = $('div.size-box');
                       for( let key in response.modifications)
                       {
                            $sizeBox.find('div[id-modificatots="'+response.modifications[key].id+'"]')
                                        .find('div')
                                            .first().addClass('active').end()
                                            .last().find('span').text(response.modifications[key].quantity)
                       }
                   }




               }
            });
    }

    Promise.all([ requestCheckAuth("product") ,
                  requestGetItemsSlider("example")])
        .then( response => {
                    //сли авторизированы
                   if(response[0])
                   {
                        $('div.price-basket').css({'display' : 'flex'}).siblings('div.no-authorization').remove();

                        return Promise.all([
                            requestCheckInBasket(),
                            requestCheckFavoritesItems(response[1]),
                        ])

                   }
                   else{

                   }
               } ,
               errors => {})
        .then( response => {
                    console.log( response[0] );
               } ,
               errors => {});



    //инициализация бокового слайдер плюс навешивание обработчика события при клике
    $('div.item-slider').slick({
        infinite: false,
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: false,
        verticalSwiping: true,
    }).on('click', '.slick-slide' , function(){
        let img = $(this).find('img');

        $(this)
                .siblings('div.slick-slide')
                                            .find('div').removeClass(css.itemActive)
                                            .end()
                .end()
                .find('div').addClass(css.itemActive)
                .end();

        $('#product').attr('id-pictures' , img.parents('div.slick-slide').index() ).find('img').attr('src' , img.attr('src'));
    });



    //инициализация слайдера c товарами из той же коллекции
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
    //прокрутка слайдера
    $('div.product-slider-box button[data-action]').click( function(){
        if($(this).attr('data-action') == "next" )
            $('div.product-slider').slick('slickNext');
        else
            $('div.product-slider').slick('slickPrev');


    });
    //подгрузка слайдов(пока не работает)
    $("div.product-slider").on("afterChange", function(event, slick, currentSlide){

        //тут надо вызывать создание элемента, плюс необходимо его добавить
        //$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
    });




    //отображение fanvybox с галереей
    let pictures = [];
    $('div.item-slider').find('img').each( function () {
       pictures.push({ src : $(this).attr('src') })
    });
    //fancybox3
    $('#product').click( function(){
        $.fancybox.open( pictures , {
            loop : true,
            index: $(this).attr('id-pictures'),
        });

    });


    //событие на клик изменения кол-ва размера товара
    $('div.product-size').on('click' , 'div.size-block button' , function () {

        let number =  parseInt( $(this).siblings('span').text() );

        //кликнули на плюс
        if( $(this).prev().length )
        {
            $(this).prev().text( number + 1  );
            $(this).parents('div.size-block').addClass(css.sizeActive);
        }
        else
        {

            if( number > 0 )
            {

                 $(this).next().text( number - 1 );
                 if( $(this).next().text() == 0 )
                 {
                     $(this).parents('div.size-block').removeClass(css.sizeActive);
                 }
            }
        }

        //проверить, что выбран хотя бы один размер
        if( $(this).parents('div.size-box').find(`div.{css.sizeActive}`).length)
           $('div.price-basket').find('button').show();
        else
           $('div.price-basket').find('button').hide();


        //дальше будут запросы

    });




} )(jQuery);