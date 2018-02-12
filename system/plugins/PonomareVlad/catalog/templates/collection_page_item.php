<?php if (is_callable('getData')): ?>
    <div class="card" data-catalog-item-id="<?= getData('id') ?>">
        <div class="card-img">
            <a href="<?= getData('href') ?>">
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
                    <img src="<?= ($image = getData('images')) && $image != '' ? $image : '/images/index.php' ?>">
                <? endif; ?>
            </a>
        </div>
        <div class="card-price"><p><span>*****</span><span><?= getData('price') ?></span> руб.</p></div>
        <div class="card-favorites"></div>
        <div class="card-text">
            <a href="<?= getData('href') ?>"><?= getData('title') ?></a>
            <p><?= getData('description') ?></p>
        </div>
        <div class="card-link"><a href="<?= getData('href') ?>">Подробно</a></div>
    </div>
<?php endif; ?>