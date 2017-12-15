( function($){

	function checkLength(str , requareLength)
	{
		if( str.length >= requareLength)
			return true;
		return false;
	}


	function checkEmail(email)
	{
		 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 	     if( re.test(email) )
 	     	return true;
 	     return false;
	}


	function checkPhone(phone)
	{
	 	var re = /^[\+]?7\s[(]?[0-9]{3}[)]\s?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
		if( re.test(phone) )
			return true;
		return false;
	}


	function validateData( input , data)
	{
		switch( $(input).attr('name'))
		{
			case "password" :
				if( checkLength($(input).val() , 8))
					data[  $(input).attr('name') ] =  $(input).val();
				else
					$(input).addClass('input-error');
				break;

			case "email" :

				if( checkEmail($(input).val()))
					data[  $(input).attr('name') ] =  $(input).val();
				else
					$(input).addClass('input-error');
				break;

			case "phone" :
				if( checkPhone( $(input).val() ))
					data[  $(input).attr('name') ] =  $(input).val();
				else
					$(input).addClass('input-error');
				break;

			case "index" :
				if( checkLength($(input).val() , 6))
					data[  $(input).attr('name') ] =  $(input).val();
				else
					$(input).addClass('input-error');
				break;

			default:

				data[ $(input).attr('name') ]  =  $(input).val();
				break;				
		}

	}

	function getHistory(offset, limit)
	{
		$.ajax({
			data: {"get" : "orders"},
			dataType: 'json',
			url: '/system/plugins/cabinet',
			success: function( data, status)
			{

				if(data.status && orders != "undefined")
				{

					/*
						[
							id,
							link_redirect,
						]

						window.location.replace(link_redirect);
						window.location.href = link_redirect;

					*/
					//переход
				}
			},

		});

	}

	function setUserData(data)
	{
		$.ajax({
			data: {"set" : "userData" , "user" : "data"},
			dataType: 'json',
			url: '/system/plugins/cabinet',
			success: function( data, status)
			{

				if(data.status)
				{

					/*
						[
							id,
							link_redirect,
						]

						window.location.replace(link_redirect);
						window.location.href = link_redirect;

					*/
					//переход
				}
				else
				{
					alert("Не получилось сохранить данные");
				}
			}

		});
	}



	$('section.cabinet input').keypress( function(){
		$(this).attr('data-change' , 'true');
	});


	$('.data-box button').click( function(){

			var data = {};
			$(this).siblings('div.fiz-form').find('input[data-change="true"]').each( function(){
				validateData($(this) , data);
			});
			console.log( JSON.stringify(data) );
			//setUserData(  );
	});

	//$('section.')

})(jQuery)