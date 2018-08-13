"use strict";

/**
 * Created by Иван on 22.01.2018.
 */

(function () {

    var limitItemsCollection = 24;
    var offset = 9;
    var mobileWidth = 1000;
    var collections = pms.plugins.catalog.collections;

    var url_string = window.location.href;
    var url = new URL(url_string);
    var select_sort = url.searchParams.get("sort");

    if (select_sort) {
        if (select_sort == "price" && document.querySelector('div.sorting-block button.sorting-activ')) document.querySelector('div.sorting-block button.sorting-activ').classList.remove('sorting-activ');
    }

    //если мобилка, то показываем кнопку
    if (window.innerWidth <= mobileWidth) {
        var link_collections = "";
        for (var i = 0; i < collections.length; i++) {
            link_collections += "<a href='" + collections[i].href + "'>" + collections[i].title + "<span>" + collections[i].count + "</span></a>";
        }
        document.querySelector('section.filter-box div.filter').innerHTML = link_collections;
        if (!document.querySelector('section.content > div.title button')) displayCategories('show'); else displayCategories('hide');
    } else {
        var _link_collections = "";
        for (var _i = 0; _i < 8; _i++) {
            _link_collections += "<a href='" + collections[_i].href + "'>" + collections[_i].title + "<span>" + collections[_i].count + "</span></a>";
            collections.shift();
        }
        document.querySelector('section.filter-box div.filter').innerHTML = _link_collections;
        //удаляем, если меньше 8-ми в коллекции
        if (collections.length <= 8 && document.querySelector('div.title-collection button')) document.querySelector('div.title-collection button').remove();
    }

    // if(  window.innerWidth <= 625 )
    // {
    //     if(  !$('section.content > div.title').find('button').length )
    //         displayCategories('show');
    //     else
    //         displayCategories('hide');
    // }

    function requestGetOtherCollections(pageName, offset) {
        var html = "";

        for (var key in collections) {
            html += '<a href="' + collections[key].href + '">' + collections[key].title + '<span>' + collections[key].count + '</span></a>';
        }
        document.querySelector('div.filter').innerHTML = document.querySelector('div.filter').innerHTML + html;

        changeCategoryButton();
        displayCategories("show");
        // var data = new FormData();
        // data.append('offset' , 8);
        // data.append('show_count' , true );
        // data.append('show_href' , true );
        //
        // return fetch(window.pms.config.catalogAPI + 'collections', {method: 'POST', credentials: 'same-origin' , 'body' : data })
        //     .then(function (response) {
        //
        //         let responseData = false;
        //         try {
        //             responseData = response.json();
        //         }
        //         catch (e) {
        //             responseData = {status: false, statusText: "Произошла ошибка при соединении"};
        //             response.text().then(console.debug);
        //         }
        //         return responseData;
        //     })
        //     .then(function (response) {
        //
        //         if(response.status)
        //         {
        //
        //             let html = "";
        //
        //             for(var key in response.data.items)
        //             {
        //                 html += '<a href="'+response.data.items[key].href+'">'+response.data.items[key].title+'<span>'+response.data.items[key].count+'</span></a>';
        //             }
        //             document.querySelector('div.filter').innerHTML =  document.querySelector('div.filter').innerHTML + html;
        //
        //             changeCategoryButton();
        //             displayCategories( "show" );
        //         }
        //
        //     });
    }

    window.onresize = function (event) {
        var button = document.querySelector('section.content > div.title button');

        if (button.hasAttribute('data-category-action')) {
            displayCategories(button.getAttribute('data-category-action'));
        } else {
            if (window.innerWidth <= mobileWidth) displayCategories('hide'); else displayCategories('show');
        }
    };

    function displayCategories(status_display) {
        //если мобилка
        if (window.innerWidth <= mobileWidth) {
            if (status_display == "show") {
                document.querySelector('section.filter-box').style.display = "block";
                document.querySelectorAll('section.filter-box a').forEach(function (link) {
                    link.style.display = "block";
                });
            } else document.querySelector('section.filter-box').style.display = "none";
        } else {
            document.querySelector('section.filter-box').style.display = "block";
            if (status_display == "show") {
                var start = 0,
                    end = 8,
                    showAllLinks = document.querySelector('div.title button').hasAttribute('data-category-action') ? true : false;

                document.querySelectorAll('div.filter a').forEach(function (link) {
                    if (!showAllLinks && start > 7) {
                        link.style.display = "none";
                        return;
                    }
                    link.style.display = "block";
                    start++;
                });
            } else {
                var _start = 0,
                    _end = 8;
                document.querySelectorAll('div.filter a').forEach(function (link) {
                    if (_start >= _end) link.style.display = "none";
                    _start++;
                });
            }
        }
    }

    function requestGetCollectionItems(offset, limit, sort, pageName) {
        return requestGetItems(offset, limit, sort, pageName);
    }

    document.addEventListener('click', function (event) {
        if ((event.target.tagName == "IMG" || event.target.tagName == "BUTTON") && event.target.closest('div.title')) {
            var button = event.target;
            if (event.target.tagName == "IMG") button = event.target.parentNode;

            if (!button.hasAttribute('data-category-action')) requestGetOtherCollections('katalog', 8); else changeCategoryButton();
        }
    });

    function changeCategoryButton() {
        var button = document.querySelector('section.content > div.title button');

        if (button.hasAttribute('data-category-action')) {
            if (button.getAttribute('data-category-action') == "show") {
                button.setAttribute('data-category-action', 'hide');
                button.innerHTML = 'все коллекции<img src="/images/icons/down-arrow.svg">';
            } else {
                button.setAttribute('data-category-action', 'show');
                button.innerHTML = 'скрыть<img src="/images/icons/up-arrow.svg">';
            }

            displayCategories(button.getAttribute('data-category-action'));
        } else {
            button.setAttribute('data-category-action', 'show');
            button.innerHTML = 'скрыть<img src="/images/icons/up-arrow.svg">';
        }
    }

    //смена сортировки
    // $('div.sorting-block').on('click' , 'button' , function(){
    //     if(!$(this).hasClass('sorting-activ'))
    //     {
    //         $(this).addClass('sorting-activ').siblings('button').removeClass('sorting-activ');
    //         let sort = 'price';
    //         if($(this).text() == "по дате")
    //             sort = "create_date";
    //
    //         let url_string = window.location.href;
    //         let url = new URL(url_string);
    //         let select_sort = url.searchParams.get("sort");
    //
    //         if(sort == "create_date")
    //             path = "";
    //         else
    //             path = '?sort='+sort;
    //
    //         history.pushState({foo: 'page'}, path, window.location.origin+window.location.pathname+path);
    //
    //         Promise.all([
    //             createPagination(pms.plugins.catalog.currentCollection.count , 'collection'),
    //             requestGetCollectionItems(0 , limitItemsCollection, sort , 'collection'),
    //
    //         ]).then( results => {
    //             IS_AUTH = results[0];
    //             if(results[0])
    //             {
    //                 let list_id = [];
    //                 document.querySelectorAll('div[data-catalog-item-id]').forEach((currentValue, index, array) => {
    //                     list_id.push( currentValue.getAttribute('data-catalog-item-id') );
    //                 });
    //
    //                 requestCheckFavoritesItems(list_id , 'products-box');
    //             }
    //         });
    //
    //     }
    //
    // });

    Promise.all([requestCheckAuth('collection'), createPagination(pms.plugins.catalog.currentCollection.count, 'collection')]

        //requestGetKatalogItems(0 , limitItemsKatalog, "DESC", 'katalog'),
        // requestGetCategories('katalog'),
    ).then(function (results) {
        IS_AUTH = results[0];
        if (results[0]) {
            var list_id = [];
            document.querySelectorAll('div[data-catalog-item-id]').forEach(function (currentValue, index, array) {
                list_id.push(currentValue.getAttribute('data-catalog-item-id'));
            });

            requestCheckFavoritesItems(list_id, 'card-box');

            //
        }
    });
})();
