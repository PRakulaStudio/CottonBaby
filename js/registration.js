"use strict";
( function($){

	var pass = "",
		css = {
			inputError : "input-error",
		};

	requestCheckAuth('registration');


	function setUserData(fields)
	{
		$.ajax({
			url: '/akula/system/plugins/SecArgonia/cabinet/',
			type: 'POST',
			encoding: "UTF-8",
			data:  {
				"user": "reg",
				"data": JSON.stringify(fields)
			},
			dataType: 'json',
			success: function( data, status)
			{

				if( data.status && data.userData != "undefined" )
				{
					//переход на личный кабинет
					//window.location.href = link_redirect;
				}
				else
				{
					alert("Не получилось зарегистрироваться");
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

})(jQuery);