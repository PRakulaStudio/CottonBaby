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
    canChange = true,
    countPages = 0,
    blockPagination = document.querySelector('div.pagination'),
    cloneBlockPagination = "",
    blockSpinner = '<div class="request-spinner ispinner ispinner--gray ispinner--animating">' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                        '<div class="ispinner__blade"></div>' +
                    '</div>';


function createPagination( total ,  pageName)
{

    countPages =  Math.ceil( total / limitItems );
    arrayItems = {};

   if(pageId === false)
        pageId = pageName;

   let hideLocalButton = "";

    if(countPages == 1)
    {
        blockPagination.innerHTML = "";
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
        if(select_page > 2  && countPages > 4 && select_page < countPages - 1)
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

        html += "<button data-page='"+pagination_page_start+"' class='"+activeLocal+"'>"+pagination_page_start+"</button>";
        activeLocal = "";
    }


    if( countPages <= 4 || select_page == countPages )
        hideLocalButton = hideButton;

    html += "</div>" +
        "<button  class='pagination-arrow next "+hideLocalButton+"'>►</button>";
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

function setPaginationValue(button , value)
{
    button.setAttribute('data-page' , value);
    if(button.querySelector('div.request-spinner'))
        button.innerHTML = blockSpinner + value;
    else
        button.innerText = value;
}

function changePagination(direction , activeButton , clickButton )
{
    canChange = false;

    let offset = 0,
        limit = 0,
        sort = "",
        prevButtonActiveNumber = activeButton.innerText,
        newActiveButton = "";


    switch (direction)
    {
        case "next" :
            if( (clickButton.getAttribute('data-page')   <= 2) || (countPages - 1) <= clickButton.getAttribute('data-page') )
            {

                if( (indexInParent(clickButton) - indexInParent(activeButton) != 1) && countPages > 4 )
                {
                    if( clickButton.getAttribute('data-page') <= countPages - 1)
                    {
                        clickButton = clickButton.previousElementSibling;
                        setPaginationValue(clickButton ,  parseInt( clickButton.getAttribute('data-page') ) + 1  );

                        let listButtons = Array.prototype.filter.call(clickButton.parentNode.children, function(child){
                            return child !== clickButton;
                        });

                        listButtons.forEach( function (current) {
                            setPaginationValue(current , parseInt(current.getAttribute('data-page')) + 1 );
                        });
                    }
                }

                activeButton.classList.remove(activePaginationButton);
                clickButton.classList.add(activePaginationButton);

                if( clickButton.getAttribute('data-page') == countPages )
                    clickButton.parentNode.nextElementSibling.classList.add( hideButton );


            }
            else
            {
                var raznicha = indexInParent(clickButton) - indexInParent(activeButton);

                if( raznicha != 1 )
                {
                    activeButton.classList.remove(activePaginationButton);

                    let setButton = blockPagination.querySelectorAll('div[data-block-pages] button')[1];
                    setButton.classList.add(activePaginationButton);
                    setPaginationValue(setButton , clickButton.getAttribute('data-page') );

                    let listButtons = Array.prototype.filter.call(setButton.parentNode.children, function(child){
                        return child !== setButton;
                    });

                    listButtons.forEach(function (current) {
                        if( indexInParent(current) < indexInParent(setButton))
                            setPaginationValue(current ,  parseInt(setButton.getAttribute('data-page')) - 1 );
                        else
                            setPaginationValue(current, parseInt(setButton.getAttribute('data-page')) +  indexInParent(current) - indexInParent(setButton) );

                    });

                }
                else
                {
                    setPaginationValue(clickButton ,  parseInt( clickButton.getAttribute('data-page') ) + 1 );
                    let listButtons = Array.prototype.filter.call(clickButton.parentNode.children, function(child){
                        return child !== clickButton;
                    });

                    listButtons.forEach(function (current) {
                       setPaginationValue( current, parseInt(current.getAttribute('data-page')) + 1);
                    });

                }
               //if( parseInt(clickButton.text()) - parseInt(activeButton.text()) >= 2 )
            }

            newActiveButton = blockPagination.querySelector('button.pagination-activ');
            //показываем левую кнопку
            if( countPages > 4 )
            {
                //показываем левую
                if( newActiveButton.getAttribute('data-page') > 1  )
                    blockPagination.querySelector('button.prev').classList.remove(hideButton);


                //скрываем правую
                if( newActiveButton.getAttribute('data-page') == countPages )
                    blockPagination.querySelector('button.next').classList.add( hideButton );
            }

            break;

        case "prev" :

            if( ( clickButton.getAttribute('data-page')  < 2 ) || (countPages - 2) <=  clickButton.getAttribute('data-page') )
            {
                activeButton.classList.remove(activePaginationButton);
                clickButton.classList.add(activePaginationButton);

                if( clickButton.getAttribute('data-page') == 1)
                    clickButton.parentNode.previousElementSibling.classList.add('hide-button');
            }
            else
            {
                var raznicha = indexInParent(activeButton) - indexInParent(clickButton);

                if( raznicha != 1 )
                {
                    activeButton.classList.remove(activePaginationButton);

                    let setButton = blockPagination.querySelectorAll('div[data-block-pages] button')[1];
                    setButton.classList.add(activePaginationButton);
                    setPaginationValue(setButton , clickButton.getAttribute('data-page') );

                    let listButtons = Array.prototype.filter.call(setButton.parentNode.children, function(child){
                        return child !== setButton;
                    });

                    listButtons.forEach(function (current) {
                        if(indexInParent(current) < indexInParent(setButton) )
                           setPaginationValue(current, parseInt(setButton.getAttribute('data-page')) - 1 );
                        else
                           setPaginationValue(current, parseInt( setButton.getAttribute('data-page'))  +  indexInParent(current) - indexInParent(setButton) );
                    });
                }
                else
                {

                    setPaginationValue( clickButton, parseInt(clickButton.getAttribute('data-page')) - 1 );
                    let listButtons = Array.prototype.filter.call(clickButton.parentNode.children, function(child){
                        return child !== clickButton;
                    });
                    listButtons.forEach(function (current) {
                        setPaginationValue(current, parseInt(current.getAttribute('data-page')) - 1 );
                    });

                }
            }

            if( countPages > 4 )
            {
                //скрываем левую кнопку
                newActiveButton = blockPagination.querySelector('button.pagination-activ');
                if(newActiveButton.getAttribute('data-page') == 1 )
                   blockPagination.querySelector('button.prev').classList.add(hideButton);

                //показываем правую
                if( newActiveButton.innerText < countPages )
                    blockPagination.querySelector('button.next').classList.remove(hideButton);

            }

            break;
    }

  //проверяем есть ли в массиве эти данные

    activeButton = blockPagination.querySelector('button.pagination-activ');

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
        if(  blockPagination.querySelector('div.request-spinner') )
        {
            if( blockPagination.querySelector('button.hide-text-button') )
                blockPagination.querySelector('button.hide-text-button').classList.remove('hide-text-button');
            blockPagination.querySelector('div.request-spinner').remove();
        }
        document.querySelector('div.products-box,div.card-box').innerHTML = arrayItems[activeButton.innerText];
        canChange = true;

        window.scrollTo( document.querySelector('div.card-box').offsetTop, document.querySelector('div.card-box').offsetTop );

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
       // event.target.innerHTML = event.target.innerHTML + blockSpinner;

        requestGetItems( offset , limitItems,  sort , pageId )
            .then( result => {
                if(  blockPagination.querySelector('div.request-spinner') )
                {
                    if( blockPagination.querySelector('button.hide-text-button') )
                        blockPagination.querySelector('button.hide-text-button').classList.remove('hide-text-button');
                    blockPagination.querySelector('div.request-spinner').remove();
                }

                window.scrollTo( document.querySelector('div.card-box').offsetTop, document.querySelector('div.card-box').offsetTop );
                canChange = true;
                if(IS_AUTH)
                {
                    requestCheckFavoritesItems(result , 'card-box');
                }
            });
    }

}

function requestGetItems(offset , limit , sort , pageName)
{
    if(pageId === false)
        pageId = pageName;

    let data = new FormData();
    let show_favorites = true;
    let url = "";

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
            url = window.pms.config.catalogAPI + "search";
            data.append('id' , decodeURI(window.location.pathname.substring(8)) );
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
                window.location.replace(window.location.href);
            }
            return responseData;
        })
        .then(function (response) {

           try{
               if( response.status)
                   return createItems(response.data.items , show_favorites);
               else
               {
                   if(document.querySelector('div.block-empty'))
                       document.querySelector('div.block-empty').classList.remove('d-none');
                   return;
               }
             }
            catch(error)
            {
                window.location.replace(window.location.href);
            }


        });
       
}

function createItems(items , is_show_favorite)
{
    var html = "",
        item = "",
        listIdItems = [];

    for( var key in items)
    {
        item = items[key];
        listIdItems.push(item.id);
        let  images_path = "/images/";

            if( item.images &&  item.images[0])
                images_path =item.images[0];
            if( item.images &&  item.images[0] && item.images[0]['750x750']  )
                images_path =item.images[0]['750x750'];

        let spinner = '<div class="lazy ispinner ispinner--gray ispinner--animating" data-src="'+images_path+'">' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                            '<div class="ispinner__blade"></div>' +
                        '</div>';

        html += "<div class='card' data-catalog-item-id='"+item.id+"'>";
        if( is_show_favorite )
            html += "<div class='card-favorites'></div>";
            html +=   "<a href='"+item.href+"'>" +
                         "<div class='card-img'>"+spinner+"</div>" +
                         "<div class='card-info' >";
                    if( item.price )
                    html +=  "<div class='card-price'><p><span>"+item.price+"</span> руб.</p></div>"; //цена

                    html += "<div class='card-text'>" +
                                 "<p>"+(item.title)+"</p>" +
                            "</div>" +
                         "</div>" +
                      "</a>" +
                 "</div>";
    }

    document.querySelector('div.card-box, div.products-box').innerHTML = html;
    lazyLoad();

    // [].forEach.call(document.querySelector('div.card-box, div.products-box').querySelectorAll('img.lazy'), function(img) {
    //     img.setAttribute('src', img.getAttribute('data-src'));
    //     img.onload = function() {
    //         img.removeAttribute('data-src');
    //     };
    // });

    return  listIdItems;
}

document.addEventListener('click' , function (event) {

    if(event.target.tagName == "BUTTON" && event.target.closest('div[data-block-pages]') && event.target.closest('div.pagination'))
    {
        if(!canChange)
            return;

        if( !event.target.classList.contains(activePaginationButton))
        {


            let activeButton = event.target.parentNode.querySelector('button.'+activePaginationButton);

            event.target.innerHTML = event.target.innerHTML + blockSpinner;
            event.target.classList.add('hide-text-button');


            if( event.target.innerText > activeButton.innerText )
                changePagination("next" , activeButton, event.target);
            else
                changePagination("prev" , activeButton, event.target);

        }
        return;
    }

    if(event.target.tagName == "BUTTON" && event.target.classList.contains('prev') && event.target.closest('div.pagination'))
    {
        if(!canChange)
            return;

        let clickButton = event.target.parentNode.querySelector('div[data-block-pages] button.'+activePaginationButton);

        event.target.innerHTML = event.target.innerHTML + blockSpinner;
        event.target.classList.add('hide-text-button');

        changePagination("prev" , clickButton , clickButton.previousElementSibling);
    }

    if( event.target.tagName == "BUTTON" && event.target.classList.contains('next') && event.target.closest('div.pagination'))
    {
        if(!canChange)
            return;
        let clickButton = event.target.parentNode.querySelector('div[data-block-pages] button.'+activePaginationButton);

        event.target.innerHTML = event.target.innerHTML + blockSpinner;
        event.target.classList.add('hide-text-button');

        changePagination("next" , clickButton, clickButton.nextElementSibling);
    }

});

