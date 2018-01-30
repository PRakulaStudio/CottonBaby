/**
 * Created by Иван on 12.01.2018.
 */
var limitItems = 24,
    totalItems = 0,
    activePaginationButton = "pagination-activ",
    arrayItems = {},
    hideButton = "ban-pagination",
    pageId = false,
    sort = "create_date";


function createPagination( total ,  pageName)
{

    countPages =  Math.ceil( total / limitItems );
    arrayItems = {};

   if(pageId === false)
        pageId = pageName;

   let hideLocalButton = "";

    if(countPages == 1)
    {
        $('div.products-pagination').html("");
        return true;
    }




    let url_string = window.location.href;
    let url = new URL(url_string);
    let select_page = url.searchParams.get("page");

    if( select_page == null)
        select_page = 1;

    // if( countPages <= 4 )
    //     hideLocalButton = hideButton;


    var activeLocal = "";
    var html = "";
    if( countPages <= 4 || select_page == 1 )
        hideLocalButton = hideButton;

    var html = "<button class='pagination-arrow prev "+hideLocalButton+"'>◄</button>" +
                 "<div data-block-pages >";
    let pagination_page_start = 1;
    hideLocalButton = "";


    if( select_page === 1 || select_page === 2 ||  (select_page <= 4 && countPages <= 4) ) {
        pagination_page_start = 1;
    }
    else
    {
        if(select_page > 2  && countPages > 4)
        {
            pagination_page_start = select_page - 1;
        }
        else
        {
            if(select_page == countPages - 1)
            {
                pagination_page_start = select_page - 2;
            }
            else
            {
                if(select_page == countPages)
                {
                    pagination_page_start = select_page - 3;
                }
            }

        }
    }

    for( let i = 0;  i < countPages; i++ , pagination_page_start++ )
    {
        if( i == 4)
            break;

        if(pagination_page_start == select_page)
            activeLocal = activePaginationButton;

        html += "<button class='"+activeLocal+"'>"+pagination_page_start+"</button>";
        activeLocal = "";
    }


    if( countPages <= 4 || select_page == countPages )
        hideLocalButton = hideButton;

    html += "</div>" +
        "<button class='pagination-arrow next "+hideLocalButton+"'>►</button>";
    hideLocalButton = "";

    $('div.products-pagination').html(html);

    return true;
}

function changePagination(direction , activeButton , clickButton )
{
    var offset = 0,
        limit = 0,
        sort = "",
        prevButtonActiveNumber = $(activeButton).text();

    switch (direction)
    {
        case "next" :

            if( (clickButton.text()   <= 2) || (countPages - 1) <= clickButton.text() )
            {

                if(  (clickButton.index() - activeButton.index() != 1) && clickButton.text() < ( countPages - 1 )  )
                {

                    clickButton = clickButton.prev();
                    clickButton.text(  parseInt( $(clickButton).text() ) + 1  );

                    clickButton.siblings('button').each( function () {
                        $(this).text(  parseInt($(this).text()) + 1 );
                    });

                }


                activeButton.removeClass(activePaginationButton);
                clickButton.addClass(activePaginationButton);

                if( clickButton.text() == countPages )
                    clickButton.parent('div').next().addClass( hideButton );


            }
            else
            {
                var raznicha = clickButton.index() - activeButton.index()    ;

                if( raznicha != 1 )
                {
                    activeButton.removeClass(activePaginationButton);

                    setButton =  $('div.products-pagination div[data-block-pages]').find('button').eq(1).addClass(activePaginationButton);
                    setButton.text( $(clickButton).text() );

                    setButton.siblings('button').each( function () {
                        if( $(this).index() < setButton.index())
                            $(this).text(  parseInt($(setButton).text()) - 1  );
                        else
                            $(this).text(  parseInt($(setButton).text())  +  $(this).index() - setButton.index()  );
                    });

                }
                else
                {

                    clickButton.text(  parseInt( $(clickButton).text() ) + 1  );


                    clickButton.siblings('button').each( function () {
                        $(this).text(  parseInt($(this).text()) + 1   );
                    });
                }

                //if( parseInt(clickButton.text()) - parseInt(activeButton.text()) >= 2 )



            }

            var newActiveButton = $('div.products-pagination').find('button.pagination-activ');
            //показываем левую кнопку
            if( countPages > 4 )
            {
                //показываем левую
                if(newActiveButton.text() > 1  )
                    $('div.products-pagination').find('button.prev').removeClass(hideButton);

                //скрываем правую
                if( newActiveButton.text() == countPages )
                    $('div.products-pagination').find('button.next').addClass(hideButton);

            }

            break;

        case "prev" :

            if( ( clickButton.text()  < 2 ) || (countPages - 2) <= clickButton.text() )
            {
                activeButton.removeClass(activePaginationButton);
                clickButton.addClass(activePaginationButton);

                if( clickButton.text() == 1)
                {
                    clickButton.parent('div').prev().addClass( 'hide-button' );
                }

            }
            else
            {
                var raznicha = activeButton.index() -  clickButton.index();

                if( raznicha != 1 )
                {
                    activeButton.removeClass(activePaginationButton);

                    setButton =  $('div.products-pagination div[data-block-pages]').find('button').eq(1).addClass(activePaginationButton);
                    setButton.text( $(clickButton).text() );

                    setButton.siblings('button').each( function () {
                        if( $(this).index() < setButton.index())
                            $(this).text(  parseInt($(setButton).text()) - 1  );
                        else
                            $(this).text(  parseInt($(setButton).text())  +  $(this).index() - setButton.index()  );
                    });

                }
                else
                {
                    clickButton.text(  parseInt(clickButton.text()) - 1 );

                    clickButton.siblings('button').each( function () {
                        $(this).text(  parseInt($(this).text()) - 1 );
                    });
                }
            }


            if( countPages > 4 )
            {
                //скрываем левую кнопку
                var newActiveButton = $('div.products-pagination').find('button.pagination-activ');
                if(newActiveButton.text() == 1 )
                {

                    $('div.products-pagination').find('button.prev').addClass(hideButton);
                }
                //показываем правую
                if( newActiveButton.text() < countPages )
                {
                    $('div.products-pagination').find('button.next').removeClass(hideButton);
                }
            }

            break;
    }

  //проверяем есть ли в массиве эти данные


    activeButton =  $('div.products-pagination').find('button.pagination-activ');
    let url_string = window.location.href;
    let url = new URL(url_string);
    let select_sort = url.searchParams.get("sort");
    let select_page = url.searchParams.get("page");
    let path = "";

    if(select_sort == null)
        path += "";
    else
        path += '?sort='+select_sort;

    if( activeButton.text() == 1)
        path += "";
    else
        path =  select_sort == null ? '?page='+activeButton.text() : path +'&page='+ activeButton.text();

    history.pushState({foo: 'page'}, path, window.location.origin+window.location.pathname+path);


    if( arrayItems[activeButton.text()] )
    {
        if( !arrayItems[prevButtonActiveNumber])
            arrayItems[prevButtonActiveNumber] = $('div.products-box,div.collections-box').children();
        //надо переделать
        $('div.products-box,div.collections-box').html( arrayItems[activeButton.text()] );
    }
    else
    {

        if(!arrayItems[prevButtonActiveNumber])
            arrayItems[prevButtonActiveNumber] = $('div.products-box,div.collections-box').children();

        sort = "create_date"; //нужно проверить
        if( $('div.sorting').length)
        {
           if( $('div.sorting').find('button.sorting-activ').text() == "по цене" )
               sort = 'price';
        }

        offset =( ( parseInt( activeButton.text() ) - 1) * limitItems );

       requestGetItems( offset , limitItems,  sort , pageId )
            .then( result => {
                
                if(IS_AUTH)
                {
                    requestCheckFavoritesItems(result , 'products-box');
                }
            });
    }
    console.log( document.querySelector('div.products-box, div.collections-box').offsetTop  );
     window.scrollTo( document.querySelector('div.products-box, div.collections-box').offsetTop, document.querySelector('div.products-box, div.collections-box').offsetTop );
}


function requestGetItems(offset , limit , sort , pageName)
{
    if(pageId === false)
        pageId = pageName;

    let data = new FormData();
    let show_favorites = true;

    switch(pageId)
    {
        case "favorites" :
            url = window.pms.config.cabinetAPI +"wishlist/get";
            break;
        case "katalog" :
            url = window.pms.config.catalogAPI +"category";
            data.append('img_size[]' , '750x750');
            if(  window.pms.plugins.catalog.currentCategory.id > 0 )
                data.append('id' , window.pms.plugins.catalog.currentCategory.id );
            break;
        case "collection" :
            url = window.pms.config.catalogAPI +"collections";
            data.append('id' , window.pms.plugins.catalog.currentCollection.id);
            data.append('img_size[]' , '750x750');
            data.append('show_items' , true);
            break;
        case "collections" :
            url = window.pms.config.catalogAPI +"collections";
            data.append('show_href' , true);
            data.append('img_size[]' , '750x750');
            data.append('show_cover' , true);
            show_favorites = false;
            break;
        case "search" :
            url = window.pms.config.catalogAPI + window.location.pathname;
            data.append('img_size[]' , '750x750');
            break;
    }

    data.append('offset' , offset);
    data.append('limit' , limit);
    data.append('sort' , sort);

    return fetch(url, {method: 'POST', credentials: 'same-origin' , body: data})
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
          
           return createItems(response.data.items , show_favorites);
        })
       
}

function createItems(items , is_show_favorite)
{
    var html = "",
        listIdItems = [];

    for( var key in items)
    {
        item = items[key];
        listIdItems.push(item.id);
        let   images_path = "/images/";

            if( item.images &&  item.images[0])
                images_path =item.images[0];
            if( item.images &&  item.images[0] && item.images[0]['750x750']  )
                images_path =item.images[0]['750x750'];

        html += "<div data-catalog-item-id='"+item.id+"'>" +
                     "<div><a href='"+item.href+"'><img src='"+images_path+"' /></a></div>"; //картинка
        if( item.price )
             html +=  "<div><p><span>*****</span><span>"+item.price+"</span> руб.</p></div>"; //цена

        if( is_show_favorite )
             html += "<div class='block-button-favorites'></div>"; // избранное
        html += "<div>" +
                            "<a href='"+item.href+"'>"+item.title+"</a>" +
                            "<p>"+(item.description == null ? "" : item.description)+"</p>" +
                         "</div>" +

                        "<a href='"+item.href+"'>" +
                            "Подробно" +
                        "</a>" +
                 "</div>";
    }
    //надо переделать
    $('div.products-box,div.collections-box').html( html );

    return  listIdItems;

}

$(document).ready( function(){

    $("div.products-pagination").on('click' , "div[data-block-pages] button" , function(){

        if( !$(this).hasClass(activePaginationButton) )
        {
            let activeButton = $(this).siblings('button.'+activePaginationButton);

            if( $(this).text() >  activeButton.text() )
                changePagination("next" , activeButton , $(this));
            else
                changePagination("prev" , activeButton , $(this));
        }

    });

    $("div.products-pagination").on( 'click' , 'button.prev' , function(){
        let clickButton = $(this).siblings('div[data-block-pages]').find('button.'+activePaginationButton);
        changePagination("prev" , clickButton , clickButton.prev());
    });

    $('div.products-pagination').on('click' , " button.next" , function(){
        let clickButton = $(this).siblings('div[data-block-pages]').find('button.'+activePaginationButton);
        changePagination("next" , clickButton, clickButton.next());
    });

});