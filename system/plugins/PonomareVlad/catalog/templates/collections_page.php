<?php if (is_callable('getData')): ?>
    <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8"/>
    <title>Cotton Baby - Коллекции</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:image" content="/images/repost.png">
    <link rel="shortcut icon" href="/images/favicon.png" type="image/png">
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
            <p><a href="/">Главная</a> &#8594 Коллекции</p>
            <div class="breadcrumbs-liner"></div>
        </div>

        <div class="title">
            <h1>Коллекции</h1>
        </div>
    </section>

    <section class="content">
        <div class="card-box">
            <?= getData('items', 'catalog_collection'); ?>
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

        <div class="content-text">
            <p>Наша компания на протяжении 8 лет занималась розничной торговлей детской одежды мировых марок.</p>
            <p>После многолетнего опыта работы с детскими товарами и тщательного изучения рынка детской одежды в России
                в 2015 году стартовало наше собственное производство под торговой маркой Cotton baby.</p>
            <p>В Cotton baby мы делаем ставку на высокое качество, современный дизайн и комфорт. Мы работаем с лучшими
                мировыми производителями тканей и фурнитуры, уделяя большое внимание экологичности производимой нами
                продукции и постоянно совершенствуя технологии производства.</p>
            <p>Вся наша продукция прошла сертификацию качества и соответствует техническому регламенту Таможенного союза
                ТР ТС 007/2011 (свидетельство о госрегистрации, приложение).</p>
        </div>
    </section>
</main>
<!-- content end -->

<?= getData(false, 'footer', ['']) ?>

<script>
    if (!window.pms) window.pms = {};
    if (!pms.plugins) pms.plugins = {};
    if (!pms.plugins.catalog) pms.plugins.catalog = {};
    pms.plugins.catalog.collections =<?=getData(false, false, false, true)?>;
</script>

<script type="text/javascript" src="/js/pagination.js" defer></script>
<script type="text/javascript" src="/js/collections.js" defer></script>

</body>
</html>
<?php endif; ?>