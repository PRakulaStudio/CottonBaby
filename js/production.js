( function($){

	var html = "";
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
	
})(jQuery);