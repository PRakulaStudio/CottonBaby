<?php if (is_callable('getData')): ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8"/>
        <title><?= getData('title'); ?> - Cotton Baby</title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
        <meta name="format-detection" content="telephone=no">
        <meta property="og:image" content="images/repost.png">
        <meta name="yandex-verification" content="f5f049cb38f1bf5c"/>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png">
        <link rel="stylesheet" type="text/css" href="/css/swiper.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="/css/product.css"/>
    </head>
    <body class="">
    <div class="scrollup"></div>
    <?= getData(false, 'header', ['']) ?>


    <!-- content start -->
    <main class="content-site">
        <section class="content">
            <div class="breadcrumbs">
                <p>
                    <a href="/">Главная</a> → <a href="/catalog/">Каталог</a>
                    <?= getData('category') ? (getData(false, 'breadcrumb-item', getParentCategories(getData('category'))) . (' → ' . getData('title'))) : ''; ?>
                </p>
                <div class="breadcrumbs-liner"></div>
            </div>

            <div class="title">
                <h1><?= getData('title'); ?></h1>
            </div>
        </section>
        <section class="content">
            <div class="slider-fullscreen">
                <div class="swiper-container gallery-top fullscreen">
                    <div class="swiper-wrapper">

                    </div>

                    <span class="close-button"></span>
                    <span class="slider-next"></span>
                    <span class="slider-prev"></span>
                </div>
            </div>
        </section>

        <section class="content">
            <div class="product-box" data-id-block="<?= getData('id'); ?>">
                <div class="slider">
                    <div class="swiper-container gallery-top slider-top">
                        <div class="swiper-wrapper">
                            <?= ($images = getData('images',
                                    [
                                        'id' => 'catalog_item_images_item',
                                        'source' => '<div class="swiper-slide"><img src="<?= (($image = getData(\'750x750\')) ? $image : \'/images/index.php\') ?>"></div>'
                                    ]
                                ) == '') ? '<div class="swiper-slide"><img src="/images/index.php"></div>' : $images; ?>
                        </div>
                    </div>

                    <div class="swiper-container gallery-thumbs slider-thumbs">
                        <div class="swiper-wrapper">
                            <?= getData('images',
                                [
                                    'id' => 'catalog_item_images_item',
                                    'source' => '<div class="swiper-slide"><img src="<?= (($image = getData(\'200x200\')) ? $image : \'/images/index.php\') ?>"></div>'
                                ]
                            ); ?>
                        </div>
                    </div>

                    <div class="card-favorites"></div>
                </div>

                <div class="information">
                    <div class="product-category">
                        <?= getData('collection') ?
                            '<a href="' . getData('href', false,
                                ($collection = getCatalogCollectionsById(['id' => getData('collection'), 'show_href' => true])) &&
                                $collection['status'] ? $collection['data'] : false) . '"><span>Коллекция "' .
                            getData('title', false,
                                ($collection = getCatalogCollectionsById(['id' => getData('collection')])) &&
                                $collection['status'] ? $collection['data'] : false) . '"</span></a>' : '' ?>
                    </div>

                    <div class="product-brief">
                        <p><?= getData('description') ?></p>
                    </div>

                    <div class="product-composition">
                        <b>Состав:</b>
                        <p><?= getData('cloth') ?></p>
                    </div>

                    <div class="product-size">
                        <b>Выберите размер и количество:</b>

                        <div class="size-box">
                            <?= getData('modifies', 'item_page_modify'); ?>

                        </div>
                    </div>

                    <div class="product-basket d-none">
                        <p>Товар помещен в корзину!</p>
                        <p>До минимальной суммы заказа осталось <span>10 000р.</span></p>
                    </div>

                    <div class="price-min">
                        <div class="text"><p>Минимальная сумма заказа <b>10 000р.</b></p></div>
                    </div>

                    <div class="price-basket d-none">
                        <div class="price">
                            <p>Цена:</p>
                            <p><span><?= getData('price') ?></span> руб.</p>
                        </div>

                        <div class="btn">
                            <button><img src="/images/icons/product-basket.png">В корзину</button>
                        </div>

                        <div class="link">
                            <a href="/basket.html">перейти в корзину</a>
                        </div>
                    </div>

                    <div class="no-authorization">
                        <div class="text">
                            <p>Зарегистрируйтесь</p>
                            <p>чтобы узнать цену</p>
                        </div>

                        <div class="link"><a href="/registration.html">Регистрация</a></div>
                    </div>

                    <div class="product-delivery">
                        <p>Стоимость доставки рассчитывается индивидуально, в зависимости от объема заказа и города. Для
                            расчета выберите транспортную кампанию из <a href="delivery.html">списка рекомендованных</a>.
                        </p>
                    </div>
                </div>
            </div>

            <?php if (getData('description')): ?>
                <div class="title">
                    <h2>Подробное описание товара</h2>
                </div>

                <div class="content-text">
                    <p><?= getData('description') ?></p>
                </div>
            <?php endif; ?>

            <?= getData('collection', 'item_page_collection') ?>

        </section>
    </main>
    <!-- content end -->

    <?= getData(false, 'footer', ['']) ?>

    <script>
        if (!window.pms) window.pms = {};
        if (!pms.plugins) pms.plugins = {};
        if (!pms.plugins.catalog) pms.plugins.catalog = {};
        pms.plugins.catalog.item = {};
        pms.plugins.catalog.item['<?=getData('id')?>'] =<?=getData(false, false, false, true)?>;
        pms.plugins.catalog.currentItem = pms.plugins.catalog.item['<?=getData('id')?>'];
    </script>

    <script type="text/javascript" src="/js/swiper.min.js?ver=2" defer></script>
    <script type="text/javascript" src="/js/product.js?ver=2" defer></script>

    </body>
    </html>
<?php endif; ?>