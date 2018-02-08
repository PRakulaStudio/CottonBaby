/**
 * Created by Иван on 27.12.2017.
 */
( function () {


    var css = {
        sizeActive : "size-block-activ",
        itemActive : 'item-activ',
        orderOn : 'on-basket',
        orderOff : 'off-basket'
    };

    // var currentItem = window.pms.plugins.catalog.currentItem;
    // var countProductSlider = 9;
    // var loadItems = true;


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

    var galleryTop = new Swiper('.slider-top', {
        spaceBetween: 10,
    }).on('click' , function(swiper){
       document.querySelector('.slider-fullscreen').classList.add('fullscreen');
       galleryTop.slideTo(galleryThumbs.activeIndex, 0);
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
        // swiper.appendSlide([
        //     '<div class="swiper-slide"><div class="card">' +
        //         '<div class="card-img"><a href="#"><img src="images/pictures/i2.jpg"></a></div>' +
        //         '<div class="card-price"><p><span>*****</span><span>3 000</span> руб.</p></div>' +
        //         '<div class="card-favorites"></div>' +
        //         '<div class="card-text"><a href="#">Комплект кофта + ползунки</a><p>100% хлопок. Ваш ребенок останеться доволен.</p></div>' +
        //         '<div class="card-link"><a href="#">Подробно</a></div>' +
        //     '</div></div>',
        //     '<div class="swiper-slide"><div class="card">' +
        //     '<div class="card-img"><a href="#"><img src="images/pictures/i2.jpg"></a></div>' +
        //     '<div class="card-price"><p><span>*****</span><span>3 000</span> руб.</p></div>' +
        //     '<div class="card-favorites"></div>' +
        //     '<div class="card-text"><a href="#">Комплект кофта + ползунки</a><p>100% хлопок. Ваш ребенок останеться доволен.</p></div>' +
        //     '<div class="card-link"><a href="#">Подробно</a></div>' +
        //     '</div></div>',
        //     '<div class="swiper-slide"><div class="card">' +
        //     '<div class="card-img"><a href="#"><img src="images/pictures/i2.jpg"></a></div>' +
        //     '<div class="card-price"><p><span>*****</span><span>3 000</span> руб.</p></div>' +
        //     '<div class="card-favorites"></div>' +
        //     '<div class="card-text"><a href="#">Комплект кофта + ползунки</a><p>100% хлопок. Ваш ребенок останеться доволен.</p></div>' +
        //     '<div class="card-link"><a href="#">Подробно</a></div>' +
        //     '</div></div>',
        //
        //
        // ]);
    });



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
                else
               {
                   document.querySelector('div.price-basket').classList.remove('d-none');
               }
            });
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

        if(event.target.tagName == "SPAN" && event.target.classList.contains('close-button'))
        {
            document.querySelector('.slider-fullscreen').classList.remove('fullscreen');
            return;
        }

        if(event.target.tagName == "BUTTON" && event.target.closest('div.price-basket'))
        {
            if(event.target.parentNode.classList.contains(css.orderOn))
                requestEdit(  event.target.closest('div[data-id-block]').getAttribute('data-id-block') );
        }

    });

    // document.querySelector('.fullscreen .swiper-wrapper').innerHTML = '<div class="swiper-slide"><img src="images/pictures/i1.jpg"></div>' +
    //     '<div class="swiper-slide"><img src="images/pictures/i2.jpg"></div>' +
    //     '<div class="swiper-slide"><img src="images/pictures/i3.jpg"></div>' +
    //     '<div class="swiper-slide"><img src="images/pictures/i4.jpg"></div>' +
    //     '<div class="swiper-slide"><img src="images/pictures/i5.jpg"></div>' +
    //     '<div class="swiper-slide"><img src="images/pictures/i6.jpg"></div>';


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