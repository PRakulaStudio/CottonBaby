( function($){
	"use strict";

	var autoPlay = false;	
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
		});



        $('.new-slider').slick({
		  centerPadding: '60px',
		  infinite: false,
		  slideToScroll: 1,
		  arrows : false,
		  slidesToShow: 3,
		  responsive: [
		 				 {
		 				 	breakpoint: 1550,
					  		settings: {
					        	slidesToShow: 2,
					      	}
		  				 },

		  				 {
		 				 	breakpoint: 640,
					  		settings: {
					        	slidesToShow: 1,
					      	}
		  				 }
		   		
		  ]
		});

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

		$('.insta-slider').slick({
			slideToScroll : 3,
			arrows : false,
			infinite : true,
			slidesToShow : 3,
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

		//

        var currentNewSlide = 0,
        	maxNumberOnLoadSlide = 0,
        	numberRest = 2;

        $('.new-slider').on('afterChange' , function(event, slick, currentSlide){
        	        	
        	
        	if(currentSlide > currentNewSlide  && currentNewSlide != currentSlide )
        	{
	        	
	        	if( currentSlide % numberRest == 0 && currentSlide > maxNumberOnLoadSlide)
	        	{
	        		maxNumberOnLoadSlide = currentSlide;

	        		//запрос на добавление нового слайда
	        	//	$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
	        	//	$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
	        	}

        	}
	        else
	        {
	        	//console.log("Нет новых слайдов");
	        }	
               	
       		currentNewSlide = currentSlide;

       	});

        $("a#example1").fancybox();

		$('button[data-action]').click( function(){
				if($(this).attr('data-action') == "next" )
					$('.production-index-slider').slick('slickNext');
				else
					$('.production-index-slider').slick('slickPrev');


		});


})(jQuery)