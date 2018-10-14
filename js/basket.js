'use strict';

(function () {

  var basketCardsContainer = document.querySelector('.goods__cards'); // контейнер товаров в корзине

  // добавляем товар в корзину
  var onBasketButtonClick = function (evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains('card__btn')) {
      return;
    }

    var chosenProduct = evt.target.closest('article'); // находим карточку, по которой был клик
    var names = basketCardsContainer.querySelectorAll('.card-order__title'); // имена в корзине

    var existedElement = window.functions.find(names, function (element) {
      return chosenProduct.querySelector('h3').textContent === element.textContent;
    });

    if (existedElement) {
      var countElement = existedElement.closest('.card-order').querySelector('.card-order__count');
      countElement.value = parseInt(countElement.value, 10) + 1;
    } else {
      addItemToBasket(chosenProduct);
    }

    showBasket();
  };

  // Функция добавления товара в корзину
  function addItemToBasket(chosenProduct) {
    var addedProduct = Object.assign({}, chosenProduct, {
      quantity: 1
    });
    var basketProductCardTemplate = document.querySelector('#card-order').content.querySelector('article');
    var basketProductCard = basketProductCardTemplate.cloneNode(true);

    basketProductCard.querySelector('.card-order__title').textContent = chosenProduct.querySelector('h3').textContent;
    basketProductCard.querySelector('.card-order__img').src = chosenProduct.querySelector('.card__img').src;
    basketProductCard.querySelector('.card-order__price').textContent = chosenProduct.querySelector('.card__price').childNodes[0].textContent + ' ₽';
    basketProductCard.querySelector('.card-order__count').value = addedProduct.quantity;

    basketCardsContainer.appendChild(basketProductCard);
  }

  // Функция показа корзины
  function showBasket() {
    if (
      basketCardsContainer.querySelectorAll('.card-order')
      && basketCardsContainer.querySelectorAll('.card-order').length
    ) {
      document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
      document.querySelector('.goods__card-empty').classList.add('visually-hidden');
    }
  }

  document.querySelector('.catalog__cards').addEventListener('click', onBasketButtonClick);

  // Удаление из корзины
  var onDeleteButtonClick = function (evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('card-order__close')) {
      var targetProductCard = evt.target.closest('article');

      targetProductCard.parentNode.removeChild(targetProductCard);
    }

    clearBasketIfNeeded();
  };

  basketCardsContainer.addEventListener('click', onDeleteButtonClick);

  function clearBasketIfNeeded() {
    if (
      !basketCardsContainer.querySelectorAll('.card-order')
      || !basketCardsContainer.querySelectorAll('.card-order').length
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
  basketCardsContainer.addEventListener('click', onChangeAmountButtonClick);

})();
