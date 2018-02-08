<div class="card">
    <div class="card-img">
        <a href="<?= getData('href') ?>">
            <img src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php' ?>">
        </a>
    </div>
    <div class="collections-text">
        <a href="<?= getData('href') ?>"><?= getData('title') ?></a></div>
    <div class="card-link"><a href="<?= getData('href') ?>">Подробно</a></div>
</div>