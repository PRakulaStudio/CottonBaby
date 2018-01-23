"use strict";

( function($){

    a
    var slider = $('.slider'), //условная переменная для слайдера
        ready = [],
        currentNewSlide = 0,
        maxNumberOnLoadSlide = 0,
        numberRest = 6,
        slickCreate = false,
        isAuth = false;


    //заполняем header если пользователь залогинен(НЕОБХОДИМО ПРАВИТЬ)
    function changeDataheader(data)
    {
        let header = $('.header-user');
        $(header).find('span.basket').text(data.basket).end()
                 .find('span.favorites').text(data.favorites).end()
                 .find('a').text("Здравствуйте, "+data.name);

    }

    function checkChangeFavorite(identificator)
    {
        ready[identificator] = true;

        if(ready['addSlider'] && ready['isAuth'])
            changeFavoriteInSlider();


    }

    //функция, дающая  доступ на проверку фаворитность товаров у слайдера при выполнении определенных условий
    function canAdd(indetificator)
    {
        if(ready[indetificator] == "undefined")
            ready[indetificator] = true;

        if(ready['isAuth'] && ready['isAdd'])
            changeFavoriteInSlider();

    }


    function changeFavoriteInSlider()
    {
        var data = {};
            data['get'] = "changeFavorite";
          //  data['id_products'] =     массив id товаров из слайдера
        $.ajax({
            url : "/cabinet",
            dataType : 'json',
            data : data,
            success : function( data, status){

                if( data.status )
                {
                    if( data.changeFavorites )
                    {

                    }
                }
                else
                {
                    alert('Не получилось получить список id аворитных товаров');
                }

            },
        })

    }


    function addItemsInSlider(sliders, list_favorites , container)
    {
        for( let key in sliders )
        {
           // $(container).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
        }

    }

    function toObject( list )
    {
        let object = {};
        for( let key in list)
           object[key] = list[key];
        
        return object;
    }

    function getSliderItems(offset , limit)
    {
        let data = {};
            data['get'] = "sliderItems",
            data['offset'] = offset,
            data['limit'] = limit;
        
        $.ajax({
            url : "/cabinet",
            dataType : 'json',
            data : data,
            success : function( data, status){
              if( data.status )
              {

                  if( data.sliderItems != "undefined" )
                  {
                      //добавление в слайдер и уже после идет его инициализация
                      addItemsInSlider( data.sliderItems , favorites , slider);

                      if(!slickCreate)
                         createSlick(slider);

                      //функция callback
                      checkChangeFavorite('addSlider');

                  }

              }
              else
              {
                   alert("Не получилось получить объекты для слайдера");
              }
            },
        });

    }

    //функция, создающая слайдер
    function createSlick() 
    {

        slider.slick({
            //infinite : true,
            slideToShow: 3,
            slidToScroll: 3,
            arrows : false,
        });

        //событие на подгрузку новых элементов в слайдер
        $(slider).on("afterChange", function(event, slick, currentSlide){
            checkOnLoadSlider(slick , currentSlide);
        });
        
        
    };


    //проверка на добавление новых элементов в слайдер
    function checkOnLoadSlider(slick , currentSlide)
    {
        
        if(currentSlide > currentNewSlide  && currentNewSlide != currentSlide )
        {

            if( currentSlide % numberRest == 0 && currentSlide > maxNumberOnLoadSlide)
            {
                maxNumberOnLoadSlide = currentSlide;
                //тут будем добавлять элементы
                getSliderItems(slick.slideCount  , 12 );
            }
        }
        else
          console.log("Нажал")

    }

        
    //запрос на добавление новых элементов
    function onLoadSlider()
    {


    }



    //получение модификаторов
    function getItemModificators()
    {
        $.ajax({
            url : "/cabinet",
            dataType : 'json',
            data : {'get' : "itemModificators"  },
            success : function( data , status){
                if( data.status)
                {

                    if( data.itemModificators )
                    {
                        let countModificators = 0;

                        for( let key in data.itemModificators )
                           countModificators += sendModificator( key , data.itemModificators[key] );

                        //меняем текст кнопки
                        if(countModificators)
                        {

                        }

                    }

                }
                else
                {
                    alert("Не получилось получить модификаторы товара");
                }
            },

        });
    }


    function checkFavoriteItems(items_id)
    {
        var data = {};
            data['get'] = "checkFavorite";
            data['items_id'] = JSON.stringify( toObject(items_id) ); //нужно затестить

        $.ajax({
           url: "/cabinet",
           dataType : "json",
           data : data,
           success : function( data, status){
               if( data.status )
               {
                 //меняем иконку "Избранное"
               }
               else
                 alert("Не получилось проверить: находиться ли товар в 'Избранном'");
               

           },

        });
    }

    //проверка авторизации
    function checkAuth()
    {
        $.ajax({
            url: "/cabinet",
            dataType : 'json',
            data : {'get' : 'auth'},
            success : function( data, status )
            {
                //проверяем, что пришел положительный отклик от сервера
                if(data.status)
                {
                    //2.2
                    if(data.auth)
                    {
                        //запрос на  проверку фаворитного товара
                        let products = [ product_id ];
                        checkFavoriteItems( products );
                        //изменение заголовка
                        changeDataHeader(data);
                        isAuth = true;
                        //функция callback
                        checkChangeFavorite('isAuth');
                    }

                    getItemModificators();

                }
                else
                {
                    alert("Не получилось проверить авторизацию пользователя");
                }


            },
        });

    }


    //2.0
    checkAuth();
    getSliderItems(0,12);



})(jQuery);