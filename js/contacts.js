window.onload = function() {

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

$(document).ready( function() {

		$('button[data-action]').click( function() {
			if( $(this).attr('data-action') == "hide" )
			{
				$(this).attr('data-action' , 'show');
				$(this).siblings('.info').height('335px');


			}
			else
			{
				$(this).attr( 'data-action' , 'hide');
				$(this).siblings('.info').height('0px');
			}
		
		});



});