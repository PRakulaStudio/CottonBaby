let config = {
    cabinetAPI: '/system/plugins/SecArgonia/cabinet/',
    catalogAPI: '/system/plugins/PonomareVlad/catalog/',
};

config = Object.freeze(config);

if (!window.pms) window.pms = {};
 window.pms['config'] = config;



function integerOnly(e) {
    e = e || window.event;
    var code = e.which || e.keyCode;
    if (!e.ctrlKey) {
        var arrIntCodes1 = new Array(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 9, 116);   // 96 TO 105 - 0 TO 9 (Numpad)
        if (!e.shiftKey) {                          //48 to 57 - 0 to 9 
            arrIntCodes1.push(48);                  //These keys will be allowed only if shift key is NOT pressed
            arrIntCodes1.push(49);                  //Because, with shift key (48 to 57) events will print chars like @,#,$,%,^, etc.
            arrIntCodes1.push(50);
            arrIntCodes1.push(51);
            arrIntCodes1.push(52);
            arrIntCodes1.push(53);
            arrIntCodes1.push(54);
            arrIntCodes1.push(55);
            arrIntCodes1.push(56);
            arrIntCodes1.push(57);
        }
        var arrIntCodes2 = new Array(35, 36, 37, 38, 39, 40, 46);
        if ($.inArray(e.keyCode, arrIntCodes2) != -1) {
            arrIntCodes1.push(e.keyCode);
        }
        if ($.inArray(code, arrIntCodes1) == -1) {
            return false;
        }
    }
    return true;
}


/*
 * @param str
 * @param requareLength
 * @returns {boolean}
 */
function checkLength(str, requareLength) {
    if (str.length >= requareLength)
        return true;
    return false;
}

/**
 *
 * @param email
 * @returns {boolean}
 */
function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email))
        return true;
    return false;
}

/**
 *
 * @param phone
 * @returns {boolean}
 */
function checkPhone(phone) {
    var re = /^[\+]?7\s[(]?[0-9]{3}[)]\s?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
    if (re.test(phone))
        return true;
    return false;
}


//функция, переводящая строку в денежный формат
function formatMoney(number) {
    var format = number.toString().split(""),
        money = [],
        iterator = 1;

    for (var key = format.length - 1; key >= 0; key--) {
        if (iterator > 0 && iterator % 3 == 0) {
            money[key] = " " + format[key];
            iterator++;
            continue;
        }

        money[key] = format[key];
        iterator++;
    }

    return money.join('') + " руб.";
}

/**
 *
 * @param input
 * @param data
 */
function validateData(input, data, error_class) {
    $(input).removeClass(error_class).removeAttr('data-change');

    switch ($(input).attr('name')) {

        case "password" :

            if (checkLength($(input).val(), 6) && ( $(input).val() == $('input[name="confirm_password"]').val() ))
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "password_auth" :
            if (checkLength($(input).val(), 6))
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "mail" :

            if (checkEmail($(input).val()))
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "phone" :

            if (checkPhone($(input).val()))
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "index" :

            if (checkLength($(input).val(), 6))
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "confirm_password" :

            if (checkLength($(input).val(), 6) && ( $(input).val() == $('input[name="password"]').val() ))
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break

        default:
            if ($(input).val() != "")
                data[$(input).attr('name')] = $(input).val();
            else
                $(input).addClass(error_class);
            break;
    }

}


function PopUpShowMenu() {
    $("#menu").show();
    $("#menu-off").show();
    $("#menu-on").hide();
}
function PopUpHideMenu() {
    $("#menu-on").show();
    $("#menu-off").hide();
    $("#menu").hide();
}
function PopUpShowScore() {
    $("#popup-fon").show();
    $("#popup").show();
    $("#score").show();
}
function PopUpShowCard() {
    $("#popup-fon").show();
    $("#popup").show();
    $("#card").show();
}
function PopUpShowThanks() {
    $("#popup-fon").show();
    $("#popup").show();
    $("#thanks").show();
}
function PopUpHidePopup() {
    $("#popup-fon").hide();
    $("#popup").hide();
    $("#score").hide();
    $("#card").hide();
    $("#thanks").hide();
}


//флаг авторизированности пользователя
var IS_AUTH = false;

function getMenuCategories()
{
    var data = new FormData();
    data.append('show_count' , true);
    return fetch(window.pms.config.catalogAPI + 'categories', {method: 'POST', credentials: 'same-origin'  , body: data   })
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
                let html = "";
                for(var key in response.data)
                    html += "<li><a href='"+response.data[key].href+"'>"+response.data[key].title+" ("+response.data[key].count+")</a></li>";

                $('div.menu').find('div.marker').first().find('ul').html(html);
            }

        });
}

function getMenuCollection()
{
    var data = new FormData();

    data.append('show_href' , true);
    data.append('show_count' , true);

    return fetch(window.pms.config.catalogAPI + 'collections', {method: 'POST', credentials: 'same-origin' , body: data  })
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

                let html = "";
                for(var key in response.data.items)
                    html += "<li><a href='"+response.data.items[key].href+"'>"+response.data.items[key].title+" ("+response.data.items[key].count+")</a></li>";
                $('div.menu').find('div.marker').last().find('ul').html(html);
            }

        });
}

function requestGetMenuCategories()
{
    getMenuCategories();
    getMenuCollection();
}

function addFavoriteButtons( blockProducts , value)
{

    let buttonHtml = "";

    if(value)
        buttonHtml =  "<button class='new-on'></button>";
    else
        buttonHtml =  " <button class='new-off'></button>";

    blockProducts.find('div.block-button-favorites').html(buttonHtml);
}

$('main.content-site').on('click' , 'div.block-button-favorites' , function(){

    let productBlock =  $(this).parents('div[data-catalog-item-id],div[data-id-block],div[data-id-catalog-item]');
    if( productBlock.attr('data-catalog-item-id') )
       idProduct = productBlock.attr('data-catalog-item-id');


    if( productBlock.attr('data-id-block') )
       idProduct = productBlock.attr('data-id-block');


    if( productBlock.attr('data-id-catalog-item') )
       idProduct = productBlock.attr('data-id-catalog-item');



     if( $(this).find('button').hasClass('new-off') )
         requestAddFavorites( idProduct ,  $(this).find('button'));
     else
         requestRemoveFavorites( idProduct ,  $(this).find('button') );
});

function requestAddFavorites(product_id  , button)
{

    $.ajax({
        data : { 'id' : product_id},
        dataType : 'JSON',
        type : "POST",
        url : window.pms.config.cabinetAPI+'wishlist/add',
        success : function ( result , status ) {
            if(result.status)
            {
                button.removeClass('new-off').addClass('new-on');
            }
        },
    });

}

function requestRemoveFavorites(product_id , button)
{

    $.ajax({
        data : {  'id' : product_id},
        dataType : 'JSON',
        type : "POST",
        url : window.pms.config.cabinetAPI+'wishlist/delete',
        success : function ( result , status ) {
            if(result.status)
            {
                button.removeClass('new-on').addClass('new-off');
            }
        },
    });
}

function requestCheckFavoritesItems(listId , classBlock )
{

    var data = new FormData();
    data.append('items' , JSON.stringify(listId));
    console.log( JSON.stringify(listId) );
    return fetch(window.pms.config.cabinetAPI + 'wishlist/check' , { method: 'POST', credentials: 'same-origin', body: data })
        .then( function(response){
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
        .then( function (response) {
            if(response.data.wishlist)
            {
                let $products = $('div.'+classBlock),
                    wishList = response.data.wishlist,
                    buttonHtml = "";

                for(let key in wishList)
                {
                    addFavoriteButtons( $products.find('div[data-catalog-item-id="'+wishList[key].id+'"],div[data-id-catalog-item="'+wishList[key].id+'"]') , wishList[key].value);
                }


            }
        });

}

function setAuthUserData(result, url)
{

    if (result.status) {
        switch (url) {
            case "registration" :
                window.location.href = "/";
                break
        }

        $('[class*="header-user"]').find('#authorization').remove();

        $('[class*="header-user"]').find('div[data-basket] a').attr('href' , '/basket.html');
        if (result.data.cartCount)
             $('[class*="header-user"]').find('div[data-basket] span').show().text(result.data.cartCount);

        $('[class*="header-user"]').find('div[data-favorite] a').attr('href' , '/favorites.html');
        if (result.data.wishlistCount)
            $('[class*="header-user"]').find('div[data-favorite]').addClass('favorites').find('span').text(result.data.wishlistCount);

        $('[class*="header-user"]').find('div[data-auth]').find('span').text(`Здравствуйте, ${result.data.name}`);

        IS_AUTH = true;

        $('body').removeClass('showPrice');

    }
    else
    {

        switch (url) {
            case "cabinet" :
                window.location.href = "/";
                break;
            case "favorites" :
                window.location.href = "/";
                break;
            case "basket" :
                window.location.href = "/";
                break;
        }
        $('[class*="header-user"]').find('#exit').remove();
    }

    return IS_AUTH;

}

function showError(responseData) {
    console.log(responseData);
}

function requestCheckAuth(url) {

    console.log(url);

   return fetch(window.pms.config.cabinetAPI + 'user/checkAuth', {method: 'POST', credentials: 'same-origin'})
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
                   switch(url)
                   {
                    //   case "registration"
                   }

               }
               console.log(response);

               return setAuthUserData(response, url);

           });


}

function requestLogout() {

    fetch(window.pms.config.cabinetAPI + 'user/logout'  , { method: 'POST' , credentials: 'same-origin' })
        .then( function(response){
            let responseData = false;
            console.log(response);
            try {
                responseData = response.json();
            }
            catch(e)
            {
                responseData = {status: false, statusText: "Произошла ошибка при соединении"};
                response.text().then(console.debug());
           }

            return responseData;
        })
        .then( function(response){
          //  console.log(response);
           if(response.status)
               location.reload();
            else
               alert('Не получилось разлогиниться');
        });
}

function requestAuth(data) {

    var formData = new FormData();
    formData.append('login', data['mail']);
    formData.append('password', data['password_auth']);

    return fetch(window.pms.config.cabinetAPI + 'user/login', {method: 'POST', credentials: 'same-origin', body:  formData })
        .then(function (response) {
            let responseData = false;
            console.log(response);
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
            if (response.status)
                location.reload();
            else {
                var errors = response.data.error;
                var errorString = "";
                for(key in errors){
                    errorString += errors[key] + '\n';
                }
                if(errorString.length != 0)
                    alert(errorString);
            }
        });
}


function requestRemindPassword(data) {
    return fetch(window.pms.config.catalogAPI + 'wishlist/check' , { method: 'POST', credentials: 'same-origin', body: data })
        .then( function(response){
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
        .then( function (response) {
           console.log(response);
        });

}

(function ($) {

    $('input[name="phone"]').each(function () {
        $(this).inputmask('+7 (999) 999-99-99');
    })

    $('input[type="search"]').keydown(function (e) {

        if (e.which == 13) {
            window.location.href = "/search/" + $(this).val() + "";
        }
    });

    //закрытие модальных окон
    $(window).mousedown(function (event) {
        if( !$(event.target).is('#authorization') && !$(event.target).parents('#authorization').length )
            $('#authorization').hide();
        
        if( !$(event.target).is('#exit') && !$(event.target).parents('#exit').length )
            $('#exit').hide();
    });

    $('div.search-menu').on('click' , 'button[type="submit"]' , function(){
        window.location.href = "/search/" + $(this).siblings('input').val() + "";
    });

    $('[class*="header-user"] > div:last-of-type button').click(function () {
        $(this).next().show();
    });

    $('[class*="header-user"] button.popup-close').click(function () {
        $(this).parent('div').hide();

    });

    $('#exit div button').click(function () {
        requestLogout();

    });

    $('#authorization form button').click(function () {
        var data = {};

        $('#authorization').find('input').each(function () {
            $(this).removeClass('input-error-border');
            validateData($(this), data, 'input-error-bottom');
        });

        if (!$('#authorization').find('input').hasClass('input-error-bottom')) {
            requestAuth(data);
        }
    });

    $('span[data-action="remind-pass"]').click(function(){
        var data = {};
        validateData($('#authorization').find('input[name="mail"]'), data , 'input-error-bottom');

        if (!$('#authorization').find('input').hasClass('input-error-bottom')) {
            requestRemindPassword(data);
        }

    });





})(jQuery);