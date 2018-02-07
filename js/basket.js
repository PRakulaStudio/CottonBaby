( function () {
    "use strict";
    var timeOuts = [];
    var isPayment = false;
    var min_price_order = "";
    var total_price = "";
    var useBonus = 0;
    var css = {
        'input_error' : "input-error-bottom",
        'is_check' : 'payment-activ',
        'disabled_order' : 'basket-order-off',
        'enable_order' : 'basket-order-on',
        'sizeActive' : 'basket-size-on',
    };
    var delivery_city = "";
    var index_number = "";
    var address = "";

    requestGetBasket();
    requestCheckAuth('basket')
    requestGetUserData();

    //if(document.querySelector('div[data-basket] a span') && document.querySelector('div[data-basket] a span').innerText == 0 )
      //   document.querySelector('div.block-empty').classList.toggle('d-none');


    // function checkButtonOrder()
    // {
    //     //Итого
    //     if( document.querySelector('div.payment-box button.'+css.is_check) )
    //     {
    //         if( parseInt(total_price) >= parseInt(min_price_order) )
    //         {
    //             document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.remove(css.disabled_order);
    //             document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.add(css.enable_order);
    //         }
    //         else
    //         {
    //             document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.remove(css.enable_order);
    //             document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.add(css.disabled_order);
    //
    //         }
    //
    //     }
    //
    // }


    function requestGetUserData()
    {

        return fetch( window.pms.config.cabinetAPI+'get/userData' , { method: 'POST', credentials: 'same-origin'})
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
            .then( response => {
                if(response.status)
                {
                    let text_full_address,
                        popup;

                    popup = document.querySelector('#popup-fon .popup-cell');
                    for(var key in response.userData)
                    {
                        let input =  popup.querySelector('input[name="'+key+'"]');

                        if(input){
                            input.value = response.userData[key];
                            switch(key)
                            {
                                case "delivery_city" :
                                    delivery_city = response.userData[key];
                                    break;
                                case "index_number" :
                                    index_number = response.userData[key];
                                    break;
                                case "address" :
                                    address  = response.userData[key];
                                    break;

                            }
                        }
                    }

                    text_full_address = 'Текущий адрес доставки: '+index_number+' '+delivery_city+' '+address;
                    if( response.userData.index_number == "" && response.userData.city == "" && response.userData.address == "" )
                        text_full_address = "Не указан адрес доставки";

                    document.querySelector('div.address-box p').innerText = text_full_address;
                }
            });
    }

    function requestGetBasket()
    {
        return fetch( window.pms.config.cabinetAPI+'order/cart' , { method: 'POST', credentials: 'same-origin'})
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
            .then( response => {
                if( response.status)
                {
                    let products = response.data.cart.products,
                        html = "",
                        list_div;
                    if( products )
                    {
                        for( let key in products )
                        {

                            let product = products[key].product,
                                modifications = products[key].modifications;
                            html += "<div class='basket-product' data-id-item='"+product.id+"'>" +
                                "<div>" +
                                "<div>" +
                                "<div>" +
                                "<div>" +
                                "<img src='"+product.images[0]['50x50']+"' >"+
                                "<div>"+
                                "<p>#"+products[key].order_id+"</p>"+
                                "<p><a href='"+product.href+"' >"+product.title+"</a></p>";

                            if( product.collection[0].title )
                            {
                                html += "<p>Коллекция: <a href='"+product.collection[0].href+"' >"+product.collection[0].title+"</a></p>";
                            }


                            html += "</div>"+
                                "</div>" +

                                "</div>" +
                                "<div>" +
                                "<div>" +
                                "<p>Цена за шт.</p>"+
                                "<span>"+formatMoney(product.price)+"</span>"+
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "<div>" +
                                "<div>";
                            let classSizeOn;
                            for( let size_id in modifications )
                            {
                                classSizeOn = "";
                                if( +modifications[size_id].quantity > 0  )
                                    classSizeOn = 'basket-size-on';

                                html += "<div data-id-size='"+modifications[size_id].id+"' class='"+classSizeOn+"'>" +
                                    "<p>"+modifications[size_id].title+"</p>" +
                                    "<div class='basket-product-size'>" +
                                    "<button data-action-size='reduce'><img src='/images/icons/minus.svg' /></button>" +
                                    "<input type='number' placeholder='0' class='shest' value='"+modifications[size_id].quantity+"' />"+
                                    "<button data-action-size='increase'><img src='/images/icons/plus.svg' /></button>" +
                                    "</div>" +
                                    "</div>";
                            }

                            html +=      "</div>" +
                                "<div>" +
                                "<div>" +
                                "<p>Сумма</p>" +
                                "<span>"+formatMoney(products[key].total_price)+"</span>" +
                                "</div>" +
                                "</div>"+
                                "</div>" +
                                "</div>" +



                                "<div>" +
                                "<button data-action='remove'>x</button>"+
                                "</div>" +

                                "</div>";

                        }

                        document.querySelector('div.basket-box').innerHTML = html;

                        //бонусы
                        list_div = document.querySelectorAll('div.basket-total div');
                        list_div[0].querySelector('span').innerText = formatMoney(response.data.cart.bonus);

                        if( response.data.cart.used_bonus )
                            useBonus = parseInt(response.data.cart.used_bonus);

                        if(response.data.cart.payment_method)
                            document.querySelector('div.payment-box button[data-payment-method="'+response.data.cart.payment_method+'"]').classList.add(css.is_check);


                        list_div[2].querySelector('span').innerText = formatMoney(response.data.cart.total_price);


                        if( parseInt(response.data.cart.total_price) >= parseInt(response.data.cart.min_price_order)   )
                            document.querySelectorAll('.basket-order div')[2].classList.add(css.enable_order);

                        if( parseInt(response.data.cart.bonus) > 0 )
                            document.querySelector('.basket-total button[action="use-bonus"]').parentNode.style.display = "block";
                        else
                            document.querySelector('.basket-total button[action="use-bonus"]').remove();


                        min_price_order = response.data.cart.min_price_order;
                        total_price = response.data.cart.total_price;

                       // checkButtonOrder();


                        document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа состовляет "+formatMoney(total_price);
                        document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[1].innerText = "Минимальный заказ "+formatMoney(min_price_order);

                        document.querySelector('div.basket-container').style.display = "block";

                    }
                    else
                    {
                        document.querySelector('div.block-empty').classList.toggle('d-none');
                    }
                }
                else
                {
                    document.querySelector('div.block-empty').classList.toggle('d-none');
                }
            });

    }

    function requestEdit( id_item )
    {
        // console.log(id_item);
        let data = {},
            formData = new FormData();
        data['product_id'] = id_item;
        data['modifications'] = {};

        document.querySelectorAll('div.basket-box div[data-id-item="'+id_item+'"] button[data-action-size="reduce"] ').forEach(function(current, index, array){
            data['modifications'][current.closest('div[data-id-size]').getAttribute('data-id-size')] = current.nextElementSibling.value == "" ? 0 : current.nextElementSibling.value;
        });



        formData.append('product_id' , id_item );
        formData.append('modifications' , JSON.stringify(data['modifications']));

        return fetch(  window.pms.config.cabinetAPI+'order/edit' , { method: 'POST', credentials: 'same-origin' , body : formData} )
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
            .then( response => {
                if(response.status)
                {
                    let products = response.data.products,
                        basketBox = document.querySelector('div.basket-box');
                    for( let key in products)
                    {
                        basketBox.querySelectorAll('div[data-id-item="'+key+'"] span')[basketBox.querySelectorAll('div[data-id-item="'+key+'"] span').length - 1].innerText = formatMoney(products[key].price_total);
                    }
                    document.querySelectorAll('div.basket-total div')[  document.querySelectorAll('div.basket-total div').length - 1].querySelector('span').innerText = formatMoney(response.data.total_price);
                    document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа составляет "+formatMoney(response.data.total_price);
                    total_price = response.data.total_price;
                  //  checkButtonOrder();


                }
            });
    }

    function requestDeleteItem( product_id )
    {
        let data = new FormData();
        data.append('product_id' , product_id);

        return fetch(  window.pms.config.cabinetAPI+'order/delete' , { method: 'POST', credentials: 'same-origin' , body : data} )
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
            .then( response => {
                if(response.status)
                {
                    document.querySelector('div.basket-box div[data-id-item="'+product_id+'"]').remove();
                    document.querySelectorAll('div.basket-total div')[ document.querySelectorAll('div.basket-total div').length - 1].querySelector('span').innerText = formatMoney( response.data.total_price );
                    total_price = response.data.total_price;

                   // checkButtonOrder();

                    //изменяем цифру в корзине
                    document.querySelector('[class*="header-user"] div[data-basket] span').innerText = parseInt( document.querySelector('[class*="header-user"] div[data-basket] span').innerText ) - 1;
                    if(  document.querySelector('[class*="header-user"] div[data-basket] span').innerText === 0 )
                         document.querySelector('[class*="header-user"] div[data-basket] span').style.display = "none";

                    //меняем текст общей суммы заказа рядом с кнопкой "оформить заказ"
                    document.querySelectorAll('div.basket-order > div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа состовляет "+formatMoney(total_price);
                    if(total_price === 0)
                    {
                        document.querySelector('div.basket-container').style.display = 'none';
                        document.querySelector('div.basket-empty').style.display = 'block';
                        document.querySelector('[class*="header-user"] div[data-basket] span').style.display = 'none';
                    }
                }
            });

    }

    function requestUseBonus()
    {
        return fetch(  window.pms.config.cabinetAPI+'order/useBonus' , { method: 'POST', credentials: 'same-origin' } )
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
            .then( response => {
                if(response.status)
                {
                    let footerBasket =  document.querySelectorAll('div.basket-total div');
                    footerBasket[0].querySelector('span').innerText = formatMoney(response.data.bonus);
                    footerBasket[1].querySelector('button').remove();
                    footerBasket[2].querySelector('span').innerText = formatMoney(response.data.total_price);
                    useBonus = parseInt(response.data.used_bonus);

                }
                else
                {
                    alert(response.statusText);
                }
            });
    }

    function requestCheck( payment_method  )
    {
        let data = new FormData();


      //  document.querySelector('button[action="save-order"]').parentNode.classList.add(css.disabled_order);
      //   document.querySelector('button[action="save-order"]').parentNode.classList.remove(css.enable_order);


        data.append('payment_method' , payment_method);


        if(document.querySelector('div.payment-box button.payment-activ') )
            document.querySelector('div.payment-box button.payment-activ').classList.remove(css.is_check);

        return fetch( window.pms.config.cabinetAPI+'order/check' , { method: 'POST', credentials: 'same-origin' , body : data})
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
            .then( response => {

                if( response.status)
                {
                    if(response.data.payment_method)
                        document.querySelector('div.payment-box button[data-payment-method="'+response.data.payment_method+'"]').classList.add(css.is_check);

                }
                else
                {
                    if( response.data.errors.address )
                    {
                        PopUpShowCard();
                        for( var key in  response.data.errors.address)
                            document.querySelector('#card input[name="'+response.data.errors.address[key]+'"]').classList.add( css.input_error );

                    }
                    else
                    {
                        PopUpShowScore();
                        for( var key in  response.data.errors.payment)
                            document.querySelector('#score input[name="'+response.data.errors.payment[key]+'"]').classList.add( css.input_error );
                    }

                }
            });

    }

//отправка заказа на оформление
    function requestSendOrder()
    {
        return fetch( window.pms.config.cabinetAPI+'order/save' , { method: 'POST', credentials: 'same-origin'})
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
            .then( response => {

                if( response.status)
                {
                    document.querySelector('#popup-fon').style.display = "block";
                    document.querySelector('div.basket-order button[action="save-order"]').remove();
                    PopUpShowThanks();
                }
                else
                {
                    for(var key in response.data.errors)
                    {
                        alert(response.data.errors[key]);
                        break;
                    }
                }
            });
    }


    function setUserData(button , fields)
    {
        var data = new FormData();

        if(fields['delivery_city'] && fields['index_number'] && fields['address']  )
        {
            delivery_city = fields['delivery_city'];
            index_number = fields['index_number'];
            address = fields['address'];
        }

        data.append('data' , JSON.stringify(fields) );

        return fetch( window.pms.config.cabinetAPI+'set/userData' , { method: 'POST', credentials: 'same-origin' , body: data})
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
            .then( response => {
                if( response.status)
                {

                    document.querySelector('div.address-box p').innerHTML = 'Текущий адрес доставки: '+index_number+' '+delivery_city+' '+address;

                    var event = document.createEvent('HTMLEvents');
                    event.initEvent('click', true, false);
                    button.closest('form').parentNode.querySelector('button').dispatchEvent(event);

                    button.closest('form').querySelector('input').classList.remove(css.input_error);



                    if( button.getAttribute('data-type-popup') == "payment")
                    {
                        requestCheck( "payment" );
                    }


                }
            });
    }

    function changeNewTotalPrice(input)
    {
        let price = parseInt( input.closest('div.basket-product').querySelectorAll('span')[0].innerText.replace('руб.', "").replace(/\s*/g,''));
        let totalPrice = 0;

        input.closest('div[data-id-size]').parentNode.querySelectorAll('div[data-id-size] input[type="number"]').forEach(function(current, undex, array){
            totalPrice += parseInt( price * parseInt( current.value ));
        })


        // if( totalPrice === 0)
        //     totalPrice = price;

        input.closest('div.basket-product').querySelectorAll('span')[ input.closest('div.basket-product').querySelectorAll('span').length - 1 ].innerText = formatMoney(totalPrice);

        totalPrice = 0;
        document.querySelectorAll('div.basket-product').forEach(function (current, index, array) {
            totalPrice += parseInt( current.querySelectorAll('span')[  current.querySelectorAll('span').length - 1 ].innerText.replace('руб.', "").replace(/\s*/g,''));
        });

        total_price = totalPrice - useBonus;

        document.querySelectorAll('div.basket-total div')[2].querySelector('span').innerText = formatMoney(total_price);
        document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа состовляет "+formatMoney(total_price);

        //checkButtonOrder();

    }

    document.addEventListener('keyup' , function (event) {
        if( event.target.tagName == "INPUT" && event.target.closest('div.basket-container'))
        {

            let id_item = event.target.closest('div.basket-product').getAttribute('data-id-item');
            clearTimeout(timeOuts[id_item]);

            if( event.target.value.length > 3)
                event.target.value = event.target.value.substr(0 , 3);

            if(event.target.value === "")
                event.target.value = 0;

            if(  event.target.value > 0 )
                event.target.closest('div[data-id-size]').classList.add(css.sizeActive);
            else
                event.target.closest('div[data-id-size]').classList.remove(css.sizeActive);



            changeNewTotalPrice(event.target);

            timeOuts[event.target.closest('div.basket-product').getAttribute('data-id-item')] = setTimeout(function() {
                requestEdit(id_item);
            }, 1000 )

            return;
        }


    });

    document.addEventListener('click' , function (event) {
        //изменение размеров
        if( event.target.tagName == "BUTTON" && event.target.hasAttribute('data-action-size') )
        {
            let id_item = event.target.closest('div.basket-product').getAttribute('data-id-item'),
                input =  event.target.parentNode.querySelector('input');
            //на время запроса блочим кнопку отправки заказа
            document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.add( css.disabled_order );
            clearTimeout(timeOuts[id_item]);

            if( event.target.getAttribute("data-action-size") == "increase" )
                input.value = parseInt(input.value) + 1;
            else
                input.value = parseInt(input.value) - 1 < 0 ? 0 : parseInt(input.value) - 1;


            if( input.value  > 0 )
                event.target.closest('div[data-id-size]').classList.add(css.sizeActive);
            else
                event.target.closest('div[data-id-size]').classList.remove(css.sizeActive);

            changeNewTotalPrice(  input );

            timeOuts[ event.target.closest('div.basket-product').getAttribute('data-id-item')] = setTimeout(function() {
                requestEdit(id_item);
            }, 1000 )
            return;
        }

        //сохранение полей у модальных окон
        if(event.target.tagName == "BUTTON" && event.target.getAttribute('data-action') == "save-user-data" )
        {
            let data = {},
                sendRequest = true;
            event.target.parentNode.querySelectorAll('input').forEach( function( current, index, array) {
                current.classList.remove(css.input_error);
                validateData(current, data, css.input_error);

                if (current.classList.contains(css.input_error))
                    sendRequest = false;
            });

            if(sendRequest)
                setUserData(event.target, data);
            return;
        }

        if( ( (event.target.tagName == "IMG" && event.target.parentNode.tagName == "BUTTON") || event.target.tagName == "BUTTON" ) && event.target.closest('div.payment-box'))
        {
            let button;
            if(event.target.tagName == "IMG")
                button = event.target.parentNode;
            else
                button = event.target;

            requestCheck( button.getAttribute('data-payment-method'));



            return;
        }

        //сохранение заказа
        if(event.target.tagName == "BUTTON" && event.target.getAttribute('action') == "save-order")
        {
            requestSendOrder();
            return;
        }

        //удаляем из корзины
        if(event.target.tagName == "BUTTON" && event.target.getAttribute('data-action') == "remove" && event.target.closest('div.basket-box'))
        {
            requestDeleteItem(event.target.closest('div[data-id-item]').getAttribute('data-id-item'));
            return;
        }
        //используем бонусы
        if(event.target.tagName == "BUTTON" && event.target.getAttribute('action') == "use-bonus" && event.target.closest('div.basket-total'))
        {
            requestUseBonus();
        }

        if( event.target.tagName == "IMG"  && event.target.parentNode.classList.contains('popup-close') && event.target.closest('#thanks'))
        {
            let storage = JSON.parse(localStorage.getItem('user'));
            storage['cartCount'] = 0;
            localStorage.setItem('user' , JSON.stringify(storage));
            window.location.href = "/cabinet.html";
        }
    });


})()

// (function($){
//
//
//
//
//
//     //
//     // function checkButtonOrder()
//     // {
//     //     //Итого
//     //     if($('.payment-box').find('button').hasClass('payment-activ') )
//     //     {
//     //         if(  parseInt(total_price) >= parseInt(min_price_order) )
//     //             $('.basket-order').find('button[action="save-order"]').parent('div').removeClass(css.disabled_order).addClass(css.enable_order);
//     //         else
//     //             $('.basket-order').find('button[action="save-order"]').parent('div').addClass(css.disabled_order).removeClass(css.enable_order);
//     //     }
//     //
//     // }
//
//     // function requestGetUserData()
//     // {
//     //     var data = {};
//     //
//     //     $.ajax({
//     //         dataType: 'json',
//     //         data : data,
//     //         url: window.pms.config.cabinetAPI+'get/userData',
//     //         success: function (result , status) {
//     //           if(result.status)
//     //           {
//     //               let text_full_address = 'Текущий адрес доставки: '+result.userData.index_number+' '+result.userData.delivery_city+' '+result.userData.address;
//     //
//     //               if( result.userData.index_number == "" && result.userData.city == "" && result.userData.address == "" )
//     //                   text_full_address = "Не указан адрес доставки";
//     //
//     //               $('div.address-box').find('p').text( text_full_address );
//     //
//     //               var popup = $('#popup-fon').find('.popup-cell');
//     //
//     //               for(var key in result.userData)
//     //               {
//     //                     popup.find('input[name="'+key+'"]').val(result.userData[key]);
//     //               }
//     //
//     //           }
//     //         },
//     //     });
//     //
//     // }
//     //получение корзины
//     // function requestGetBasket()
//     // {
//     //     var data = {};
//     //
//     //     $.ajax({
//     //         type : "POST",
//     //         dataType: 'json',
//     //         data : data,
//     //         url: window.pms.config.cabinetAPI+'order/cart',
//     //         success: function( result, status){
//     //             if(result.status)
//     //             {
//     //                 let products = result.data.cart.products;
//     //                 if(products)
//     //                 {
//     //                     var html = "";
//     //                     for( let key in products )
//     //                     {
//     //
//     //                         let product = products[key].product,
//     //                             modifications = products[key].modifications;
//     //                         html += "<div class='basket-product' data-id-item='"+product.id+"'>" +
//     //                             "<div>" +
//     //                             "<div>" +
//     //                             "<div>" +
//     //                             "<div>" +
//     //                             "<img src='"+product.images[0]['50x50']+"' >"+
//     //                             "<div>"+
//     //                             "<p>#"+products[key].order_id+"</p>"+
//     //                             "<p><a href='"+product.href+"' >"+product.title+"</a></p>";
//     //
//     //                             if( product.collection[0].title )
//     //                             {
//     //                                 html += "<p>Коллекция: <a href='"+product.collection[0].href+"' >"+product.collection[0].title+"</a></p>";
//     //                             }
//     //
//     //
//     //                             html += "</div>"+
//     //                             "</div>" +
//     //
//     //                             "</div>" +
//     //                             "<div>" +
//     //                             "<div>" +
//     //                             "<p>Цена за шт.</p>"+
//     //                             "<span>"+formatMoney(product.price)+"</span>"+
//     //                             "</div>" +
//     //                             "</div>" +
//     //                             "</div>" +
//     //                             "<div>" +
//     //                             "<div>";
//     //                         let classSizeOn;
//     //                         for( let size_id in modifications )
//     //                         {
//     //                             classSizeOn = "";
//     //                             if( +modifications[size_id].quantity > 0  )
//     //                                 classSizeOn = 'basket-size-on';
//     //
//     //                             html += "<div data-id-size='"+modifications[size_id].id+"' class='"+classSizeOn+"'>" +
//     //                                 "<p>"+modifications[size_id].title+"</p>" +
//     //                                 "<div>" +
//     //                                 "<button data-action-size='reduce'>-</button>" +
//     //                                 "<input type='number' placeholder='0' class='shest' value='"+modifications[size_id].quantity+"' />"+
//     //                                 "<button data-action-size='increase'>+</button>" +
//     //                                 "</div>" +
//     //                                 "</div>";
//     //                         }
//     //
//     //                         html +=      "</div>" +
//     //                             "<div>" +
//     //                             "<div>" +
//     //                             "<p>Сумма</p>" +
//     //                             "<span>"+formatMoney(products[key].total_price)+"</span>" +
//     //                             "</div>" +
//     //                             "</div>"+
//     //                             "</div>" +
//     //                             "</div>" +
//     //
//     //
//     //
//     //                             "<div>" +
//     //                             "<button data-action='remove'>x</button>"+
//     //                             "</div>" +
//     //
//     //                             "</div>";
//     //
//     //                     }
//     //
//     //                     $('div.basket-box').html(html);
//     //
//     //                     //бонусы
//     //                     let list_div = $('div.basket-total').find('div');
//     //                     list_div.eq(0).find('span').text(formatMoney(result.data.cart.bonus));
//     //
//     //                     if( result.data.cart.used_bonus )
//     //                         useBonus = parseInt(result.data.cart.used_bonus);
//     //
//     //                     if(result.data.cart.payment_method)
//     //                         $('div.payment-box').find('button[data-payment-method="'+result.data.cart.payment_method+'"]').addClass(css.is_check);
//     //
//     //                     //кнопка с бонусами
//     //                     if( parseInt(result.data.cart.bonus) > 0 && parseInt(result.data.cart.min_price_order) <= parseInt(result.data.cart.total_price ) )
//     //                         list_div.eq(1).show();
//     //
//     //                     list_div.eq(2).find('span').text(formatMoney(result.data.cart.total_price));
//     //
//     //
//     //                     //кнопка оформление заказа
//     //                     if( parseInt(result.data.cart.minPriceOrder) < parseInt(result.data.cart.total_price) )
//     //                         $('div.basket-order').find('div').eq(2).children().show();
//     //
//     //                     if( parseInt(result.data.cart.total_price) >= parseInt(result.data.cart.min_price_order)   )
//     //                         document.querySelectorAll('.basket-order div')[2].setAttribute('class' , css.enable_order);
//     //
//     //                     min_price_order = result.data.cart.min_price_order;
//     //                     total_price = result.data.cart.total_price;
//     //
//     //                     $('div.basket-order').find('div').eq(1).find('p').eq(0).text("Сумма вашего заказа состовляет "+formatMoney(total_price)).end()
//     //                         .eq(1).text("Минимальный заказ "+formatMoney(min_price_order));
//     //
//     //                     $('div.basket-container').show();
//     //
//     //
//     //                 }
//     //             }
//     //             else
//     //             {
//     //
//     //                 $('div.basket-empty').show();
//     //
//     //             }
//     //         },
//     //
//     //     });
//     //
//     // }
//
//     // function requestEdit( id_item )
//     // {
//     //    // console.log(id_item);
//     //     var data = {};
//     //         data['product_id'] = id_item;
//     //         data['modifications'] = {};
//     //     console.log( id_item );
//     //     $('div.basket-box').find('div[data-id-item="'+id_item+'"]').find('button[data-action-size="reduce"]').each( function () {
//     //          data['modifications'][$(this).next().parents('div[data-id-size]').attr('data-id-size')] = $(this).next().val() == "" ? 0 : $(this).next().val();
//     //     });
//     //
//     //     data['modifications'] = JSON.stringify(data['modifications']);
//     //
//     //     $.ajax({
//     //         type : "POST",
//     //         dataType: 'json',
//     //         data : data,
//     //         url: window.pms.config.cabinetAPI+'order/edit',
//     //         success : function (  result, status ) {
//     //             if( result.status)
//     //             {
//     //                let products = result.data.products;
//     //                for(var key in products )
//     //                {
//     //                    $('div.basket-box').find('div[data-id-item="'+key+'"]').find('span').last().text(formatMoney(products[key].price_total));
//     //                }
//     //
//     //                //Итого
//     //                $('div.basket-total').find('div').last().find('span').text(formatMoney(result.data.total_price));
//     //                $('div.basket-order').find('div').eq(1).find('p').first().text("Сумма вашего заказа составляет "+formatMoney(result.data.total_price));
//     //                total_price = result.data.total_price;
//     //                checkButtonOrder();
//     //             }
//     //         },
//     //     })
//     //
//     // }
//
//     // function requestDeleteItem( product_id )
//     // {
//     //     var data = {};
//     //         data['product_id'] = product_id;
//     //
//     //
//     //     $.ajax({
//     //         type : "POST",
//     //         dataType: 'json',
//     //         data : data,
//     //         url: window.pms.config.cabinetAPI+'order/delete',
//     //         success : function (  result, status ) {
//     //            if( result.status)
//     //            {
//     //                $('div.basket-box').find('div[data-id-item="'+product_id+'"]').remove();
//     //
//     //
//     //                $('div.basket-total').find('div').last().find('span').text(formatMoney( result.data.total_price ));
//     //                total_price = result.data.total_price;
//     //                checkButtonOrder();
//     //                $('[class*="header-user"]').find('div[data-basket] span').text(parseInt( $('[class*="header-user"]').find('div[data-basket] span').text()) - 1);
//     //
//     //                if(!$('div.basket-box').children().length)
//     //                {
//     //                    $('div.basket-container').hide();
//     //                    $('div.basket-empty').show();
//     //                    $('[class*="header-user"]').find('div[data-basket] span').hide();
//     //
//     //                }
//     //            }
//     //         },
//     //     });
//     // }
//
//     // function requestUseBonus()
//     // {
//     //     var data = {};
//     //
//     //     $.ajax({
//     //         type : "POST",
//     //         dataType: 'json',
//     //         data : data,
//     //         url: window.pms.config.cabinetAPI+'order/useBonus',
//     //         success : function (  result, status ) {
//     //             if( result.status)
//     //             {
//     //                 $('div.basket-total').find('div').eq(0).find('span').text(formatMoney(result.data.bonus));
//     //                 $('div.basket-total').find('div').eq(2).find('span').text(formatMoney(result.data.total_price));
//     //                 $('div.basket-total').find('div').eq(1).find('button').remove();
//     //                 useBonus = parseInt(result.data.used_bonus);
//     //
//     //             }
//     //         },
//     //     });
//     //
//     //
//     //
//     // }
//
//     //запрос на проверку заполненных данных
//     // function requestCheck( button , payment_address )
//     // {
//     //     var data = {};
//     //         $('div.payment-box').find('button').removeClass( css.is_check );
//     //         $('button[action="save-order"]').parent('div').addClass(css.disabled_order).removeClass(css.enable_order);
//     //
//     //     data['payment_method'] = button.data('payment-method');
//     //     data['payment_address'] = payment_address;
//     //
//     //     $('#popup-fon').find('input').removeClass(css.input_error);
//     //
//     //
//     //     $.ajax({
//     //         url: window.pms.config.cabinetAPI+"order/check",
//     //         method: "POST",
//     //         dataType: 'json',
//     //         data: data,
//     //         success: function( result, status){
//     //             if( result.status)
//     //             {
//     //                 if(button.data('payment-method') == "payment" && !payment_address)
//     //                     requestCheck(button , true);
//     //                 else
//     //                 {
//     //                     button.addClass(css.is_check);
//     //                     checkButtonOrder();
//     //                 }
//     //
//     //             }
//     //             else
//     //             {
//     //                 if( result.data.errors.address )
//     //                 {
//     //                     PopUpShowCard();
//     //                     for( var key in  result.data.errors.address)
//     //                        $('#card').find('input[name="'+result.data.errors.address[key]+'"]').addClass(css.input_error);
//     //                 }
//     //                 else
//     //                 {
//     //                     PopUpShowScore();
//     //                     for( var key in  result.data.errors.payment)
//     //                        $('#score').find('input[name="'+result.data.errors.payment[key]+'"]').addClass(css.input_error);
//     //
//     //                 }
//     //
//     //             }
//     //
//     //         },
//     //
//     //     });
//     //
//     //
//     //
//     // }
//
//     //отправка заказа на оформление
//     // function requestSendOrder()
//     // {
//     //     $.ajax({
//     //         type: 'POST',
//     //         dataType : "JSON",
//     //         url: window.pms.config.cabinetAPI+'order/save',
//     //         success: function( result, status){
//     //
//     //             $('#popup-fon').show();
//     //             if( result.status)
//     //             {
//     //                 $('div.basket-order').find('button[action="save-order"]').remove();
//     //                 PopUpShowThanks();
//     //             }
//     //
//     //         },
//     //
//     //     });
//     //
//     // }
//
//     // function setUserData(button , fields)
//     // {
//     //     $.ajax({
//     //         url: window.pms.config.cabinetAPI+'set/userData',
//     //         type: 'POST',
//     //         encoding: "UTF-8",
//     //         data:  {
//     //           "data": JSON.stringify(fields)
//     //         },
//     //         dataType: 'json',
//     //         success: function( result, status)
//     //         {
//     //             if( result.status)
//     //             {
//     //                 $('div.address-box').find('p').text( 'Текущий адрес доставки: '+fields['index_number']+' '+fields['delivery_city']+' '+fields['address']);
//     //
//     //                 button.parents('form').siblings('button').trigger('click');
//     //                 button.parents('form').find('input').removeClass(css.input_error);
//     //
//     //                 if( button.data('type-popup') == "payment")
//     //                 {
//     //                     requestCheck($('div.payment-box').find('button[data-payment-method="payment"]') , false );
//     //
//     //                 }
//     //                 else
//     //                 {
//     //                     if(isPayment)
//     //                        requestCheck( $('div.payment-box').find('button[data-payment-method="payment"]') , true );
//     //                     else
//     //                         requestCheck( $('div.payment-box').find('button[data-payment-method="card"]') , true );
//     //                 }
//     //
//     //
//     //             }
//     //
//     //
//     //         },
//     //
//     //     });
//     //
//     // }
//
//     // function changeNewTotalPrice(input)
//     // {
//     //
//     //
//     //     let price = parseInt(input.parents('div.basket-product').find('span').first().text().replace('руб.', "").replace(/\s*/g,''));
//     //     let totalPrice = price * parseInt(input.val());
//     //
//     //     input.parents('div[data-id-size]').siblings('div[data-id-size]').find('input[type="number"]').each( function(){
//     //         totalPrice += parseInt( price * parseInt($(this).val()) );
//     //     });
//     //
//     //     if( totalPrice === 0)
//     //         totalPrice = price;
//     //
//     //     input.parents('div.basket-product').find('span').last().text(formatMoney(totalPrice));
//     //
//     //     totalPrice = 0;
//     //     $('div.basket-product').each( function () {
//     //         totalPrice += parseInt( $(this).find('span').last().text().replace('руб.', "").replace(/\s*/g,'') );
//     //     });
//     //
//     //     total_price = totalPrice - useBonus;
//     //
//     //     $('div.basket-total').find('div').eq(2).find('span').text(formatMoney(total_price));
//     //     $('div.basket-order').find('div').eq(1).find('p').eq(0).text("Сумма вашего заказа состовляет "+formatMoney(total_price))
//     //
//     //     checkButtonOrder();
//     //
//     // }
//
//     // $('div.basket-container').on('keyup' , 'input[type="number"]' , function () {
//     //     var id_ietm = $(this).parents('div.basket-product').data('id-item');
//     //     clearTimeout(timeOuts[id_ietm]);
//     //
//     //     if( $(this).val().length > 3)
//     //     {
//     //         $(this).val($(this).val().substr(0, 3));
//     //     }
//     //
//     //     if($(this).val() > 0 )
//     //         $(this).parents('div[data-id-size]').addClass(css.sizeActive);
//     //     else
//     //         $(this).parents('div[data-id-size]').removeClass(css.sizeActive);
//     //
//     //     changeNewTotalPrice($(this));
//     //
//     //     timeOuts[$(this).parents('div.basket-product').data('id-item')] = setTimeout(function() {
//     //         requestEdit(id_ietm);
//     //     }, 1000 )
//     //
//     // });
//
//     //меняем размеры
//     // $('div.basket-box').on('click' , 'button[data-action-size]' , function () {
//     //
//     //         var id_ietm = $(this).parents('div.basket-product').data('id-item');
//     //         //на время запроса блочим кнопку отправки заказа
//     //         $('.basket-order').find('button[action="save-order"]').parent('div').addClass(css.disabled_order);
//     //
//     //         clearTimeout(timeOuts[id_ietm]);
//     //
//     //         if( $(this).data("action-size") == "increase" )
//     //             $(this).siblings('input').val( parseInt( $(this).siblings('input').val()) + 1) ;
//     //         else
//     //             $(this).siblings('input').val( parseInt( $(this).siblings('input').val() ) - 1 < 0  ? 0 : parseInt( $(this).siblings('input').val() ) - 1 );
//     //
//     //         if( $(this).siblings('input').val() > 0 )
//     //            $(this).parents('div[data-id-size]').addClass(css.sizeActive);
//     //         else
//     //             $(this).parents('div[data-id-size]').removeClass(css.sizeActive);
//     //
//     //         changeNewTotalPrice( $(this).siblings('input'))
//     //
//     //         timeOuts[$(this).parents('div.basket-product').data('id-item')] = setTimeout(function() {
//     //             requestEdit(id_ietm);
//     //         }, 1000 )
//     //
//     //
//     // });
//
//     //сохранение полей у модальных окон
//     // $('button[data-action="save-user-data"]').click(function(){
//     //
//     //     var data = {};
//     //
//     //     $(this).siblings('div').find('input').each( function(){
//     //
//     //         $(this).removeClass('input-error');
//     //         validateData($(this) , data , css.input_error);
//     //     });
//     //
//     //
//     //     if( ! $(this).siblings('div').find('input').hasClass('input-error') )
//     //     {
//     //         setUserData($(this),data);
//     //     }
//     //
//     //
//     // });
//
//
//     // $('div.payment-box').on('click' , 'button' , function () {
//     //     if( $(this).data('payment-method') == "payment")
//     //         isPayment = true;
//     //     else
//     //         isPayment = false;
//     //
//     //     requestCheck( $(this) ,false);
//     //
//     //
//     // });
//
//     //сохранение заказа
//     // $('button[action="save-order"]').click(function () {
//     //     if( !$(this).parent('div').hasClass(css.disabled_order))
//     //       requestSendOrder();
//     // });
//
//     //удаляем из корзины
//     // $('div.basket-box').on('click' , 'button[data-action="remove"]' , function () {
//     //         requestDeleteItem($(this).parents('div[data-id-item]').data('id-item'));
//     // });
//
//
//
//
//     //закрытие popup после удачного оформления заказа
//     // $('#thanks button.popup-close').click(function(){
//     //
//     //     window.location.href = "/cabinet.html";
//     // });
//
//
//
// })(jQuery);