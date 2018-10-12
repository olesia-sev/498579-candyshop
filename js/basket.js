'use strict';

(function () {

// добавляем товар в корзину
  var onBasketButtonClick = function (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('card__btn')) {
      var chosenProduct = evt.target.closest('article'); // находим карточку, по которой был клик

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

  document.querySelector('.catalog__cards').addEventListener('click', onBasketButtonClick);

  // Удаление из корзины
  var basketContainer = document.querySelector('.goods__cards');

  var onDeleteButtonClick = function (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('card-order__close')) {
      var targetProductCard = evt.target.closest('article');

      targetProductCard.parentNode.removeChild(targetProductCard);
    }

    clearBasketIfNeeded();
  };

  basketContainer.addEventListener('click', onDeleteButtonClick);

  function clearBasketIfNeeded() {
    var basketCardsContainer = document.querySelector('.goods__cards'); // контейнер товаров в корзине
    if (
      !basketCardsContainer.getElementsByClassName('card-order')
      || !basketCardsContainer.getElementsByClassName('card-order').length
    ) {
      basketCardsContainer.classList.add('goods__cards--empty');
      document.querySelector('.goods__card-empty').classList.remove('visually-hidden');
    }
  }

  // увеличение и уменьшение кол-ва товаров
  var onChangeAmountButtonClick = function (evt) {
    var targetProductCard = evt.target.closest('article');
    var targetAmountInput = targetProductCard.querySelector('.card-order__count');

    if (evt.target.classList.contains('card-order__btn--increase')) {
      targetAmountInput.value++;
    } else if (evt.target.classList.contains('card-order__btn--decrease')) {
      targetAmountInput.value--;
    }

    if (parseInt(targetAmountInput.value, 10) === 0) {
      targetProductCard.parentNode.removeChild(targetProductCard);

      clearBasketIfNeeded();
    }
  };
  basketContainer.addEventListener('click', onChangeAmountButtonClick);

})();
