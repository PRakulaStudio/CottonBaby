/**
 * Created by Иван on 27.12.2017.
 */
try {

  
    
    ( function ($) {

       
        var css = {
            sizeActive : "size-block-activ",
            itemActive : 'item-activ',
            orderOn : 'on-basket',
            orderOff : 'off-basket'
        };

        var currentItem = window.pms.plugins.catalog.currentItem;
        var countProductSlider = 9;
        var loadItems = true;

      
        


        function changePrice()
        {
            try{
                let totalPrice = 0;
                $('div.size-box').find('input[type="number"]').each(function () {
                    totalPrice += parseInt($(this).val() == "" ? 0 : $(this).val()) * window.pms.plugins.catalog.currentItem.price;
                });
                if( totalPrice === 0)
                {
                    totalPrice = window.pms.plugins.catalog.currentItem.price;
                }

                $('div.price-basket').find('span').text(totalPrice);
            }
            catch(error)
            {
                requestSendBugs(error);
            }

        }

        function requestEdit(id_item )
        {
            // console.log(id_item);
            var data = {};

            data['product_id'] = id_item;
            data['modifications'] = {};

            $('div.size-box').find('div[id-modification]').each( function () {
                let number = $(this).find('input').val() == "" ? 0 : $(this).find('input').val();
                data['modifications'][$(this).attr('id-modification')] =  number;
            });

            data['modifications'] = JSON.stringify(data['modifications']);

            $.ajax({
                type : "POST",
                dataType: 'json',
                data : data,
                url: window.pms.config.cabinetAPI+'order/edit',
                success : function (  result, status ) {
                    try{
                        if( result.status)
                        {

                            $('div.product-basket').show();

                            $('div.price-basket').find('div').eq(1).remove().end().end().find('div.product-basket-link').show();
                            $('div.product-size').remove();

                            $('[class*="header-user"]').find('div[data-basket] span').show().text(result.data.count);

                        }
                    }
                    catch (error)
                    {
                        requestSendBugs(error);
                    }

                },
                error: function (result , status) {
                    requestSendBugs(result.responseText);
                }
            })

        }


        function requestCheckInBasket()
        {
            var data = new FormData();
            data.append('id' , window.pms.plugins.catalog.currentItem.id);

            return fetch(window.pms.config.cabinetAPI + 'order/getItem' , { method: 'POST', credentials: 'same-origin', body: data })
                .then( response => {
                    let responseData = false;
                    try{
                        responseData = response.json();
                    }
                    catch(e) {
                        responseData = {status: false, statusText: "Произошла ошибка при соединении"};
                        response.text().then(console.debug);
                        requestSendBugs(e);
                    }

                    return responseData;
                })
                .then(response => {
                    try{
                        if(response.status)
                        {
                            addFavoriteButtons( $('div.product-box'), response.data.wishes  );

                            if(Object.keys(response.data.modifications).length)
                            {
                                $sizeBox = $('div.size-box');

                                // for( let key in response.data.modifications)
                                // {
                                //      console.log( $sizeBox.find('div[id-modification="'+response.data.modifications[key].id+'"]')
                                //          .find('div')
                                //          .first().addClass(  ) );
                                //      $sizeBox.find('div[id-modification="'+response.data.modifications[key].id+'"]').addClass(css.sizeActive)
                                //                  .find('div')
                                //                       .last().find('span').text(response.data.modifications[key].quantity)
                                // }

                                $('div.price-basket').find('div').eq(1).remove().end().end().find('div.product-basket-link').show()
                                $('div.product-size').remove();
                                $('div.price-basket').find('span').text(response.data.price_total);
                            }
                            // else
                            // {
                            //     $('div.price-basket').find('button').replaceWith('<button><img src="images/icons/product-basket.png">В корзину</button>').end()
                            //         .find('button').show();
                            // }




                        }
                    }
                    catch (error)
                    {
                        requestSendBugs(error);
                    }

                });
        }

        Promise.all([
            requestCheckAuth("product") ,
            requestGetMenuCategories(),

        ])
            .then( response => {
                    //сли авторизированы
                    try{
                        if(response[0])
                        {
                            $('div.price-basket').css({'display' : 'flex'}).siblings('div.no-authorization').remove();

                            let list_id = [];

                            $('.product-slider').find('div[data-id-catalog-item]').each( function () {
                                list_id.push($(this).attr('data-id-catalog-item'));
                            });

                            return Promise.all([
                                requestCheckInBasket(),
                                requestCheckFavoritesItems(list_id , 'product-slider'),
                            ])

                        }
                        else{

                        }
                    }
                catch (error)
                {
                    requestSendBugs(error);
                }

                } ,
                errors => {})
            .then( response => {
                    //  console.log( response[0] );
                } ,
                errors => {}
            );


        //инициализация бокового слайдер плюс навешивание обработчика события при клике
        $('div.item-slider').find('div').first().find('div').addClass(css.itemActive);
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

            $('#product').attr('id-pictures' , img.parents('div.slick-slide').index() ).find('img').attr('src' , img.attr('data-preview-src'));
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

            if(!loadItems)
                return true;
            var data = new FormData(),
                $this = this;
            data.append('id', currentItem.collection );
            data.append('show_items' , true);
            data.append('offset' , 9);
            // data.append('limit' , 9);

            return fetch(window.pms.config.catalogAPI + 'collections/' , { method: 'POST', credentials: 'same-origin', body: data })
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
                }).then(response => {
                    if(response.status)
                    {
                        let path_image = "";
                        if( Object.keys(response.data.items).length )
                        {
                            let items = response.data.items;
                            let slide ="";
                            for(let key in response.data.items)
                            {
                                if(items[key].images)
                                    path_image = items[key].images
                                else
                                    path_image = "/images/";

                                slide = "<div class='slide'><div class='product-block' data-catalog-item-id='"+items[key].id+"'><div>" +
                                    "<div><a href='#'><img src='"+path_image+"' /></a></div>" + //картинка
                                    "<div><p><span>*****</span><span>"+items[key].price+"</span> руб.</p></div>" + //цена
                                    "<div class='block-button-favorites'></div>" +// избранное
                                    "<div>" +
                                    "<a href='"+items[key].link+"'>"+items[key].title+"</a>" +
                                    "<p>"+(items[key].description == null ? "" : items[key].description)+"</p>" +
                                    "</div>" +

                                    "<a href='"+items[key].href+"'>" +
                                    "Подробно" +
                                    "</a>" +
                                    "</div></div></div>";

                                $('.product-slider').slick('slickAdd' ,slide );
                            }

                        }
                        loadItems = false;
                    }

                });


            //  if( slick.slideCount )
            //тут надо вызывать создание элемента, плюс необходимо его добавить
            //$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
        });


        //отображение fanvybox с галереей
        let pictures = [];
        try{
            for( let i = 0; i < currentItem.images.length; i++)
                pictures.push({ src : currentItem.images[i].original })
        }
        catch(e)
        {

        }

        //fancybox3

        $('#product').click( function(){
            $.fancybox.open( pictures , {
                loop : true,
                index: pictures[$(this).attr('id-pictures')],
            });

        });

        $('div.size-box').on('keyup', 'input[type="number"]' , function(event) {
            try {
                if( $(this).val().length > 3)
                    $(this).val($(this).val().substr(0, 3));

                if($(this).val() > 0 )
                    $(this).parents('div.size-block').addClass(css.sizeActive);
                else
                    $(this).parents('div.size-block').removeClass(css.sizeActive);

                changePrice();

                //проверить, что выбран хотя бы один размер
                if( $(this).parents('div.size-box').find('div.'+css.sizeActive).length)
                    $('div.price-basket').find('button').parent('div').addClass(css.orderOn).removeClass(css.orderOff);
                else
                    $('div.price-basket').find('button').parent('div').removeClass(css.orderOn).addClass(css.orderOff);
            }
            catch (error)
            {
                requestSendBugs(error);
            }

        });

        $('div.size-box').on('change' , 'input[type="number"]' , function (event) {
            $(event.target).trigger('keypress');
        });


        //событие на клик изменения кол-ва размера товара
        $('div.product-size').on('click' , 'div.size-block button' , function () {
            try{
                let number =  parseInt(  $(this).siblings('input').val() == "" ? 0 :  $(this).siblings('input').val()   ),
                    blockPrice = $('div.price-basket').find('div').first().find('input[type="text"]'),
                    blockModifications = $('size-box');

                //кликнули на плюс
                if( $(this).prev().length )
                {
                    $(this).prev().val( number + 1  );
                    blockModifications.find('div[id-modification]').each( function(){
                        $(this).find('input[type="text"]').text();
                    });

                    $(this).parents('div.size-block').addClass(css.sizeActive);
                }
                else
                {

                    if( number > 0 )
                    {
                        $(this).next().val( number - 1 );
                        if( $(this).next().val() == 0 )
                            $(this).parents('div.size-block').removeClass(css.sizeActive);

                    }
                }
                //проверить, что выбран хотя бы один размер
                if( $(this).parents('div.size-box').find('div.'+css.sizeActive).length)
                    $('div.price-basket').find('button').parent('div').addClass(css.orderOn).removeClass(css.orderOff);
                else
                    $('div.price-basket').find('button').parent('div').removeClass(css.orderOn).addClass(css.orderOff);

                changePrice();
                //дальше будут запросы
            }
            catch(error)
            {
                requestSendBugs(error);
            }


        });


        $('div.price-basket').on('click' , 'button' , function(){
            try{
                if($(this).parent('div').hasClass(css.orderOn))
                    requestEdit(  $(this).parents('div[data-id-block]').attr('data-id-block') );
            }
            catch (error)
            {
                requestSendBugs(error);
            }

        });



    } )(jQuery);
}
catch(error)
{
    requestSendBugs(error);
}

function isError(e){
    return e && e.stack && e.message;
}

window.bug = function()
{
    try{
        triggerBUG();
    }
    catch (error)
    {
        requestSendBugs(error);
    }

}

function requestSendBugs(error) {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", window.location.protocol+"//"+"cottonbaby.ru/system/extensions/errorCatcher/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "6fc1aee4-6350-7914-1727-bb9cb2ab9235");

    if(isError(error))
        xhr.send(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    else
        xhr.send(JSON.stringify(error));
}
