/**
 * Created by Иван on 27.12.2017.
 */
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


    Promise.all([
        requestCheckAuth("product") ,
        requestGetMenuCategories(),

    ])
        .then( response => {
                //eсли авторизированы
                if(response[0])
                {
                    document.querySelector('div.price-basket').style.display = "flex";
                    document.querySelector('div.price-basket').parentNode.querySelector('div.no-authorization').remove();

                    let list_id = [];

                    document.querySelectorAll('.product-slider div[data-id-catalog-item]').forEach(function (div) {
                        list_id.push(div.getAttribute('data-id-catalog-item'));
                    });


                    return Promise.all([
                        requestCheckInBasket(),
                        requestCheckFavoritesItems(list_id , 'product-slider'),
                    ])

                }
                else{

                }
            } ,
            errors => {})
        .then( response => {
                //  console.log( response[0] );
            } ,
            errors => {}
        );


    function changePrice()
    {
        let totalPrice = 0;
        document.querySelectorAll('div.size-box input[type="number"]').forEach(function (input) {
           totalPrice += parseInt(input.value == "" ? 0 : input.value) * window.pms.plugins.catalog.currentItem.price;
        });
        if( totalPrice === 0)
        {
            totalPrice = window.pms.plugins.catalog.currentItem.price;
        }
        document.querySelector('div.price-basket span').innerText = totalPrice;

    }

    function requestEdit(id_item )
    {
        // console.log(id_item);
        let data = new FormData(),
            modifications = {},
            number = "";

        data.append('product_id' , id_item);
        document.querySelectorAll('div.size-box div[id-modification]').forEach(function (div) {
            number  =  div.querySelector('input').value == "" ? 0 :  div.querySelector('input').value;
            modifications[div.getAttribute('id-modification')] = number;
        });

        data.append('modifications' , JSON.stringify(modifications));

        return fetch( window.pms.config.cabinetAPI+'order/edit' , {method: 'POST', credentials: 'same-origin' , body: data})
            .then(function (response) {
                let responseData = false;
                try {
                    responseData = response.json();
                }
                catch (e) {
                    responseData = {status: false, statusText: "Произошла ошибка при соединении"};
                    response.text().then(console.debug);
                }
                return responseData;
            })
            .then(function (response) {
                if(response.status)
                {
                    document.querySelector('div.product-basket').style.display = "block";
                    document.querySelectorAll('div.price-basket div')[1].remove();
                    document.querySelector('div.price-basket div.product-basket-link').style.display = "block";
                    document.querySelector('[class*="header-user"] div[data-basket] span').innerText = result.data.count;
                    document.querySelector('[class*="header-user"] div[data-basket] span').style.display = "block";

                }

            });

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
                }

                return responseData;
            })
            .then(response => {
               if(response.status)
               {
                   let sizeBox = "";
                   addFavoriteButtons(  document.querySelector('div.product-box'), response.data.wishes  );
                   
                   if(Object.keys(response.data.modifications).length)
                   {
                       sizeBox = document.querySelector('div.size-box');

                       document.querySelectorAll('div.price-basket div')[1].remove();
                       document.querySelector('div.price-basket div.product-basket-link').style.display = "block";

                       document.querySelector('div.product-size').remove();

                       document.querySelector('div.price-basket span').innerText = response.data.price_total;

                   }
                           }
            });
    }



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
        var data = new FormData();

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

                            slide = "<div class='slide'><div class='product-block' data-catalog-item-id='"+items[key].id+"'>" +
                                        "<div>" +
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
                                           "</div>" +
                                        "</div>" +
                                    "</div>";

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


    document.addEventListener('keyup' , function (event) {

        if(event.target.tagName == "INPUT" && event.target.getAttribute('type') == "number" && event.target.closest('div.size-box'))
        {
            let input = event.target;
            if( input.value.length > 3)
                input.value = input.value.substr(0,3);

            if(input.value == "")
                input.value = 0;

            if( input.value > 0)
                input.closest('div[id-modification]').classList.add(css.sizeActive);
            else
                input.closest('div[id-modification]').classList.remove(css.sizeActive);

            changePrice();

            //проверить, что выбран хотя бы один размер
            if( input.closest('div.size-box').querySelector('div.'+css.sizeActive) )
            {
                document.querySelector('div.price-basket button').parentNode.classList.add(css.orderOn);
                document.querySelector('div.price-basket button').parentNode.classList.remove(css.orderOff);
            }
            else
            {
                document.querySelector('div.price-basket button').parentNode.classList.add(css.orderOff);
                document.querySelector('div.price-basket button').parentNode.classList.remove(css.orderOn);
            }

        }


    });

    document.addEventListener('change' , function (event) {
       if(event.target.input && event.target.getAttribute('type') == "number" && event.target.closest('div.size-box'))
       {
           let new_event = document.createEvent('HTMLEvents');
           event.initEvent('keyup', true, false);
           event.target.dispatchEvent(new_event);
       }

    });

    document.addEventListener('click' , function (event) {
        //событие на клик изменения кол-ва размера товара
        if(event.target.tagName == "BUTTON" && event.target.closest('div.size-box') && event.target.closest('div.product-size'))
        {
            let button = event.target,
                number = parseInt(  button.parentNode.querySelector('input').value == "" ? 0 : button.parentNode.querySelector('input').value   ),
                blockPrice = document.querySelectorAll('div.price-basket div')[0].querySelector('input[type="text"]'),
                blockModifications = document.querySelector('div.size-box');

            //кликнули на плюс
            if( button.previousElementSibling )
            {
                button.previousElementSibling.value = number + 1;
                // blockModifications.find('div[id-modification]').each( function(){
                //     $(this).find('input[type="text"]').text();
                // });
                button.closest('div.size-block').classList.add(css.sizeActive);
            }
            else
            {
                if( number > 0 )
                {
                    button.nextElementSibling.value = number - 1;
                    if( button.nextElementSibling.value == 0)
                        button.closest('div.size-block').classList.remove(css.sizeActive);
                }
            }

            //проверить, что выбран хотя бы один размер
            if( button.closest('div.size-box').querySelector('div.'+css.sizeActive))
            {
                document.querySelector('div.price-basket button').parentNode.classList.add(css.orderOn);
                document.querySelector('div.price-basket button').parentNode.classList.remove(css.orderOff);
            }
            else
            {
                document.querySelector('div.price-basket button').parentNode.classList.add(css.orderOff);
                document.querySelector('div.price-basket button').parentNode.classList.remove(css.orderOn);
            }
            changePrice();

        }

        if(event.target.tagName == "BUTTON" && event.target.closest('div.price-basket'))
        {
            if(event.target.parentNode.classList.contains(css.orderOn))
                requestEdit(  event.target.closest('div[data-id-block]').getAttribute('data-id-block') );
        }

    });

    // $('div.product-size').on('click' , 'div.size-block button' , function () {
    //     let number =  parseInt(  $(this).siblings('input').val() == "" ? 0 :  $(this).siblings('input').val()   ),
    //         blockPrice = $('div.price-basket').find('div').first().find('input[type="text"]'),
    //         blockModifications = $('size-box');
    //
    //     //кликнули на плюс
    //     if( $(this).prev().length )
    //     {
    //         $(this).prev().val( number + 1  );
    //         blockModifications.find('div[id-modification]').each( function(){
    //            $(this).find('input[type="text"]').text();
    //         });
    //
    //         $(this).parents('div.size-block').addClass(css.sizeActive);
    //     }
    //     else
    //     {
    //
    //         if( number > 0 )
    //         {
    //              $(this).next().val( number - 1 );
    //              if( $(this).next().val() == 0 )
    //                   $(this).parents('div.size-block').removeClass(css.sizeActive);
    //
    //         }
    //     }
    //     //проверить, что выбран хотя бы один размер
    //     if( $(this).parents('div.size-box').find('div.'+css.sizeActive).length)
    //        $('div.price-basket').find('button').parent('div').addClass(css.orderOn).removeClass(css.orderOff);
    //     else
    //         $('div.price-basket').find('button').parent('div').removeClass(css.orderOn).addClass(css.orderOff);
    //
    //     changePrice();
    //     //дальше будут запросы
    //
    // });


    // $('div.price-basket').on('click' , 'button' , function(){
    //     if($(this).parent('div').hasClass(css.orderOn))
    //      requestEdit(  $(this).parents('div[data-id-block]').attr('data-id-block') );
    // });



} )(jQuery);