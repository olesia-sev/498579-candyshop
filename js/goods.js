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

var setAddToCartHandler = function (productCard, i) {
  productCard.querySelector('.card__btn')
    .setAttribute('onclick', 'addToBasket(' + JSON.stringify(arrProductInfo[i]) + ')');
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
  setAddToCartHandler(productCard, i);

  productCardFragment.appendChild(productCard);
}
catalogCardsContainer.appendChild(productCardFragment);

// отмечаем товар как избранное
var buttonFavourite = document.getElementsByClassName('card__btn-favorite');
var onButtonFavouriteClick = function (event) {
  event.preventDefault();
  event.target.classList.toggle('card__btn-favorite--selected');
};

for (var n = 0; n < buttonFavourite.length; n++) {
  buttonFavourite[n].addEventListener('click', onButtonFavouriteClick);
}

// добавляем товар в корзину
// Задание 16.2
window.addToBasket = function (item) {
  event.preventDefault();

  var orderedAmount = 1;
  var addedProduct = Object.assign({}, item, {
    quantity: orderedAmount
  });
  var basketCardsContainer = document.querySelector('.goods__cards');

  // Проверяем есть ли уже такой товар в корзине
  // если есть, то увеличиваем кол-во (quantity) на 1
  var names = basketCardsContainer.getElementsByClassName('card-order__title');

  var existedElement;

  Array.prototype.forEach.call(names, function (element) {
    if (addedProduct.name === element.textContent) {
      existedElement = element.closest('.card-order');
    }
  });

  if (existedElement) {
    var countElement = existedElement.querySelector('.card-order__count');
    countElement.value = parseInt(countElement.value, 10) + 1;
  } else {
    var basketProductCardTemplate = document.querySelector('#card-order').content.querySelector('article');
    var basketProductCard = basketProductCardTemplate.cloneNode(true);

    basketProductCard.querySelector('.card-order__title').textContent = addedProduct.name;
    basketProductCard.querySelector('.card-order__img').src = addedProduct.picture;
    basketProductCard.querySelector('.card-order__price').textContent = addedProduct.price;
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
};

// Задание 16.3
// Переключение вкладок в форме оформления заказа
var deliveryContainer = document.querySelector('.deliver');

deliveryContainer.addEventListener('click', function () {
  switchTab(deliveryContainer, '.deliver__store', '.deliver__courier');
});

function switchTab(block, blockOpened, blockClosed) {

  var currentBlock = block.querySelector('.' + event.target.id);
  var blockToOpen = block.querySelector(blockOpened);
  var blockToClose = block.querySelector(blockClosed);

  currentBlock.classList.remove('visually-hidden');

  if (currentBlock === blockToOpen) {
    blockToClose.classList.add('visually-hidden');
  } else {
    blockToOpen.classList.add('visually-hidden');
  }
}

// Задание16.4
// Первая фаза работы фильтра по цене
// пока можем описать только отпускание, которое будет приводить к изменению значения блоков
var sliderContainer = document.querySelector('.range');
var sliderPinMin = sliderContainer.querySelector('.range__btn--left');
var sliderPinMax = sliderContainer.querySelector('.range__btn--right');

var sliderPinEventHandler = function (event, priceElement) {
  event.preventDefault();

  priceElement.textContent = event.clientX;
};

sliderPinMin.addEventListener('mouseup', function (event) {
  sliderPinEventHandler(event, sliderContainer.querySelector('.range__price--min'));
});
sliderPinMax.addEventListener('mouseup', function (event) {
  sliderPinEventHandler(event, sliderContainer.querySelector('.range__price--max'));
});

