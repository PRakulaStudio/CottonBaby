requestCheckAuth('index');
requestGetMenuCategories();

( function($){
	"use strict";


	
	var autoPlay = false
	var offset = 20;

	function sliderAnimation( sliderClass )
	{
		
		 if( $(window).width() < 1000 )
		 {
		 		if(!autoPlay)
		 		{
		 			$('.'+sliderClass).slick('slickPlay');	
		 			autoPlay = true;
		  		//	console.log('autoplay on - '+autoPlay);
		 		}
		  		
		 }
		  else
		  {
		  	   if(autoPlay)
		  	   {
		  	   	  $('.'+sliderClass).slick('slickPause');
		  	   	  autoPlay = false;
		  	   	 // console.log('autoplay off - '+autoPlay);
		  	   }
		  	  
		  }
	}

	function sendRequestFind()
	{
		$.ajax({
			data: {"get" : "findReqest"},
			dataType: 'json',
			url: '/system/plugins/index',
			success: function( data, status)
			{
				if(data.status)
				{
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
			}

		});

	}

	//ajax запрос
	function onLoadSlider( offset , limit )
	{

		$.ajax({
			data: {"get" : "sliders" , "offset" : offset , "limit" : limit}, 
			dataType: 'json',
			
			url: '/system/plugins/index',
			
			success: function( data, status ){
				if(data.status && data.sliders !== "undefined" )
				{
					/*
						[
							id,
							src_image,
							link,
							sum,
							is_favorite,							
						]
					*/
				}
				else
					alert('Ошибка при запросе слайдеров');
					
			},
		});


	}

	function onLoadImageInstagramm( offset , limit)
	{

		$.ajax({
			data: {"get" : "instaImages" , "offset" : offset , "limit" : limit },
			dataType: 'json',
			type: 'POST',
			url: '/system/plugins/index',
			success: function( data, status )
			{
				if( data.status && data.instaImages != "undefined")
				{
					/*
						[
							id,
							src_images,						
						]
					*/
				}
				else
					alert("Ошибка при запросе инстаграмных картинок");
				
			},
		});

	}


	function handlerEmptyBlockForNewSlider()
	{
		if( window.innerWidth <= 1000 )
		{

			let slider = document.querySelector('.new-slider .slick-track'),
				sliders = slider.children;

			if( document.querySelector('.new-slider [data-type="empty"]') )
			{
			//	console.log("Удалил");
				//$('.new-slider').slick('slickRemove',sliders.length - 1);
			//	$('.new-slider').slick('slickRemove',sliders.length - 1);
			}


		}
		else
		{

			//если все товары были подгружены
			if( document.querySelector('.new-slider').getAttribute('data-load-items') &&
					!document.querySelector('.new-slider [data-type="empty"]')
			   )
			{
			//	$('.new-slider').slick('slickAdd', '<div class="slide" data-type="empty"></div>');
			//	$('.new-slider').slick('slickAdd', '<div class="slide" data-type="empty"></div>');
			//	console.log('Добавил');
			}



		}
	}


 	 $('.slider').on('init' ,  function(event, slick, currentSlide, nextSlide){
	            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
		    $(".main-slider .count-slider .total-slider").text(slick.slideCount);
			   
	  });
	 $('.slider').slick({
			 autoplay: false,
	 		 autoplaySpeed: 2000,
	 		 pauseOnFocus: false,
     		 pauseOnHover: false,
	 	     slidesToShow:1,
	  		 slidesToScroll:1,
	  			 //autoplayTimeout: 500,

	  });
	 sliderAnimation('slider');
		
     $(".slider").on("afterChange", function(event, slick, currentSlide){
	       	$(".main-slider .count-slider .current-slide").text(slick.currentSlide + 1);
		});




    $( window ).resize( function() {
		   	 sliderAnimation('slider');

			 if( $(window).width() <= 1500)
				 $('div.production-index-button').show();
			 else
				 $('div.production-index-button').hide();

			handlerEmptyBlockForNewSlider()


		});


	$('.new-slider').slick({
		centerPadding: '10px',
		infinite: false,
		slideToScroll: 1,
		arrows : false,
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 2550,
				settings: {
					slidesToShow: 4,
					variableWidth: true
				}
			},

			{
				breakpoint: 1260,
				settings: {
					slidesToShow: 3,
					variableWidth: true
				}
			},

			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
				}
			},

			{
				breakpoint: 610,
				settings: {
					slidesToShow: 1,
				}
			}

		]
	});
	//requestGetNews(0, 20);


    function requestGetNews(offset , limit ) {

		 let url = window.pms.config.catalogAPI +"category";
		 var data = new FormData();
		 var listIdItems = [];

		 data.append('offset' , offset);
		 data.append('limit' , limit);
		 data.append('show_href' , true);
		
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

				 for( var key in response.data.items )
				 {

					 let item = response.data.items [key];
					 listIdItems.push(item.id) ;
					 //listIdItems.push(item.id);
					 let images_path = "";

					 try{
						 images_path = item.images[0];
					 }
					 catch (e)
					 {
						 images_path = "/images/";
					 }

					 let slide = " <div class='slide'><div class='new-box' data-catalog-item-id='"+item.id+"'><div>" +
									 "<div><a href='"+item.href+"'><img src='"+images_path+"' /></a></div>" + //картинка
									 "<div><p><span>*****</span><span>"+item.price+"</span> руб.</p></div>" + //цена
									 "<div class='block-button-favorites'></div>" +// избранное
									 "<div>" +
									 "<a href='"+item.href+"'>"+item.title+"</a>" +
									 "<p>"+(item.description == null ? "" : item.description)+"</p>" +
									 "</div>" +

									 "<a href='"+item.href+"'>" +
									 "Подробно" +
									 "</a>" +
									 "</div></div></div>";

					 $('.new-slider').slick('slickAdd' ,slide );
					 
				 }
					requestCheckFavoritesItems(listIdItems , 'new-slider');

				 //	$('.new-slider').slick('slickAdd', '<div class="slide" data-type="empty"></div>');
				 //	$('.new-slider').slick('slickAdd', '<div class="slide" data-type="empty"></div>');


			 })
		

	 }
	

	$('div.new-button button').click( function(){

		if($(this).attr('data-action') == "next" )
			$('.new-slider').slick('slickNext');
		else
			$('.new-slider').slick('slickPrev');


	})
	
	let currentNewSlide = 0,
		maxNumberOnLoadSlide = 0,
		numberRest = 16;
	// $('.new-slider').on('afterChange' , function(event, slick, currentSlide){
	// 	if(currentSlide > currentNewSlide  && currentNewSlide != currentSlide )
	// 	{
    //
	// 		if( currentSlide % numberRest == 0 && currentSlide > maxNumberOnLoadSlide)
	// 		{
	// 			maxNumberOnLoadSlide = currentSlide;
	// 			offset += 20;
	// 			requestGetNews( offset , 20);
	// 		}
	// 	}
	// 	else
	// 	{
	// 		//console.log("Нет новых слайдов");
	// 	}
	// 	currentNewSlide = currentSlide;
    //
	// });
	handlerEmptyBlockForNewSlider();


	$('.production-index-slider').slick({
		slideToScroll : 5,
		arrows : false,
		infinite : true,
		slidesToShow : 5,
		responsive : [
			{
				breakpoint : 1500,
				settings : {
					slidesToShow : 4,
					slideToScroll : 4,
				}

			},
			{
				breakpoint : 1000,
				settings : {
					slidesToShow : 3,
					slideToScroll : 3,
				}
			},
			{
				breakpoint : 650,
				settings : {
					slidesToShow : 2,
					slideToScroll : 2,
				}
			},
			{
				breakpoint : 400,
				settings : {
					slidesToShow : 1,
					slideToScroll : 1,
				}
			},
		],

	});
	$('div.production-index-button button').click( function(){

		if($(this).attr('data-action') == "next" )
			$('.production-index-slider').slick('slickNext');
		else
			$('.production-index-slider').slick('slickPrev');


	});
	if( $(window).width() <= 1500)
		$('div.production-index-button').show();
	else
		$('div.production-index-button').hide();


	
	$('.insta-slider').slick({
			slideToScroll : 3,
			arrows : false,
			infinite : true,
			slidesToShow : 3,
			autoplay: true,
			autoplaySpeed: 1000,
			responsive : [
				{
					breakpoint : 1000,
					settings : {
						slidesToShow : 3,
						slideToScroll : 3,
					}

				},
				{
					breakpoint : 650,
					settings : {
						slidesToShow : 2,
						slideToScroll : 2,
					}
				},
				{
					breakpoint : 400,
					settings : {
						slidesToShow : 1,
						slideToScroll : 1,
					}
				},
			],

		});



	if( $(window).width() >= 820)
	{
		$('video').each( function(){
			  console.log($(this));
			  $(this)[0].load();
			  $(this)[0].play();
		});
	}




		//событие на нажатие кнопкки "регистрация"
	$('div.reg-box button').click( function(){
			var data = {};

			$('div.reg-box').find('input').each( function(){
				validateData($(this) , data , 'input-error-bottom');

			});


			if(!$('div.reg-box').find('input').hasClass('input-error-bottom'))
			{
				localStorage.removeItem('reg');
				localStorage.setItem('reg' , JSON.stringify(data));
				window.location.replace('registration.html');
			}


		});





})(jQuery)

