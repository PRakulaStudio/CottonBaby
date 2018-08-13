<?php if (is_callable('getData')): ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8"/>
        <title>Cotton Baby - Результаты поиска</title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
        <meta name="format-detection" content="telephone=no">
        <meta property="og:image" content="images/repost.png">
        <meta name="yandex-verification" content="f5f049cb38f1bf5c"/>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png">
        <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="/css/card.css"/>
        <link rel="stylesheet" type="text/css" href="/css/my_card.css"/>
    </head>
    <body class="showprice">
    <div class="scrollup"></div>
    <?= getData(false, 'header', ['']) ?>

    <!-- content start -->
    <main class="content-site">
        <section class="content">
            <div class="breadcrumbs">
                <p><a href="/">Главная</a> &#8594 Результаты поиска</p>
                <div class="breadcrumbs-liner"></div>
            </div>

            <div class="title">
                <h1>Результаты поиска</h1>
            </div>
        </section>

        <section class="content">

            <div class="search">
                <input type="search" placeholder="поиск">
                <button type="submit"><img src="/images/icons/search.png"></button>
            </div>

            <? if (getData('count') > 0): ?>

                <div class="sorting">
                    <div class="sorting-block">
                        <p>Найдено <?= getData('count'); ?> товаров</p>
                    </div>

                    <div class="sorting-block">
                        <p>Сортировка:</p>
                        <button class="sorting-activ">по дате</button>
                        <button>по цене</button>
                    </div>
                </div>

                <div class="card-box">
                    <?= getData('items', 'catalog_item'); ?>
                </div>

                <div class="pagination">
                    <?= getData('data', false, genPagination([
                        'totalPages' => ceil(getData('count') / getData('page_items')),
                        'currentPage' => getData('current_page'),
                        'arrowLeftTemplate' => '<button class="pagination-arrow" onclick="location.search=\'?page=<?= getData() ?>\';">&#9664</button>',
                        'linksWrapperStart' => '<ul>',
                        'linkTemplate' => '<li><a href="?page=<?= getData()?>"><?= getData()?></a></li>',
                        'activeLinkTemplate' => '<li class="pagination-activ"><a href="?page=<?= getData()?>"><?= getData()?></a></li>',
                        'linksWrapperEnd' => '</ul>',
                        'arrowRightTemplate' => '<button class="pagination-arrow" onclick="location.search=\'?page=<?= getData()?>\';">&#9654</button>',
                    ]), false, true) ?>
                </div>

            <? else: ?>

                <div class="block-empty">
                    <p>По вашему запросу ничего не найдено</p>
                </div>

            <? endif; ?>

        </section>
    </main>
    <!-- content end -->

    <?= getData(false, 'footer', ['']) ?>

    <script>
        if (!window.pms) window.pms = {};
        if (!pms.plugins) pms.plugins = {};
        if (!pms.plugins.catalog) pms.plugins.catalog = {};
        pms.plugins.catalog.search =<?=getData(false, false, false, true)?>;
    </script>

    <script type="text/javascript" src="/js/pagination.js" defer></script>
    <script type="text/javascript" src="/js/search.js" defer></script>

    </body>
    </html>
<?php endif; ?>