'use strict';

(function () {

  window.favorite = [];

  // отмечаем товар как избранное
  var onButtonFavoriteClick = function (evt) {
    if (!evt.target.classList.contains('card__btn-favorite')) {
      return;
    }

    var name = evt.target.closest('.catalog__card').querySelector('.card__title').textContent;

    if (!name) {
      return;
    }

    if (evt.target.classList.contains('card__btn-favorite--selected')) {
      evt.target.classList.remove('card__btn-favorite--selected');
      window.functions.removeFromArray(window.favorite, name);
    } else {
      evt.target.classList.add('card__btn-favorite--selected');
      window.functions.pushToArray(window.favorite, name);
    }
  };

  document.querySelector('.catalog__cards').addEventListener('click', onButtonFavoriteClick);

})();
