<div class="title">
    <h2>Товары из этой же коллекции:</h2>
</div>

<div class="slider-bottom no-js">
    <div class="swiper-button">
        <button class="swiper-button-prev"><img src="/images/icons/back.svg"></button>
        <button class="swiper-button-next"><img src="/images/icons/next.svg"></button>
    </div>
    <div class="swiper-container swiper">
        <div class="swiper-wrapper">
            <?= getData(false, 'catalog_slider_item',
                getCatalogItemsByParameters(['collection' => getData()], 9, false, ['img_size' => ['750x750']])); ?>
        </div>
    </div>
</div>