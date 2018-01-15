( function($){

    var limitItemsKatalog = 9;
    
    function requestGetKatalogItems(offset, limit, orderBy, pageName)
    {
       return requestGetItems(offset , limit, orderBy , pageName);
    }

    function requestCheckFavoritesItems(listId)
    {
        var data = new FormData();
        data.append('items' , JSON.stringify(listId));
        return fetch(window.pms.config.cabinetAPI + 'wishlist/check' , { method: 'POST', credentials: 'same-origin', body: data })
            .then( function(response){
                let responseData = false;
                try{
                    responseData = response.json();
                }
                catch(e) {
                    responseData = {status: false, statusText: "Произошла ошибка при соединении"};
                    response.text().then(console.debug);
                }

                return responseData;
            })
            .then( function (response) {
               if(response.data.wishlist)
               {
                   let $products = $('div.products-box'),
                       wishList = response.data.wishlist,
                       buttonHtml = "";

                   for(let key in wishList)
                   {
                       if( wishList[key].value)
                          buttonHtml =  "<button class='new-off'></button>";
                       else
                          buttonHtml =  " <button class='new-on'></button>";

                       $products.find('div[data-id-block="'+wishList[key].id+'"]').find('div.block-button-favorites').html(buttonHtml);
                   }
               }
            });

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


    function requestGetOtherCategories()
    {
        var data = new FormData();
        data.append('offset' , 8);
        return fetch(window.pms.config.catalogAPI + 'categories', {method: 'POST', credentials: 'same-origin' , body : data})
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
                    for(var key in responce.data.categories)
                    {
                        html += `<button>{response.data.categories[key]}<span>{responce.data.counts}</span></button>`
                    }
                }

            });
    }


    Promise.all([
        requestCheckAuth('katalog'),
        requestGetKatalogItems(0 , limitItemsKatalog, "DESC", 'katalog'),
        // requestGetCategories('katalog'),
    ]).then( results => {

        if(results[0] && results[1])
        {
            requestCheckFavoritesItems(results[1]);
        }
    });

    // requestCheckAuth('katalog')
    //     .then( result => {})


    $('div.title').on('click' , 'button' , function(){
        requestGetOtherCategories('katalog');

    });


})(jQuery);