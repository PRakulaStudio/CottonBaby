( function($){


    //тут надо подумать
    var limitItems = 9,
        totalItems = 75,
        arrayItems = [],
        activePaginationButton = "pagination-activ",
        hideButton = "ban-pagination",
        countPages = 0;

    function requestGetItems(offset , limit, sort)
    {
        var data = {};
            data['get'] = "products";
            data['offset'] = limit;
            data['limit'] = offset;
            data['sort'] = sort;

        $.ajax({
            url : "/catalog",
            dataType : 'json',
            data : JSON.stringify(data),
            success : function( data, status){
                if( data.status )
                {

                    if( data.products != "undefined" )
                    {
                        createBlockItems(products);
                    }

                }
                else
                {
                    alert("Не получилось получить объекты для вывода в каталоге");
                }
            },
        });

    }

    //блок с пагинацией

    function createPagination()
    {
        countPages =  Math.ceil( totalItems / limitItems );

        let hideLocalButton = "";
        console.log( countPages );
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

        $('div.katalog-pagination').html(html);


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

                    if(  (clickButton.index() - activeButton.index() != 1) && clickButton.text() != countPages  )
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

                       setButton =  $('div.katalog-pagination div[data-block-pages]').find('button').eq(1).addClass(activePaginationButton);
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

                var newActiveButton = $('div.katalog-pagination').find('button.pagination-activ');
                //показываем левую кнопку
                if( countPages > 4 )
                {
                    //показываем левую
                    if(newActiveButton.text() > 1  )
                       $('div.katalog-pagination').find('button.prev').removeClass(hideButton);

                    //скрываем правую
                    if( newActiveButton.text() == countPages )
                       $('div.katalog-pagination').find('button.next').addClass(hideButton);
                    
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

                        setButton =  $('div.katalog-pagination div[data-block-pages]').find('button').eq(1).addClass(activePaginationButton);
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
                    var newActiveButton = $('div.katalog-pagination').find('button.pagination-activ');
                    if(newActiveButton.text() == 1 )
                    {
                        console.log("aaa");
                        $('div.katalog-pagination').find('button.prev').addClass(hideButton);
                    }
                    //показываем правую
                    if( newActiveButton.text() < countPages )
                    {
                        $('div.katalog-pagination').find('button.next').removeClass(hideButton);
                    }
                }

                break;
        }

        //проверяем есть ли в массиве эти данные
        if( arrayItems[clickButton.text()] != "undefined" )
        {

            if( arrayItems[prevButtonActiveNumber] == "undefined")
                arrayItems[prevButtonActiveNumber] = $('div.container-items').children();
            //надо переделать
            $('div.container-items').html( arrayItems[clickButton.text()] );
        }
        else
        {
            if( arrayItems[prevButtonActiveNumber] == "undefined")
                arrayItems[prevButtonActiveNumber] = $('div.container-items').children();

            sort = "DESC"; //нужно проверить
            requestGetItems( offset * limit - limit + 1 , limit, sort);
        }

    }


    $("div.katalog-pagination").on('click' , "div[data-block-pages] button" , function(){
        if( !$(this).hasClass(activePaginationButton) )
        {
            let activeButton = $(this).siblings('button.'+activePaginationButton);

            if( $(this).text() >  activeButton.text() )
                changePagination("next" , activeButton , $(this));
            else
                changePagination("prev" , activeButton , $(this));

        }

    });


    $("div.katalog-pagination").on( 'click' , 'button.prev' , function(){
        let clickButton = $(this).siblings('div[data-block-pages]').find('button.'+activePaginationButton);
        changePagination("prev" , clickButton , clickButton.prev());
    });


    $('div.katalog-pagination').on('click' , "button.next" , function(){
        let clickButton = $(this).siblings('div[data-block-pages]').find('button.'+activePaginationButton);
        changePagination("next" , clickButton, clickButton.next());
    });

    //конец блока с пагинацией

    function createBlockItems(items)
    {
        var html = "";

        for( var key in items)
        {
            html += "<div>" +
                        "<div><img src='"+items[key].srcImage+"' /></div>" + //картинка
                        "<div><p>"+items[key].sum+"</p></div>" + //цена
                        "<div><button></button></div>" +// избранное
                        "<div>" +
                            "<a href='"+items[key].link+"'>"+itemds[key].name+"</a>" +
                            "<p>"+itemds[key].description+"</p>" +
                        "</div>" +
                        "<button>Подробно</button>" +
                        "<a href='"+items[key].link+"'>" +
                             "<img src='/images/icons/request.png' />Сделать запрос" +
                        "</a>" +
                    "</div>";
        }

        //надо переделать
        $('div.container-items').html( html );

    }

    function requestGetItems(offset , limit)
    {
        var data = {};
        data['get'] = "getItems";
        data['offset'] = offset;
        data['limit'] = limit;


        $.ajax({
            data: JSON.stringify(data),
            dataType: 'json',
            url: '/system/plugins/cabinet',
            success: function( data, status)
            {
                if( data.status && data.getItemds != "undefined" )
                {

                    createBlockItemds(data.getItems);

                    /*
                        [
                            id,
                            link_redirect,
                        ]

                        window.location.replace(link_redirect);
                        window.location.href = link_redirect;

                    */
                    //переход
                }
                else
                {
                    alert("Не получилось получить товары ")
                }
            },

        });


    }

    createPagination();

})(jQuery);