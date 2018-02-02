

( function(){
	"use strict";
		let mobileWidth = 800;
		requestCheckAuth('contacts');
		requestGetMenuCategories();



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