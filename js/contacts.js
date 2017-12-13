

( function($){
	"use strict";

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


		$('button[data-action]').click( function() {
			if( $(this).attr('data-action') == "show" )
			{
				$(this).attr('data-action' , 'hide');
				$(this).siblings('.info').height('335px');
				$(this).text('Свернуть');


			}
			else
			{
				$(this).attr( 'data-action' , 'show');
				$(this).siblings('.info').height('0px');
				$(this).text('Развернуть');
			}
		
		});


		$(window).resize( function() {
			if( $(window).width() >= 800)
			{
				$('button[data-action]').siblings('.info').height('335px');
			}
			else
			{
				if(  $('button[data-action]').attr('data-action') == "show" )
				{
					$('button[data-action]').siblings('.info').height('0px');
					$(this).text('Свернуть');

				}
			}

		});



})(jQuery);