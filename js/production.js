( function($){

	requestCheckAuth("production");
	requestGetMenuCategories();

	let html = "",
		pictures = [],
		puctureBlocks = docuemnt.querySelector('div.production-left').childNodes.concat(docuemnt.querySelector('div.production-right').childNodes);


	puctureBlocks.forEach(function (currentValue, index, array) {
		html +=  "<div class='slide'>"+currentValue.outerHTML+"</div>";
		pictures.push({ src : currentValue.querySelector('img').getAttribute('src') });
	})

	document.querySelector('div.production-left').childNodes.forEach( function(currentValue, index, array){
		html += "<div class='slide'>"+currentValue.outerHTML+"</div>";
	});

	$('.production-left').children().each( function(){
		html += "<div class='slide'>"+$(this).prop('outerHTML')+"</div>";
		pictures.push({ src : $(this).find('img').attr('src') });
	});

	docuemnt.querySelector('div.production-right').childNodes.forEach( function(currentValue, index, array){
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