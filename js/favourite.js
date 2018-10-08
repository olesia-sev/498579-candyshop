'use strict';

(function () {

  // отмечаем товар как избранное
  var onButtonFavouriteClick = function (event) {
    if (event.target.classList.contains('card__btn-favorite')) {
      event.target.classList.toggle('card__btn-favorite--selected');
    }
  };
  var cardsContainer = document.querySelector('.catalog__cards'); // контейнер с товарами
  cardsContainer.addEventListener('click', onButtonFavouriteClick);

  window.favourite = {
    cardsContainer: cardsContainer
  };

})();
