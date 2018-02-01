"use strict";

(function($){


    var timeOuts = [];
    var isPayment = false;
    var css = {
        'input_error' : "input-form-error",
        'is_check' : 'payment-activ',
    }

    function validateData( input , data )
    {

        switch( $(input).attr('name'))
        {
            default:
                if(  $(input).val() != "" )
                    data[ $(input).attr('name') ]  =  $(input).val();
                else
                    $(input).addClass(css.inputError);
                break;
        }

    }

    function requestGetUserData()
    {
        var data = {};
        data['get'] = "userData";
        $.ajax({
            dataType: 'json',
            data : data,
            url: '/akula/system/plugins/SecArgonia/cabinet/?get=userData',
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

    //функция, переводящая строку в денежный формат
    function formatMoney( number )
    {

        var format = number.split(""),
            money = [],
            iterator = 1;

        for( var key = format.length - 1; key >= 0; key--)
        {


            if( iterator > 0 &&  iterator % 3 == 0 )
            {
                 money[key] = " " + format[key];
                iterator++;
                continue;
            }

            money[key] = format[key];
            iterator++;
        }

        return money.join('')+" руб.";
    }

    //получение корзины
    function requestGetBasket()
    {
        var data = {};
        data['order'] = "cart";
        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: '/akula/system/plugins/SecArgonia/cabinet/?order=cart',
            success: function( result, status){
                let products = result.data.cart.products;

                if(products)
                {
                    var html = "";
                    for( var key in products )
                    {


                        html += "<div class='basket-product' data-id-item='"+products[key].product_id+"'>" +
                                 "<div>" +
                                     "<div>" +
                                         "<div>" +
                                                "<div>" +
                                                    "<img src='"+products[key].img_link+"' >"+
                                                    "<div>"+
                                                        "<p>#"+products[key].order_id+"</p>"+
                                                        "<p><a href='"+products[key].link+"' >"+products[key].name+"</a></p>"+
                                                        "<p>Коллекция: <a href='"+products[key].collection.link+"' >"+products[key].collection.name+"</a></p>"+
                                                    "</div>"+
                                                "</div>" +

                                         "</div>" +
                                         "<div>" +
                                                "<div>" +
                                                    "<p>Цена за шт.</p>"+
                                                    "<span>"+formatMoney(products[key].price)+"</span>"+
                                                "</div>" +
                                         "</div>" +
                                     "</div>" +
                                     "<div>" +
                                            "<div>";
                                      for( var size_id in products[key].sizes )
                                      {
                                            html += "<div data-id-size='"+products[key].sizes[size_id].mod_id+"'>" +
                                                          "<p>Размер "+products[key].sizes[size_id].name+"</p>" +
                                                          "<div>" +
                                                              "<button data-action-size='reduce'>-</button>" +
                                                              "<span data-id-mod='"+products[key].sizes[size_id].mod_id+"'>"+products[key].sizes[size_id].count+"</span>" +
                                                              "<button data-action-size='increase'>+</button>" +
                                                          "</div>" +
                                                    "</div>";
                                      }

                               html +=      "</div>" +
                                            "<div>" +
                                                "<div>" +
                                                     "<p>Сумма</p>" +
                                                     "<span>"+formatMoney(products[key].price_total)+"</span>" +
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



                    $('div.basket-order').find('div').eq(1).find('p').eq(0).text("Сумма вашего заказа состовляет "+formatMoney(result.data.cart.total_price)).end()
                                                                     .eq(1).text("Минимальный заказ "+formatMoney(result.data.cart.min_price_order));

                    $('div.basket-container').show()
                }





            },

        });

    }

    
    function requestEdit(id_item )
    {
       // console.log(id_item);
        var data = {};
            data['order'] = "edit";
            data['product_id'] = id_item;
            data['sizes'] = {};

        $('div.basket-box').find('div[data-id-item="'+id_item+'"]').find('button[data-action-size="reduce"]').each( function () {

            data['sizes'][$(this).next().attr('data-id-mod')] = $(this).next().text();

        });
        data['sizes'] = JSON.stringify(data['sizes']);

        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: '/akula/system/plugins/SecArgonia/cabinet/',
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

                }
            },
        })

    }

    function requestDeleteItem(productId)
    {
        var data = {};
            data['order'] = "delete";
            data['productId'] = productId;
        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: '/akula/system/plugins/SecArgonia/cabinet/',
            success : function (  result, status ) {
               if( result.status)
               {
                   $('div.basket-box').find('div[data-id-item="'+productId+'"]').remove();
                   //Итого
                   $('div.basket-total').find('div').last().find('span').text(formatMoney(result.data.total_price));

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
        data['order'] = "useBonus";

        $.ajax({
            type : "POST",
            dataType: 'json',
            data : data,
            url: '/akula/system/plugins/SecArgonia/cabinet/',
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
            $('div.basket-order').find('div').last().find('button').hide();

        data['order'] = 'check';
        data['payment_method'] = button.data('payment-method');
        data['payment_address'] = payment_address;

        $('#popup-fon').find('input').removeClass(css.input_error);

        $.ajax({
            url: "/akula/system/plugins/SecArgonia/cabinet/",
            dataType: 'json',
            data: data,
            success: function( result, status){
                if( result.status)
                {
                    if(button.data('payment-method') == "payment" && !payment_address)

                        requestCheck(button , true);
                    else
                    {
                        console.log(button);
                        button.addClass(css.is_check);
                        $('div.basket-order').find('div').last().find('button').show();
                    }

                }
                else
                {
                    if( result.data.errors.address )
                    {
                        PopUpShowCard();
                        for( var key in  result.data.errors.address)
                        {
                            $('#card').find('input[name="'+result.data.errors.address[key]+'"]').addClass(css.input_error);
                        }


                    }
                    else
                    {
                        PopUpShowScore();
                        for( var key in  result.data.errors.payment)
                        {
                            $('#score').find('input[name="'+result.data.errors.payment[key]+'"]').addClass(css.input_error);
                        }
                    }

                }

            },

        });
        // $.ajax({
        //     url: "",
        //     dataType: 'json',
        //     url: '/system/plugins/cabinet',
        //     success: function( data, status){
        //
        //
        //     },
        //
        // });


    }

    //отправка заказа на оформление
    function requestSendOrder()
    {

        PopUpShowThanks();
        $.ajax({
            type: 'POST',
            data : {'order' : 'save'},
            url: '/akula/system/plugins/SecArgonia/cabinet/',
            success: function( result, status){
                if( result.status)
                    PopUpShowThanks();

            },

        });

    }



    function setUserData(button , fields)
    {
        $.ajax({
            url: '/akula/system/plugins/SecArgonia/cabinet/',
            type: 'POST',
            encoding: "UTF-8",
            data:  {
                "set": "userData",
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
            validateData($(this) , data);
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

        window.location.href = "http://stackoverflow.com";
    });

    requestGetBasket();

    //должен выполняться только, если пользователь авторизован
    requestGetUserData();

})(jQuery);