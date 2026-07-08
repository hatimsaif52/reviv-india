const productCardsSwiper = new Swiper(".product-cards-swiper", {
  slidesPerView: 1,
  spaceBetween: 80,
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
  },
  pagination: {
    el: ".product-cards-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".product-cards-button-next",
    prevEl: ".product-cards-button-prev",
  },
});
