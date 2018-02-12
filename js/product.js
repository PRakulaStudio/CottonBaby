var galleryTop = new Swiper('.slider-top', {
      spaceBetween: 10,
    });
var galleryThumbs = new Swiper('.slider-thumbs', {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 'auto',
  touchRatio: 0.2,
  slideToClickedSlide: true,
});
galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;

var galleryTop = new Swiper('.fullscreen', {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
      },
    });
galleryThumbs.controller.control = galleryTop;

var swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
  // when window width is <= 320px
    900: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 1,
    },
  }
});