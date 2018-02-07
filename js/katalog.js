

   // $('div.products-pagination').html("");

    var limitItemsKatalog = 9;
    var offset = 9;
    let mobileWidth = 1000;

    //если мобилка, то показываем кнопку
    if(  window.innerWidth <= mobileWidth )
    {
        document.querySelector('div.title button').style.display = "block";
        document.querySelector('section.filter-box').style.display = "none";
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


    window.onresize = function (event) {
        let button = document.querySelector('section.content > div.title button');

        if( window.innerWidth > mobileWidth)
        {
            document.querySelector('div.title button').style.display = 'none';
            document.querySelector('section.filter-box').style.display = 'block';
        }
        else
        {
            document.querySelector('div.title button').style.display = "block";
            if( button.hasAttribute('data-category-action') )
                displayCategories( button.getAttribute('data-category-action') );
            else
                displayCategories('hide');
        }

    }

    // $(window).resize( function(){
    //        let button =  $('section.content > div.title').find('button');
    //
    //        if( $(window).width() > mobileWidth )
    //        {
    //            $('div.title').find('button').hide();
    //            $('section.filter-box').show();
    //        }
    //        else
    //        {
    //            $('div.title').find('button').show();
    //            if( button.attr('data-category-action') )
    //            {
    //                displayCategories(button.attr('data-category-action'));
    //            }
    //            else
    //            {
    //                displayCategories('hide');
    //            }
    //
    //        }
    //
    //
    //
    // });

    // $('div.sorting-block').on('click' , 'button' , function(){
    //
    //    if(!$(this).hasClass('sorting-activ'))
    //    {
    //        $(this).addClass('sorting-activ').siblings('button').removeClass('sorting-activ');
    //
    //        let sort = 'price';
    //        if($(this).text() == "по дате")
    //            sort = "create_date";
    //
    //        path = "";
    //        if(sort == "create_date")
    //            path = "";
    //        else
    //            path = '?sort='+sort;
    //
    //        history.pushState({foo: 'page'}, path, window.location.origin+window.location.pathname+path);
    //       // history.pushState({foo: 'page'}, '?sort='+sort+'&page='+select_page, window.location.origin+window.location.pathname+'?sort='+sort+'&page='+select_page);
    //
    //        Promise.all([
    //            createPagination(pms.plugins.catalog.currentCategory.count , 'katalog'),
    //            requestGetKatalogItems(0 , limitItemsKatalog, sort , 'katalog'),
    //
    //        ]).then( results => {
    //
    //            if(IS_AUTH)
    //            {
    //                let list_id = [];
    //                document.querySelectorAll('div[data-catalog-item-id]').forEach((currentValue, index, array) => {
    //                    list_id.push( currentValue.getAttribute('data-catalog-item-id') );
    //                });
    //
    //                requestCheckFavoritesItems(list_id , 'products-box');
    //
    //            }
    //        });
    //
    //    }
    //
    // });

    function displayCategories(status_display)
    {
        //если мобилка
        if( window.innerWidth <= mobileWidth )
        {
            if(status_display == "show")
                document.querySelector('section.filter-box').style.display = "block";
            else
                document.querySelector('section.filter-box').style.display = "none";
        }
        else
        {
            document.querySelector('section.filter-box').style.display = "block";
            if( status_display == "show")
                document.querySelector('section.filter-box').style.display = "block";
            else
                document.querySelector('section.filter-box').style.display = "none";
        }

        // if( $(document).width() <= mobileWidth )
        // {
        //    if(status_display == "show" )
        //      $('section.filter-box').show().show();
        //
        //    else
        //      $('section.filter-box').hide();
        // }
        // else
        // {
        //     $('section.filter-box').show();
        //     if(status_display == "show")
        //         $('section.filter-box').show();
        //     else
        //         $('section.filter-box').hide();
        // }

    }

    function changeCategoryButton()
    {
        let button = document.querySelector('section.content > div.title button');

        if( button.hasAttribute('data-category-action'))
        {
            if( button.getAttribute('data-category-action') == "show" )
            {
                button.setAttribute('data-category-action' , 'hide');
                button.innerHTML = 'все категории<img src="images/icons/down-arrow.svg">';
            }
            else
            {
                button.setAttribute('data-category-action' , 'show');
                button.innerHTML = 'скрыть<img src="images/icons/up-arrow.svg">';
            }

            displayCategories(button.getAttribute('data-category-action'));

        }
        else
        {

        }
       // let button =  $('section.content > div.title').find('button');
       //
       // if( button.attr('data-category-action') )
       // {
       //      if(button.attr('data-category-action') == "show")
       //      {
       //          button.attr('data-category-action' , 'hide').html('все категории<img src="images/icons/down-arrow.svg">');
       //
       //      }
       //     else
       //      {
       //          button.attr('data-category-action' , 'show').html('скрыть<img src="images/icons/up-arrow.svg">');
       //      }
       //
       //     displayCategories(button.attr('data-category-action') );
       // }
       // else
       // {
       //     button.attr('data-category-action' , 'show').html('скрыть<img src="images/icons/up-arrow.svg">');
       // }
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
         
            requestCheckFavoritesItems(list_id , 'card-box');

        //
         }
    });

    // requestCheckAuth('katalog')
    //     .then( result => {})


    // $('div.title').on('click' , 'button' , function(){
    //     if(!$(this).attr('data-category-action'))
    //         requestGetOtherCategories('katalog' , 8);
    //     else
    //         changeCategoryButton();
    //
    // });


