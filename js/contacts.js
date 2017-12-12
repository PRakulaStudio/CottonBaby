window.onload = function() {

	var myLatlng = new google.maps.LatLng( 56.831756 , 60.612618);

    var myOptions = {
        
        zoom: 16,
        center: new google.maps.LatLng( 56.831756 , 60.612619),
        
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