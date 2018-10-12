'use strict';

(function () {

  var IMG_PATH = 'img/cards/';

  var modalError = document.querySelector('.modal--error');
  var modalSuccess = document.querySelector('.modal--success');
  var closeModalError = modalError.querySelector('.modal__close');
  var closeModalSuccess = modalSuccess.querySelector('.modal__close');

  var arrRatingClasses = [
    'stars__rating--one',
    'stars__rating--two',
    'stars__rating--three',
    'stars__rating--four',
    'stars__rating--five',
  ];

  window.data = {};
  window.data.arrProductInfo = [];

  var setTitle = function (productCard, cardTitle, item) {
    cardTitle.textContent = item.name;
  };

  var setAmount = function (productCard, item) {
    var amount = item.amount;
    productCard.classList.remove('card--in-stock');
    if (amount === 0) {
      productCard.classList.add('card--soon');
    } else if (amount > 0 && amount < 5) {
      productCard.classList.add('card--little');
    } else {
      productCard.classList.add('card--in-stock');
    }
    return amount;
  };

  var hasSugar = function (productCard, item) {
    if (item.nutritionFacts.sugar) {
      productCard.querySelector('.card__characteristic').textContent = 'Без сахара.' + ' ' + item.nutritionFacts.energy + ' ' + 'ккал';
    } else {
      productCard.querySelector('.card__characteristic').textContent = 'Содержит сахар.' + ' ' + item.nutritionFacts.energy + ' ' + 'ккал';
    }
  };

  var setRating = function (productCard, reviewsAmount, productRating, item) {
    // кол-во отзывов
    reviewsAmount.textContent = '(' + item.rating.number + ')';
    // выставление звезд
    productRating.classList.remove('stars__rating--five');

    var ratingIndex = item.rating.value - 1;

    if (ratingIndex > -1 && arrRatingClasses[ratingIndex]) {
      productRating.classList.add(arrRatingClasses[ratingIndex]);
    }
  };

  var setImage = function (productCard, productPicture, item) {
    // изображение
    productPicture.src = IMG_PATH + item.picture;
    productPicture.alt = item.name;
  };

  var setPrice = function (productCard, productPrice, item) {
    // стоимость
    productPrice.childNodes[0].textContent = item.price;
    productPrice.childNodes[2].textContent = '/' + ' ' + item.weight + ' ' + 'Г';
  };

  var setContents = function (productCard, contentsList, item) {
    // состав
    contentsList.textContent = item.nutritionFacts.contents;
  };

  // Создаём карточку
  var createCard = function (item) {
    var productCardTemplate = document.querySelector('#card').content.querySelector('article');
    var productCard = productCardTemplate.cloneNode(true);

    setAmount(productCard, item);

    var cardTitle = productCard.querySelector('.card__title');
    setTitle(productCard, cardTitle, item);

    var productPicture = productCard.querySelector('.card__img');
    setImage(productCard, productPicture, item);

    var productRating = productCard.querySelector('.stars__rating');
    var reviewsAmount = productCard.querySelector('.star__count');
    setRating(productCard, reviewsAmount, productRating, item);

    var productPrice = productCard.querySelector('.card__price');
    setPrice(productCard, productPrice, item);

    hasSugar(productCard, item);

    var contentsList = productCard.querySelector('.card__composition-list');
    setContents(productCard, contentsList, item);

    return productCard;
  };

  var initCardsBlock = function () {
    document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
    document.querySelector('.catalog__load').classList.add('visually-hidden');
  };

  var catalogCardsContainer = document.querySelector('.catalog__cards');

  var successHandler = function (cards) {
    var productCardFragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      productCardFragment.appendChild(createCard(cards[i]));
    }
    catalogCardsContainer.appendChild(productCardFragment);

    initCardsBlock();
    window.initRangeSlider(cards);
    window.data.arrProductInfo = cards;
  };

  var errorHandler = function () {
    modalError.classList.remove('modal--hidden');
  };

  window.backend.loadData(successHandler, errorHandler);

  // показать состав
  var onContentButtonClick = function (event) {
    if (event.target.classList.contains('card__btn-composition')) {
      event.target.closest('.card__main').querySelector('.card__composition').classList.toggle('card__composition--hidden');
    }
  };

  var cardsContainer = document.querySelector('.catalog__cards'); // контейнер с товарами
  cardsContainer.addEventListener('click', onContentButtonClick);

  window.data.modalError = modalError;
  window.data.modalSuccess = modalSuccess;
  window.data.closeModalError = closeModalError;
  window.data.closeModalSuccess = closeModalSuccess;
  window.data.catalogCardsContainer = catalogCardsContainer;
  window.data.createCard = createCard;

})();
