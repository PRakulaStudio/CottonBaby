<?php if (is_callable('getData')): ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8"/>
        <title>Cotton Baby - <?= ($categoryTitle = getData('title')) ? $categoryTitle : 'Коллекции'; ?></title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
        <meta name="format-detection" content="telephone=no">
        <meta property="og:image" content="images/repost.png">
        <link rel="shortcut icon" href="images/favicon.png" type="image/png">
        <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="/css/card.css"/>
    </head>
    <body>

    <div class="scrollup"></div>
    <?= getData(false, 'header', ['']) ?>

    <!-- content start -->
    <main class="content-site">
        <section class="content">
            <div class="breadcrumbs">
                <p>
                    <a href="/">Главная</a>
                    → <?= getData('id') == 0 ? 'Коллекции' : '<a href="/collections/">Коллекции</a>' ?>
                    <?= getData('id') == 0 ? '' : (' → ' . getData('title')); ?>
                </p>
                <div class="breadcrumbs-liner"></div>
            </div>

            <div class="title title-collection">
                <h1><?= ($categoryTitle = getData('title')) ? $categoryTitle : 'Каталог товаров'; ?></h1>
                <button>Все коллекции <img src="/images/icons/down-arrow.svg"></button>
            </div>
        </section>

        <section class="filter-box">
            <div class="filter">
                <?php $GLOBALS['currentCollectionId'] = getData('id'); ?>
                <?= getData('items', [
                    'id' => 'category_link',
                    'source' => '<a href="<?=getData(\'href\');?>" <?=(getData(\'id\')==$GLOBALS[\'currentCollectionId\'])?\'class="filter-activ"\':\'\'?>><?=getData(\'title\');?> <span><?=getData(\'count\');?></span></a>'
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

            <div class="card-box">
                <?= getData('items', 'collection_page_item'); ?>

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
        </section>
    </main>
    <!-- content end -->

    <?= getData(false, 'footer', ['']) ?>

    <script>
        if (!window.pms) window.pms = {};
        if (!pms.plugins) pms.plugins = {};
        if (!pms.plugins.catalog) pms.plugins.catalog = {};
        pms.plugins.catalog.collection = {};
        pms.plugins.catalog.collection['<?=getData('id')?>'] =<?=getData(false, false, false, true)?>;
        pms.plugins.catalog.currentCollection = pms.plugins.catalog.collection['<?=getData('id')?>'];
    </script>

    <script type="text/javascript" src="/js/pagination.js" defer></script>
    <script type="text/javascript" src="/js/collection.js" defer></script>
    </body>
    </html>
<?php endif; ?>