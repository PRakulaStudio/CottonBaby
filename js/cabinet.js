( function () {
	"use strict";
	let buttonLoadHistory = document.querySelector('div.history-button button'),//кнопка, которая подгружает остальные товары из истории
		css = {
			'show_block' : "show-block",
		};

	requestCheckAuth("cabinet");
	requestGetMenuCategories();

	function getStatus(id) {
		for(var key in window.statuses)
		{
			if(window.statuses[key].id == id)
				return window.statuses[key];
		}

	}

	function declOfNum(number, titles) {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	}

	//получить историю
	function getHistory(offset, limit)
	{
		var data= {};
		data['offset'] = offset;
		data['limit'] = limit;

		return fetch( window.pms.config.cabinetAPI+'get/orderList' , { method: 'POST', credentials: 'same-origin', body: data })
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
				buttonLoadHistory.style.display = "block";
				if(response.status && response.data.order != "undefined")
				{
					let orderList = response.data.orders,
						html = "",
						countItems = 0;

					for( var key in orderList )
					{
						//начало блока
						html += "<div data-item>";
						//верхний блок с номером заказа и датой
						html += "<div><div><p>#"+orderList[key].order_id+"</p></div><div><p>"+orderList[key].date+"</p></div><button data-action='show'><img class='hide-content' src='images/icons/up-arrow.svg' style='display:none' /><img class='show-content' src='images/icons/down-arrow.svg' /></button></div>";

						//блок с подробной историей заказа о товарах
						html += "<div class='hidden'>";

						for(var item in orderList[key].products)
						{
							let product  = orderList[key].products[item].product;
							let modifications = orderList[key].products[item].modifications;

							html += "<div class='order-info'>" +

								"<div>" +
								"<div>" +
								"<a href='"+product.href+"'>"+product.title+"</a>" +
								"<a href='"+product.collection[0].href+"'>"+product.collection[0].title+"</a>" +
								"</div>" +
								"</div>";



							//блоки с размерами товара
							for(var itemSize in  modifications)
							{
								html += "<div>" +
									"<div><p>"+modifications[itemSize].quantity+" шт.</p></div>" +
									"<div><p>Размер "+modifications[itemSize].title+"</p></div>" +
									"</div>";
							}
							html += "</div>";



						}
						html+= "</div>";
						//блок с суммой
						html += "<div>" +
							"<div><p>Cумма</p></div>\n" +
							"<div class='sum'><p>"+formatMoney(orderList[key].total)+"</p></div>" +
							"</div>";

						//блок со статусом
						html += "<div>" +
							"<div><p>Cтатус</p></div>" +
							"<div class='status' style='border: 2px solid "+(getStatus(orderList[key].status)).color+" !important; ' >" +
							"<p style='color: "+(getStatus(orderList[key].status)).color+" !important' >"+(getStatus(orderList[key].status)).text+"</p>" +
							"</div>" +
							"</div>";

						html+="</div>";
						countItems++;
					}
					let newHTML = document.querySelector('div.history-box').innerHTML + html;
					document.querySelector('div.history-box').innerHTML = newHTML;

					buttonLoadHistory.setAttribute('data-offset',  parseInt(buttonLoadHistory.getAttribute('data-offset')) + countItems  );

					if( response.data.count <= parseInt(buttonLoadHistory.getAttribute('data-offset')) )
						buttonLoadHistory.remove();

					document.querySelector('div.history').style.display = "block";

					document.querySelectorAll('div.bonus p')[0].nextElementSibling.innerHTML = `Вы совершили ${response.data.count} ${declOfNum( response.data.count, ['покупку', 'покупки', 'покупок']  )}, на общую сумму  \<span\>${formatMoney(response.data.total_sum)}\<\/span\>`
					//меняем статус кол-ва покупок и общей суммы


				}

			});



	}

	function setUserData(fields)
	{
		let data = new FormData();
		data.append('data' , JSON.stringify(fields));

		return fetch( window.pms.config.cabinetAPI+'set/userData' , { method: 'POST', credentials: 'same-origin', body: data })
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
				if(response.status)
				{
					alert("Данные сохранились");
				}
				else
				{
					for( let key in response.data.errors )
					{
						document.querySelector('div.data-box input[name="'+key+'"]').classList.add('input-error');
						alert(result.data.errors[key]);
						break;

					}
				}
			});
	}

	function getUserData()
	{
		let data = new FormData();


		return fetch( window.pms.config.cabinetAPI+'get/userData' , { method: 'POST', credentials: 'same-origin', body: data })
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
				if( response.status && response.userData != "undefined")
				{
					for(var key in response.userData)
					{
						//var allElements = document.getElementsByTagName('input');
						if(key == "bonus")
						{
							document.querySelectorAll('div.bonus p')[document.querySelectorAll('div.bonus p').length - 1]
								.querySelector('span').innerHTML =formatMoney(response.userData[key])
							continue;
						}
						document.querySelector('div.data-box input[name="'+key+'"]').value = response.userData[key]
					}
				}
			});
	}


	document.addEventListener('keyup' , function (event) {
		//добавляет инпуту статус "измененный"
		if( event.target.tagName == "INPUT" && event.target.closest('section.cabinet'))
		{
			event.target.setAttribute('data-change' , 'true');
			return;
		}
	});

	document.addEventListener('click' , function (event) {

		//подгрузка остальных товаров
		if(event.target.tagName == "BUTTON" &&  event.target.closest('div.history-button'))
		{
			buttonLoadHistory.style.display = "none";
			getHistory( buttonLoadHistory.getAttribute('data-offset') , buttonLoadHistory.getAttribute('data-limit') );
			return;
		}

		// переключение отображение подробности у заказа
		if( (event.target.tagName == "BUTTON" && event.target.hasAttribute('data-action') && event.target.closest('div.history-box')) ||
			(event.target.parentNode.tagName == "BUTTON" && event.target.parentNode.hasAttribute('data-action') )
		  )
		{
			let button = "";
			if(event.target.tagName == "BUTTON")
				button = event.target;
			else
				button = event.target.parentNode;

			if( button.getAttribute('data-action') == "show")
				button.setAttribute('data-action' , "hide");
			else
				button.setAttribute('data-action' , "show");

			button.querySelectorAll('img').forEach(function (current , index, array) {
				if( !current.style.display)
					current.style.display = "none";
				else
					current.style.display = "";
			});

			if( button.closest('div[data-item]').querySelector('div.hidden').style.display == "block")
				button.closest('div[data-item]').querySelector('div.hidden').style.display = "none";
			else
				button.closest('div[data-item]').querySelector('div.hidden').style.display = "block";
			return;

		}

		//отправить измененные данные
		if( event.target.tagName == "BUTTON" && event.target.getAttribute('type') == "button" && event.target.closest('div.data-button') )
		{
			let fieldsData = {};
			event.target.closest('div.data-box').querySelectorAll('input[data-change="true"]').forEach(function (current, index,  array) {
				validateData(current, fieldsData, 'input-error');
			});

			if( Object.keys(fieldsData).length )
				setUserData( fieldsData );
			return;
		}

		//переключение полей
		if( event.target.closest('button.cabinet-box') || (event.target.tagName == "BUTTON" && event.target.classList.contains('cabinet-box')))
		{
			event.target.closest('p').nextElementSibling.classList.toggle(css.show_block);
			event.target.querySelectorAll('img').forEach(function (current , index, array) {
				if( current.style.display == "block" || !current.style.display)
					current.style.display = "none";
				else
					current.style.display = "";
			});

		}

	});

	//подсказки
	getHistory( buttonLoadHistory.getAttribute('data-offset') , buttonLoadHistory.getAttribute('data-limit') );
	getUserData();


})();




//
// ( function($){
//
//
//
//
// 	//получить историю
// 	function getHistory(offset, limit)
// 	{
// 		var data= {};
// 			data['offset'] = offset;
// 			data['limit'] = limit;
//
// 		$.ajax({
// 			data: data,
// 			method: "POST",
// 			dataType: 'json',
// 			url: window.pms.config.cabinetAPI+'get/orderList',
// 			success: function( result, status)
// 			{
// 				buttonLoadHistory.show();
// 				if(result.status && result.data.orders != "undefined")
// 				{
// 					var orderList = result.data.orders,
// 						html = "",
// 						countItems = 0;
//
// 					for( var key in orderList )
// 					{
// 						//начало блока
//                         html += "<div data-item>";
//                         //верхний блок с номером заказа и датой
// 						html += "<div><div><p>#"+orderList[key].order_id+"</p></div><div><p>"+orderList[key].date+"</p></div><button data-action='show'><img class='hide-content' src='images/icons/up-arrow.svg' style='display:none' /><img class='show-content' src='images/icons/down-arrow.svg' /></button></div>";
//
// 						//блок с подробной историей заказа о товарах
// 						html += "<div class='hidden'>";
//
// 						for(var item in orderList[key].products)
// 						{
// 							let product  = orderList[key].products[item].product;
// 							let modifications = orderList[key].products[item].modifications;
//
// 							html += "<div class='order-info'>" +
//
// 											"<div>" +
// 												"<div>" +
// 													"<a href='"+product.href+"'>"+product.title+"</a>" +
// 													"<a href='"+product.collection[0].href+"'>"+product.collection[0].title+"</a>" +
// 												"</div>" +
// 											"</div>";
//
//
//
// 										//блоки с размерами товара
// 										for(var itemSize in  modifications)
// 										{
// 											html += "<div>" +
// 														"<div><p>"+modifications[itemSize].quantity+" шт.</p></div>" +
// 														"<div><p>Размер "+modifications[itemSize].title+"</p></div>" +
// 													"</div>";
// 										}
// 							html += "</div>";
//
//
//
// 						}
// 						html+= "</div>";
// 						//блок с суммой
// 						html += "<div>" +
//                            			 "<div><p>Cумма</p></div>\n" +
//                             	 	 "<div class='sum'><p>"+formatMoney(orderList[key].total)+"</p></div>" +
//                            		 "</div>";
//
// 						//блок со статусом
// 						html += "<div>" +
//                             		"<div><p>Cтатус</p></div>" +
//                             		"<div class='status' style='border: 2px solid "+(getStatus(orderList[key].status)).color+" !important; ' >" +
// 											"<p style='color: "+(getStatus(orderList[key].status)).color+" !important' >"+(getStatus(orderList[key].status)).text+"</p>" +
// 									"</div>" +
//                             	"</div>";
//
// 						html+="</div>";
//                         countItems++;
// 					}
//
//
// 					$('div.history-box').append(html);
//
//
//
//
// 					buttonLoadHistory.attr('data-offset',  parseInt(buttonLoadHistory.attr('data-offset')) + countItems  );
//
// 					if( result.data.count <=   parseInt(buttonLoadHistory.attr('data-offset')) )
// 						buttonLoadHistory.remove();
//
// 					$('div.history').show();
//
// 					//меняем статус кол-ва покупок и общей суммы
//
// 					$('div.bonus')
// 								.find('p')
// 									.first().next().html(`Вы совершили ${result.data.count} ${declOfNum( result.data.count, ['покупку', 'покупки', 'покупок']  )}, на общую сумму  \<span\>${formatMoney(result.data.total_sum)}\<\/span\>`);
//
//
//
// 				}
// 				else
// 				{
// 					if(result.statusText)
// 					{
// 						buttonLoadHistory.hide();
// 						console.log(result.statusText);
// 					}
// 					else {
// 						console.log("Не получилосьполучить историю заказов");
// 						//alert("Не получилосьполучить историю заказов");
// 					}
// 				}
// 			},
//
// 		});
//
// 	}
//
//
// 	//сохраняем данные на сервер
// 	function setUserData(data)
// 	{
//
//
// 		$.ajax({
// 			url: window.pms.config.cabinetAPI+'set/userData',
// 			type: 'POST',
// 			encoding: "UTF-8",
// 			data:  {
// 				"data": JSON.stringify(data)
// 			},
// 			dataType: 'json',
// 			success: function( result, status)
// 			{
//
// 				if(result.status)
// 				{
// 					alert("Данные сохранились");
// 					//alert("work!!!");
// 					/*
// 						[
// 							id,
// 							link_redirect,
// 						]
//
// 						window.location.replace(link_redirect);
// 						window.location.href = link_redirect;
//
// 					*/
// 					//переход
// 				}
// 				else
// 				{
// 					for( let key in result.data.errors )
// 					{
//
// 						$('div.data-box').find('input[name="'+key+'"]').addClass('input-error');
// 						alert(result.data.errors[key]);
// 						break;
//
// 					}
//
//
// 				}
// 			}
//
// 		});
// 	}
//
//
// 	//получаем данные с сервера
// 	function getUserData(data)
// 	{
//
// 		$.ajax({
//
// 			url: window.pms.config.cabinetAPI+'get/userData',
// 			type: 'GET',
// 			encoding: "UTF-8",
// 			dataType: 'json',
// 			success: function( data, status)
// 			{
// 				if( data.status && data.userData != "undefined")
// 				{
//
// 					for(var key in data.userData)
// 					{
// 						//var allElements = document.getElementsByTagName('input');
// 						if(key == "bonus")
// 						{
// 							$('div.bonus').find('p').last().find('span').text(formatMoney(data.userData[key]));
// 							continue;
// 						}
//
// 						$('div.data-box').find('input[name="'+key+'"]').val( data.userData[key] );
// 					}
//
// 				}
// 				else
// 				{
//
// 				}
// 			},
// 		});
//
// 	}
//
//
// 	//добавляет инпуту статус "измененный"
// 	// $('section.cabinet input').keyup( function(){
// 	// 	$(this).attr('data-change' , 'true');
// 	// });
//
//
// 	//подгрузка остальных товаров
// 	// $('div.history-button button').click(function () {
// 	// 	buttonLoadHistory.hide();
// 	// 	getHistory( buttonLoadHistory.attr('data-offset') , buttonLoadHistory.attr('data-limit') );
// 	// });
//
//
// 	// переключение отображение подробности у заказа
// 	// $('div.history-box').on( "click" , 'button[data-action]' ,  function () {
//     //
// 	// 	var button = $(this);
// 	// 	if( button.data('action') == "show")
// 	// 	     button.data('action' , "hide");
//      //    else
// 	// 	   button.data('action' , "show");
//     //
// 	// 	button.find('img').toggle();
// 	// 	//пееключаем отображение у блока
// 	// 	$(this).parents('div[data-item]').find('div.hidden').toggle();
//     //
//     // });
//
//
// 	//отправить измененные данные
// 	// $('form .data-button button').click( function() {
//      //
// 	// 	var data = {};
// 	//     $(this).parents('div.data-box').find('input[data-change="true"]').each( function(){
//      //     	validateData($(this) , data , 'input-error');
//      //    });
//     //
// 	// 	if( Object.keys(data).length )
// 	// 		setUserData( data );
// 	// });
//
//
//     //
// 	// $("input[name='inn']").suggestions({
// 	// 	token: "fc1ca3289a8825e5a3ff6ee4dac90af47e911fbe",
// 	// 	type: "PARTY",
// 	// 	count: 10,
// 	// 	/* Вызывается, когда пользователь выбирает одну из подсказок */
// 	// 	onSelect: function(suggestion) {
// 	// 		let form = document.querySelector('div.jur-form');
//     //
// 	// 		form.querySelector('input[name="inn"]').value = suggestion.data.inn;
// 	// 		form.querySelector('input[name="ogrn"]').value = suggestion.data.ogrn;
// 	// 		form.querySelector('input[name="name_organization"]').value = suggestion.data.name.full_with_opf;
// 	// 	}
// 	// });
//
//
//
// 	//переключение полей
// 	// $('button.cabinet-box').click(function(){
// 	// 	$(this).parents('p').next().toggleClass(css.show_block);
// 	// 	$(this).find('img').toggle();
// 	// });
//
//
//
// 	//$('section.')
//
// })(jQuery)