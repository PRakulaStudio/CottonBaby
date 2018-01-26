<?php if (is_callable('getData')): ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8"/>
        <title>Cotton Baby - <?= ($categoryTitle = getData('title')) ? $categoryTitle : 'Каталог'; ?></title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
        <meta property="og:image" content="images/repost.png">
        <base href="/">
        <link rel="shortcut icon" href="images/favicon.png" type="image/png">
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
        <link rel="stylesheet" type="text/css" href="css/media.css"/>
        <meta name="format-detection" content="telephone=no">
    </head>
    <body class="showPrice">

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
                        <li><a href="information.html">О нас</a></li>
                        <li><a href="/catalog/">Каталог</a></li>
                        <li><a href="/collections/">Коллекции</a></li>
                        <li><a href="cooperation.html">Сотрудничество</a></li>
                        <li><a href="production.html">Наше производство</a></li>
                        <li><a href="delivery.html">Доставка и оплата</a></li>
                        <li><a href="contacts.html">Контакты</a></li>
                    </ul>
                </div>

                <div class="section marker">
                    <p>Каталог</p>
                    <ul>
                        <li><a href="/catalog/Kombinezon">Комбинезон</a></li>
                        <li><a href="/catalog/Bodi">Боди</a></li>
                        <li><a href="/catalog/Rasposhonka_sh_n">Распошонка ш/н</a></li>
                        <li><a href="/catalog/Polzunki">Ползунки</a></li>
                        <li><a href="/catalog/Shtanishki">Штанишки</a></li>
                        <li><a href="/catalog/Futbolka">Футболка</a></li>
                        <li><a href="/catalog/Koftochka_na_knopkah">Кофточка на кнопках</a></li>
                        <li><a href="/catalog/Pesochnik">Песочник</a></li>
                        <li><a href="/catalog/Platye">Платье</a></li>
                        <li><a href="/catalog/Pizhama">Пижама</a></li>
                        <li><a href="/catalog/Komplekt_2_predmeta">Комплект 2 предмета</a></li>
                        <li><a href="/catalog/Komplekt_3_predmeta">Комплект 3 предмета</a></li>
                        <li><a href="/catalog/Pelenka-kokon">Пеленка-кокон</a></li>
                        <li><a href="/catalog/Pelenka">Пеленка</a></li>
                        <li><a href="/catalog/Pled">Плед</a></li>
                        <li><a href="/catalog/Polotenca">Полотенца</a></li>
                        <li><a href="/catalog/Krestilyniy_nabor">Крестильный набор</a></li>
                        <li><a href="/catalog/Trusiki">Трусики</a></li>
                        <li><a href="/catalog/Shapochki">Шапочки</a></li>
                        <li><a href="/catalog/Chepchik">Чепчик</a></li>
                        <li><a href="/catalog/Penetki">Пенетки</a></li>
                        <li><a href="/catalog/Nagrudnik">Нагрудник</a></li>
                        <li><a href="/catalog/Carapki">Царапки</a></li>
                        <li><a href="/catalog/Na_vipisku">На выписку</a></li>
                    </ul>
                </div>

                <div class="section marker">
                    <p>Коллекции</p>
                    <ul>
                        <li><a href="/catalog/Babochka">Бабочка (4)</a></li>
                        <li><a href="/catalog/Goroshek">Горошек (4)</a></li>
                        <li><a href="/catalog/Enotik">Енотик (20)</a></li>
                        <li><a href="/catalog/Klubnichka">Клубничка (18)</a></li>
                        <li><a href="/catalog/Mishka_dzhentelymen">Мишка джентельмен (2)</a></li>
                        <li><a href="/catalog/Mishutka">Мишутка (36)</a></li>
                        <li><a href="/catalog/Panda">Панда (4)</a></li>
                        <li><a href="/catalog/Raduga">Радуга (21)</a></li>
                        <li><a href="/catalog/Samoletik">Самолетик (20)</a></li>
                        <li><a href="/catalog/Teddi">Тедди (8)</a></li>
                        <li><a href="/catalog/Cvetochek">Цветочек (10)</a></li>
                        <li><a href="/catalog/Mashinki">Машинки (7)</a></li>
                        <li><a href="/catalog/Sobachka">Собачка (6)</a></li>
                        <li><a href="/catalog/Valentinka">Валентинка (22)</a></li>
                        <li><a href="/catalog/Serdechki">Сердечки (6)</a></li>
                        <li><a href="/catalog/Zebra">Зебра (4)</a></li>
                        <li><a href="/catalog/Zvezda">Звезда (18)</a></li>
                        <li><a href="/catalog/Zefir">Зефир (8)</a></li>
                        <li><a href="/catalog/Krem">Крем (8)</a></li>
                        <li><a href="/catalog/Nebo">Небо (4)</a></li>
                        <li><a href="/catalog/Persik">Персик (2)</a></li>
                        <li><a href="/catalog/Salyut">Салют (2)</a></li>
                        <li><a href="/catalog/Lapochka">Лапочка (3)</a></li>
                        <li><a href="/catalog/Milashka">Милашка (1)</a></li>
                        <li><a href="/catalog/Krolychonok">Крольчонок (2)</a></li>
                        <li><a href="/catalog/Dino">Дино (17)</a></li>
                        <li><a href="/catalog/Zayka">Зайка (6)</a></li>
                        <li><a href="/catalog/Maus">Маус (2)</a></li>
                        <li><a href="/catalog/Star">Стар (3)</a></li>
                        <li><a href="/catalog/Zayka_moloko">Зайка молоко (1)</a></li>
                        <li><a href="/catalog/Princessa">Принцесса (2)</a></li>
                        <li><a href="/catalog/Princessa_s_chepchikom">Принцесса с чепчиком (1)</a></li>
                        <li><a href="/catalog/Melanzh">Меланж (6)</a></li>
                        <li><a href="/catalog/Nezhnosty">Нежность (4)</a></li>
                        <li><a href="/catalog/Zvezdochki">Звездочки (3)</a></li>
                        <li><a href="/catalog/Cvetochek_lila">Цветочек лила (1)</a></li>
                        <li><a href="/catalog/Cvetochek_persik">Цветочек персик (1)</a></li>
                        <li><a href="/catalog/Babochki">Бабочки (3)</a></li>
                        <li><a href="/catalog/Mikki">Микки (1)</a></li>
                        <li><a href="/catalog/Mini">Мини (1)</a></li>
                        <li><a href="/catalog/Buketik">Букетик (1)</a></li>
                        <li><a href="/catalog/Angel">Ангел (4)</a></li>
                        <li><a href="/catalog/Angel_molochniy">Ангел молочный (1)</a></li>
                        <li><a href="/catalog/Edinorog">Единорог (2)</a></li>
                        <li><a href="/catalog/Slonik">Слоник (4)</a></li>
                        <li><a href="/catalog/Balerina">Балерина (1)</a></li>
                        <li><a href="/catalog/Super_devochka">Супер девочка (1)</a></li>
                        <li><a href="/catalog/Zvezdopad">Звездопад (2)</a></li>
                        <li><a href="/catalog/Dedushka">Дедушка (1)</a></li>
                        <li><a href="/catalog/Zebra_applikaciya">Зебра аппликация (1)</a></li>
                        <li><a href="/catalog/Princessa_Kitti">Принцесса Китти (1)</a></li>
                        <li><a href="/catalog/Korona">Корона (1)</a></li>
                        <li><a href="/catalog/Ponochka">Поночка (1)</a></li>
                        <li><a href="/catalog/Siniy">Синий (3)</a></li>
                        <li><a href="/catalog/Lila">Лила (2)</a></li>
                        <li><a href="/catalog/Goluboy">Голубой (2)</a></li>
                        <li><a href="/catalog/Rozoviy">Розовый (1)</a></li>
                        <li><a href="/catalog/Moloko">Молоко (3)</a></li>
                        <li><a href="/catalog/Zoloto">Золото (1)</a></li>
                        <li><a href="/catalog/Serebro">Серебро (2)</a></li>
                        <li><a href="/catalog/Beliy">Белый (1)</a></li>
                        <li><a href="/catalog/Kameliya_belaya">Камелия белая (1)</a></li>
                        <li><a href="/catalog/Kameliya_molochnaya">Камелия молочная (1)</a></li>
                        <li><a href="/catalog/Margaritka_molochnaya">Маргаритка молочная (1)</a></li>
                        <li><a href="/catalog/Princ">Принц (1)</a></li>
                        <li><a href="/catalog/Kuvshinka">Кувшинка (1)</a></li>
                        <li><a href="/catalog/Angel_krem">Ангел крем (1)</a></li>
                        <li><a href="/catalog/Satin_krem">Сатин крем (1)</a></li>
                        <li><a href="/catalog/Satin_rozoviy">Сатин розовый (1)</a></li>
                        <li><a href="/catalog/Satin_goluboy">Сатин голубой (1)</a></li>
                        <li><a href="/catalog/Velyboa_krem">Вельбоа крем (1)</a></li>
                        <li><a href="/catalog/Velyboa_rozoviy">Вельбоа розовый (1)</a></li>
                        <li><a href="/catalog/Velyboa_goluboy">Вельбоа голубой (1)</a></li>
                        <li><a href="/catalog/Velyboa_molochniy">Вельбоа молочный (1)</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- menu popup end -->

    <!-- header start -->
    <div class="header-box">
        <div class="header">
            <div class="header-menu">
                <button class="menu-on" onclick="javascript:PopUpShowMenu()" id="menu-on"></button>
            </div>

            <div class="header-info">
                <div>
                    <a href="/"><img src="images/logo.png"></a>
                </div>

                <div>
                    <p>Производство детской одежды.</p>
                    <p>Оптовая продажа.</p>
                </div>
            </div>

            <div class="header-user">
                <div data-insta>
                    <a href="#"><img src="images/icons/insta.png"></a>
                    <div class="sub">
                        <div><a href="https://www.instagram.com/cot.ton_baby/">Подпишись</a></div>
                    </div>
                </div>
                <div data-basket><a href="basket.html"><img src="images/icons/basket.png"><span>0</span></a></div>
                <div data-favorite><a href="favorites.html"><img src="images/icons/favorites.png"><span>0</span></a>
                </div>
                <div data-auth>
                    <button><img src="images/icons/user.png"><span>Войти</span></button>
                    <div class="authorization" id="authorization">
                        <button class="popup-close"><img src="images/icons/close.png"></button>
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
                            <a href="cabinet.html">Личный кабинет</a>
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
        <section class="content">
            <div class="pagination">
                <p>
                    <a href="/">Главная</a>
                    → <?= getData('id') == 0 ? 'Коллекции' : '<a href="/collections/">Коллекции</a>' ?>
                    <?= getData('id') == 0 ? '' : (getData(false, 'breadcrumb-item', getParentCategories(getData('id'))) . (' → ' . getData('title'))); ?>
                    <!--<a href="/">Главная</a> → <a href="/catalog/">Каталог</a> → Кофта + ползунки-->
                </p>
                <div class="pagination-liner"></div>
            </div>

            <div class="title">
                <h1><?= ($categoryTitle = getData('title')) ? $categoryTitle : 'Каталог товаров'; ?></h1>
                <button>все коллекции <img src="images/icons/down-arrow.svg"></button>
            </div>
        </section>

        <section class="filter-box">
            <div class="filter">
                <?= getData('items', [
                    'id' => 'category_link',
                    'source' => '<a href="<?=getData(\'href\');?>"><?=getData(\'title\');?> <span><?=getData(\'count\');?></span></a>'
                ], (getCatalogCollectionsById(['limit' => 8, 'show_count' => 'true', 'show_href' => true])['data'])); ?>
            </div>
        </section>

        <section class="content">
            <div class="sorting">
                <div class="sorting-block">
                    <p>Сортировка:</p>
                    <button class="sorting-activ">по дате</button>
                    <button>по цене</button>
                </div>
            </div>

            <div class="products-box">
                <?= getData('items', 'collection_page_item'); ?>
            </div>

            <div class="products-pagination">
                <?= getData('data', false, genPagination([
                    'totalPages' => ceil(getData('count') / getData('page_items')),
                    'currentPage' => getData('current_page'),
                    'arrowLeftTemplate' => '<button class="pagination-arrow" onclick="location.search=\'?page=<?= getData() ?>\';">&#9664</button>',
                    'linksWrapperStart' => '<div>',
                    'linkTemplate' => '<button onclick="location.search=\'?page=<?= getData()?>\';"><?= getData()?></button>',
                    'activeLinkTemplate' => '<button class="pagination-activ"><?= getData()?></button>',
                    'linksWrapperEnd' => '</div>',
                    'arrowRightTemplate' => '<button class="pagination-arrow" onclick="location.search=\'?page=<?= getData()?>\';">&#9654</button>',
                ]), false, true) ?>
            </div>
        </section>
    </main>
    <!-- content end -->

    <!-- footer start -->
    <div class="footer">
        <div class="footer-top">
            <div class="footer-logo">
                <a href="/"><img src="images/logo.png"></a>
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
                    <li><a href="collections.html">Коллекции</a></li>
                    <li><a href="information.html">О нас</a></li>
                    <li><a href="cooperation.html">Сотрудничество</a></li>
                </ul>
            </div>

            <div class="footer-contacts">
                <div class="footer-phone">
                    <p><b>+7 (495)</b> 555 44 22</p>
                </div>

                <div class="footer-top-networks">
                    <button><img src="images/icons/insta.png"></button>
                    <button><img src="images/icons/fb.png"></button>
                    <button><img src="images/icons/vk.png"></button>
                </div>
            </div>
        </div>

        <div class="footer-bot">
            <p>© 2017 Cotton Baby</p>
        </div>
    </div>
    <!-- footer end -->

    <script>
        if (!window.pms) window.pms = {};
        if (!pms.plugins) pms.plugins = {};
        if (!pms.plugins.catalog) pms.plugins.catalog = {};
        pms.plugins.catalog.collection = {};
        pms.plugins.catalog.collection['<?=getData('id')?>'] =<?=getData(false, false, false, true)?>;
        pms.plugins.catalog.currentCollection = pms.plugins.catalog.collection['<?=getData('id')?>'];
        // console.debug('Смотри Игорь, я переменная',
        //     'pms.plugins.catalog.currentCategory',
        //     pms.plugins.catalog.currentCategory,
        //     'Почему же ты не видишь меня в своих скриптах? :\'(');
    </script>

    <script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script type="text/javascript" src="js/pagination.js"></script>
    <script type="text/javascript" src="js/collection.js"></script>

    </body>
    </html>
<?php endif; ?>