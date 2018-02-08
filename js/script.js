//build - 2
//авторищация, проверка авторизации
//добавление товаров в избранное,
//вспомогательные функции для модалок
//кеширование и получение меню


let config = {
    cabinetAPI: '/system/plugins/SecArgonia/cabinet/',
    catalogAPI: '/system/plugins/PonomareVlad/catalog/',
    feedbackAPI: '/system/plugins/SecArgonia/feedback/',
};

//дизайн header
let headerBlock = "",
    dataLocalStorage = "",
    scroll = document.querySelector('div.scrollup');


window.onscroll = function(){

    if( window.pageYOffset > 100)
        scroll.classList.add('scrollup-o');
    else
        scroll.classList.remove('scrollup-o');
};



function renderHeaderIsAuth(data){
    document.querySelector('body').classList.add('showprice');
    headerBlock = document.querySelector('[class*="header-user"]');

    headerBlock.querySelector('div[data-basket] a').setAttribute('href' , '/basket.html');
    headerBlock.querySelector('div[data-favorite] a').setAttribute('href' , '/favorites.html');


    if(data.cartCount)
    {
        basketSpan  = headerBlock.querySelector('div[data-basket] span');
        basketSpan.innerHTML = data.cartCount;
        basketSpan.style.display = "block";
    }

    if(data.wishlistCount)
    {
        favoritesBlock = headerBlock.querySelector('div[data-favorite]');
        favoritesBlock.classList.add('favorites');
        favoritesBlock.querySelector('span').innerText = data.wishlistCount;
    }

    headerBlock.querySelector('div[data-auth] span').innerHTML = "Здравствуйте, "+data.name;
}
function renderHeaderAuthFalse() {


    headerBlock = document.querySelector('[class*="header-user"]');
    headerBlock.querySelector('div[data-auth] span').innerHTML = "Войти";
    headerBlock.querySelector('div[data-basket] a').setAttribute('href' , '#');
    headerBlock.querySelector('div[data-favorite] a').setAttribute('href' , '#');

    basketSpan  = headerBlock.querySelector('div[data-basket] span');
    basketSpan.innerHTML = 0;
    basketSpan.style.display = 'none';

    favoritesBlock = headerBlock.querySelector('div[data-favorite]');
    favoritesBlock.classList.remove('favorites');
    favoritesBlock.querySelector('span').innerText = 0;

    headerBlock.querySelector('div[data-auth] span').innerHTML = "Войти";
}


if(localStorage.getItem('user'))
    renderHeaderIsAuth(JSON.parse(localStorage.getItem('user')));
else
    renderHeaderAuthFalse();

config = Object.freeze(config);

//надо будет убрать
let blockSorting = document.querySelector('div.sorting');
if( blockSorting)
    blockSorting.style.display = 'none';


if (!window.pms) window.pms = {};
 window.pms['config'] = config;

let menu = document.querySelectorAll('div.menu div.marker');

/*
 * @param str
 * @param requareLength
 * @returns {boolean}
 */
function checkLength(str, requareLength) {
    if(str.length >= requareLength)
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

    //$(input).removeClass(error_class).removeAttr('data-change');
    input.classList.remove(error_class);
    input.removeAttribute('data-change');

    switch ( input.getAttribute('name')) {
        case "password" :

            if (checkLength(input.value, 6) && ( input.value == document.querySelector('input[name="confirm_password"]').value ))
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break;

        case "password_auth" :
            if (checkLength(input.value, 6))
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break;

        case "mail" :

            if ( checkEmail(input.value) )
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break;

        case "phone" :

            if (checkPhone(input.value))
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break;

        case "index" :

            if (checkLength(input.value, 6))
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break;

        case "confirm_password" :

            if (checkLength(input.value, 6) && ( input.value == document.querySelector('input[name="password"]').value ))
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break

        default:
            if (  input.value != "")
                data[input.getAttribute('name')] = input.value;
            else
                input.classList.add(error_class);
            break;
    }

}




function PopUpShowMenu() {
    document.querySelector('#menu').style.display = 'block';
    document.querySelector('#menu-off').style.display = 'block';
    document.querySelector('#menu-on').style.display = 'none';
}

function PopUpHideMenu() {
    document.querySelector('#menu-on').style.display = 'block';
    document.querySelector('#menu-off').style.display = 'none';
    document.querySelector('#menu').style.display = 'none';
}

function PopUpShowScore() {
    document.querySelector('#popup-fon').style.display = 'block';
    document.querySelector('#score').style.display = 'block';
}

function PopUpShowCard() {
    document.querySelector('#popup-fon').style.display = 'block';
    document.querySelector('#card').style.display = 'block';
}

function PopUpShowThanks() {
    document.querySelector('#popup-fon').style.display = 'block';
    document.querySelector('#thanks').style.display = 'block';
}

function PopUpHidePopup() {
    document.querySelector('#popup-fon').style.display = 'none';
    if( document.querySelector('#score') )
        document.querySelector('#score').style.display = 'none';
    if(document.querySelector('#card'))
       document.querySelector('#card').style.display = 'none';
    if(document.querySelector('#thanks'))
       document.querySelector('#thanks').style.display = 'none';
}

//флаг авторизированности пользователя
var IS_AUTH = false;

function getMenuCategories()
{
    let data = new FormData(),
        html = "",
        responseData;
    data.append('show_count' , true);
    return fetch(window.pms.config.catalogAPI + 'categories', {method: 'POST', credentials: 'same-origin'  , body: data   })
        .then(function (response) {

            responseData = false;
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

              for(var key in response.data)
                  html += "<li><a href='"+response.data[key].href+"'>"+response.data[key].title+" ("+response.data[key].count+")</a></li>";

               menu[0].querySelector('ul').innerHTML = html;
               new SimpleBar(menu[0].querySelector('ul') , { autoHide: false });
            }

        });
}

function getMenuCollection()
{
    var data = new FormData(),
        responseData,
        html = "";

    data.append('show_href' , true);
    data.append('show_count' , true);

    return fetch(window.pms.config.catalogAPI + 'collections', {method: 'POST', credentials: 'same-origin' , body: data  })
        .then(function (response) {

            responseData = false;
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
                for(var key in response.data.items)
                    html += "<li><a href='"+response.data.items[key].href+"'>"+response.data.items[key].title+" ("+response.data.items[key].count+")</a></li>";
                menu[1].querySelector('ul').innerHTML = html;
                new SimpleBar(menu[1].querySelector('ul')  , { autoHide: false });
            }

        });
}

function requestGetMenuCategories()
{
    getMenuCategories();
    getMenuCollection();
}
requestGetMenuCategories();



function addFavoriteButtons( blockProducts , value)
{

    let buttonHtml = "";
    if(value)
        buttonHtml =  "<button class='new-on'></button>";
    else
        buttonHtml =  "<button class='new-off'></button>";
    if(  blockProducts.querySelector('div.card-favorites') )
         blockProducts.querySelector('div.card-favorites').innerHTML = buttonHtml;
}

function eventChangeFavorites(button)
{
    let productBlock = button.closest('div[data-catalog-item-id],div[data-id-block],div[data-id-catalog-item]'),
        idProduct;

    if(productBlock.hasAttribute('data-catalog-item-id'))
       idProduct = productBlock.getAttribute('data-catalog-item-id');

    if(productBlock.hasAttribute('data-id-block'))
        idProduct = productBlock.getAttribute('data-id-block');

    if(productBlock.hasAttribute('data-id-catalog-item') )
        idProduct = productBlock.attr('data-id-catalog-item');


    if( button.classList.contains('new-off') )
        requestAddFavorites( idProduct , button);
    else
        requestRemoveFavorites( idProduct , button );

}

function eventAuth()
{
    var data = {},
        listInput =  document.querySelectorAll('#authorization input'),
        sendRequest = true;

    Array.prototype.forEach.call(listInput, function(current , index, array){
       current.classList.remove('input-error-border');
       validateData(current, data, 'input-error-bottom' );

       if( current.classList.contains('input-error-bottom'))
           sendRequest = false;
       });

    if(sendRequest)
        requestAuth(data);
}


document.addEventListener('click' , function (event) {

   if(event.target.tagName == "BUTTON" && ( event.target.classList.contains('new-on') || event.target.classList.contains('new-off')  ) )
   {
       eventChangeFavorites(event.target);
       return;
   }

    if(event.target.tagName == "BUTTON" && event.target.getAttribute('type') == "submit" && event.target.closest('div.search-menu'))
    {
        window.location.href = "/search/" + event.target.parentNode.querySelector('input').value + "";
        return;
    }
    //показываем окно с авторизацие или переход на личный кабинет
    if( (event.target.tagName == "SPAN" &&  event.target.closest('[data-auth]') )  || ( event.target.tagName == "BUTTON" && event.target.parentNode.hasAttribute('data-auth') ) )
    {
        event.target.closest('[data-auth]').querySelectorAll('div')[0].style.display = "block";
        return;
    }
    //закрытие модальных окошек
    if( (event.target.tagName == "IMG" && event.target.parentNode.tagName == "BUTTON"
        && event.target.parentNode.classList.contains('popup-close')
        && event.target.closest('[class*="header-user"]')) || ( event.target.tagName == "BUTTON" && event.target.classList.contains('popup-close') &&  event.target.closest('[class*="header-user"]') ) )
    {
        if( event.target.tagName == "IMG" )
            event.target.parentNode.parentNode.style.display = "none";
        else
           event.target.parentNode.style.display = "none";
        return;
    }

    if(event.target.tagName == "BUTTON" && event.target.closest('#exit'))
    {
        requestLogout();
        return;
    }

    if(event.target.tagName == "BUTTON" && event.target.closest('#authorization') )
    {
        eventAuth();
        return;
    }

    //скролл документа на самый верх
    if(event.target.tagName == "DIV" && event.target.classList.contains('scrollup'))
    {
        animateScrollTo(0);
        return;
    }

    //скрытие блока меню, если кликнули не на этот блок
    if(!event.target.closest('div.menu-popup') && !( event.target.tagName == "BUTTON" && event.target.classList.contains('menu-on')) )
    {
        document.querySelector('div.menu-popup').style.display = "none";
        document.querySelector('[class*="header-box"] button.menu-on').style.display = "block";
        return;
    }



});

document.addEventListener('keydown' , function (event) {

    if(event.target.tagName == 'INPUT' && event.target.getAttribute('type') == "search")
    {
        if (event.which == 13) {
            window.location.href = "/search/" + event.target.value + "";
        }
    }

});

document.addEventListener('mousedown' , function (event) {
    if( event.target.getAttribute('id') != 'authorization' && !event.target.closest('#authorization') )
    {
        if(  document.querySelector('#authorization'))
            document.querySelector('#authorization').style.display = 'none';
    }


    if( event.target.getAttribute('id') != 'exit' && !event.target.closest('#exit')  )
    {
        if(  document.querySelector('#exit'))
            document.querySelector('#exit').style.display = 'none';
    }

});



function requestAddFavorites(product_id  , button)
{

    var data = new FormData();
    data.append('id' , product_id);

    return fetch(window.pms.config.cabinetAPI+'wishlist/add' , { method: 'POST', credentials: 'same-origin', body: data })
            .then( function(response) {
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
            .then( function(response){
               if( response.status )
               {
                  button.classList.remove('new-off');
                  button.classList.add('new-on');

               }
            });

}

function requestRemoveFavorites(product_id , button)
{

    var data = new FormData();
    data.append('id' , product_id);

    return fetch(window.pms.config.cabinetAPI+'wishlist/delete' , { method: 'POST', credentials: 'same-origin', body: data })
        .then( function(response) {
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
        .then( function(response){
            if( response.status )
            {
                button.classList.remove('new-on');
                button.classList.add('new-off');


            }
        });
}

function requestCheckFavoritesItems(listId , classBlock )
{

    var data = new FormData();
    data.append('items' , JSON.stringify(listId));

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
                let products = document.querySelector('div.'+classBlock),
                    wishList = response.data.wishlist,
                    buttonHtml = "";

                for(let key in wishList)
                {
                    addFavoriteButtons( products.querySelector('div[data-catalog-item-id="'+wishList[key].id+'"],div[data-id-catalog-item="'+wishList[key].id+'"]') , wishList[key].value);
                }


            }
        });

}

function setAuthUserData(result, url)
{
    let headerBlock,basketSpan,favoritesBlock;

    headerBlock = document.querySelector('[class*="header-user"]');

    if (result.status)
    {
        // switch (url) {
        //     case "registration" :
        //         window.location.href = "/";
        //         break
        // }

       localStorage.setItem('user' , JSON.stringify(result.data));

        headerBlock.querySelector('#authorization').remove();
        renderHeaderIsAuth(result.data);
        IS_AUTH = true;

    }
    else
    {
        localStorage.removeItem('user');
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

        renderHeaderAuthFalse();
        headerBlock.querySelector('#exit').remove(); //.find('#exit').remove();
    }

    return IS_AUTH;

}

function showError(responseData) {
    console.log(responseData);
}

function requestCheckAuth(url) {

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

        });

}




