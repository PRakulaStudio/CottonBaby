	var autoPlay = false;	

	function sliderAnimation(sliderClass )
	{
		console.log(  $(window).width() );
		 if( $(window).width() < 1000 )
		 {
		 		if(!autoPlay)
		 		{
		 			$('.'+sliderClass).slick('slickPlay');	
		 			autoPlay = true;
		  			console.log('autoplay on - '+autoPlay);
		 		}
		  		
		 }
		  else
		  {
		  	   if(autoPlay)
		  	   {
		  	   	  $('.'+sliderClass).slick('slickPause');
		  	   	  autoPlay = false;
		  	   	  console.log('autoplay off - '+autoPlay);
		  	   }
		  	  
		  }
	}

	$(document).ready( function() {
		
		  $('.slider').on('init' ,  function(event, slick, currentSlide, nextSlide){
	    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			    $(".main-slider .count-slider .total-slider").text(slick.slideCount);
			   
			  });

		

			  $('.slider').slick({
				 autoplay:false,
	 			 autoplaySpeed:2000,
	 			 pauseOnFocus: false,
     			 pauseOnHover: false,
	 	         slidesToShow:1,
	  			 slidesToScroll:1,
	  			 //autoplayTimeout: 500,

		      });
			  sliderAnimation('slider');
		     

		      $(".slider").on("afterChange", function(event, slick, currentSlide){
		      	    	$(".main-slider .count-slider .current-slide").text(slick.currentSlide + 1);
		      	    	 sliderAnimation('slider');
		      	    	//slick.slickPlay();
		      	    	//slick.slickPause();
					});
			  	  
			 

			 $( window ).resize( function() {
			   	 sliderAnimation('slider');
			 });
	});