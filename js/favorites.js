( function($){

    
    
    var limitItemsFavorites = 9;



  

    function requestGetFavorites(offset, limit, orderBy , pageName)
    {
        //console.log( requestGetItems );
        return requestGetItems(offset , limit, orderBy , pageName) ;
    }

    requestCheckAuth("favorites")
                .then( result => {

                                  if( result )
                                  {
                                      totalItems = $('div.header-user').find('div[data-favorite] span').text();
                                      console.log(totalItems);
                                      let promise = requestGetFavorites(0, limitItemsFavorites, 'DESC' , 'favorites');
                                        
                                      createPagination(totalItems , 'favorites');

                                      return promise;
                                  }

                       } ,
                       error => {} )
             .then( response => {

                for(let key = 0; key < response.length; key++)
                   addFavoriteButtons( $('div.products-box').find('div[data-id-block="'+response[key]+'"]') , true);
             });
    requestGetMenuCategories();


})(jQuery);