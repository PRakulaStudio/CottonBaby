var swiper = new Swiper('.swiper-main', {
	loop: true,
	autoplay: window.innerWidth<1000?{
        delay: 2500,
        disableOnInteraction: false,
      }:false,
	pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    navigation: {
        nextEl: '.main-next',
        prevEl: '.main-prev',
      },
});

var swiper = new Swiper('.swiper-new', {
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