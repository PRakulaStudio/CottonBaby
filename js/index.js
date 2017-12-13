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

	//ajax запрос
	function onLoadSlider()
	{

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
		  slidesToShow: 3,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1
		      }
		    }
		  ]
		});

        var currentNewSlide = 0;
        var maxNumberOnLoadSlide = 0;

        $('.new-slider').on('afterChange' , function(event, slick, currentSlide){
        	        	
        	
        	if(currentSlide > currentNewSlide  && currentNewSlide != currentSlide )
        	{
	        	
	        	if( currentSlide % 2 == 0 && currentSlide > maxNumberOnLoadSlide)
	        	{
	        		maxNumberOnLoadSlide = currentSlide;

	        		//запрос на добавление нового слайда
	        		$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
	        		$(this).slick('slickAdd','<div class="slide"><img src="images/300x500.png"></div>');
	        	}

        	}
	        else
	        {
	        	//console.log("Нет новых слайдов");
	        }	
               	
       		currentNewSlide = currentSlide;

       	});



})(jQuery)

