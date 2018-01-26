<div>
    <div><a href="<?= getData('href') ?>"><img
                    src="<?= ($image = getData('images')) && $image != '' ? $image['750x750'] : '/images/index.php' ?>"></a>
    </div>
    <div>
        <a href="<?= getData('href') ?>"><?= getData('title') ?></a>
    </div>
    <a href="<?= getData('href') ?>">Подробно</a>
</div>