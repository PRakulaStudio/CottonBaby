(function($){

    Promise.all([
        requestCheckAuth('katalog'),
        createPagination(pms.plugins.catalog.search.count , 'search'),
        requestGetMenuCategories(),

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

})($);