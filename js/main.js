( function($){

	$('input[type="search"]').keypress(function (e) {
		if (e.which == 13) {
	  
	    	window.location.href ="/search?query="+$(this).val()+"";
	 	 }

	});


})(jQuery);