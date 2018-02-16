<?php if (is_callable('getData')): ?>
    <div class="card" data-catalog-item-id="<?= getData('id') ?>">
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
                <div class="card-text collections-text">
                    <p><?= getData('title') ?></p>
                </div>
            </div>
        </a>
    </div>
<?php endif; ?>