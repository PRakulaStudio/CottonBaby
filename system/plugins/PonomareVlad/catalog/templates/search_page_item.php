<?php if (is_callable('getData')): ?>
    <div class="card" data-catalog-item-id="<?= getData('id') ?>">
        <div class="card-img">
            <a href="<?= getData('href') ?>">
                <img src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php' ?>">
            </a>
        </div>
        <div class="card-price"><p><span>*****</span><span><?= getData('price') ?></span> руб.</p></div>
        <div class="card-favorites">
            <button></button>
        </div>
        <div class="card-text">
            <a href="<?= getData('href') ?>"><?= getData('title') ?></a>
            <p><?= getData('description') ?></p>
        </div>
        <div class="card-link"><a href="<?= getData('href') ?>">Подробно</a></div>
    </div>
<?php endif; ?>