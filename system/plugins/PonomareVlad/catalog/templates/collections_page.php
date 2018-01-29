<!DOCTYPE html>
<html lang="ru">
<head>
    <base href="/">
    <meta charset="utf-8"/>
    <title>Cotton Baby - Коллекции</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta property="og:image" content="images/repost.png">
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
            <p><a href="/">Главная</a> &#8594 Коллекции</p>
            <div class="pagination-liner"></div>
        </div>

        <div class="title">
            <h1>Коллекции</h1>
        </div>
    </section>

    <section class="content">
        <div class="collections-box">
            <?= getData('items', 'collections_page_item'); ?>
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
<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="/js/simplebar.js" ></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/pagination.js"></script>
<script type="text/javascript" src="js/collections.js"></script>
</body>
</html>