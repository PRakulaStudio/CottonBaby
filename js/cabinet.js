( function () {
	"use strict";
	let buttonLoadHistory = document.querySelector('div.history-button button'),//кнопка, которая подгружает остальные товары из истории
		css = {
			'show_block' : "show-block",
		};

	getHistory( buttonLoadHistory.getAttribute('data-offset') , buttonLoadHistory.getAttribute('data-limit') );
	getUserData();
	requestCheckAuth("cabinet");




	//подсказки

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
		var data=  new FormData();
		data.append('offset' , offset);
		data.append('limit' ,limit);

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

				if(response.status && response.data.order != "undefined")
				{

					let orderList = response.data.orders,
						html = "",
						countItems = 0;
					buttonLoadHistory.style.display = "block";
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

					document.querySelectorAll('div.bonus div.bonus-user p')[0].innerHTML = `Вы совершили ${response.data.count} ${declOfNum( response.data.count, ['покупку', 'покупки', 'покупок']  )}, на общую сумму  \<span\>${formatMoney(response.data.total_sum)}\<\/span\>`
					//меняем статус кол-ва покупок и общей суммы


				}
				else
				{
					document.querySelector('div.history div.block-empty').classList.remove('d-none');
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
						if( document.querySelector('div.data-box input[name="'+key+'"]') )
							document.querySelector('div.data-box input[name="'+key+'"]').value = response.userData[key]
					}
				}
			});
	}


	document.addEventListener('keyup' , function (event) {
		//добавляет инпуту статус "измененный"
		if( event.target.tagName == "INPUT" && event.target.closest('div.data-box'))
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
		if( (event.target.tagName == "IMG" && event.target.parentNode.classList.contains('cabinet-box')) || (event.target.tagName == "BUTTON" && event.target.classList.contains('cabinet-box')))
		{
			event.target.closest('p').nextElementSibling.classList.toggle(css.show_block);
			let button = "";
			if( event.target.tagName == "IMG"  )
				button = event.target.parentNode;
			else
				button = event.target;
			button.querySelectorAll('img').forEach(function (current , index, array) {
				current.classList.toggle('d-none');
			});

		}

	});

	let element = document.querySelector('div.data-box input[type="tel"]'),
		maskOptions = {
			mask: '+{7} (000) 000-00-00'
		};
	new IMask(element, maskOptions);




})();
