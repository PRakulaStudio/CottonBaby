/**
 * Created by Иван on 22.01.2018.
 */
( function(){

    Promise.all([
        requestCheckAuth('collections'),
        createPagination(pms.plugins.catalog.collections.count , 'collections'),
       
        //requestGetKatalogItems(0 , limitItemsKatalog, "DESC", 'katalog'),
        // requestGetCategories('katalog'),
    ]).then( results => {

    });

})();