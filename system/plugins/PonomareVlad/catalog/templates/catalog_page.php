<?php if (is_callable('getData')): ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="utf-8"/>
        <title>Cotton Baby - Каталог</title>
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

    <?= getData(false, 'header', ['']) ?>

    <!-- content start -->
    <main class="content-site">
        <section class="content">
            <div class="pagination">
                <p>
                    <a href="/">Главная</a> → <?= getData('id') == 0 ? 'Каталог' : '<a href="/catalog/">Каталог</a>' ?>
                    <?= getData('id') == 0 ? '' : (getData(false, 'breadcrumb-item', getParentCategories(getData('id'))) . (' → ' . getData('title'))); ?>
                    <!--<a href="/">Главная</a> → <a href="/catalog/">Каталог</a> → Кофта + ползунки-->
                </p>
                <div class="pagination-liner"></div>
            </div>

            <div class="title">
                <h1><?= ($categoryTitle = getData('title')) ? $categoryTitle : 'Каталог товаров'; ?></h1>
                <!--<?= getData('id') ? ((count(catalogChildCategories(['id' => getData('parent_category') ? getData('parent_category') : getData('id'), 'show_count' => 'true'])) > 8) ? '<button>все под-категории <img src="images/icons/down-arrow.svg"></button>' : '') : '<button>все категории <img src="images/icons/down-arrow.svg"></button>' ?>-->
            </div>
        </section>

        <section class="filter-box">
            <?php $childCategories = getData('parent_category') ? catalogChildCategories(['id' => getData('parent_category'), 'show_count' => 'true']) : catalogChildCategories(['id' => getData('id'), 'show_count' => 'true']) ?>
            <? if (count($childCategories) > 0): ?>
                <div class="filter">
                    <?= getData(false, [
                        'id' => 'category_link',
                        'source' => '<a href="<?=getData(\'href\');?>"><?=getData(\'title\');?> <span><?=getData(\'count\');?></span></a>'
                    ], $childCategories); ?>
                </div>
            <? endif; ?>
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
                <?= getData('items', 'catalog_page_item'); ?>
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

    <?= getData(false, 'footer', ['']) ?>

    <script>
        if (!window.pms) window.pms = {};
        if (!pms.plugins) pms.plugins = {};
        if (!pms.plugins.catalog) pms.plugins.catalog = {};
        pms.plugins.catalog.category = {};
        pms.plugins.catalog.category['<?=getData('id')?>'] =<?=getData(false, false, false, true)?>;
        pms.plugins.catalog.currentCategory = pms.plugins.catalog.category['<?=getData('id')?>'];
        // console.debug('Смотри Игорь, я переменная',
        //     'pms.plugins.catalog.currentCategory',
        //     pms.plugins.catalog.currentCategory,
        //     'Почему же ты не видишь меня в своих скриптах? :\'(');
    </script>

    <script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script type="text/javascript" src="js/pagination.js"></script>
    <script type="text/javascript" src="js/katalog.js"></script>

    </body>
    </html>
<?php endif; ?>