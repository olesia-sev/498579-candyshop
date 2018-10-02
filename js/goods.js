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

function forEach(array, cb) {
  Array.prototype.forEach.call(array, cb);
}

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

// отмечаем товар как избранное
var onButtonFavouriteClick = function (event) {
  if (event.target.classList.contains('card__btn-favorite')) {
    event.target.classList.toggle('card__btn-favorite--selected');
  }
};
var cardsContainer = document.querySelector('.catalog__cards'); // контейнер с товарами
cardsContainer.addEventListener('click', onButtonFavouriteClick);

// добавляем товар в корзину
// Задание 16.2

var onBasketButtonClick = function (event) {
  event.preventDefault(); // потому что иначе по клику нас переносит наверх

  if (event.target.classList.contains('card__btn')) {
    var chosenProduct = event.target.closest('article'); // находим карточку, по которой был клик

    var addedProduct = Object.assign({}, chosenProduct, {
      quantity: 1
    });

    var basketCardsContainer = document.querySelector('.goods__cards'); // контейнер товаров в корзине
    var names = basketCardsContainer.getElementsByClassName('card-order__title'); // имена в корзине
    var existedElement;

    forEach(names, function (element) {
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
cardsContainer.addEventListener('click', onBasketButtonClick);

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

  if (targetAmountInput.value <= 0) {
    targetProductCard.parentNode.removeChild(targetProductCard);
  }

  if (event.target.classList.contains('card-order__btn--increase')) {

    targetAmountInput.value++;

  } else if (event.target.classList.contains('card-order__btn--decrease')) {

    targetAmountInput.value--;

  }
};
basketContainer.addEventListener('click', onChangeAmountButtonClick);

// Задание 16.3
// Переключение вкладок в форме оформления заказа
addChangeEventForRadios(document.getElementsByName('method-deliver'));
addChangeEventForRadios(document.getElementsByName('pay-method'));

function addChangeEventForRadios(radios) {
  var tabsWrappers = [];

  forEach(radios, function (radio) {
    tabsWrappers.push('.' + radio.id);
  });

  forEach(radios, function (radio) {
    radio.addEventListener('change', function (event) {
      forEach(tabsWrappers, function (tabWrapper) {
        var currentElement = document.querySelector(tabWrapper);
        if (currentElement) {
          currentElement.classList.add('visually-hidden');
          changeElementsAccessibility(currentElement.getElementsByTagName('input'), true);
          changeElementsAccessibility(currentElement.getElementsByTagName('textarea'), true);
        }
      });

      var targetElement = document.querySelector('.' + event.target.id);

      if (!targetElement) {
        return;
      }

      targetElement.classList.remove('visually-hidden');
      changeElementsAccessibility(targetElement.getElementsByTagName('input'), false);
      changeElementsAccessibility(targetElement.getElementsByTagName('textarea'), false);
    });
  });
}

// Принимает на вход коллекцию элементов и каждому устанавливает disabled в значении = isAccessible (true/false)
function changeElementsAccessibility(elements, isAccessible) {
  if (!elements || !elements.length) {
    return;
  }

  forEach(elements, function (element) {
    element.disabled = !!isAccessible;
  });
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

// Задание 17
// Проверяем валидность форм
var cardPaymentContainer = document.querySelector('.payment__card');
var cardNumber = cardPaymentContainer.querySelector('#payment__card-number');
var cardDate = cardPaymentContainer.querySelector('#payment__card-date');
var cardCvc = cardPaymentContainer.querySelector('#payment__card-cvc');
var cardHolderName = cardPaymentContainer.querySelector('#payment__cardholder');

var cardStatusWrap = document.querySelector('.payment__card-status-wrap');
var cardStatus = cardStatusWrap.querySelector('.payment__card-status');

var validityText = '';

// Проверяем валидность номера карты с помощью алгоритма Луна
function checkCardValidity(number) {
  var arr = number.split('').map(function (char, index) {
    var digit = parseInt(char, 10);

    if ((index + number.length) % 2 === 0) {
      var digitX2 = digit * 2;

      return digitX2 > 9 ? digitX2 - 9 : digitX2;
    }
    return digit;
  });
  return !(arr.reduce(function (a, b) {
    return a + b;
  }, 0) % 10);
}
// console.log(checkCardValidity('4561261212345467'));

// функция изменения статуса карты
var onChangeCardStatus = function () {
  var isNumberValid = checkCardValidity(cardNumber.value);
  var isCardValid = isNumberValid && cardDate.validity.valid && cardCvc.validity.valid && cardHolderName.validity.valid;

  cardStatus.textContent = isCardValid === true ? 'Одобрен' : 'Не определён';
};

cardNumber.addEventListener('invalid', function () {
  if (cardNumber.validity.patternMismatch) {
    validityText = 'Номер карты должен содержать только цифры';
  } else if (cardNumber.validity.valueMissing) {
    validityText = 'Поле обязательно для заполнения';
  } else {
    validityText = '';
  }
  cardNumber.setCustomValidity(validityText);
});

cardDate.addEventListener('invalid', function () {
  if (cardDate.validity.patternMismatch) {
    validityText = 'Введите дату в формате мм/гг';
  } else if (cardDate.validity.valueMissing) {
    validityText = 'Поле обязательно для заполнения';
  } else {
    validityText = '';
  }
  cardDate.setCustomValidity(validityText);
});

cardCvc.addEventListener('invalid', function () {
  if (cardCvc.validity.patternMismatch) {
    validityText = 'Поле должно содержать 3 цифры';
  } else if (cardCvc.validity.valueMissing) {
    validityText = 'Поле обязательно для заполнения';
  } else {
    validityText = '';
  }
  cardCvc.setCustomValidity(validityText);
});

cardHolderName.addEventListener('invalid', function () {
  if (cardHolderName.validity.patternMismatch) {
    validityText = 'Заполните поле латинскими буквами';
  } else if (cardHolderName.validity.valueMissing) {
    validityText = 'Поле обязательно для заполнения';
  } else {
    validityText = '';
  }
  cardHolderName.setCustomValidity(validityText);
});

cardPaymentContainer.addEventListener('change', onChangeCardStatus);

var form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  var successModal = document.querySelector('.modal--success');
  successModal.classList.remove('modal--hidden');
});
