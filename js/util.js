'use strict';

(function () {
  var CARDS_AMOUNT = 26;

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

  window.util = {
    arrProductInfo: arrProductInfo
  };
})();


