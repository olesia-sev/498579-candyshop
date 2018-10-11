'use strict';

(function () {

// добавляем товар в корзину
  var onBasketButtonClick = function (event) {
    event.preventDefault();

    if (event.target.classList.contains('card__btn')) {
      var chosenProduct = event.target.closest('article'); // находим карточку, по которой был клик

      var addedProduct = Object.assign({}, chosenProduct, {
        quantity: 1
      });

      var basketCardsContainer = document.querySelector('.goods__cards'); // контейнер товаров в корзине
      var names = basketCardsContainer.getElementsByClassName('card-order__title'); // имена в корзине
      var existedElement;

      window.functions.forEach(names, function (element) {
        if (chosenProduct.querySelector('h3').textContent === element.textContent) {
          existedElement = element.closest('.card-order');
        }
      });

      if (existedElement) {
        var countElement = existedElement.querySelector('.card-order__count');
        countElement.value = parseInt(countElement.value, 10) + 1;
      } else {
        var basketProductCardTemplate = document.querySelector('#card-order').content.querySelector('article');
        var basketProductCard = basketProductCardTemplate.cloneNode(true);

        basketProductCard.querySelector('.card-order__title').textContent = chosenProduct.querySelector('h3').textContent;
        basketProductCard.querySelector('.card-order__img').src = chosenProduct.querySelector('.card__img').src;
        basketProductCard.querySelector('.card-order__price').textContent = chosenProduct.querySelector('.card__price').childNodes[0].textContent + ' ₽';
        basketProductCard.querySelector('.card-order__count').value = addedProduct.quantity;

        basketCardsContainer.appendChild(basketProductCard);
      }

      if (
        basketCardsContainer.getElementsByClassName('card-order')
        && basketCardsContainer.getElementsByClassName('card-order').length
      ) {
        document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
        document.querySelector('.goods__card-empty').classList.add('visually-hidden');
      }
    }
  };
  window.favourite.cardsContainer.addEventListener('click', onBasketButtonClick);

  // Удаление из корзины
  var basketContainer = document.querySelector('.goods__cards');

  var onDeleteButtonClick = function (event) {
    event.preventDefault();

    if (event.target.classList.contains('card-order__close')) {
      var targetProductCard = event.target.closest('article');

      targetProductCard.parentNode.removeChild(targetProductCard);
    }
  };
  basketContainer.addEventListener('click', onDeleteButtonClick);

  // увеличение и уменьшение кол-ва товаров
  var onChangeAmountButtonClick = function (event) {
    var targetProductCard = event.target.closest('article');
    var targetAmountInput = targetProductCard.querySelector('.card-order__count');

    if (event.target.classList.contains('card-order__btn--increase')) {
      targetAmountInput.value++;
    } else if (event.target.classList.contains('card-order__btn--decrease')) {
      targetAmountInput.value--;
    }

    if (parseInt(targetAmountInput.value, 10) === 0) {
      targetProductCard.parentNode.removeChild(targetProductCard);
    }
  };
  basketContainer.addEventListener('click', onChangeAmountButtonClick);

})();
