"use strict";
try{
	(function () {
		requestCheckAuth('registration');

		let pass = "",
			userData = "",
			css = {
				inputError : "input-error",
			};
		let element = document.querySelector('div.registration-form input[type="tel"]'),
			maskOptions = {
				mask: '+{7} (000) 000-00-00'
			};
		new IMask(element, maskOptions);

		if( userData = localStorage.getItem('reg') ){
			userData = JSON.parse( userData );
			document.querySelector('div.registration-form input[name="name"]').value =  userData['name'];
			document.querySelector('div.registration-form input[name="mail"]').value = userData['mail'];

		}

		function setUserData(fields){
			var data = new FormData();
			data.append('data' ,JSON.stringify(fields))

			return fetch( window.pms.config.cabinetAPI+'user/reg' , { method: 'POST', credentials: 'same-origin', body: data })
				.then( response => {
					let responseData = false;
					try{
						responseData = response.json();
					}
					catch(e) {
						responseData = {status: false, statusText: "Произошла ошибка при соединении"};
						response.text().then(console.debug);
					}

					return responseData;
				})
				.then( response => {
					try{
						if( response.status && response.userData != "undefined" )
						{
							//переход на личный кабинет
							localStorage.removeItem('reg');
							window.location.href = "/catalog/";
						}
						else
						{
							for(var key in data.data.errors)
							{
								alert(data.data.errors[key]);
								break;
							}
						}
					}
					catch(error)
					{
						requestSendBugs(error);
					}


				});
		}

		function eventSendUserData() {
			try{
				let data = {},
					listInput = document.querySelectorAll('div.registration-form input'),
					sendRequest = true;

				listInput.forEach( function(current, index, array){
					current.classList.remove('input-error');
					validateData(current, data, 'input-error' );

					if( current.classList.contains('input-error'))
						sendRequest = false;
				});

				if(sendRequest)
					setUserData(data);
			}
			catch(error)
			{
				requestSendBugs(error);
			}


		};

		document.addEventListener('click' , function(event){
			if(event.target.tagName == "BUTTON" && event.target.closest('div.registration-form'))
			{
				eventSendUserData();
			}
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




