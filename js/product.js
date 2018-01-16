/**
 * Created by Иван on 27.12.2017.
 */
( function ($) {


    var css = {
        sizeActive : "size-block-activ",
        itemActive : 'item-activ',
    };

    function requestEdit(id_item )
    {
        // console.log(id_item);
        var data = {};

        data['product_id'] = id_item;
        data['modifications'] = {};

        $('div.size-box').find('div[id-modification]').each( function () {
            data['modifications'][$(this).attr('id-modification')] = $(this).find('span').text();
        });

        data['modifications'] = JSON.stringify(data['modifications']);

        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: window.pms.config.cabinetAPI+'order/edit',
            success : function (  result, status ) {
                if( result.status)
                {
                    if( result.data.total_price > 0 )
                        $('div.price-basket').find('button').replaceWith('<button action="change-count"><img src="images/icons/product-basket.png">Изменить</button>').end()
                            .find('button').show();
                    else
                        $('div.price-basket').find('button').replaceWith('<button><img src="images/icons/product-basket.png">В корзину</button>').end()
                            .find('button').show();

                }
            },
        })

    }



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
                   
                   if(Object.keys(response.data.modifications).length)
                   {
                       $sizeBox = $('div.size-box');

                       for( let key in response.data.modifications)
                       {
                            console.log( $sizeBox.find('div[id-modification="'+response.data.modifications[key].id+'"]')
                                .find('div')
                                .first().addClass(  ) );
                            $sizeBox.find('div[id-modification="'+response.data.modifications[key].id+'"]').addClass(css.sizeActive)
                                        .find('div')
                                             .last().find('span').text(response.data.modifications[key].quantity)
                       }

                       $('div.price-basket').find('button').replaceWith('<button action="change-count"><img src="images/icons/product-basket.png">Изменить</button>').end()
                           .find('button').show();
                   }
                   // else
                   // {
                   //     $('div.price-basket').find('button').replaceWith('<button><img src="images/icons/product-basket.png">В корзину</button>').end()
                   //         .find('button').show();
                   // }




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
        if( $(this).parents('div.size-box').find('div.'+css.sizeActive).length)
           $('div.price-basket').find('button').show();
        else
        {
            if( !$('div.price-basket').find('button[action="change-count"]') )
              $('div.price-basket').find('button').hide();
        }



        //дальше будут запросы

    });


    $('div.price-basket').on('click' , 'button' , function(){
         requestEdit(  $(this).parents('div[data-id-block]').attr('data-id-block') );
    });



} )(jQuery);