"use strict";

(function () {
    "use strict";

    var timeOuts = [];
    var isPayment = false;
    var min_price_order = "";
    var total_price = "";
    var useBonus = 0;
    var css = {
        'input_error': "input-error-bottom",
        'is_check': 'payment-activ',
        'disabled_order': 'basket-order-off',
        'enable_order': 'basket-order-on',
        'sizeActive': 'basket-size-on'
    };

    var delivery_city = "";
    var index_number = "";
    var address = "";

    requestGetBasket();
    requestCheckAuth('basket');
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

    function requestGetUserData() {

        return fetch(window.pms.config.cabinetAPI + 'get/userData', {
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
                var text_full_address = void 0,
                    popup = void 0;

                popup = document.querySelector('#popup-fon .popup-cell');
                for (var key in response.userData) {
                    var input = popup.querySelector('input[name="' + key + '"]');

                    if (input) {
                        input.value = response.userData[key];
                        switch (key) {
                            case "delivery_city":
                                delivery_city = response.userData[key];
                                break;
                            case "index_number":
                                index_number = response.userData[key];
                                break;
                            case "address":
                                address = response.userData[key];
                                break;

                        }
                    }
                }

                text_full_address = 'Текущий адрес доставки: ' + index_number + ' ' + delivery_city + ' ' + address;
                if (response.userData.index_number == "" && response.userData.city == "" && response.userData.address == "") text_full_address = "Не указан адрес доставки";

                document.querySelector('div.address-box p').innerText = text_full_address;
            }
        });
    }

    function checkButtons() {
        //проверка на активность кнопки у бонусов
        if (document.querySelector('.basket-total button[action="use-bonus"]')) {
            if (parseInt(total_price) < parseInt(min_price_order)) {

                document.querySelector('.basket-total button[action="use-bonus"]').parentNode.classList.add("basket-total-off");
                document.querySelector('.basket-total button[action="use-bonus"]').parentNode.classList.remove("basket-total-on");
            } else {

                document.querySelector('.basket-total button[action="use-bonus"]').parentNode.classList.remove("basket-total-off");
                document.querySelector('.basket-total button[action="use-bonus"]').parentNode.classList.add("basket-total-on");
            }
        }

        //проверка активности кнопки у Оформить заказ
        if (parseInt(total_price) < parseInt(min_price_order)) {
            document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.remove("basket-order-on");
            document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.add("basket-order-off");
        } else {
            document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.add("basket-order-on");
            document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.remove("basket-order-off");
        }
    }

    function requestGetBasket() {
        return fetch(window.pms.config.cabinetAPI + 'order/cart', {
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
                var products = response.data.cart.products,
                    html = "",
                    list_div = void 0;
                if (products) {
                    for (var key in products) {

                        var product = products[key].product,
                            modifications = products[key].modifications;
                        html += "<div class='basket-product' data-id-item='" + product.id + "'>" + "<div>" + "<div>" + "<div>" + "<div>" + "<img src='" + product.images[0]['50x50'] + "' >" + "<div>" + "<p>#" + products[key].order_id + "</p>" + "<p><a href='" + product.href + "' >" + product.title + "</a></p>";

                        if (product.collection[0].title) {
                            html += "<p>Коллекция: <a href='" + product.collection[0].href + "' >" + product.collection[0].title + "</a></p>";
                        }

                        html += "</div>" + "</div>" + "</div>" + "<div>" + "<div>" + "<p>Цена за шт.</p>" + "<span>" + formatMoney(product.price) + "</span>" + "</div>" + "</div>" + "</div>" + "<div>" + "<div>";
                        var classSizeOn = void 0;
                        for (var size_id in modifications) {
                            classSizeOn = "";
                            if (+modifications[size_id].quantity > 0) classSizeOn = 'basket-size-on';

                            html += "<div data-id-size='" + modifications[size_id].id + "' class='" + classSizeOn + "'>" + "<p>" + modifications[size_id].title + "</p>" + "<div class='basket-product-size'>" + "<button data-action-size='reduce'><img src='/images/icons/minus.svg' /></button>" + "<input type='number' placeholder='0' class='shest' value='" + modifications[size_id].quantity + "' />" + "<button data-action-size='increase'><img src='/images/icons/plus.svg' /></button>" + "</div>" + "</div>";
                        }

                        html += "</div>" + "<div>" + "<div>" + "<p>Сумма</p>" + "<span>" + formatMoney(products[key].total_price) + "</span>" + "</div>" + "</div>" + "</div>" + "</div>" + "<div>" + "<button data-action='remove'>x</button>" + "</div>" + "</div>";
                    }

                    document.querySelector('div.basket-box').innerHTML = html;

                    //бонусы
                    list_div = document.querySelectorAll('div.basket-total div');
                    list_div[0].querySelector('span').innerText = formatMoney(response.data.cart.bonus);

                    if (response.data.cart.used_bonus) useBonus = parseInt(response.data.cart.used_bonus);

                    if (response.data.cart.payment_method) document.querySelector('div.payment-box button[data-payment-method="' + response.data.cart.payment_method + '"]').classList.add(css.is_check);

                    list_div[2].querySelector('span').innerText = formatMoney(response.data.cart.total_price);

                    if (parseInt(response.data.cart.total_price) >= parseInt(response.data.cart.min_price_order)) document.querySelectorAll('.basket-order div')[2].classList.add(css.enable_order);

                    if (parseInt(response.data.cart.bonus) <= 0) {
                        document.querySelector('.basket-total button[action="use-bonus"]').remove();
                    }

                    min_price_order = response.data.cart.min_price_order;
                    total_price = response.data.cart.total_price;
                    checkButtons(total_price);

                    document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа состовляет " + formatMoney(total_price);
                    document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[1].innerText = "Минимальный заказ " + formatMoney(min_price_order);

                    document.querySelector('div.basket-container').classList.remove('d-none');
                } else {
                    document.querySelector('div.block-empty').classList.toggle('d-none');
                }
            } else {
                document.querySelector('div.block-empty').classList.toggle('d-none');
            }
        });
    }

    function requestEdit(id_item) {
        // console.log(id_item);
        var data = {},
            formData = new FormData();
        data['product_id'] = id_item;
        data['modifications'] = {};

        document.querySelectorAll('div.basket-box div[data-id-item="' + id_item + '"] button[data-action-size="reduce"] ').forEach(function (current, index, array) {
            data['modifications'][current.closest('div[data-id-size]').getAttribute('data-id-size')] = current.nextElementSibling.value == "" ? 0 : current.nextElementSibling.value;
        });

        formData.append('product_id', id_item);
        formData.append('modifications', JSON.stringify(data['modifications']));

        return fetch(window.pms.config.cabinetAPI + 'order/edit', {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
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
                var products = response.data.products,
                    basketBox = document.querySelector('div.basket-box');
                for (var key in products) {
                    basketBox.querySelectorAll('div[data-id-item="' + key + '"] span')[basketBox.querySelectorAll('div[data-id-item="' + key + '"] span').length - 1].innerText = formatMoney(products[key].price_total);
                }
                document.querySelectorAll('div.basket-total div')[document.querySelectorAll('div.basket-total div').length - 1].querySelector('span').innerText = formatMoney(response.data.total_price);
                document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа составляет " + formatMoney(response.data.total_price);
                total_price = response.data.total_price;
                checkButtons();
            }
        });
    }

    function requestDeleteItem(product_id) {
        var data = new FormData();
        data.append('product_id', product_id);

        return fetch(window.pms.config.cabinetAPI + 'order/delete', {
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

                if (localStorage.getItem('user')) {
                    var data_local = JSON.parse(localStorage.getItem('user'));
                    data_local['cartCount'] = response.data.count;
                    localStorage.setItem('user', JSON.stringify(data_local));
                }

                document.querySelector('div.basket-box div[data-id-item="' + product_id + '"]').remove();
                document.querySelectorAll('div.basket-total div')[document.querySelectorAll('div.basket-total div').length - 1].querySelector('span').innerText = formatMoney(response.data.total_price);
                total_price = response.data.total_price;

                checkButtons();

                //изменяем цифру в корзине
                document.querySelector('[class*="header-user"] div[data-basket] span').innerText = parseInt(document.querySelector('[class*="header-user"] div[data-basket] span').innerText) - 1;
                if (document.querySelector('[class*="header-user"] div[data-basket] span').innerText === 0) document.querySelector('[class*="header-user"] div[data-basket] span').classList.add('d-none');

                //меняем текст общей суммы заказа рядом с кнопкой "оформить заказ"
                document.querySelectorAll('div.basket-order > div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа состовляет " + formatMoney(total_price);
                if (total_price === 0) {
                    document.querySelector('div.basket-container').classList.add('d-none');
                    document.querySelector('div.block-empty').classList.remove('d-none');
                    document.querySelector('[class*="header-user"] div[data-basket] span').classList.add('d-none');
                }
            }
        });
    }

    function requestUseBonus() {
        return fetch(window.pms.config.cabinetAPI + 'order/useBonus', {
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
                var footerBasket = document.querySelectorAll('div.basket-total div');
                footerBasket[0].querySelector('span').innerText = formatMoney(response.data.bonus);
                footerBasket[1].querySelector('button').remove();
                footerBasket[2].querySelector('span').innerText = formatMoney(response.data.total_price);
                useBonus = parseInt(response.data.used_bonus);
            } else {
                alert(response.statusText);
            }
        });
    }

    function requestCheck(payment_method) {
        var data = new FormData();

        //  document.querySelector('button[action="save-order"]').parentNode.classList.add(css.disabled_order);
        //   document.querySelector('button[action="save-order"]').parentNode.classList.remove(css.enable_order);


        data.append('payment_method', payment_method);

        if (document.querySelector('div.payment-box button.payment-activ')) document.querySelector('div.payment-box button.payment-activ').classList.remove(css.is_check);

        if (document.querySelector('div.content-error')) document.querySelector('div.content-error').classList.add('d-none');

        return fetch(window.pms.config.cabinetAPI + 'order/check', {
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
                if (response.data.payment_method) document.querySelector('div.payment-box button[data-payment-method="' + response.data.payment_method + '"]').classList.add(css.is_check);
            } else {
                if (response.data.errors.address) {
                    PopUpShowCard();
                    for (var key in response.data.errors.address) {
                        document.querySelector('#card input[name="' + response.data.errors.address[key] + '"]').classList.add(css.input_error);
                    }
                } else {
                    PopUpShowScore();
                    for (var key in response.data.errors.payment) {
                        document.querySelector('#score input[name="' + response.data.errors.payment[key] + '"]').classList.add(css.input_error);
                    }
                }
            }
        });
    }

    //отправка заказа на оформление
    function requestSendOrder() {
        document.querySelector('.content-error').classList.add('d-none');
        return fetch(window.pms.config.cabinetAPI + 'order/save', {
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
                //нужно раскомментить
                if (yaCounter47500810) yaCounter47500810.reachGoal('buy');
                document.querySelector('#popup-fon').style.display = "block";
                document.querySelector('div.basket-order button[action="save-order"]').remove();
                if (localStorage.getItem('user')) {
                    var data_local = JSON.parse(localStorage.getItem('user'));
                    data_local['cartCount'] = 0;
                    localStorage.setItem('user', JSON.stringify(data_local));
                }
                PopUpShowThanks();
            } else {
                document.querySelector('.content-error').classList.remove('d-none');
                for (var key in response.data.errors) {
                    document.querySelector('.content-error span').innerText = response.data.errors[key];
                    break;
                }
            }
        });
    }

    function setUserData(button, fields) {
        var data = new FormData();

        if (fields['delivery_city'] && fields['index_number'] && fields['address']) {
            delivery_city = fields['delivery_city'];
            index_number = fields['index_number'];
            address = fields['address'];
        }

        data.append('data', JSON.stringify(fields));
        if (document.querySelector('div.content-error')) document.querySelector('div.content-error').classList.add('d-none');

        return fetch(window.pms.config.cabinetAPI + 'set/userData', {
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

                document.querySelector('div.address-box p').innerHTML = 'Текущий адрес доставки: ' + index_number + ' ' + delivery_city + ' ' + address;

                var event = document.createEvent('HTMLEvents');
                event.initEvent('click', true, false);
                button.closest('form').parentNode.querySelector('button').dispatchEvent(event);

                button.closest('form').querySelector('input').classList.remove(css.input_error);

                if (button.getAttribute('data-type-popup') == "payment") {
                    requestCheck("payment");
                }
            }
        });
    }

    function changeNewTotalPrice(input) {

        var price = parseInt(input.closest('div.basket-product').querySelectorAll('span')[0].innerText.replace('руб.', "").replace(/\s*/g, ''));
        var totalPrice = 0;

        input.closest('div[data-id-size]').parentNode.querySelectorAll('div[data-id-size] input[type="number"]').forEach(function (current, undex, array) {
            totalPrice += parseInt(price * parseInt(current.value));
        });

        input.closest('div.basket-product').querySelectorAll('span')[input.closest('div.basket-product').querySelectorAll('span').length - 1].innerText = formatMoney(totalPrice);

        totalPrice = 0;
        document.querySelectorAll('div.basket-product').forEach(function (current, index, array) {
            totalPrice += parseInt(current.querySelectorAll('span')[current.querySelectorAll('span').length - 1].innerText.replace('руб.', "").replace(/\s*/g, ''));
        });

        total_price = totalPrice - useBonus;

        document.querySelectorAll('div.basket-total div')[2].querySelector('span').innerText = formatMoney(total_price);
        document.querySelectorAll('div.basket-order div')[1].querySelectorAll('p')[0].innerText = "Сумма вашего заказа состовляет " + formatMoney(total_price);

        checkButtons();
    }

    document.addEventListener('keyup', function (event) {
        if (event.target.tagName == "INPUT" && event.target.closest('div.basket-container')) {

            var id_item = event.target.closest('div.basket-product').getAttribute('data-id-item');
            clearTimeout(timeOuts[id_item]);

            if (event.target.value.length > 3) event.target.value = event.target.value.substr(0, 3);

            if (event.target.value === "") event.target.value = 0;

            if (event.target.value > 0) event.target.closest('div[data-id-size]').classList.add(css.sizeActive); else event.target.closest('div[data-id-size]').classList.remove(css.sizeActive);

            changeNewTotalPrice(event.target);

            timeOuts[event.target.closest('div.basket-product').getAttribute('data-id-item')] = setTimeout(function () {
                requestEdit(id_item);
            }, 1000);

            return;
        }
    });

    document.addEventListener('click', function (event) {

        //изменение размеров
        if (event.target.tagName == "BUTTON" && event.target.hasAttribute('data-action-size') || event.target.tagName == "IMG" && event.target.parentNode.hasAttribute('data-action-size')) {
            var button = event.target;
            if (event.target.tagName == "IMG") button = event.target.parentNode;

            var id_item = button.closest('div.basket-product').getAttribute('data-id-item'),
                input = button.parentNode.querySelector('input');

            //на время запроса блочим кнопку отправки заказа
            document.querySelector('.basket-order button[action="save-order"]').parentNode.classList.add(css.disabled_order);
            clearTimeout(timeOuts[id_item]);

            if (button.getAttribute("data-action-size") == "increase") input.value = parseInt(input.value) + 1; else input.value = parseInt(input.value) - 1 < 0 ? 0 : parseInt(input.value) - 1;

            if (input.value > 0) button.closest('div[data-id-size]').classList.add(css.sizeActive); else button.closest('div[data-id-size]').classList.remove(css.sizeActive);

            changeNewTotalPrice(input);

            timeOuts[button.closest('div.basket-product').getAttribute('data-id-item')] = setTimeout(function () {
                requestEdit(id_item);
            }, 1000);
            return;
        }

        //сохранение полей у модальных окон
        if (event.target.tagName == "BUTTON" && event.target.getAttribute('data-action') == "save-user-data") {
            var data = {},
                sendRequest = true;
            event.target.parentNode.querySelectorAll('input').forEach(function (current, index, array) {
                current.classList.remove(css.input_error);
                validateData(current, data, css.input_error);

                if (current.classList.contains(css.input_error)) sendRequest = false;
            });

            if (sendRequest) setUserData(event.target, data);
            return;
        }

        if ((event.target.tagName == "IMG" && event.target.parentNode.tagName == "BUTTON" || event.target.tagName == "BUTTON") && event.target.closest('div.payment-box')) {
            var _button = void 0;
            if (event.target.tagName == "IMG") _button = event.target.parentNode; else _button = event.target;

            requestCheck(_button.getAttribute('data-payment-method'));
            return;
        }

        //сохранение заказа
        if (event.target.tagName == "BUTTON" && event.target.getAttribute('action') == "save-order") {
            if (event.target.parentNode.classList.contains('basket-order-on')) requestSendOrder();
            return;
        }

        //удаляем из корзины
        if (event.target.tagName == "BUTTON" && event.target.getAttribute('data-action') == "remove" && event.target.closest('div.basket-box')) {
            requestDeleteItem(event.target.closest('div[data-id-item]').getAttribute('data-id-item'));
            return;
        }
        //используем бонусы
        if (event.target.tagName == "BUTTON" && event.target.getAttribute('action') == "use-bonus" && event.target.closest('div.basket-total')) {
            if (event.target.parentNode.classList.contains('basket-total-on')) requestUseBonus();
            return;
        }

        if ((event.target.tagName == "IMG" && event.target.parentNode.classList.contains('popup-close') || event.target.tagName == "BUTTON" && event.target.classList.contains('popup-close')) && event.target.closest('#thanks')) {
            var storage = JSON.parse(localStorage.getItem('user'));
            storage['cartCount'] = 0;
            localStorage.setItem('user', JSON.stringify(storage));
            window.location.href = "/cabinet.html";
        }
    });
})();
