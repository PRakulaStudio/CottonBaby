/**
 * Created by Иван on 12.01.2018.
 */
var limitItems = 9,
    totalItems = 0,
    activePaginationButton = "pagination-activ",
    arrayItems = [],
    hideButton = "ban-pagination",
    pageId = false;


function createPagination()
{

    countPages =  Math.ceil( totalItems / limitItems );

    let hideLocalButton = "";

    if( countPages <= 4 )
    {
        hideLocalButton = hideButton;
    }
    var activeLocal = activePaginationButton;
    var html = "<button class='pagination-arrow prev "+hideButton+"'>◄</button>" +
        "<div data-block-pages >";

    for( let i = 0; i < countPages; i++ )
    {
        if( i == 4 )
            break;

        html += "<button class='"+activeLocal+"'>"+(i+1)+"</button>";
        activeLocal = "";

    }
    html += "</div>" +
        "<button class='pagination-arrow next "+hideLocalButton+"'>►</button>";

    $('div.products-pagination').html(html);


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

                if(  (clickButton.index() - activeButton.index() != 1) && clickButton.text() <= ( countPages - 1 )  )
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

    if( arrayItems[clickButton.text()] )
    {

        if( !arrayItems[prevButtonActiveNumber])
            arrayItems[prevButtonActiveNumber] = $('div.products-box').children();
        //надо переделать
        $('div.products-box').html( arrayItems[clickButton.text()] );
    }
    else
    {

        if(!arrayItems[prevButtonActiveNumber])
            arrayItems[prevButtonActiveNumber] = $('div.products-box').children();

        sort = "DESC"; //нужно проверить
        offset =( ( parseInt( clickButton.text() ) - 1) * limitItems );

        requestGetItems( offset , limitItems,  sort , pageId );
    }

}

function requestGetItems(offset , limit , orderBy , pageName)
{

    if(pageId === false)
        pageId = pageName;

    let url;
    var data = new FormData();

    switch(pageId)
    {
        case "favorites" :
            url = window.pms.config.cabinetAPI +"wishlist/get";
            break;
        case "katalog" :
            url = window.pms.config.catalogAPI +"items";
            data.append('img_size[]' , '300x500');
            break;


    }

    data.append('offset' , offset);
    data.append('limit' , limit);
    data.append('orderBy' , orderBy);

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

            return createItems(response.data);

        });
}

function createItems(items)
{
    var html = "",
        listIdItems = [];

    for( var key in items)
    {
        listIdItems.push(items[key].id);
        html += "<div data-id-block='"+items[key].id+"'>" +
                     "<div><a href='#'><img src='"+items[key].images[0]['300x500']+"' /></a></div>" + //картинка
                      "<div><p><span>*****</span><span>"+items[key].price+"</span> руб.</p></div>" + //цена
                         "<div class='block-button-favorites'></div>" +// избранное
                       "<div>" +
                            "<a href='"+items[key].link+"'>"+items[key].title+"</a>" +
                            "<p>"+items[key].description+"</p>" +
                         "</div>" +

                        "<a href='"+items[key].href+"'>" +
                            "Подробно" +
                        "</a>" +
                 "</div>";
    }
    //надо переделать
    $('div.products-box').html( html );
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