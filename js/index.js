"use strict";
(function(){
try {
	requestCheckAuth('index').then(function(response){
		if(IS_AUTH)
		{
			let list_sliders = [];
			document.querySelectorAll('div.new-slider div[data-catalog-item-id]').forEach(function (slide) {
				list_sliders.push(slide.getAttribute('data-catalog-item-id'));
			});

			requestCheckFavoritesItems(list_sliders, 'new-slider');
		}
		
	});

	let countInsta = 0;
	let canRequest = true;
	let last_insta_id = "";
	let swiper_main = new Swiper('.swiper-main', {
		loop: true,
		autoplay: window.innerWidth < 1000 ? {
			delay: 3000,
			disableOnInteraction: false,
		} : false,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.main-next',
			prevEl: '.main-prev',
		},
	});

	let swiper_new = new Swiper('.swiper-new', {
		slidesPerView: 4,
		spaceBetween: 30,
		navigation: {
			nextEl: '.new-next',
			prevEl: '.new-prev',
		},
		breakpoints: {
			// when window width is <= 320px
			700: {
				slidesPerView: 2,
			},
			600: {
				slidesPerView: 1,
			},
		}
	});
	document.querySelector('.new-slider').classList.remove('no-js');

	let swiper_prod = new Swiper('.swiper-prod', {
		slidesPerView: 5,
		spaceBetween: 1,
		loop: true,
		navigation: {
			nextEl: '.prod-next',
			prevEl: '.prod-prev',
		},
		breakpoints: {
			// when window width is <= 320px
			1200: {
				slidesPerView: 4,
			},
			900: {
				slidesPerView: 3,
			},
			600: {
				slidesPerView: 2,
			},
			500: {
				slidesPerView: 1,
			},
		}
	});
	let swiper_insta = new Swiper('.swiper-insta', {
		slidesPerView: 4,
		spaceBetween: 1,
		loop: false,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		breakpoints: {
			// when window width is <= 320px
			900: {
				slidesPerView: 3,
			},
			600: {
				slidesPerView: 2,
			},
			500: {
				slidesPerView: 1,
			},
		}
	});


	swiper_insta.on( 'slideNextTransitionEnd' , function () {
		try {

			if (!canRequest)
				return;

			
				return fetch(window.pms.config.instagrammAPI + 'feed/?limit=4&last_id='+last_insta_id+'', {
					method: 'GET',
					credentials: 'same-origin'
				}).then(response => {
					let responseData = false;
					try {
						responseData = response.json();
					}
					catch (e) {
						responseData = {status: false, statusText: "Произошла ошибка при соединении"};
						response.text().then(console.debug);
					}

					return responseData;
				}).then(response => {

					let list_sliders = [],
						slide = "";
					if (response.status) //тут логика для добавления в слайдер инста. Нужно добавлять массив
					{
						if (response.items && response.items.length) {
							for (let i = 0; i < response.items.length; i++) {
								slide = '<div class="swiper-slide"><img src="' + response.items[i].src + '" /></div>';
								list_sliders.push(slide);
								last_insta_id = response.items[i].inst_id;
							}
							swiper_insta.appendSlide(list_sliders);
						}
						else
							canRequest = false;

					}
				});

			countInsta++
		}
		catch(error)
		{
			console.log(error)

		}


	});


	[].forEach.call(document.querySelectorAll('.img-slider') , function (slider) {
		 slider.classList.remove('no-js');
	});

	if (window.innerWidth >= 820) {
		document.querySelectorAll('video').forEach(function (video) {
			video.load();
			video.play();
		})
	}

	document.addEventListener('click', function (event) {
		if (event.target.tagName == "BUTTON" && event.target.closest('div.reg-box')) {
			let data = {},
				listInput = document.querySelectorAll('div.reg-box input'),
				sendRequest = true;

			listInput.forEach(function (current, index, array) {
				current.classList.remove('input-error-bottom');
				validateData(current, data, 'input-error-bottom');

				if (current.classList.contains('input-error-bottom'))
					sendRequest = false;
			});

			if (sendRequest) {
				localStorage.removeItem('reg');
				localStorage.setItem('reg', JSON.stringify(data));
				window.location.replace('registration.html');
			}


		}
	});

}
catch(error)
{
	console.log(error);
}



})();


