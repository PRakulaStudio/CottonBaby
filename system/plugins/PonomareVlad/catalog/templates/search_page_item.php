<?php if (is_callable('getData')): ?>
    <div data-catalog-item-id="<?= getData('id') ?>">
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
<?php endif; ?>