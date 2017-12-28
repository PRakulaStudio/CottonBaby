"use strict";

( function($){
	var buttonLoadHistory = $('div.history-button').find('button'); //кнопка, которая подгружает остальные товары из истории

	var css = {
		'show_block' : "show-block",
	}


	requestCheckAuth("cabinet");

	function getStatus(id) {
		for(var key in window.statuses)
		{
			if(window.statuses[key].id == id)
				return window.statuses[key];
		}

	}


	function getHistory(offset, limit)
	{
		var data= {};
			data['get'] = "ordersList";
			data['offset'] = offset;
			data['limit'] = limit;

		$.ajax({
			data: data,
			dataType: 'json',
			url: '/akula/system/plugins/SecArgonia/cabinet',
			success: function( result, status)
			{
				buttonLoadHistory.show();
				if(result.status && result.data.orders != "undefined")
				{
					var orderList = result.data.orders,
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
							html += "<div class='order-info'>" +

											"<div>" +
												"<div>" +
													"<a href='"+orderList[key].products[item].link+"'>"+orderList[key].products[item].name+"</a>" +
													"<a href='"+orderList[key].products[item].collection['link']+"'>"+orderList[key].products[item].collection['name']+"</a>" +
												"</div>" +
											"</div>";




										//блоки с размерами товара
										for(var itemSize in  orderList[key].products[item].sizes)
										{
											html += "<div>" +
														"<div><p>"+orderList[key].products[item].sizes[itemSize].count+" шт.</p></div>" +
														"<div><p>Размер "+orderList[key].products[item].sizes[itemSize].name+"</p></div>" +
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


					$('div.history-box').append(html);

                    //меняем оффсет у кнопки
					buttonLoadHistory.attr('data-offset',  parseInt(buttonLoadHistory.attr('data-offset')) + countItems  );

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
					if(result.statusText)
					{
						buttonLoadHistory.hide();
						alert(result.statusText);

					}
					else {
						alert("Не получилосьполучить историю заказов");
					}
				}
			},

		});

	}


	function setUserData(data)
	{
		$.ajax({
			url: '/akula/system/plugins/SecArgonia/cabinet/index.php',
			type: 'POST',
			encoding: "UTF-8",
			data:  {
				"set": "userData",
				"data": JSON.stringify(data)
			},
			dataType: 'json',
			success: function( data, status)
			{

				if(data.status)
				{
					//alert("work!!!");
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

	function getUserData(data)
	{


		$.ajax({

			url: '/akula/system/plugins/SecArgonia/cabinet/index.php',
			type: 'GET',
			encoding: "UTF-8",
			data:  {
				"get": "userData"
			},
			dataType: 'json',
			success: function( data, status)
			{
				if( data.status && data.userData != "undefined")
				{

					for(var key in data.userData)
					{
						//var allElements = document.getElementsByTagName('input');
						if(key == "bonus")
						{
							$('div.bonus').find('p').last().find('span').text(formatMoney(data.userData[key]));
							continue;
						}

						$('div.data-box').find('input[name="'+key+'"]').val( data.userData[key] );
					}
					


				}
				else
				{

				}
			},
		});

	}

	//добавляет инпуту статус "измененный"
	$('section.cabinet input').keyup( function(){
		$(this).attr('data-change' , 'true');
	});

	$('div.history-button button').click(function () {
		buttonLoadHistory.hide();
		getHistory( buttonLoadHistory.attr('data-offset') , buttonLoadHistory.attr('data-limit') );
	});

	//надо доделать
	$('div.history-box').on( "click" , 'button[data-action]' ,  function () {

		var button = $(this);
		if( button.data('action') == "show")
		{
            button.data('action' , "hide");
            button.find('img').last().hide().end().first().show();
		}
        else
		{
            button.data('action' , "show");
			button.find('img').last().show().end().first().hide();

		}
			
		//пееключаем отображение у блока
		$(this).parents('div[data-item]').find('div.hidden').toggle();

    });


	//отправить измененные данные
	$('form .data-button button').click( function() {
        
		var data = {};
				
        $(this).parents('div.data-box').find('input[data-change="true"]').each( function(){
         	validateData($(this) , data , 'input-error');
        });

		if( Object.keys(data).length )
			setUserData( data );
		

	});



	$('button.cabinet-box').click(function(){
		$(this).parents('p').next().toggleClass(css.show_block);
		$(this).find('img').toggle();
	});



	getHistory( buttonLoadHistory.data('offset') , buttonLoadHistory.data('limit') );
	getUserData();

	//$('section.')

})(jQuery)