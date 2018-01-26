<div class="slide">
    <div class="product-block" data-id-catalog-item="<?= getData('id') ?>">
        <div>
            <div><a href="<?= getData('href') ?>"><img
                            src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php' ?>"></a>
            </div>
            <div><p><span>*****</span><span><?= getData('price') ?></span> руб.</p></div>
            <div class="block-button-favorites">

            </div>
            <div>
                <a href="<?= getData('href') ?>"><?= getData('title') ?></a>
                <p><?= getData('description') ?></p>
            </div>
            <a href="<?= getData('href') ?>">Подробно</a>
        </div>
    </div>
</div>