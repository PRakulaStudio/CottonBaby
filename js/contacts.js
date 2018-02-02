
try{



( function(){
	"use strict";
		let mobileWidth = 800;
		requestCheckAuth('contacts');
		requestGetMenuCategories();

		let element = document.querySelector('div.contacts-form input[type="tel"]'),
		 	maskOptions = {
				mask: '+{7}(000)000-00-00'
			};
		new IMask(element, maskOptions);

		function eventSendFeedback()
		{
			try{
				return fetch( url , {method: 'POST', credentials: 'same-origin' , body: data})
					.then(function (response) {
						let responseData = false;
						try {
							responseData = response.json();
						}
						catch (e) {
							responseData = {status: false, statusText: "Произошла ошибка при соединении"};
							response.text().then(console.debug);
						}
						return responseData;
					})
					.then(function (response) {
						if(response.status)
						{
							PopUpShowThanks();
						}

					});
			}
			catch (error)
			{

			}


		}

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

		document.addEventListener('click' , function(event){

			if( event.target.tagName == "BUTTON" && event.target.getAttribute('type') == "button" && event.target.closest('div.contacts-form'))
			{
				eventSendFeedback();
			}

		});




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




})();

}
catch (error)
{
	
}