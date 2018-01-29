( function($){

    $('div.products-pagination').html("");

    var limitItemsKatalog = 9;
    var offset = 9;


    if(  $(document).width() <= 625 )
    {
        if(  !$('section.content > div.title').find('button').length )
             displayCategories('show');
        else
            displayCategories('hide');
    }

    
    function requestGetKatalogItems(offset, limit, sort, pageName)
    {
       return requestGetItems(offset , limit, sort , pageName);
    }
    
    function reuestGetCategories(page)
    {
        
        let data = new FormData();
       
        //data.append()
        return fetch(window.pms.config.catalogApi + 'categories', {method: 'POST', credentials: 'same-origin', body:  formData })
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
                if (response.status)
                    location.reload();
                else
                    alert('Не получилось разлогиниться');
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

    $('div.sorting-block').on('click' , 'button' , function(){

       if(!$(this).hasClass('sorting-activ'))
       {
           $(this).addClass('sorting-activ').siblings('button').removeClass('sorting-activ');

           let sort = 'price';
           if($(this).text() == "по дате")
               sort = "create_date";

           path = "";
           if(sort == "create_date")
               path = "";
           else
               path = '?sort='+sort;

           history.pushState({foo: 'page'}, path, window.location.origin+window.location.pathname+path);
          // history.pushState({foo: 'page'}, '?sort='+sort+'&page='+select_page, window.location.origin+window.location.pathname+'?sort='+sort+'&page='+select_page);
            
           Promise.all([
               createPagination(pms.plugins.catalog.currentCategory.count , 'katalog'),
               requestGetKatalogItems(0 , limitItemsKatalog, sort , 'katalog'),

           ]).then( results => {

               if(IS_AUTH)
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

    function changeCategoryButton()
    {
       let button =  $('section.content > div.title').find('button');

       if( button.attr('data-category-action') )
       {
            if(button.attr('data-category-action') == "show")
            {
                button.attr('data-category-action' , 'hide').html('все категории<img src="images/icons/down-arrow.svg">');

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


    function requestGetOtherCategories(pageName , offset)
    {
        var data = new FormData();
            data.append('offset' , 8);
            data.append('show_count' , true );

        var paramsString = "offset=8&show_count=true";
      //  var searchParams = new URLSearchParams(paramsString);

        return fetch(window.pms.config.catalogAPI + 'categories', {method: 'POST', credentials: 'same-origin' , 'body' : data })
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
                if(response.status)
                {
                    let html = "";
                    for(var key in response.data)
                    {
                        html += '<a href="'+response.data[key].href+'">'+response.data[key].title+'<span>'+response.data[key].count+'</span></a>';
                    }
                    $('div.filter').append(html);


                    changeCategoryButton();
                    displayCategories( "show" );
                }

            });
    }

    // window.onscroll = function () {
    //     if($(window).height() + $(window).scrollTop() >= $(document).height() && !block) {
    //         console.log('scroll');
    //     }

        // if()

    //};




    Promise.all([
        requestCheckAuth('katalog'),
        createPagination(pms.plugins.catalog.currentCategory.count , 'katalog'),
        requestGetMenuCategories(),
        //requestGetKatalogItems(0 , limitItemsKatalog, "DESC", 'katalog'),
        // requestGetCategories('katalog'),
    ]).then( results => {

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

    // requestCheckAuth('katalog')
    //     .then( result => {})


    $('div.title').on('click' , 'button' , function(){
        if(!$(this).attr('data-category-action'))
            requestGetOtherCategories('katalog' , 8);
        else
            changeCategoryButton();

    });


})(jQuery);