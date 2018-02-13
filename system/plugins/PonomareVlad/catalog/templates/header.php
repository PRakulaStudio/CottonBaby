<!-- menu popup start -->
<div class="menu-popup" id="menu">
    <div class="button-box">
        <button class="menu-off" onclick="PopUpHideMenu()" id="menu-off"></button>
        <div class="search-menu">
            <input type="search" placeholder="поиск">
            <button type="submit"><img src="/images/icons/search.png"></button>
        </div>
    </div>
    <div class="menu-box">
        <div class="menu">
            <div class="section">
                <p>Компания</p>
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li><a href="/information.html">О нас</a></li>
                    <li><a href="/catalog/">Каталог</a></li>
                    <li><a href="/collections/">Коллекции</a></li>
                    <li><a href="/cooperation.html">Сотрудничество</a></li>
                    <li><a href="/production.html">Наше производство</a></li>
                    <li><a href="/delivery.html">Доставка и оплата</a></li>
                    <li><a href="/contacts.html">Контакты</a></li>
                </ul>
            </div>

            <div class="section marker">
                <p>Каталог</p>
                <?php $GLOBALS['categories'] = catalogChildCategories(['show_count' => 'true']); ?>
                <ul>
                    <?= getData(false, [
                        'id' => 'category_link',
                        'source' => '<li><a href="<?=getData(\'href\');?>"><?=getData(\'title\');?> (<?=getData(\'count\');?>)</a></li>'
                    ], $GLOBALS['categories']); ?>
                </ul>
            </div>

            <div class="section marker">
                <p>Коллекции</p>
                <?php $GLOBALS['collections'] = getCatalogCollectionsById(['show_count' => 'true', 'show_href' => true])['data']['items']; ?>
                <ul>
                    <?= getData(false, [
                        'id' => 'category_link',
                        'source' => '<li><a href="<?=getData(\'href\');?>"><?=getData(\'title\');?> (<?=getData(\'count\');?>)</a></li>'
                    ], $GLOBALS['collections']); ?>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- menu popup end -->

<!-- header start -->
<div class="header-box">
    <div class="header">
        <div class="header-menu">
            <button class="menu-on" onclick="PopUpShowMenu()" id="menu-on"></button>
        </div>

        <div class="header-info">
            <div>
                <a href="/"><img src="/images/logo.svg"></a>
            </div>

            <div>
                <p>Производство детской одежды</p>
                <p>Оптовая продажа</p>
                <p>г. Екатеринбург</p>
            </div>
        </div>

        <div class="header-user">
            <div data-insta>
                <a href="https://www.instagram.com/cot.ton_baby/"><img src="/images/icons/insta.png"></a>
                <div class="sub">
                    <div><a href="https://www.instagram.com/cot.ton_baby/">Подпишись</a></div>
                </div>
            </div>
            <div data-basket><a href="#"><img src="/images/icons/basket.png"><span>0</span></a></div>
            <div data-favorite><a href="#"><img src="/images/icons/favorites.png"><span>0</span></a></div>
            <div data-auth>

                <button><img src="/images/icons/user.png"><span>Войти</span></button>

                <div class="authorization" id="authorization">
                    <button class="popup-close"><img src="/images/icons/close.png"></button>
                    <p>Авторизация</p>
                    <form>
                        <div>
                            <input type="email" name="mail" placeholder="E-mail">

                            <input type="password" name="password_auth" placeholder="Пароль">
                        </div>

                        <div>
                            <button type="button">Войти</button>
                            <a href="/registration.html">Регистрация</a>
                        </div>
                    </form>
                </div>

                <div class="exit" id="exit">
                    <button class="popup-close"><img src="/images/icons/close.png"></button>
                    <div>
                        <a href="/cabinet.html">Личный кабинет</a>
                        <button>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- header end -->