<!DOCTYPE html>
<html lang="ru">
<head>
    <base href="/">
    <meta charset="utf-8"/>
    <title><?= getData('title'); ?> - Cotton Baby</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:image" content="images/repost.png">
    <link rel="shortcut icon" href="images/favicon.png" type="image/png">
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/media.css"/>
    <link rel="stylesheet" type="text/css" href="css/slick.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/simplebar.css"/>
    <meta name="format-detection" content="telephone=no">

</head>
<body class="showPrice">
<div class="scrollup"></div>
<?= getData(false, 'header', ['']) ?>


<!-- content start -->
<main class="content-site">
    <section class="product">
        <div class="pagination">
            <p>
                <a href="/">Главная</a> → <a href="/catalog/">Каталог</a>
                <?= getData('category') ? (getData(false, 'breadcrumb-item', getParentCategories(getData('category'))) . (' → ' . getData('title'))) : ''; ?>
            </p>
            <div class="pagination-liner"></div>
        </div>

        <div class="title">
            <h1><?= getData('title'); ?></h1>
        </div>
    </section>

    <section class="product">
        <div class="product-box" data-id-block="<?= getData('id'); ?>">
            <div>
                <div>
                    <div class="product-button block-button-favorites">

                    </div>
                    <a id="product" nohref id-pictures="0"><img alt="example1"
                                                                src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php'; ?>">
                        <div></div>
                    </a>
                </div>

                <div class="item-slider">
                    <!--<div><img src="images/pictures/i1.jpg"><div class="item-activ"></div></div>-->
                    <?= getData('images', ['id' => 'catalog_item_images_item', 'source' => '<div><img src="<?= (($image = getData(\'200x200\')) ? $image : \'/images/index.php\') ?>" data-preview-src="<?= (($image = getData(\'750x750\')) ? $image : \'/images/index.php\') ?>"><div></div></div>']); ?>
                </div>
            </div>

            <div>
                <div class="product-category">
                    <?= getData('collection') ?
                        '<p><a href="' . getData('href', false,
                            ($collection = getCatalogCollectionsById(['id' => getData('collection'), 'show_href' => true])) &&
                            $collection['status'] ? $collection['data'] : false) . '"><img src="images/icons/category.png"><span>Коллекция "' .
                        getData('title', false,
                            ($collection = getCatalogCollectionsById(['id' => getData('collection')])) &&
                            $collection['status'] ? $collection['data'] : false) . '"</span></a></p>' : '' ?>
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

                <div class="product-basket">
                    <p>Товар помещен в корзину!</p>
                </div>


                <div class="price-basket">
                    <div>
                        <p>Цена:</p>
                        <p><span><?= getData('price') ?></span> руб.</p>
                    </div>

                    <div class="off-basket">
                        <button><img src="images/icons/product-basket.png">В корзину</button>
                    </div>
                    <div class="product-basket-link">
                        <a href="basket.html">Оформить заказ &#10003</a>
                    </div>
                </div>

                <div class="no-authorization">
                    <div>
                        <p><img src="images/icons/i.png">Зарегистрируйтесь</p>
                        <p>чтобы узнать цену</p>
                    </div>

                    <div>
                        <a href="registration.html">Регистрация</a>
                    </div>
                </div>

                <div class="product-delivery">
                    <p><img src="images/icons/i.png">Стоимость доставки рассчитывается индивидуально, в зависимости от
                        объема заказа и города. Для расчета выберите транспортную кампанию из <a href="delivery.html">списка
                            рекомендованных</a>.</p>
                </div>
            </div>
        </div>

        <?php if (getData('description')): ?>
            <div class="content-text">
                <b>Подробное описание товара</b>
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

<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js"></script>
<script type="text/javascript" src="js/simplebar.js" ></script>

<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/slick.js"></script>

<script type="text/javascript" src="js/product.js"></script>
</body>
</html>