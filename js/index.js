var swiper = new Swiper('.swiper-main', {
	loop: true,
	autoplay: window.innerWidth<1000?{
        delay: 3000,
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

var swiper = new Swiper('.swiper-prod', {
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

var swiper = new Swiper('.swiper-insta', {
    slidesPerView: 4,
    spaceBetween: 1,
    loop: true,
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