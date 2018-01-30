<!DOCTYPE html>
<html lang="ru">
<head>
    <base href="/">
    <meta charset="utf-8"/>
    <title>Cotton Baby - Результаты поиска</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta property="og:image" content="images/repost.png">
    <meta name="format-detection" content="telephone=no">
    <link rel="shortcut icon" href="images/favicon.png" type="image/png">
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/media.css"/>
    <link rel="stylesheet" type="text/css" href="css/simplebar.css"/>
    <meta name="format-detection" content="telephone=no">
</head>
<body>
<div class="scrollup"></div>
<?= getData(false, 'header', ['']) ?>

<!-- content start -->
<main class="content-site">
    <section class="content">
        <div class="pagination">
            <p><a href="/">Главная</a> &#8594 Результаты поиска</p>
            <div class="pagination-liner"></div>
        </div>

        <div class="title">
            <h1>Результаты поиска</h1>
        </div>

        <div class="block-empty">
            <p>По вашему запросу ничего не найдено</p>
        </div>
    </section>

    <section class="content">
        <div class="sorting">
            <div class="sorting-block">
                <p>Найдено <?= getData('count'); ?> товаров</p>
            </div>

            <div class="sorting-block">
                <p>Сортировка:</p>
                <button>по дате</button>
                <button class="sorting-activ">по цене</button>
            </div>
        </div>

        <div class="products-box">
            <?= getData('items', 'search_page_item'); ?>
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
    pms.plugins.catalog.search =<?=getData(false, false, false, true)?>;
</script>

<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="js/simplebar.js" ></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/pagination.js"></script>
<script type="text/javascript" src="js/search.js"></script>
</body>
</html>