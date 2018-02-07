/**
 * Created by Иван on 22.01.2018.
 */
( function($){

    var limitItemsCollection = 24;


    let url_string = window.location.href;
    let url = new URL(url_string);
    let select_sort = url.searchParams.get("sort");

    if(select_sort)
    {
        if(select_sort == "price")
            $('div.sorting-block').find('button.sorting-activ').removeClass('sorting-activ').siblings('sorting-activ');
    }


    if(  $(document).width() <= 625 )
    {
        if(  !$('section.content > div.title').find('button').length )
            displayCategories('show');
        else
            displayCategories('hide');
    }

    function requestGetOtherCollections(pageName , offset)
    {
        var data = new FormData();
        data.append('offset' , 8);
        data.append('show_count' , true );
        data.append('show_href' , true );

        return fetch(window.pms.config.catalogAPI + 'collections', {method: 'POST', credentials: 'same-origin' , 'body' : data })
            .then(function (response) {

                let responseData = false;
                try {
                    responseData = response.json();
                }
                catch (e) {
                    responseData = {status: false, statusText: "Произошла ошибка при соединении"};
                    response.text().then(console.debug);
                }
                return responseData;
            })
            .then(function (response) {
                console.log(response);
                if(response.status)
                {

                    let html = "";

                    for(var key in response.data.items)
                    {
                        html += '<a href="'+response.data.items[key].href+'">'+response.data.items[key].title+'<span>'+response.data.items[key].count+'</span></a>';
                    }
                    $('div.filter').append(html);

                    changeCategoryButton();
                    displayCategories( "show" );
                }

            });
    }

    $(window).resize( function(){
        let button =  $('section.content > div.title').find('button');

        if( button.attr('data-category-action') )
        {
            displayCategories(button.attr('data-category-action'));
        }
        else
        {
            if( $(document).width() < 625)
                displayCategories('hide');
            else
                displayCategories('show');

        }

    });
    function displayCategories(status_display)
    {
        //если мобилка
        if( $(document).width() <= 625)
        {
            if(status_display == "show" )
                $('section.filter-box').show().find('a').show();

            else
                $('section.filter-box').hide();



        }
        else
        {
            $('section.filter-box').show();
            if(status_display == "show")
                $('div.filter').find('a').slice(8).show();
            else
                $('div.filter').find('a').slice(8).hide();
        }


    }

    function requestGetCollectionItems(offset, limit, sort, pageName)
    {
        return requestGetItems(offset , limit, sort , pageName);
    }

    $('div.title').on('click' , 'button' , function(){
        if(!$(this).attr('data-category-action'))
            requestGetOtherCollections('katalog' , 8);
        else
            changeCategoryButton();
    });

    function changeCategoryButton()
    {
        let button =  $('section.content > div.title').find('button');

        if( button.attr('data-category-action') )
        {
            if(button.attr('data-category-action') == "show")
            {
                button.attr('data-category-action' , 'hide').html('все коллекции<img src="images/icons/down-arrow.svg">');
            }
            else
            {
                button.attr('data-category-action' , 'show').html('скрыть<img src="images/icons/up-arrow.svg">');
            }

            displayCategories(button.attr('data-category-action') );
        }
        else
        {
            button.attr('data-category-action' , 'show').html('скрыть<img src="images/icons/up-arrow.svg">');
        }
    }

    //смена сортировки
    $('div.sorting-block').on('click' , 'button' , function(){
        if(!$(this).hasClass('sorting-activ'))
        {
            $(this).addClass('sorting-activ').siblings('button').removeClass('sorting-activ');
            let sort = 'price';
            if($(this).text() == "по дате")
                sort = "create_date";

            let url_string = window.location.href;
            let url = new URL(url_string);
            let select_sort = url.searchParams.get("sort");

            if(sort == "create_date")
                path = "";
            else
                path = '?sort='+sort;

            history.pushState({foo: 'page'}, path, window.location.origin+window.location.pathname+path);

            Promise.all([
                createPagination(pms.plugins.catalog.currentCollection.count , 'collection'),
                requestGetCollectionItems(0 , limitItemsCollection, sort , 'collection'),

            ]).then( results => {
                IS_AUTH = results[0];
                if(results[0])
                {
                    let list_id = [];
                    document.querySelectorAll('div[data-catalog-item-id]').forEach((currentValue, index, array) => {
                        list_id.push( currentValue.getAttribute('data-catalog-item-id') );
                    });

                    requestCheckFavoritesItems(list_id , 'products-box');
                }
            });

        }

    });

    Promise.all([
        requestCheckAuth('collection'),
        createPagination(pms.plugins.catalog.currentCollection.count , 'collection'),
        requestGetMenuCategories(),
        //requestGetKatalogItems(0 , limitItemsKatalog, "DESC", 'katalog'),
        // requestGetCategories('katalog'),
    ]).then( results => {
        IS_AUTH = results[0];
        if(results[0])
        {
            let list_id = [];
            document.querySelectorAll('div[data-catalog-item-id]').forEach((currentValue, index, array) => {
                list_id.push( currentValue.getAttribute('data-catalog-item-id') );
            });
            
            requestCheckFavoritesItems(list_id , 'products-box');

            //
        }
    });

})($);