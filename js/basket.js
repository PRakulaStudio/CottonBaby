"use strict";



(function($){

    requestCheckAuth('basket');

    var timeOuts = [];
    var isPayment = false;
    var min_price_order = "";
    var total_price = "";
    var css = {
        'input_error' : "input-error-bottom",
        'is_check' : 'payment-activ',
        'disabled_order' : 'basket-order-off',
    };


    function checkButtonOrder(  )
    {
        //Итого

        if($('.payment-box').find('button').hasClass('payment-activ') )
        {


            if(  parseInt(total_price) >= parseInt(min_price_order) )
                $('.basket-order').find('button[action="save-order"]').parent('div').removeClass(css.disabled_order);
            else
                $('.basket-order').find('button[action="save-order"]').parent('div').addClass(css.disabled_order);
        }


    }

    function requestGetUserData()
    {
        var data = {};

        $.ajax({
            dataType: 'json',
            data : data,
            url: window.pms.config.cabinetAPI+'get/userData',
            success: function (result , status) {
              if(result.status)
              {
                  let text_full_address = 'Текущий адрес доставки: '+result.userData.index_number+' '+result.userData.delivery_city+' '+result.userData.address;

                  if( result.userData.index_number == "" && result.userData.city == "" && result.userData.address == "" )
                      text_full_address = "Не указан адрес доставки";

                  $('div.address-box').find('p').text( text_full_address );

                  var popup = $('#popup-fon').find('.popup-cell');

                  for(var key in result.userData)
                  {
                        popup.find('input[name="'+key+'"]').val(result.userData[key]);
                  }

              }
            },
        });

    }


    //получение корзины
    function requestGetBasket()
    {
        var data = {};

        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: window.pms.config.cabinetAPI+'order/cart',
            success: function( result, status){
                if(result.status)
                {
                    let products = result.data.cart.products;
                    if(products)
                    {
                        var html = "";
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
                                "<p><a href='"+product.href+"' >"+product.title+"</a></p>"+
                                "<p>Коллекция: <a href='"+product.collection[0].href+"' >"+product.collection[0].title+"</a></p>"+
                                "</div>"+
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
                            for( let size_id in modifications )
                            {
                                html += "<div data-id-size='"+modifications[size_id].id+"'>" +
                                    "<p>Размер "+modifications[size_id].title+"</p>" +
                                    "<div>" +
                                    "<button data-action-size='reduce'>-</button>" +
                                    "<span data-id-mod='"+modifications[size_id].id+"'>"+modifications[size_id].quantity+"</span>" +
                                    "<button data-action-size='increase'>+</button>" +
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

                        $('div.basket-box').html(html);
                        //бонусы
                        let list_div = $('div.basket-total').find('div');
                        list_div.eq(0).find('span').text(formatMoney(result.data.cart.bonus));


                        //кнопка с бонусами
                        if( parseInt(result.data.cart.bonus) > 0 && result.data.cart.min_price_order < result.data.cart.total_price )
                            list_div.eq(1).children().show();

                        list_div.eq(2).find('span').text(formatMoney(result.data.cart.total_price));

                        //кнопка оформление заказа
                        if(result.data.cart.minPriceOrder < result.data.cart.total_price)
                            $('div.basket-order').find('div').eq(2).children().show();


                        if( result.data.cart.total_price >= result.data.cart.min_price_order   )
                            document.querySelectorAll('.basket-order div')[2].children[0].setAttribute('show' , ' false');

                        min_price_order = result.data.cart.min_price_order;
                        total_price = result.data.cart.total_price;


                        $('div.basket-order').find('div').eq(1).find('p').eq(0).text("Сумма вашего заказа состовляет "+formatMoney(total_price)).end()
                            .eq(1).text("Минимальный заказ "+formatMoney(min_price_order));


                        $('div.basket-container').show();


                    }
                }
                else
                {
                    $('div.basket-empty').show();
                }






            },

        });

    }

    function requestEdit(id_item )
    {
       // console.log(id_item);
        var data = {};
            data['product_id'] = id_item;
            data['modifications'] = {};

        $('div.basket-box').find('div[data-id-item="'+id_item+'"]').find('button[data-action-size="reduce"]').each( function () {
            data['modifications'][$(this).next().attr('data-id-mod')] = $(this).next().text();
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
                   let products = result.data.products;
                   for(var key in products )
                   {
                       $('div.basket-box').find('div[data-id-item="'+key+'"]').find('span').last().text(formatMoney(products[key].price_total));

                   }

                    //Итого
                   $('div.basket-total').find('div').last().find('span').text(formatMoney(result.data.total_price));
                   total_price = result.data.total_price;
                   checkButtonOrder( );

                }
            },
        })

    }

    function requestDeleteItem(product_id)
    {
        var data = {};
            data['product_id'] = product_id;


        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: window.pms.config.cabinetAPI+'order/delete',
            success : function (  result, status ) {
               if( result.status)
               {
                   $('div.basket-box').find('div[data-id-item="'+product_id+'"]').remove();


                   $('div.basket-total').find('div').last().find('span').text(formatMoney( result.data.total_price ));
                   total_price = result.data.total_price;
                   checkButtonOrder();

                   if(!$('div.basket-box').children().length)
                   {
                       $('div.basket-container').hide();
                       $('div.basket-empty').show();
                   }
               }
            },
        });
    }


    function requestUseBonus()
    {
        var data = {};

        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: window.pms.config.cabinetAPI+'order/useBonus',
            success : function (  result, status ) {
                if( result.status)
                {
                    $('div.basket-total').find('div').eq(0).find('span').text(formatMoney(result.data.bonus));
                    $('div.basket-total').find('div').eq(2).find('span').text(formatMoney(result.data.total_price));
                    $('div.basket-total').find('div').eq(1).find('button').remove();

                }
            },
        });



    }
    

    //запрос на проверку заполненных данных
    function requestCheck( button ,payment_address)
    {
        var data = {};
            $('div.payment-box').find('button').removeClass( css.is_check );


        data['payment_method'] = button.data('payment-method');
        data['payment_address'] = payment_address;

        $('#popup-fon').find('input').removeClass(css.input_error);

        $.ajax({
            url: window.pms.config.cabinetAPI+"order/check",
            method: "POST",
            dataType: 'json',
            data: data,
            success: function( result, status){
                if( result.status)
                {
                    if(button.data('payment-method') == "payment" && !payment_address)
                        requestCheck(button , true);
                    else
                    {
                        button.addClass(css.is_check);
                        checkButtonOrder();
                    }

                }
                else
                {
                    if( result.data.errors.address )
                    {
                        PopUpShowCard();
                        for( var key in  result.data.errors.address)
                           $('#card').find('input[name="'+result.data.errors.address[key]+'"]').addClass(css.input_error);
                    }
                    else
                    {
                        PopUpShowScore();
                        for( var key in  result.data.errors.payment)
                           $('#score').find('input[name="'+result.data.errors.payment[key]+'"]').addClass(css.input_error);

                    }

                }

            },

        });



    }

    //отправка заказа на оформление
    function requestSendOrder()
    {
        $.ajax({
            type: 'POST',
            dataType : "JSON",
            url: window.pms.config.cabinetAPI+'order/save',
            success: function( result, status){
                console.log(result.status);
                $('#popup-fon').show();
                if( result.status)
                {
                    $('div.basket-order').find('button[action="save-order"]').remove();
                    PopUpShowThanks();
                }

            },

        });

    }


   



    function setUserData(button , fields)
    {
        $.ajax({
            url: window.pms.config.cabinetAPI+'set/userData',
            type: 'POST',
            encoding: "UTF-8",
            data:  {

                "data": JSON.stringify(fields)
            },
            dataType: 'json',
            success: function( result, status)
            {
                if( result.status)
                {
                    $('div.address-box').find('p').text( 'Текущий адрес доставки: '+fields['index_number']+' '+fields['delivery_city']+' '+fields['address']);

                    button.parents('form').siblings('button').trigger('click');
                    button.parents('form').find('input').removeClass(css.input_error);

                    if( button.data('type-popup') == "payment")
                    {
                        requestCheck($('div.payment-box').find('button[data-payment-method="payment"]') , false );

                    }
                    else
                    {
                        if(isPayment)
                           requestCheck( $('div.payment-box').find('button[data-payment-method="payment"]') , true );
                        else
                            requestCheck( $('div.payment-box').find('button[data-payment-method="card"]') , true );
                    }


                }


            },

        });

    }

    //меняем размеры
    $('div.basket-box').on('click' , 'button[data-action-size]' , function () {

            var id_ietm = $(this).parents('div.basket-product').data('id-item');
            //на время запроса блочим кнопку отправки заказа
            $('.basket-order').find('button[action="save-order"]').parent('div').addClass(css.disabled_order);

            clearTimeout(timeOuts[id_ietm]);

            if( $(this).data("action-size") == "increase" )
                $(this).siblings('span').text( parseInt( $(this).siblings('span').text()) + 1) ;
            else
                $(this).siblings('span').text( parseInt( $(this).siblings('span').text() ) - 1 < 0  ? 0 : parseInt( $(this).siblings('span').text() ) - 1 );


            timeOuts[$(this).parents('div.basket-product').data('id-item')] = setTimeout(function() {
                requestEdit(id_ietm);
            }, 1000 )
            
        
    });

    //сохранение полей у модальных окон
    $('button[data-action="save-user-data"]').click(function(){

        var data = {};

        $(this).siblings('div').find('input').each( function(){

            $(this).removeClass('input-error');
            validateData($(this) , data , css.input_error);
        });


        if( ! $(this).siblings('div').find('input').hasClass('input-error') )
        {
            setUserData($(this),data);
        }


    });


    $('div.payment-box').on('click' , 'button' , function () {
        if( $(this).data('payment-method') == "payment")
            isPayment = true;
        else
            isPayment = false;

        requestCheck( $(this) ,false);


    });

    //сохранение заказа
    $('button[action="save-order"]').click(function () {
        if( !$(this).parent('div').hasClass(css.disabled_order))
          requestSendOrder();
    });

    //удаляем из корзины
    $('div.basket-box').on('click' , 'button[data-action="remove"]' , function () {
            requestDeleteItem($(this).parents('div[data-id-item]').data('id-item'));
    });


    //используем бонусы
    $('div.basket-total button[action="use-bonus"]').click( function(){
            requestUseBonus();

    });

    //закрытие popup после удачного оформления заказа
    $('#thanks button.popup-close').click(function(){

        window.location.href = "/cabinet.html";
    });

    requestGetBasket();

    //должен выполняться только, если пользователь авторизован
    requestGetUserData();

})(jQuery);