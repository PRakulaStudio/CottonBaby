<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/system/bootstrap.php' ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8"/>
    <title>Cotton Baby</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:image" content="/images/repost.png">
    <meta name="yandex-verification" content="f5f049cb38f1bf5c"/>
    <link rel="shortcut icon" href="/images/favicon.png" type="image/png">
    <link rel="stylesheet" type="text/css" href="/css/swiper.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/style.css"/>
    <link rel="stylesheet" type="text/css" href="/css/index.css"/>
    <link rel="manifest" href="manifest.json"/>
</head>
<body class="showPrice">
<div class="scrollup"></div>
<!-- menu popup start -->
<div class="menu-popup" id="menu">
    <div class="button-box">
        <button class="menu-off" onclick="javascript:PopUpHideMenu()" id="menu-off"></button>
        <div class="search-menu">
            <input type="search" placeholder="поиск">
            <button type="submit"><img src="images/icons/search.png"></button>
        </div>
    </div>

    <div class="menu-box">
        <div class="menu">

            <div class="section">
                <p>Компания</p>
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li><a href="/information.html">О нас</a></li>
                    <li><a href="/catalog/">Каталог</a></li>
                    <li><a href="/collections/">Коллекции</a></li>
                    <li><a href="/cooperation.html">Сотрудничество</a></li>
                    <li><a href="/production.html">Наше производство</a></li>
                    <li><a href="/delivery.html">Доставка и оплата</a></li>
                    <li><a href="/contacts.html">Контакты</a></li>
                </ul>
            </div>

            <div class="section marker">
                <p>Каталог</p>
                <ul>
                    <!--<li><a href="#">Комбинезон на манжете (6)</a></li>
                    <li><a href="#">Шапки</a></li>
                    <li><a href="#">Штаны</a></li>
                    <li><a href="#">Кофты</a></li>
                    <li><a href="#">Ползунки</a></li>
                    <li><a href="#">Песочник</a></li>
                    <li><a href="#">Нагрудник</a></li>
                    <li><a href="#">Комбинезон на манжете (6)</a></li>
                    <li><a href="#">Шапки</a></li>
                    <li><a href="#">Штаны</a></li>
                    <li><a href="#">Кофты</a></li>
                    <li><a href="#">Ползунки</a></li>
                    <li><a href="#">Песочник</a></li>
                    <li><a href="#">Нагрудник</a></li>
                    <li><a href="#">Комбинезон на манжете (6)</a></li>
                    <li><a href="#">Шапки</a></li>
                    <li><a href="#">Штаны</a></li>
                    <li><a href="#">Кофты</a></li>
                    <li><a href="#">Ползунки</a></li>
                    <li><a href="#">Песочник</a></li>
                    <li><a href="#">Нагрудник</a></li>-->
                </ul>
            </div>

            <div class="section marker">
                <p>Коллекции</p>
                <ul>
                    <!--<li><a href="#">Комбинезон на манжете (6)</a></li>
                    <li><a href="#">Шапки</a></li>
                    <li><a href="#">Штаны</a></li>
                    <li><a href="#">Кофты</a></li>
                    <li><a href="#">Ползунки</a></li>
                    <li><a href="#">Песочник</a></li>
                    <li><a href="#">Нагрудник</a></li>
                    <li><a href="#">Комбинезон на манжете (6)</a></li>
                    <li><a href="#">Шапки</a></li>
                    <li><a href="#">Штаны</a></li>
                    <li><a href="#">Кофты</a></li>
                    <li><a href="#">Ползунки</a></li>
                    <li><a href="#">Песочник</a></li>
                    <li><a href="#">Нагрудник</a></li>
                    <li><a href="#">Комбинезон на манжете (6)</a></li>
                    <li><a href="#">Шапки</a></li>
                    <li><a href="#">Штаны</a></li>
                    <li><a href="#">Кофты</a></li>
                    <li><a href="#">Ползунки</a></li>
                    <li><a href="#">Песочник</a></li>
                    <li><a href="#">Нагрудник</a></li>-->
                </ul>
            </div>

        </div>
    </div>
</div>
<!-- menu popup end -->

<!-- header start -->
<div class="header-box-index">
    <div class="header-index">
        <div class="header-menu-index">
            <button class="menu-on" onclick="PopUpShowMenu()" id="menu-on"></button>
        </div>

        <div class="header-info-index">
            <div>
                <a href="/"><img src="/images/logo.svg"></a>
            </div>

            <div>
                <p>Производство детской одежды</p>
                <p>Оптовая продажа</p>
                <p>г. Екатеринбург</p>
            </div>
        </div>

        <div class="header-user-index">
            <div data-insta>
                <a href="https://www.instagram.com/cot.ton_baby/"><img src="/images/icons/insta.png"></a>
                <div class="sub">
                    <div><a href="https://www.instagram.com/cot.ton_baby/">Подпишись</a></div>
                </div>
            </div>
            <div data-basket><a href="#"><img src="/images/icons/basket.png"><span>0</span></a></div>
            <div data-favorite><a href="favorites.html"><img src="/images/icons/favorites.png"></a><span>0</span></div>
            <div data-auth>
                <button><img src="/images/icons/user.png"><span>Войти</span></button>
                <div class="authorization" id="authorization">
                    <button class="popup-close"><img src="/images/icons/close.png"></button>
                    <p>Авторизация</p>
                    <form>
                        <div>
                            <input type="email" name="mail" placeholder="E-mail">
                            <input type="password" name="password_auth" placeholder="Пароль">
                        </div>
                        <!--<div><span data-action="remind-pass">Забыли пароль?</span></div>-->
                        <div>
                            <button type="button">Войти</button>
                            <a href="registration.html">Регистрация</a>
                        </div>
                    </form>
                </div>

                <div class="exit" id="exit">
                    <button class="popup-close"><img src="images/icons/close.png"></button>
                    <div>
                        <a href="/cabinet.html">Личный кабинет</a>
                        <button type="button">Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- header end -->

<!-- content start -->
<main class="content-site">
    <section class="main-slider">
        <div class="swiper-container swiper-main">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img
                            src="images/pictures/index1.jpg"
                            srcset="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index1.jpg', 450, 450]); ?> 450w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index1.jpg', 800, 800]); ?> 800w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index1.jpg', 1050, 1050]); ?> 1050w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index1.jpg', 1920, 1920]); ?> 1920w"
                            sizes="(min-width: 1920px) 100vw"
                    >
                    <div class="slide-text">
                        <div class="text">
                            <b>ДЕТСКАЯ ОДЕЖДА ОПТОМ</b>
                            <p>ОТ 0 ДО 3 ЛЕТ</p>
                            <p>ЧАСТНАЯ ФАБРИКА</p>
                            <a href="/collections/">Подробнее<img src="images/icons/arrow-link.svg"></a>
                        </div>
                    </div>
                </div>

                <div class="swiper-slide">
                    <img
                            src="images/pictures/index2.jpg"
                            srcset="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index2.jpg', 450, 450]); ?> 450w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index2.jpg', 800, 800]); ?> 800w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index2.jpg', 1050, 1050]); ?> 1050w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index2.jpg', 1920, 1920]); ?> 1920w"
                            sizes="(min-width: 1920px) 100vw"
                    >
                    <div class="slide-text">
                        <div class="text">
                            <b>ДЕТСКАЯ ОДЕЖДА ОПТОМ</b>
                            <p>ОТ 0 ДО 3 ЛЕТ</p>
                            <p>ЧАСТНАЯ ФАБРИКА</p>
                            <a href="/collections/">Подробнее<img src="images/icons/arrow-link.svg"></a>
                        </div>
                    </div>
                </div>

                <div class="swiper-slide">
                    <img
                            src="images/pictures/index3.jpg"
                            srcset="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index3.jpg', 450, 450]); ?> 450w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index3.jpg', 800, 800]); ?> 800w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index3.jpg', 1050, 1050]); ?> 1050w, <?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/index3.jpg', 1920, 1920]); ?> 1920w"
                            sizes="(min-width: 1920px) 100vw"
                    >
                    <div class="slide-text">
                        <div class="text">
                            <b>ДЕТСКАЯ ОДЕЖДА ОПТОМ</b>
                            <p>ОТ 0 ДО 3 ЛЕТ</p>
                            <p>ЧАСТНАЯ ФАБРИКА</p>
                            <a href="/collections/">Подробнее<img src="images/icons/arrow-link.svg"></a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
            <!-- Add Arrows -->
            <div class="main-prev swiper-button-prev"></div>
            <div class="main-next swiper-button-next"></div>
        </div>
    </section>

    <section class="content-new">
        <div class="new">
            <div class="title">
                <p>Новинки</p>
                <a href="/catalog/">в каталог<img src="images/icons/arrow-link.svg"></a>
            </div>

            <div class="text">
                <p>В Cotton baby мы делаем ставку на высокое качество, современный дизайн и комфорт. Мы работаем с
                    лучшими мировыми производителями тканей и фурнитуры, уделяя большое внимание экологичности
                    производимой нами продукции и постоянно совершенствуя технологии производства.</p>
                <p>Вся наша продукция прошла сертификацию качества и соответствует техническому регламенту Таможенного
                    союза ТР ТС 007/2011 (свидетельство о госрегистрации, приложение).</p>
            </div>
        </div>

        <div class="new-slider">
            <div class="swiper-button">
                <button class="new-prev swiper-button-prev"><img src="images/icons/back.svg"></button>
                <button class="new-next swiper-button-next"><img src="images/icons/next.svg"></button>
            </div>
            <div class="swiper-container swiper-new">
                <div class="swiper-wrapper">
                    <?= execPlugin('PonomareVlad/catalog', 'category', ['limit' => 20, 'img_size' => ['750x750']], 'index_widget'); ?>
                    <div class="swiper-slide slide-off"></div>
                    <div class="swiper-slide slide-off"></div>
                    <div class="swiper-slide slide-off"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="content-cooperation">
        <video loop="loop" poster="video/fon.png" muted>
            <source src="https://studio.prakula.ru/CottonBaby/video/main_index.960.m4v"
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
        </video>

        <div class="coop-box">
            <div class="coop-block">
                <div class="coop-title"><p>Сотрудничество с нами</p></div>

                <div class="coop-text">
                    <p>Обращаем ваше внимание!</p>
                    <p>Сайт для ОПТОВЫХ продаж!</p>
                    <p>Мы сотрудничаем с:</p>
                    <p>• Юридическими лицами</p>
                    <p>• Физическими лицами</p>
                    <p>• Совместными покупками</p>
                    <p>Чтобы увидеть оптовые цены - <a href="registration.html">зарегистрируйтесь</a>!</p>
                    <p>Если возникли вопросы -</p>
                </div>

                <div class="coop-link">
                    <a href="cooperation.html"><img src="images/icons/send.png">Напишите нам</a>
                </div>
            </div>
        </div>
    </section>

    <section class="content-production">
        <div class="prod-box">
            <div class="prod-title">
                <div>
                    <p>наше</p>
                    <b>производство</b>
                </div>

                <a href="production.html">подробнее<img src="images/icons/arrow-link.svg"></a>
            </div>

            <div class="prod-icons">
                <div class="prod-icon icon-a">
                    <img src="images/production/a.png">
                    <p>8 лет розничной торговли</p>
                </div>

                <div class="prod-icon icon-b">
                    <img src="images/production/b.png">
                    <p>Начало производства в 2015г.</p>
                </div>

                <div class="prod-icon icon-c">
                    <img src="images/production/c.png">
                    <p>Зарегистрированная торговая марка Cotton Baby</p>
                </div>

                <div class="prod-icon icon-d">
                    <img src="images/production/d.png">
                    <p>Сертификат таможенного союза №5644325</p>
                </div>

                <div class="prod-icon icon-e">
                    <img src="images/production/e.png">
                    <p>Лучшие мировые производители тканей и фурнитуры</p>
                </div>
            </div>
        </div>
    </section>

    <section class="img-slider">
        <div class="swiper-container swiper-prod">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img
                            src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/p1.jpg', 500, 500]); ?>">
                </div>
                <div class="swiper-slide"><img
                            src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/p2.jpg', 500, 500]); ?>">
                </div>
                <div class="swiper-slide"><img
                            src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/p3.jpg', 500, 500]); ?>">
                </div>
                <div class="swiper-slide"><img
                            src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/p4.jpg', 500, 500]); ?>">
                </div>
                <div class="swiper-slide"><img
                            src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/p5.jpg', 500, 500]); ?>">
                </div>
            </div>
        </div>

        <div class="swiper-button">
            <button class="prod-prev"><img src="images/icons/back.svg"></button>
            <button class="prod-next"><img src="images/icons/next.svg"></button>
        </div>
    </section>

    <section class="content-registration">
        <div class="reg-box">
            <div class="reg-img"></div>

            <div class="reg-form">
                <p><b>Зарегистрируйтесь</b>, и совершайте оптовые закупки!</p>

                <div class="price-min">
                    <p>Минимальная сумма заказа <b>10 000р.</b></p>
                </div>

                <label>Ваше имя</label>
                <input type="text" name="name">

                <label>Email</label>
                <input type="email" name="mail">

                <button>✓ Зарегистрироваться</button>
            </div>

            <div class="reg-border"></div>
        </div>
    </section>

    <section class="insta-box">
        <div class="insta-liner"></div>
        <div class="insta-block">
            <div class="insta-text">
                <p>Подпишись на наш инстаграм</p>
                <a target="_blank" href="https://www.instagram.com/cot.ton_baby/">подпишись<img
                            src="images/icons/arrow-link.svg"></a>
            </div>
        </div>

        <div class="img-slider">
            <div class="swiper-container swiper-insta">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img
                                src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/i1.jpg', 500, 500]); ?>">
                    </div>
                    <div class="swiper-slide"><img
                                src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/i2.jpg', 500, 500]); ?>">
                    </div>
                    <div class="swiper-slide"><img
                                src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/i3.jpg', 500, 500]); ?>">
                    </div>
                    <div class="swiper-slide"><img
                                src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/i4.jpg', 500, 500]); ?>">
                    </div>
                    <div class="swiper-slide"><img
                                src="<?= execExtension('imgCache', 'getImageThumpPath', ['images/pictures/i5.jpg', 500, 500]); ?>">
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<!-- content end -->

<!-- footer start -->
<div class="footer">
    <div class="footer-top">
        <div class="footer-logo">
            <a href="/"><img src="images/logo.svg"></a>
        </div>

        <div class="footer-text">
            <p>Производство детской одежды</p>
            <p>Оптовая продажа</p>
        </div>

        <div class="footer-menu">
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/registration.html">Регистрация</a></li>
                <li><a href="/catalog/">Каталог</a></li>
                <li><a href="/collections/">Коллекции</a></li>
                <li><a href="information.html">О нас</a></li>
                <li><a href="cooperation.html">Сотрудничество</a></li>
            </ul>
        </div>

        <div class="footer-contacts">
            <div class="footer-phone">
                <p><b>+7 (922)</b> 13 36 726</p>
            </div>

            <div class="footer-top-networks">
                <button><a href="https://www.instagram.com/cot.ton_baby/"><img src="images/icons/insta.png"></a>
                </button>
                <!-- <button><img src="images/icons/fb.png"></button> -->
                <!-- <button><img src="images/icons/vk.png"></button> -->
            </div>
        </div>
    </div>

    <div class="footer-bot">
        <p>© 2017 Cotton Baby</p>
    </div>
</div>

<!-- footer end -->

<script type="text/javascript" src="js/simplebar.js?ver=2" defer></script>
<script type="text/javascript" src="js/animated-scroll-to.js?ver=2" defer></script>
<script type="text/javascript" src="js/script.js?ver=2" defer></script>
<script type="text/javascript" src="js/swiper.min.js?ver=2" defer></script>
<script type="text/javascript" src="js/index.js?ver=2" defer></script>
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter47500810 = new Ya.Metrika2({
                    id: 47500810,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true
                });
            } catch (e) {
            }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () {
                n.parentNode.insertBefore(s, n);
            };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/tag.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    })(document, window, "yandex_metrika_callbacks2");
</script>
<noscript>
    <div><img src="https://mc.yandex.ru/watch/47500810" style="position:absolute; left:-9999px;" alt=""/></div>
</noscript>
<!-- /Yandex.Metrika counter -->
<script src="/system/extensions/webApp/js/app.js" defer></script>
</body>
</html>