try{
	( function(){
		requestCheckAuth("production");

		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 30,
			// loop: true,
			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

	})();
}
catch(error)
{
	requestSendBugs(error);
}



function isError(e){
	return e && e.stack && e.message;
}

function requestSendBugs(error) {
	console.log(error);
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", window.location.protocol+"//"+"akula.cottonbaby.ru/system/extensions/errorCatcher/");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Cache-Control", "no-cache");
	xhr.setRequestHeader("Postman-Token", "6fc1aee4-6350-7914-1727-bb9cb2ab9235");
	if(isError(error))
		xhr.send(JSON.stringify(error, Object.getOwnPropertyNames(error)));
	else
		xhr.send(JSON.stringify(error));
}