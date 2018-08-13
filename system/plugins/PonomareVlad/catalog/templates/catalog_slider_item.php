<?php if (is_callable('getData')): ?>
    <div class="swiper-slide">
        <div class="card" data-catalog-item-id="<?= getData('id') ?>">
            <div class="card-favorites"></div>
            <a href="<?= getData('href') ?>">
                <div class="card-img">
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
                </div>
                <div class="card-info">
                    <div class="card-price"><p><span><?= getData('price') ?></span> руб.</p></div>
                    <div class="card-text">
                        <p><?= getData('title') ?></p>
                    </div>
                </div>
            </a>
        </div>
    </div>
<?php endif; ?>