( function($){

	requestCheckAuth("production");
	requestGetMenuCategories();

	var html = "";
	var pictures = [];

	$('.production-left').children().each( function(){
		html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
		pictures.push({ src : $(this).find('img').attr('src') });
	});

	$('.production-right').children().each( function(){
		html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
		pictures.push({ src : $(this).find('img').attr('src') });
	});
	$('.production-slider').html(html);

	$('.production-slider').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows:false,

	});


	$('button[data-action]').click( function(){
		if($(this).attr('data-action') == "next" )
			$('.production-slider').slick('slickNext');
		else
			$('.production-slider').slick('slickPrev');


	});

	$('section.production').on('click' , 'a[id-picture]' , function(){


		$.fancybox.open( pictures , {
			loop : true,
			index: $(this).attr('id-picture'),
		});
	});

})(jQuery);