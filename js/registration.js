"use strict";
( function($){

	var pass = "",
		css = {
			inputError : "input-error",
		};

	requestCheckAuth('registration');
	requestGetMenuCategories();


	function setUserData(fields)
	{
		$.ajax({
			url: window.pms.config.cabinetAPI+'user/reg',
			type: 'POST',
			encoding: "UTF-8",
			data:  {
				"data": JSON.stringify(fields)
			},
			dataType: 'json',
			success: function( data, status)
			{

				if( data.status && data.userData != "undefined" )
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

			},

		});

	}


	$('section.registration button').click( function(){

			//блок, отвечающий за отправку запроса при частом клике
			// clearTimeout(timerSendRequest);
			// input++;
			// console.log(input);
			// timerSendRequest = setTimeout( setEditedItem , 1000 );

		    var data = {};
			
			$('div.registration-form').find('input').each( function(){
				$(this).removeClass('input-error');
				validateData($(this) , data , 'input-error');
			});


			if( !$('div.registration-form').find('input').hasClass('input-error') )
			{
				setUserData(data);
			}
	});


	//считывание полей с localstorage
	let userData = "";

	if( userData = localStorage.getItem('reg') )
	{
		userData = JSON.parse( userData );
		$('div.registration-form')
							.find('input[name="name"]').val( userData['name'] ).end()
							.find('input[name="mail"]').val( userData['mail'] ).end();
	}


})(jQuery);