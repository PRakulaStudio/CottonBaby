<?php if (is_callable('getData')): ?>
    <a class="card" data-catalog-item-id="<?= getData('id') ?>" href="<?= getData('href') ?>">
        <? if (isset($_SESSION['NAVIGATOR']) && isset($_SESSION['NAVIGATOR']['supportJS']) && $_SESSION['NAVIGATOR']['supportJS'] == true): ?>
            <div class="lazy ispinner ispinner--gray ispinner--animating"
                 data-src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php' ?>">
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
                <div class="ispinner__blade"></div>
            </div>
        <? else: ?>
            <img src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php' ?>">
        <? endif; ?>
        <p class="card-price"><span><?= getData('price') ?></span> руб.</p>
        <div class="card-favorites"></div>
        <div class="card-text">
            <h4><?= getData('title') ?></h4>
            <p><?= getData('description') ?></p>
        </div>
    </a>
<?php endif; ?>