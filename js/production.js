( function($){

	var html = "";

		$('.production-left').children().each( function(){
			html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
		});
	
		$('.production-right').children().each( function(){
			html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
		});
    	 $('.production-slider').html(html);

		$('.production-slider').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows:false,
		});

		$("a#example1").fancybox();

		$('button[data-action]').click( function(){
				if($(this).attr('data-action') == "next" )
					$('.production-slider').slick('slickNext');
				else
					$('.production-slider').slick('slickPrev');


		});
	
})(jQuery);