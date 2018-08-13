"use strict";

//build - 2
//авторищация, проверка авторизации
//добавление товаров в избранное,
//вспомогательные функции для модалок
//кеширование и получение меню

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE");

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
{
    document.querySelector('body').innerHTML = "<div style='margin:auto 20%;text-align: center;'><h1>Приносим свои извнения, но этот сайт не работает на Internet Explore!</h1><h1>Зайдите на этот сайт, пожалуйста, с другого браузера.</h1></div>";
}

var config = {
    cabinetAPI: '/system/plugins/SecArgonia/cabinet/',
    catalogAPI: '/system/plugins/PonomareVlad/catalog/',
    feedbackAPI: '/system/plugins/SecArgonia/feedback/',
    instagrammAPI: '/system/plugins/AleksanderLar/instagram/'
};

//дизайн header
var headerBlock = "",
    dataLocalStorage = "",
    scroll = document.querySelector('div.scrollup'),
    headerFavoriteBlock = document.querySelector('[class*="header-user"] div[data-favorite]');

//ленивая загрузка картинок
function lazyLoad() {
    /*var $q = function $q(q, res) {

            if (document.querySelectorAll) {
                res = document.querySelectorAll(q);
            } else {
                var d = document,
                    a = d.styleSheets[0] || d.createStyleSheet();
                a.addRule(q, 'f:b');
                for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++) {
                    l[b].currentStyle.f && c.push(l[b]);
                }
                a.removeRule(0);
                res = c;
            }
            return res;
        }
        //     , addEventListener = function(evt, fn){
        //     window.addEventListener
        //         ? this.addEventListener(evt, fn, false)
        //         : (window.attachEvent)
        //         ? this.attachEvent('on' + evt, fn)
        //         : this['on' + evt] = fn;
        // }


        ,
        _has = function _has(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        };

    function loadImage(el, fn) {
        var img = new Image(),
            src = el.getAttribute('data-src');
        img.onload = function () {
            if (el.parentNode) el.parentNode.replaceChild(img, el);
            fn? fn() : null;
        };
        img.src = src;
    }



    var images = new Array(),
        query = $q('div.lazy'),
        processScroll = function processScroll() {

            for (var i = 0; i < images.length; i++) {

                if (elementInViewport(images[i])) {
                loadImage(images[i], function () {
                    images.splice(i, 1);
                });
                }
            }
        };

    // Array.prototype.slice.call is not callable under our lovely IE8
    for (var i = 0; i < query.length; i++) {
        images.push(query[i]);
    }


    processScroll();
    addEventListener('scroll', processScroll);*/

    var lazyBuffer = [];

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    }

    document.querySelectorAll('div.lazy').forEach(function (node) {
        lazyBuffer.push(node);
    });

    function lazyHandler() {
        for (var i = 0; i < lazyBuffer.length; i++) {
            var node = lazyBuffer[i];
            if (node && elementInViewport(node)) {
                lazyBuffer.splice(i, 1);
                var imageNode = new Image();
                imageNode.lazyNode = node;
                imageNode.onload = function () {
                    if (this.lazyNode.parentNode) this.lazyNode.parentNode.replaceChild(this, this.lazyNode);
                };
                imageNode.src = node.getAttribute('data-src');
            }
        }
    }

    addEventListener('scroll', lazyHandler);
    lazyHandler();

}

// !function(window){
//    
// }(this);
lazyLoad();

window.onscroll = function () {

    if (window.pageYOffset > 100) scroll.classList.add('scrollup-o'); else scroll.classList.remove('scrollup-o');
};

function renderHeaderIsAuth(data) {
    document.querySelector('body').classList.remove('showprice');
    headerBlock = document.querySelector('[class*="header-user"]');

    headerBlock.querySelector('div[data-basket] a').setAttribute('href', '/basket.html');
    headerBlock.querySelector('div[data-favorite] a').setAttribute('href', '/favorites.html');
    var basketSpan = void 0,
        favoritesBlock = void 0;

    if (data.cartCount) {
        basketSpan = headerBlock.querySelector('div[data-basket] span');
        basketSpan.innerHTML = data.cartCount;
        basketSpan.style.display = "block";
    }

    if (data.wishlistCount) {
        favoritesBlock = headerBlock.querySelector('div[data-favorite]');
        favoritesBlock.classList.add('favorites');
        favoritesBlock.querySelector('span').innerText = data.wishlistCount;
    }

    headerBlock.querySelector('div[data-auth] span').innerHTML = "Здравствуйте, " + data.name;
}

function renderHeaderAuthFalse() {

    headerBlock = document.querySelector('[class*="header-user"]');
    headerBlock.querySelector('div[data-auth] span').innerHTML = "Войти";
    headerBlock.querySelector('div[data-basket] a').setAttribute('href', '#');
    headerBlock.querySelector('div[data-favorite] a').setAttribute('href', '#');
    var basketSpan = void 0,
        favoritesBlock = void 0;

    basketSpan = headerBlock.querySelector('div[data-basket] span');
    basketSpan.innerHTML = 0;
    basketSpan.style.display = 'none';

    favoritesBlock = headerBlock.querySelector('div[data-favorite]');
    favoritesBlock.classList.remove('favorites');
    favoritesBlock.querySelector('span').innerText = 0;

    headerBlock.querySelector('div[data-auth] span').innerHTML = "Войти";
}

if (localStorage.getItem('user')) renderHeaderIsAuth(JSON.parse(localStorage.getItem('user'))); else renderHeaderAuthFalse();

config = Object.freeze(config);

//надо будет убрать(скрывает блок с сортировкой)
// let blockSorting = document.querySelector('div.sorting');
// if( blockSorting)
//     blockSorting.style.display = 'none';


if (!window.pms) window.pms = {};
window.pms['config'] = config;

var menu = document.querySelectorAll('div.menu div.marker');

/*
 * @param str
 * @param requareLength
 * @returns {boolean}
 */
function checkLength(str, requareLength) {
    if (str.length >= requareLength) return true;
    return false;
}

/**
 *
 * @param email
 * @returns {boolean}
 */
function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) return true;
    return false;
}

/**
 *
 * @param phone
 * @returns {boolean}
 */
function checkPhone(phone) {
    var re = /^[\+]?7\s[(]?[0-9]{3}[)]\s?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
    if (re.test(phone)) return true;
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

    switch (input.getAttribute('name')) {
        case "password":

            if (checkLength(input.value, 6) && input.value == document.querySelector('input[name="confirm_password"]').value) data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
            break;

        case "password_auth":
            if (checkLength(input.value, 6)) data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
            break;

        case "mail":

            if (checkEmail(input.value)) data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
            break;

        case "phone":

            if (checkPhone(input.value)) data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
            break;

        case "index":

            if (checkLength(input.value, 6)) data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
            break;

        case "confirm_password":

            if (checkLength(input.value, 6) && input.value == document.querySelector('input[name="password"]').value) data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
            break;

        default:
            if (input.value != "") data[input.getAttribute('name')] = input.value; else input.classList.add(error_class);
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
    if (document.querySelector('#score')) document.querySelector('#score').style.display = 'none';
    if (document.querySelector('#card')) document.querySelector('#card').style.display = 'none';
    if (document.querySelector('#thanks')) document.querySelector('#thanks').style.display = 'none';
}

//флаг авторизированности пользователя
var IS_AUTH = false;

function getMenuCategories() {
    var data = new FormData(),
        html = "",
        responseData = void 0;
    data.append('show_count', true);
    return fetch(window.pms.config.catalogAPI + 'categories', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
    }).then(function (response) {

        responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }
        return responseData;
    }).then(function (response) {
        if (response.status) {
            for (var key in response.data) {
                html += "<li><a href='" + response.data[key].href + "'>" + response.data[key].title + " (" + response.data[key].count + ")</a></li>";
            }
            menu[0].querySelector('ul').innerHTML = html;
            new SimpleBar(menu[0].querySelector('ul'), {autoHide: false});
        }
    });
}

function getMenuCollection() {
    var data = new FormData(),
        responseData,
        html = "";

    data.append('show_href', true);
    data.append('show_count', true);

    return fetch(window.pms.config.catalogAPI + 'collections', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
    }).then(function (response) {

        responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }
        return responseData;
    }).then(function (response) {
        if (response.status) {
            for (var key in response.data.items) {
                html += "<li><a href='" + response.data.items[key].href + "'>" + response.data.items[key].title + " (" + response.data.items[key].count + ")</a></li>";
            }
            menu[1].querySelector('ul').innerHTML = html;
            new SimpleBar(menu[1].querySelector('ul'), {autoHide: false});
        }
    });
}

function requestGetMenuCategories() {
    getMenuCategories();
    getMenuCollection();
}

requestGetMenuCategories();

function addFavoriteButtons(blockProducts, value) {

    var buttonHtml = "";
    if (value) buttonHtml = "<button class='new-off'></button>"; else buttonHtml = "<button class='new-on'></button>";
    if (blockProducts.querySelector('div.card-favorites')) blockProducts.querySelector('div.card-favorites').innerHTML = buttonHtml;
}

function eventChangeFavorites(button) {
    var productBlock = button.closest('div[data-catalog-item-id],div[data-id-block],div[data-id-catalog-item]'),
        idProduct = void 0;

    if (productBlock.hasAttribute('data-catalog-item-id')) idProduct = productBlock.getAttribute('data-catalog-item-id');

    if (productBlock.hasAttribute('data-id-block')) idProduct = productBlock.getAttribute('data-id-block');

    if (productBlock.hasAttribute('data-id-catalog-item')) idProduct = productBlock.getAttribute('data-id-catalog-item');

    if (button.classList.contains('new-on')) requestAddFavorites(idProduct, button); else requestRemoveFavorites(idProduct, button);
}

function eventAuth() {
    var data = {},
        listInput = document.querySelectorAll('#authorization input'),
        sendRequest = true;

    if (document.querySelector('div.authorization')) {
        if (document.querySelectorAll('div.authorization form div')[0].querySelector('div.error-authorization')) document.querySelectorAll('div.authorization form div')[0].querySelector('div.error-authorization').remove();
    }

    Array.prototype.forEach.call(listInput, function (current, index, array) {
        current.classList.remove('input-error-border');
        validateData(current, data, 'input-error-bottom');

        if (current.classList.contains('input-error-bottom')) sendRequest = false;
    });

    if (sendRequest) requestAuth(data);
}

//событие на скролл документа на самый вверх
document.querySelector('div.scrollup').addEventListener('click', function (event) {
    animateScrollTo(0);
    return;
});

document.addEventListener('click', function (event) {
    //нажатие на кнопку "В избранное"
    if (event.target.tagName == "BUTTON" && (event.target.classList.contains('new-on') || event.target.classList.contains('new-off'))) {
        eventChangeFavorites(event.target);
        return;
    }
    //нажатие на иконку лупу и переадресация на страницу с результатом поиска
    if (event.target.tagName == "BUTTON" && event.target.getAttribute('type') == "submit" && event.target.closest('div.search-menu') || event.target.tagName == "IMG" && event.target.closest('div.search-menu')) {
        var search_value = "";
        if (event.target.closest('div.search-menu').querySelector('input')) ;
        search_value = event.target.closest('div.search-menu').querySelector('input').value;
        window.location.href = "/search/" + search_value + "";
        return;
    }

    //авторизация
    if (event.target.tagName == "BUTTON" && event.target.closest('#authorization')) {
        eventAuth();
        return;
    }

    //разлогирование
    if (event.target.tagName == "BUTTON" && event.target.closest('#exit')) {
        requestLogout();
        return;
    }

    //показываем окно с авторизацие или переход на личный кабинет
    if (event.target.tagName == "SPAN" && event.target.parentNode.parentNode.hasAttribute('data-auth') || event.target.tagName == "BUTTON" && event.target.parentNode.hasAttribute('data-auth') || event.target.tagName == "IMG" && event.target.parentNode.parentNode.hasAttribute('data-auth')) {
        event.target.closest('[data-auth]').querySelectorAll('div')[0].style.display = "block";
        return;
    }

    if (event.target.getAttribute('id') != 'authorization' && !event.target.closest('#authorization')) {
        if (document.querySelector('#authorization')) document.querySelector('#authorization').style.display = 'none';
    }

    if (event.target.getAttribute('id') != 'exit' && !event.target.closest('#exit')) {
        if (document.querySelector('#exit')) document.querySelector('#exit').style.display = 'none';
    }

    //нажатие на крестик у окна авторизации или у кона с переходом в личный кабинет
    if ((event.target.tagName == "IMG" && event.target.parentNode.tagName == "BUTTON" && event.target.parentNode.classList.contains('popup-close') || event.target.tagName == "BUTTON" && event.target.classList.contains('popup-close')) && (event.target.closest('#authorization') || event.target.closest('#exit'))) {
        if (document.querySelector('#authorization')) document.querySelector('#authorization').style.display = 'none';
        if (document.querySelector('#exit')) document.querySelector('#exit').style.display = 'none';
        return;
    }

    //закрытие модальных окошек
    if (event.target.tagName == "IMG" && event.target.parentNode.tagName == "BUTTON" && event.target.parentNode.classList.contains('popup-close') && event.target.closest('[class*="header-user"]') || event.target.tagName == "BUTTON" && event.target.classList.contains('popup-close') && event.target.closest('[class*="header-user"]')) {
        if (event.target.tagName == "IMG") event.target.parentNode.parentNode.style.display = "none"; else event.target.parentNode.style.display = "none";
        return;
    }

    //скрытие блока меню, если кликнули не на этот блок
    if (!event.target.closest('div.menu-popup') && !(event.target.tagName == "BUTTON" && event.target.classList.contains('menu-on'))) {
        document.querySelector('div.menu-popup').style.display = "none";
        document.querySelector('[class*="header-box"] button.menu-on').style.display = "block";
        return;
    }
});

document.addEventListener('keydown', function (event) {

    if (event.target.tagName == 'INPUT' && event.target.getAttribute('type') == "search") {
        if (event.which == 13) {
            window.location.href = "/search/" + event.target.value + "";
        }
    }
});

document.addEventListener('mousedown', function (event) {
});

function requestAddFavorites(product_id, button) {

    var data = new FormData();
    data.append('id', product_id);

    return fetch(window.pms.config.cabinetAPI + 'wishlist/add', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
    }).then(function (response) {
        var responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }

        return responseData;
    }).then(function (response) {
        if (response.status) {

            button.classList.remove('new-on');
            button.classList.add('new-off');
            if (headerFavoriteBlock) headerFavoriteBlock.classList.add('favorites');

            dataLocalStorage = JSON.parse(localStorage.getItem('user'));
            dataLocalStorage['wishlistCount'] = data.count;
        }
    });
}

function requestRemoveFavorites(product_id, button) {

    var data = new FormData();
    data.append('id', product_id);

    return fetch(window.pms.config.cabinetAPI + 'wishlist/delete', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
    }).then(function (response) {
        var responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }

        return responseData;
    }).then(function (response) {
        if (response.status) {
            button.classList.remove('new-off');
            button.classList.add('new-on');
            if (!data.count && headerFavoriteBlock) headerFavoriteBlock.classList.remove('favorites');

            dataLocalStorage = JSON.parse(localStorage.getItem('user'));
            dataLocalStorage['wishlistCount'] = data.count;
        }
    });
}

function requestCheckFavoritesItems(listId, classBlock) {

    var data = new FormData();
    data.append('items', JSON.stringify(listId));

    return fetch(window.pms.config.cabinetAPI + 'wishlist/check', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
    }).then(function (response) {
        var responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }

        return responseData;
    }).then(function (response) {
        if (response.status) {
            if (response.data.wishlist) {
                var products = document.querySelector('div.' + classBlock),
                    wishList = response.data.wishlist,
                    buttonHtml = "";

                for (var key in wishList) {
                    addFavoriteButtons(products.querySelector('div[data-catalog-item-id="' + wishList[key].id + '"],div[data-id-catalog-item="' + wishList[key].id + '"]'), wishList[key].value);
                }
            }
        }
    });
}

function setAuthUserData(result, url) {
    var headerBlock = void 0,
        basketSpan = void 0,
        favoritesBlock = void 0;

    headerBlock = document.querySelector('[class*="header-user"]');

    if (result.status) {
        // switch (url) {
        //     case "registration" :
        //         window.location.href = "/";
        //         break
        // }

        localStorage.setItem('user', JSON.stringify(result.data));

        headerBlock.querySelector('#authorization').remove();
        renderHeaderIsAuth(result.data);
        IS_AUTH = true;
    } else {
        localStorage.removeItem('user');
        switch (url) {
            case "cabinet":
                window.location.href = "/";
                break;
            case "favorites":
                window.location.href = "/";
                break;
            case "basket":
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

    return fetch(window.pms.config.cabinetAPI + 'user/checkAuth', {
        method: 'POST',
        credentials: 'same-origin'
    }).then(function (response) {

        var responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }
        return responseData;
    }).then(function (response) {
        if (response.status) {
            document.querySelector('body').classList.remove('showprice');
            switch (url) {
            }
        }

        return setAuthUserData(response, url);
    });
}

function requestLogout() {

    fetch(window.pms.config.cabinetAPI + 'user/logout', {
        method: 'POST',
        credentials: 'same-origin'
    }).then(function (response) {
        var responseData = false;

        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug());
        }

        return responseData;
    }).then(function (response) {
        //  console.log(response);
        if (response.status) {
            localStorage.removeItem('user');
            location.reload();
        } else alert('Не получилось разлогиниться');
    });
}

function requestAuth(data) {

    var formData = new FormData();
    formData.append('login', data['mail']);
    formData.append('password', data['password_auth']);

    return fetch(window.pms.config.cabinetAPI + 'user/login', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
    }).then(function (response) {
        var responseData = false;
        console.log(response);
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }

        return responseData;
    }).then(function (response) {
        if (response.status) location.reload(); else {
            var error = "<div class='error-authorization'>" + "<p>Введены неверные данные</p>" + "</div>";
            if (document.querySelector('div.authorization')) {
                document.querySelectorAll('div.authorization form div')[0].innerHTML = document.querySelectorAll('div.authorization form div')[0].innerHTML + error;
            }
            document.querySelectorAll('div.authorization form div')[0].querySelectorAll('input').forEach(function (input) {
                input.classList.add('input-error-bottom');
            });

            // var errors = response.data.error;
            // var errorString = "";
            // for(key in errors){
            //     errorString += errors[key] + '\n';
            // }
            // if(errorString.length != 0)
            //     alert(errorString);
        }
    });
}

function requestRemindPassword(data) {
    return fetch(window.pms.config.catalogAPI + 'wishlist/check', {
        method: 'POST',
        credentials: 'same-origin',
        body: data
    }).then(function (response) {
        var responseData = false;
        try {
            responseData = response.json();
        } catch (e) {
            responseData = {status: false, statusText: "Произошла ошибка при соединении"};
            response.text().then(console.debug);
        }

        return responseData;
    }).then(function (response) {
    });
}
