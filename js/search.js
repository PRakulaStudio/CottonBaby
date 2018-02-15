(function(){

    Promise.all([
        requestCheckAuth('search'),
        createPagination(pms.plugins.catalog.search.count , 'search'),


    ]).then( results => {
        IS_AUTH = results[0];
        if(results[0])
        {
            let list_id = [];
            document.querySelectorAll('div[data-catalog-item-id]').forEach((currentValue, index, array) => {
                list_id.push( currentValue.getAttribute('data-catalog-item-id') );
            });

            requestCheckFavoritesItems(list_id , 'card-box');

        }
    });

})();