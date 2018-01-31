"use strict";
requestCheckAuth('registration');
requestGetMenuCategories();

let pass = "",
	userData = "",
	css = {
		inputError : "input-error",
	};

if( userData = localStorage.getItem('reg') )
{
	userData = JSON.parse( userData );
	document.querySelector('div.reistration-form input[name="name"]').value =  userData['name'];
	document.querySelector('div.reistration-form input[name="mail"]').value = userData['mail'];

}

function setUserData(fields)
{
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

		});
}


function eventSendUserData() {
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

};



document.addEventListener('click' , function(event){
	if(event.target.tagName == "BUTTON" && event.target.closest('section.registration'))
	{
		eventSendUserData();
	}
});






		//считывание полей с localstorage

