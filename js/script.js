
// Phone mask end

/**
 *
 * @param str
 * @param requareLength
 * @returns {boolean}
 */
function checkLength(str , requareLength)
{
    if( str.length >= requareLength )
        return true;
    return false;
}
/**
 *
 * @param email
 * @returns {boolean}
 */
function checkEmail(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( re.test(email) )
        return true;
    return false;
}

/**
 *
 * @param phone
 * @returns {boolean}
 */
function checkPhone(phone)
{
    var re = /^[\+]?7\s[(]?[0-9]{3}[)]\s?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
    if( re.test(phone) )
        return true;
    return false;
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


/**
 *
 * @param input
 * @param data
 */
function validateData( input , data , error_class )
{
    $(input).removeClass(error_class).removeAttr('data-change');

    switch( $(input).attr('name'))
    {

        case "password" :

            if( checkLength($(input).val() , 8) && ( $(input).val() == $('input[name="confirm_password"]').val() ))
                data[  $(input).attr('name') ] =  $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "password_auth" :
            if( checkLength($(input).val() , 8) )
                data[ $(input).attr('name') ] = $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "mail" :

            if( checkEmail($(input).val()))
                data[  $(input).attr('name') ] =  $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "phone" :

            if( checkPhone( $(input).val() ))
                data[  $(input).attr('name') ] =  $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "index" :

            if( checkLength($(input).val() , 6))
                data[  $(input).attr('name') ] =  $(input).val();
            else
                $(input).addClass(error_class);
            break;

        case "confirm_password" :

            if( checkLength($(input).val() , 8) && ( $(input).val() == $('input[name="password"]').val() ) )
                data[  $(input).attr('name') ] =  $(input).val();
            else
                $(input).addClass(error_class);
            break

        default:
            if(  $(input).val() != "" )
                data[ $(input).attr('name') ]  =  $(input).val();
            else
                $(input).addClass(error_class);
            break;
    }

}






function PopUpShowMenu(page){
    $("#menu").show();
    $("#menu-off").show();
    $("#menu-on").hide();
}
function PopUpHideMenu(){
    $("#menu-on").show();
    $("#menu-off").hide();
    $("#menu").hide();
}

function PopUpShowScore(page){
    $("#popup-fon").show();
    $("#popup").show();
    $("#score").show();
}

function PopUpShowCard(page){
    $("#popup-fon").show();
    $("#popup").show();
    $("#card").show();
}

function PopUpShowThanks(page){
    $("#popup-fon").show();
    $("#popup").show();
    $("#thanks").show();
}

function PopUpHidePopup(){
    $("#popup-fon").hide();
    $("#popup").hide();
    $("#score").hide();
    $("#card").hide();
    $("#thanks").hide();
}



function requestCheckAuth(url)
{

    $.ajax({
        data : {'user' : 'checkAuth'},
        dataType: 'JSON',
        url: '/akula/system/plugins/SecArgonia/cabinet/',
        success: function( result, status){


            if(result.status)
            {

                switch (url)
                {
                    case "registration" :
                        window.location.href = "/akula/";
                        break
                }

                $('div.header-user').find('#authorization').remove();

                if( result.cartCount )
                    $('div.header-user').find('div[data-basket] span').show().text(result.cartCount);

                if(result.wishlistCount)
                    $('div.header-user').find('div[data-favorite] span').show().text(result.wishlistCount);

                $('div.header-user').find('div[data-auth]').find('span').text(`Здравствуйте, ${result.name}`);
                IS_AUTH = true;
                $('body').removeClass('showPrice');


            }
            else
            {

                switch(url)
                {
                    case "cabinet" :
                        window.location.href = "/akula/";
                        break;
                    case "favorites" :
                        window.location.href = "/akula/";
                        break;
                }

                $('div.header-user').find('#exit').remove();
                IS_AUTH =  false;
            }


        },

    });


}



//флаг авторизированности пользователя
var IS_AUTH;

( function($){

     $('input[name="phone"]').each( function () {
        $(this).inputmask('+7 (999) 999-99-99');
     })


    $('input[type="search"]').keypress(function (e) {
        if (e.which == 13) {
           window.location.href ="/search?query="+$(this).val()+"";
         }

    });

    $('div.header-user > div:last-of-type button').click( function () {
        $(this).next().show();
    });


    $('div.header-user button.popup-close').click(function () {
       $(this).parent('div').hide();

    });

    $('#exit div button').click(function(){
        requestLogout();

    });

    $('#authorization form button').click( function () {
        
        var data = {};
        
        $('#authorization').find('input').each( function(){
            $(this).removeClass('input-error-border');
            validateData($(this) , data , 'input-error-bottom');
        });

       if( !$('#authorization').find('input').hasClass('input-error-bottom') )
       {
           requestAuth(data);
       }
    });




    function requestLogout()
    {

        $.ajax({
            type: 'POST',
            data : {'user' : 'logout'},
            url: '/akula/system/plugins/SecArgonia/cabinet/',
            success: function( result, status){
                location.reload();
            },
        })
    }


    function requestAuth( data )
    {
        console.log(data);

        $.ajax({
            type : "POST",
            dataType : 'JSON',
            data : {'user' : 'login' , 'login' : data['mail'] , 'password' : data['password_auth']},
            url: '/akula/system/plugins/SecArgonia/cabinet/',
            success : function( result , status ){
                if(result.status)
                {
                    //реддиректим
                    location.reload();
                }
                else
                {

                   if( result.data.error.email)
                   {
                       $('#authorization').find('input[name="mail"]').addClass('input-error-bottom');

                   }


                    if(result.data.error.password)
                        $('#authorization').find('input[name="password_auth"]').addClass('input-error-bottom');

                }
            },
        });


    }







})(jQuery);