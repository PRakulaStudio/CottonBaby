window.onload = function() {

	map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: -34.397, lng: 150.644},
		  zoom: 8
	});

    var address = "Роза Люкс, улица Розы Люксембург 77, Екатеринбург";

    geocoder.geocode( { 'address' : address }, function( results, status ) {
    	console.log(status);
        if( status == google.maps.GeocoderStatus.OK ) {
        	 var map = new google.maps.Map(document.getElementById("map"), myOptions);
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            map.setCenter( results[0].geometry.location );
            var marker = new google.maps.Marker( {
                map     : map,
                position: results[0].geometry.location
            } );
        } else {
            alert( 'Geocode was not successful for the following reason: ' + status );
        }
    } );

   




}