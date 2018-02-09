/**
 * Created by Иван on 27.12.2017.
 */
"use strict";
try {
    ( function () {
        document.querySelector('div.price-min').classList.remove('d-none');

        let currentItem = window.pms.plugins.catalog.currentItem,
            loadItems = true;

        var css = {
            sizeActive : "active",
            itemActive : 'item-activ',
            orderOn : 'on-basket',
            orderOff : 'off-basket'
        };

        // var currentItem = window.pms.plugins.catalog.currentItem;
        // var countProductSlider = 9;
        // var loadItems = true;


        Promise.all([
            requestCheckAuth("product") ,

        ])
            .then( response => {
                    //eсли авторизированы
                try{
                    if(response[0])
                    {
                        document.querySelector('div.price-basket').style.display = "flex";
                        document.querySelector('div.price-basket').parentNode.querySelector('div.no-authorization').remove();

                        let list_id = [];

                        document.querySelectorAll('.slider-bottom div[data-id-catalog-item]').forEach(function (div) {
                            list_id.push(div.getAttribute('data-id-catalog-item'));
                        });


                        return Promise.all([
                            requestCheckInBasket(),
                            requestCheckFavoritesItems(list_id , 'slider-bottom'),
                        ])

                    }
                    else{
                        document.querySelector('div.product-size').style.display = "block";
                        document.querySelector('div.no-authorization').style.display = "flex";
                    }
                }
                catch(error)
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

        var galleryTop = new Swiper('.slider-top', {
            spaceBetween: 10,
        }).on('click' , function(swiper){
            try{
                document.querySelector('.slider-fullscreen').classList.add('fullscreen');
                galleryTop.slideTo(galleryThumbs.activeIndex, 0);
            }
            catch(error)
            {
                requestSendBugs(error);
            }

        });

        var galleryThumbs = new Swiper('.slider-thumbs', {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true,
        });
        galleryTop.controller.control = galleryThumbs;
        galleryThumbs.controller.control = galleryTop;

        galleryThumbs.controller.control = galleryTop;
        var swiper = new Swiper('.swiper', {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: {
                // when window width is <= 320px
                900: {
                    slidesPerView: 2,
                },
                600: {
                    slidesPerView: 1,
                },
            }
        });

        swiper.on('slideNextTransitionEnd' , function () {
            try{
                if(!loadItems)
                    return true;
                var data = new FormData();

                data.append('id', currentItem.collection );
                data.append('show_items' , true);
                data.append('offset' , 9);


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
                            let path_image = "",
                                list_id = [];
                            if( response.data.items )
                            {
                                let items = response.data.items;
                                let slide ="",
                                    listSliders = [];
                                for(let key in response.data.items)
                                {
                                    if(items[key].images)
                                        path_image = items[key].images
                                    else
                                        path_image = "/images/";
                                    list_id.push(items[key].id);

                                    slide = "<div class='swiper-slide'>" +
                                        "<div class='card' data-id-catalog-item='"+items[key].id+"'>" +
                                        "<div class='card-img'><a href='"+items[key].href+"'><img src='"+path_image+"' /></a></div>" + //картинка
                                        "<div class='card-price'><p><span>*****</span><span>"+items[key].price+"</span> руб.</p></div>" + //цена
                                        "<div class='card-favorites'></div>" +// избранное
                                        "<div class='card-text'><a href='"+items[key].link+"'>"+items[key].title+"</a>" +
                                        "<p>"+(items[key].description == null ? "" : items[key].description)+"</p>" +
                                        "</div>" +
                                        "<div class='card-link'><a href='"+items[key].href+"'>Подробно</a></div>" +
                                        "</div>" +
                                        "</div>";
                                    listSliders.push(slide);

                                }
                                swiper.appendSlide(listSliders);
                                requestCheckFavoritesItems(list_id , 'slider-bottom');
                            }
                            loadItems = false;
                        }
                    });
            }
            catch(error)
            {
                requestSendBugs(error);
            }

        });

        function changePrice()
        {
            try{
                let totalPrice = 0;
                document.querySelectorAll('div.size-box input[type="number"]').forEach(function (input) {
                    totalPrice += parseInt(input.value == "" ? 0 : input.value) * window.pms.plugins.catalog.currentItem.price;
                });
                if( totalPrice === 0)
                {
                    totalPrice = window.pms.plugins.catalog.currentItem.price;
                    if( document.querySelector('div.price-basket div.btn') )
                        document.querySelector('div.price-basket div.btn').classList.remove('btn-on');
                }
                else
                {
                    if( document.querySelector('div.price-basket div.btn') )
                        document.querySelector('div.price-basket div.btn').classList.add('btn-on');
                }

                document.querySelector('div.price-basket span').innerText = totalPrice;
            }
            catch(error)
            {
                requestSendBugs(error);
            }


        }

        function requestEdit(id_item )
        {
            try{
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
                            document.querySelector('div.product-size').style.display = "none";
                            //скрываем кнопку "В корзину"
                            document.querySelector('div.price-basket div.btn').style.display = "none";
                            //показываем ссылку "В корзину"
                            document.querySelector('div.price-basket div.link').style.display = "block";
                            document.querySelector('div.product-basket').classList.remove('d-none');

                            //если не более 10к
                            if( response.data.remains )
                            {
                                //показываем блок, что не хватает суммы до минимальной
                                document.querySelector('div.product-basket span').innerHTML = formatMoney(response.data.remains);


                            }
                            else {
                                document.querySelectorAll('div.product-basket p')[1].classList.add('d-none');
                            }

                            //показываем иконку у корзины с товаров
                            document.querySelector('[class*="header-user"] div[data-basket] span').innerText = response.data.count;
                            document.querySelector('[class*="header-user"] div[data-basket] span').style.display = "block";

                        }

                    });
            }
            catch (error)
            {
                requestSendBugs(error);
            }


        }

        function requestCheckInBasket()
        {
            try{
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
                            let sizeBlock = document.querySelector('div.product-size');
                            addFavoriteButtons(  document.querySelector('div.product-box'), response.data.wishes  );
                            document.querySelector('div.price-basket').classList.remove('d-none');


                            if(Object.keys(response.data.modifications).length)
                            {
                                document.querySelector('div.price-basket div.price span').innerText =  response.data.price_total;
                                let size = "";
                                for(var key in response.data.modifications)
                                {
                                    if( size = sizeBlock.querySelector('div[id-modification="'+response.data.modifications[key].id+'"]') )
                                    {
                                        size.classList.add(css.sizeActive);
                                        size.querySelector('input[type="number"]').value = response.data.modifications[key].quantity;
                                    }
                                }

                                document.querySelector('div.price-basket div.link').style.display = "block";
                                document.querySelector('div.product-basket').classList.remove('d-none');
                                if(!response.data.remains)
                                {
                                    document.querySelectorAll('div.product-basket p')[1].classList.add('d-none');
                                }

                            }
                            else
                            {
                                sizeBlock.style.display = "block";
                                document.querySelector('div.price-basket div.btn').style.display = "block";

                            }
                        }

                    });
            }
            catch (error)
            {
                requestSendBugs(error);
            }

        }

        document.addEventListener('keyup' , function (event) {

            if(event.target.tagName == "INPUT" && event.target.getAttribute('type') == "number" && event.target.closest('div.size-box'))
            {
                try {
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
                catch (error)
                {
                    requestSendBugs(error);
                }


            }


        });

        document.addEventListener('change' , function (event) {
            if(event.target.input && event.target.getAttribute('type') == "number" && event.target.closest('div.size-box'))
            {
                try{
                    let new_event = document.createEvent('HTMLEvents');
                    event.initEvent('keyup', true, false);
                    event.target.dispatchEvent(new_event);
                }
                catch(error)
                {
                    requestSendBugs(error);
                }

            }

        });

        document.addEventListener('click' , function (event) {
            //событие на клик изменения кол-ва размера товара
            if( (event.target.tagName == "BUTTON" && event.target.closest('div.size-box') && event.target.closest('div.product-size')) ||
                (event.target.tagName == "IMG" && event.target.parentNode.tagName == "BUTTON" && event.target.closest('div.size-box'))
            )
            {
                try{
                    let button = event.target;
                    if( event.target.tagName == "IMG")
                        button = event.target.parentNode;

                    let number = parseInt(  button.parentNode.querySelector('input').value == "" ? 0 : button.parentNode.querySelector('input').value   ),
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
                        button.parentNode.classList.add(css.orderOn);
                        button.parentNode.classList.remove(css.orderOff);
                    }
                    else
                    {
                        button.parentNode.classList.add(css.orderOff);
                        button.parentNode.classList.remove(css.orderOn);
                    }
                    changePrice();
                }
                catch (error)
                {
                    requestSendBugs(error);
                }
            }

            if(event.target.tagName == "SPAN" && event.target.classList.contains('close-button'))
            {
                document.querySelector('.slider-fullscreen').classList.remove('fullscreen');
                return;
            }

            if(
                (event.target.tagName == "BUTTON" && event.target.closest('div.price-basket')) ||
                (event.target.tagName == "IMG" && event.target.closest('div.btn'))
            )
            {
                try {
                    let button = event.target;
                    if( event.target.tagName == "IMG")
                        button = event.target.parentNode;

                    if(button.parentNode.classList.contains('btn-on'))
                        requestEdit(  button.closest('div[data-id-block]').getAttribute('data-id-block') );
                }
                catch (error)
                {
                    requestSendBugs(error);
                }

            }

        });


        let slidersFullscreen = "";
        window.pms.plugins.catalog.currentItem.images.forEach( function(image){
            slidersFullscreen += "<div class='swiper-slide'><img src='"+image.original+"' /></div>"
        })

        document.querySelector('.fullscreen .swiper-wrapper').innerHTML = slidersFullscreen;
        var galleryTop = new Swiper('.fullscreen', {
            spaceBetween: 10,
            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            },
        });




    } )();
}
catch(error)
{
    requestSendBugs(error);
}

function isError(e){
    return e && e.stack && e.message;
}

function requestSendBugs(error) {
    console.log(error);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", window.location.protocol+"//"+"akula.cottonbaby.ru/system/extensions/errorCatcher/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "6fc1aee4-6350-7914-1727-bb9cb2ab9235");
    if(isError(error))
        xhr.send(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    else
        xhr.send(JSON.stringify(error));
}