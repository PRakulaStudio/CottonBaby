

( function(){
	"use strict";
		let mobileWidth = 800;
		requestCheckAuth('contacts');
		requestGetMenuCategories();


		function initMap()
		{
				var myLatlng = new google.maps.LatLng( 56.822222 , 60.615877);

			    var myOptions = {
				    zoom: 16,
			        center: myLatlng,
			        disableDefaultUI: true
			    };

			    var map = new google.maps.Map(document.getElementById("map"), myOptions);
			    var marker = new google.maps.Marker({
				    position: myLatlng,
				    title:"Hello World!"
				});

				// To add the marker to the map, call setMap();
				marker.setMap(map);

		}

		google.maps.event.addDomListener(window, 'load', initMap);

		document.querySelector('button[data-action]').onclick = function (event) {

			if( event.target.getAttribute('data-action') == "show")
			{
				event.target.setAttribute('data-action' , 'hide');
				event.target.parentNode.querySelector('.info').style.height = '195px';
				event.target.innerText = "Свернуть";
			}
			else
			{
				event.target.setAttribute('data-action' , 'show');
				event.target.parentNode.querySelector('.info').style.height = '0px';
				event.target.innerText = "Развернуть";
			}
		};

		// $('button[data-action]').click( function() {
		// 	if( $(this).attr('data-action') == "show" )
		// 	{
		// 		$(this).attr('data-action' , 'hide');
		// 		$(this).siblings('.info').height('195px');
		// 		$(this).text('Свернуть');
        //
        //
		// 	}
		// 	else
		// 	{
		// 		$(this).attr( 'data-action' , 'show');
		// 		$(this).siblings('.info').height('0px');
		// 		$(this).text('Развернуть');
		// 	}
		//
		// });


		window.onresize = function (event) {
			if( window.innerWidth >= mobileWidth )
				document.querySelector('button[data-action]').parentNode.querySelector('.info').style.height = "195px";
			else
			{
				if( document.querySelector('button[data-action]').getAttribute('data-action') == "show" )
				{
					document.querySelector('button[data-action]').parentNode.querySelector('.info').style.height = "0px";
					document.querySelector('button[data-action]').innerText = "Развернуть";
				}
			}



		};

		// $(window).resize( function() {
		// 	if( $(window).width() >= 800)
		// 	{
		// 		$('button[data-action]').siblings('.info').height('195px');
		// 	}
		// 	else
		// 	{
		// 		if(  $('button[data-action]').attr('data-action') == "show" )
		// 		{
		// 			$('button[data-action]').siblings('.info').height('0px');
		// 			$(this).text('Свернуть');
        //
		// 		}
		// 	}
        //
		// });



})();