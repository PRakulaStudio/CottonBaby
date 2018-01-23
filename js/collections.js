/**
 * Created by Иван on 22.01.2018.
 */
( function($){

    Promise.all([
        requestCheckAuth('collections'),
        createPagination(pms.plugins.catalog.collections.count , 'collections'),
        requestGetMenuCategories(),
        //requestGetKatalogItems(0 , limitItemsKatalog, "DESC", 'katalog'),
        // requestGetCategories('katalog'),
    ]).then( results => {
        IS_AUTH = results[0];
        if(results[0])
        {

        }
    });

})($);