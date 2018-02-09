( function(){

    
    var limitItemsFavorites = 9;

    function requestGetFavorites(offset, limit, orderBy , pageName)
    {
        //console.log( requestGetItems );
        let count = requestGetItems(offset , limit, orderBy , pageName);
        return count;
    }

    requestCheckAuth("favorites")
                .then( result => {
                                  if( result )
                                  {
                                      let totalItems = document.querySelector('div.header-user div[data-favorite]').innerText,
                                          promise = requestGetFavorites(0, limitItemsFavorites, 'DESC' , 'favorites');

                                      createPagination(totalItems , 'favorites');
                                      return promise;
                                  }

                       } ,
                       error => {} )
             .then( response => {
            
                for(let key = 0; key < response.length; key++)
                  addFavoriteButtons( document.querySelector('div.card-box div[data-catalog-item-id="'+response[key]+'"] , div.products-box div[data-catalog-item-id="'+response[key]+'"]') , true);

             });



})();