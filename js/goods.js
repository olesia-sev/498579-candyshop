'use strict';

var CARDS_AMOUNT = 26;

var arrRatingClasses = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

var arrProductNames = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];
var arrProductImages = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg'
];
var arrProductIngredients = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// получаем случайное кол-во рандомных ингредиентов и записываем их в массив
var getRandomIngredientsAmount = function (array) {
  var randomNumberIngredients = getRandomNumber(1, array.length);
  var resultRandomIngredients = [];

  while (resultRandomIngredients.length < randomNumberIngredients) {
    var indexIngredient = getRandomNumber(0, array.length - 1);
    var isExist = false;

    for (var i = 0; i < resultRandomIngredients.length; i++) {
      if (resultRandomIngredients[i] === array[indexIngredient]) {
        isExist = true;
      }
    }
    if (!isExist) {
      resultRandomIngredients.push(array[indexIngredient]);
    }
  }
  return resultRandomIngredients.join(', ');
};

// Создаем массив объектов с данными о товарах
var createArrayOfRandomObjects = function (arrayLength) {
  var array = [];

  for (var i = 0; i < arrayLength; i++) {
    array.push({
      name: arrProductNames[getRandomNumber(0, arrProductNames.length - 1)],
      picture: 'img/cards/' + arrProductImages[getRandomNumber(0, arrProductImages.length - 1)],
      amount: getRandomNumber(0, 20),
      price: getRandomNumber(100, 1500),
      weight: getRandomNumber(30, 300),
      rating: {
        value: getRandomNumber(1, 5),
        number: getRandomNumber(10, 900)
      },
      nutritionFacts: {
        sugar: getRandomNumber(0, 1), // true or false
        energy: getRandomNumber(70, 500),
        contents: getRandomIngredientsAmount(arrProductIngredients)
      }
    });
  }
  return array;
};

var arrProductInfo = createArrayOfRandomObjects(CARDS_AMOUNT);

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

var productCardTemplate = document.querySelector('#card').content.querySelector('article');
var catalogCardsContainer = document.querySelector('.catalog__cards');

var setTitle = function (productCard, cardTitle) {
  productCard.querySelector(cardTitle).textContent = arrProductInfo[i].name;
};

var setAmount = function (productCard) {
  var amount = arrProductInfo[i].amount;
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

var hasSugar = function (productCard) {
  if (arrProductInfo[i].nutritionFacts.sugar) {
    productCard.querySelector('.card__characteristic').textContent = 'Без сахара.' + ' ' + arrProductInfo[i].nutritionFacts.energy + ' ' + 'ккал';
  } else {
    productCard.querySelector('.card__characteristic').textContent = 'Содержит сахар.' + ' ' + arrProductInfo[i].nutritionFacts.energy + ' ' + 'ккал';
  }
};

var setRating = function (productCard, reviewsAmount, productRating) {
  // кол-во отзывов
  productCard.querySelector(reviewsAmount).textContent = '(' + arrProductInfo[i].rating.number + ')';
  // выставление звезд
  productRating.classList.remove('stars__rating--five');

  var ratingIndex = arrProductInfo[i].rating.value - 1;

  if (ratingIndex > -1 && arrRatingClasses[ratingIndex]) {
    productRating.classList.add(arrRatingClasses[ratingIndex]);
  }
};

var setImage = function (productCard, productPicture) {
  // изображение
  productPicture.src = arrProductInfo[i].picture;
  productPicture.alt = arrProductInfo[i].name;
};

var setPrice = function (productCard, productPrice) {
  // стоимость
  productPrice.childNodes[0].textContent = arrProductInfo[i].price;
  productPrice.childNodes[2].textContent = '/' + ' ' + arrProductInfo[i].weight + ' ' + 'Г';
};

var setContents = function (productCard, contentsList) {
  // состав
  productCard.querySelector(contentsList).textContent = arrProductInfo[i].nutritionFacts.contents;
};

var productCardFragment = document.createDocumentFragment();
for (var i = 0; i < CARDS_AMOUNT; i++) {

  var productCard = productCardTemplate.cloneNode(true);
  var productRating = productCard.querySelector('.stars__rating');
  var productPicture = productCard.querySelector('.card__img');
  var productPrice = productCard.querySelector('.card__price');

  setTitle(productCard, '.card__title');
  setAmount(productCard);
  hasSugar(productCard);
  setRating(productCard, '.star__count', productRating);
  setImage(productCard, productPicture);
  setPrice(productCard, productPrice);
  setContents(productCard, '.card__composition-list');

  productCardFragment.appendChild(productCard);
}
catalogCardsContainer.appendChild(productCardFragment);

// корзина
document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

var basketProductCardTemplate = document.querySelector('#card-order').content.querySelector('article');
var basketCardsContainer = document.querySelector('.goods__cards');

for (var l = 0; l < 3; l++) {
  var basketProductCard = basketProductCardTemplate.cloneNode(true);

  basketProductCard.querySelector('.card-order__title').textContent = arrProductInfo[l].name;
  basketProductCard.querySelector('.card-order__price').textContent = arrProductInfo[l].price;
  basketProductCard.querySelector('.card-order__count').value = arrProductInfo[l].amount;

  basketCardsContainer.appendChild(basketProductCard);
}
