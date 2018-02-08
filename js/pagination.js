/**
 * Created by Иван on 12.01.2018.
 */
var limitItems = 24,
    totalItems = 0,
    activePaginationButton = "pagination-activ",
    arrayItems = {},
    hideButton = "ban-pagination",
    pageId = false,
    sort = "create_date",
    canChange = true;


function createPagination( total ,  pageName)
{

    countPages =  Math.ceil( total / limitItems );
    arrayItems = {};

   if(pageId === false)
        pageId = pageName;

   let hideLocalButton = "";

    if(countPages == 1)
    {
        document.querySelector('div.pagination').innerHTML = "";
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

    document.querySelector('div.pagination').innerHTML = html;

    return true;
}

function indexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i=0; i<children.length; i++) {
        if (children[i]==node) return num;
        if (children[i].nodeType==1) num++;
    }
    return -1;
}


function changePagination(direction , activeButton , clickButton )
{
    if(!canChange)
        return;

    canChange = false;

    let offset = 0,
        limit = 0,
        sort = "",
        prevButtonActiveNumber = activeButton.innerText,
        newActiveButton = "";


    switch (direction)
    {
        case "next" :

            if( (clickButton.innerText   <= 2) || (countPages - 1) <= clickButton.innerText )
            {

                if(  ( indexInParent(clickButton) - indexInParent(activeButton) != 1) && clickButton.innerText < ( countPages - 1 )  )
                {

                    clickButton = clickButton.previousElementSibling;
                    clickButton.innerText =   parseInt( clickButton.innerText ) + 1  ;

                    let listButtons = Array.prototype.filter.call(clickButton.parentNode.children, function(child){
                        return child !== clickButton;
                    });

                    listButtons.each( function (current) {
                        current.innerText = parseInt(current.innerText) + 1;
                    });

                }

                activeButton.classList.remove(activePaginationButton);
                clickButton.classList.add(activePaginationButton);

                if( clickButton.innerText == countPages )
                    clickButton.parentNode.nextElementSibling.classList.add( hideButton );


            }
            else
            {
                var raznicha = indexInParent(clickButton) - indexInParent(activeButton);

                if( raznicha != 1 )
                {
                    activeButton.classList.remove(activePaginationButton);
                    let setButton = document.querySelectorAll('div.pagination div[data-block-pages] button')[1];
                    setButton.classList.add(activePaginationButton);

                    setButton.innerText = clickButton.innerText ;

                    let listButtons = Array.prototype.filter.call(setButton.parentNode.children, function(child){
                        return child !== setButton;
                    });

                    listButtons.forEach(function (current) {
                        if( indexInParent(current) < indexInParent(setButton))
                            current.innerText = parseInt(setButton.innerText) - 1;
                        else
                            current.innerText = parseInt(setButton.innerText) + indexInParent(current) - indexInParent(setButton);
                    });


                }
                else
                {
                    clickButton.innerText = parseInt( clickButton.innerText) + 1;
                    let listButtons = Array.prototype.filter.call(clickButton.parentNode.children, function(child){
                        return child !== clickButton;
                    });

                    listButtons.forEach(function (current) {
                       current.innerText = parseInt(current.innerText) + 1;
                    });

                }
               //if( parseInt(clickButton.text()) - parseInt(activeButton.text()) >= 2 )
            }

            newActiveButton = document.querySelector('div.pagination button.pagination-activ');
            //показываем левую кнопку
            if( countPages > 4 )
            {
                //показываем левую
                if( newActiveButton.innerText > 1  )
                    document.querySelector('div.pagination button.prev').classList.remove(hideButton);


                //скрываем правую
                if( newActiveButton.innerText == countPages )
                    document.querySelector('div.pagination button.next').classList.add( hideButton );
            }

            break;

        case "prev" :

            if( ( clickButton.innerText  < 2 ) || (countPages - 2) <=  clickButton.innerText )
            {
                activeButton.classList.remove(activePaginationButton);
                clickButton.classList.add(activePaginationButton);

                if( clickButton.innerText == 1)
                {
                    clickButton.parentNode.previousElementSibling.classList.add('hide-button');

                }

            }
            else
            {
                var raznicha = indexInParent(activeButton) - indexInParent(clickButton);

                if( raznicha != 1 )
                {
                    activeButton.classList.remove(activePaginationButton);

                    let setButton = document.querySelectorAll('div.pagination div[data-block-pages] button')[1];
                    setButton.classList.add(activePaginationButton);
                    setButton.innerText = clickButton.innerText;

                    let listButtons = Array.prototype.filter.call(setButton.parentNode.children, function(child){
                        return child !== setButton;
                    });

                    listButtons.forEach(function (current) {
                        if( indexInParent(current) < indexInParent(setButton) )
                            current.innerText = parseInt(setButton.innerText) - 1;
                        else
                           current.innerText = parseInt( setButton.innerText)  +  indexInParent(current) - indexInParent(setButton);
                    });

                }
                else
                {
                    clickButton.innerText = parseInt(clickButton.innerText) - 1;

                    let listButtons = Array.prototype.filter.call(clickButton.parentNode.children, function(child){
                        return child !== clickButton;
                    });

                    listButtons.forEach(function (current) {
                        current.innerText = parseInt(current.innerText) - 1;

                    });

                }
            }


            if( countPages > 4 )
            {
                //скрываем левую кнопку
                newActiveButton = document.querySelector('div.pagination button.pagination-activ');
                if(newActiveButton.innerText == 1 )
                {
                    document.querySelector('div.pagination button.prev').classList.add(hideButton);

                }
                //показываем правую
                if( newActiveButton.innerText < countPages )
                {
                    document.querySelector('div.pagination button.next').classList.remove(hideButton);
                }
            }

            break;
    }

  //проверяем есть ли в массиве эти данные


    activeButton = document.querySelector('div.pagination button.pagination-activ');

    let url_string = window.location.href;
    let url = new URL(url_string);
    let select_sort = url.searchParams.get("sort");
    let select_page = url.searchParams.get("page");
    let path = "";

    if(select_sort == null)
        path += "";
    else
        path += '?sort='+select_sort;

    if( activeButton.innerText == 1)
        path += "";
    else
        path =  select_sort == null ? '?page='+activeButton.innerText : path +'&page='+ activeButton.innerText;

    history.pushState({foo: 'page'}, path, window.location.origin+window.location.pathname+path);


    if( arrayItems[activeButton.innerText])
    {
        if( !arrayItems[prevButtonActiveNumber])
            arrayItems[prevButtonActiveNumber] = document.querySelector('div.products-box,div.card-box').innerHTML;
        //надо переделать
        document.querySelector('div.products-box,div.card-box').innerHTML = arrayItems[activeButton.innerText];
        canChange = true;

    }
    else
    {

        if(!arrayItems[prevButtonActiveNumber])
            arrayItems[prevButtonActiveNumber] = document.querySelector('div.products-box,div.card-box').innerHTML;

        sort = "create_date"; //нужно проверить
        if( document.querySelector('div.sorting'))
        {
           if(  document.querySelector('div.sorting button.sorting-activ').innerText == "по цене" )
               sort = 'price';
        }

        offset =( ( parseInt( activeButton.innerText ) - 1) * limitItems );

       requestGetItems( offset , limitItems,  sort , pageId )
            .then( result => {
                canChange = true;
                if(IS_AUTH)
                {
                    requestCheckFavoritesItems(result , 'card-box');
                }
            });
    }

    window.scrollTo( document.querySelector('div.card-box').offsetTop, document.querySelector('div.card-box').offsetTop );
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
        });
       
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

        html += "<div class='card' data-catalog-item-id='"+item.id+"'>" +
                     "<div class='card-img'><a href='"+item.href+"'><img src='"+images_path+"' /></a></div>"; //картинка
        if( item.price )
             html +=  "<div class='card-price'><p><span>*****</span><span>"+item.price+"</span> руб.</p></div>"; //цена

        if( is_show_favorite )
             html += "<div class='card-favorites'></div>"; // избранное
        html += "<div class='card-text'>" +
                     "<a href='"+item.href+"'>"+item.title+"</a>" +
                         "<p>"+(item.description == null ? "" : item.description)+"</p>" +
                 "</div>" +
                 "<div class='card-link'>" +
                    "<a href='"+item.href+"'>" +
                            "Подробно" +
                    "</a>" +
                 "</div>" +
            "</div>";
    }

    document.querySelector('div.card-box, div.products-box').innerHTML = html;
    return  listIdItems;

}

document.addEventListener('click' , function () {

    if(event.target.tagName == "BUTTON" && event.target.closest('div[data-block-pages]') && event.target.closest('div.pagination'))
    {
        if( !event.target.classList.contains(activePaginationButton))
        {
            let activeButton = event.target.parentNode.querySelector('button.'+activePaginationButton);
            if( event.target.innerText > activeButton.innerText )
                changePagination("next" , activeButton, event.target);
            else
                changePagination("prev" , activeButton, event.target);

        }
        return;
    }

    if(event.target.tagName == "BUTTON" && event.target.classList.contains('prev') && event.target.closest('div.pagination'))
    {
        let clickButton = event.target.parentNode.querySelector('div[data-block-pages] button.'+activePaginationButton);
        changePagination("prev" , clickButton , clickButton.previousElementSibling);
    }

    if( event.target.tagName == "BUTTON" && event.target.classList.contains('next') && event.target.closest('div.pagination'))
    {
        let clickButton = event.target.parentNode.querySelector('div[data-block-pages] button.'+activePaginationButton);
        changePagination("next" , clickButton, clickButton.nextElementSibling);
    }

});

