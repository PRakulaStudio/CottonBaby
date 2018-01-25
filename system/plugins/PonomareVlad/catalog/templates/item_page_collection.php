<div class="product-slider-box">
    <b>Товары из этой же коллекции:</b>
    <div class="product-slider-button">
        <button data-action="prev"><img src="images/icons/back.svg"></button>
        <button data-action="next"><img src="images/icons/next.svg"></button>
    </div>

    <div class="product-slider">
        <?= getData(false, 'item_page_collection_item',
            getCatalogItemsByParameters(['collection' => getData()], 9, false, ['img_size' => ['750x750']])); ?>
    </div>
</div>