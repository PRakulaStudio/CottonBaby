( function($){

    
    
    var limitItemsFavorites = 9;

    $('div.products-box').on('click' , 'button[action="toogle-favorite"]' , function(){

        if( $(this).hasClass("products-on") )
            requestRemoveFavorites( $(this).parents('div[data-id-block]').attr('data-id-block') , $(this));
        else
            requestAddFavorites( $(this).parents('div[data-id-block]').attr('data-id-block') , $(this) );

    });

    function requestAddFavorites(product_id  , button)
    {

        $.ajax({
            data : { 'id' : product_id},
            dataType : 'JSON',
            type : "POST",
            url : window.pms.config.cabinetAPI+'wishlist/add',
            success : function ( result , status ) {
                if(result.status)
                {
                    button.hide().siblings('button').show();
                }
            },
        });

    }

    function requestRemoveFavorites(product_id , button)
    {

            $.ajax({
               data : {  'id' : product_id},
               dataType : 'JSON',
               type : "POST",
               url : window.pms.config.cabinetAPI+'wishlist/delete',
               success : function ( result , status ) {
                    if(result.status)
                    {
                        button.hide().siblings('button').show();
                    }
               },
            });
    }

    function requestGetFavorites(offset, limit, orderBy , pageName)
    {
        //console.log( requestGetItems );
        requestGetItems(offset , limit, orderBy , pageName);
    }

    requestCheckAuth("favorites")
                .then( result => {
                                  if( result )
                                  {
                                      totalItems = $('div.header-user').find('div[data-favorite] span').text();
                                      requestGetFavorites(0, limitItemsFavorites, 'DESC' , 'favorites');
                                      createPagination();
                                  }

                       } ,
                       error => {} );

})(jQuery);