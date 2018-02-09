"use strict";
try{



( function(){

		let mobileWidth = 800;
		requestCheckAuth('contacts');
		

		let element = document.querySelector('div.contacts-form input[type="tel"]'),
		 	maskOptions = {
				mask: '+{7} (000) 000-00-00'
			};
		new IMask(element, maskOptions);

		function requestSendFeedback(fields)
		{
			let data = new FormData();
			for(let key in fields)
				data.append(key , fields[key]);


			try{
				return fetch( window.pms.config.feedbackAPI+'order/create' , {method: 'POST', credentials: 'same-origin' , body: data})
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
						else
						{
							let form = document.querySelector('div.contacts-form');
							for( var key in response.data.errors )
								form.querySelector('[name="'+key+'"]').classList.add('input-error');
						}

					});
			}
			catch (error)
			{
				requestSendBugs(error);
			}


		}

		document.querySelector('button[data-action]').onclick = function (event) {
			try{
				if( event.target.getAttribute('data-action') == "show")
				{
					event.target.setAttribute('data-action' , 'hide');
					event.target.parentNode.querySelector('.info-text').style.height = '195px';
					event.target.innerText = "Свернуть";
				}
				else
				{
					event.target.setAttribute('data-action' , 'show');
					event.target.parentNode.querySelector('.info-text').style.height = '0px';
					event.target.innerText = "Развернуть";
				}
			}
			catch (error)
			{
				requestSendBugs(error);
			}

		};

		document.addEventListener('click' , function(event){
			try{
				if( event.target.tagName == "BUTTON" && event.target.getAttribute('type') == "button" && event.target.closest('div.contacts-form'))
				{

					let fieldsData = {},
						sendRequest = true,
						blockForm = document.querySelector('div.contacts-form');

					blockForm.querySelectorAll('input.input-error , textarea.input-error').forEach(function(current){
						current.classList.remove('input-error');
					});

					blockForm.querySelectorAll('input, textarea').forEach( function (field) {
						if( field.getAttribute('name') == "phone" && !checkPhone(field.value) ){
							field.classList.add('input-error');
							sendRequest = false;
							return;
						}

						if( field.getAttribute('name') == "message" && field.value == ""){
							field.classList.add('input-error');
							sendRequest = false;
							return;
						}

						fieldsData[ field.getAttribute('name')] = field.value;
					});


					if( sendRequest )
						requestSendFeedback( fieldsData );

					return;
					//requestSendFeedback();
				}
			}
			catch(error)
			{
				requestSendBugs(error);
			}


		});


		window.onresize = function (event) {
			try{
				let buttonAction = document.querySelector('button[data-action]');
				if( window.innerWidth >= mobileWidth )
					buttonAction.parentNode.querySelector('.info-text').style.height = "195px";
				else
				{
					if( buttonAction.getAttribute('data-action') == "show" )
					{
						buttonAction.parentNode.querySelector('.info-text').style.height = "0px";
						buttonAction.innerText = "Развернуть";
					}
				}
			}
			catch(error)
			{
				requestSendBugs(error);
			}


		};




})();

}
catch (error)
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