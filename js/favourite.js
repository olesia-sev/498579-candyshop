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

    if (window.favorite.includes(name)) {
      window.functions.removeFromArray(window.favorite, name);
    } else {
      window.functions.pushToArray(window.favorite, name);
    }

    window.rerenderWithFavourites();
  };

  document.querySelector('.catalog__cards').addEventListener('click', onButtonFavoriteClick);

})();
