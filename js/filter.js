'use strict';
(function () {

  var selectedFoodTypes = [];
  var selectedFoodIngredients = [];

  var extraFilterValue;

  var sortBy;

  function immutableSort(arr, compareFunction) {
    return arr.concat().sort(compareFunction);
  }

  function getSorted(sortOption, arr) {
    if (!sortOption) {
      return arr;
    }

    var sorted = [];

    switch (sortOption) {
      // Сначала популярные
      case 'popular':
        sorted = arr;
        break;

      // Сначала дорогие
      case 'expensive':
        sorted = immutableSort(arr, function (a, b) {
          if (a.price > b.price) {
            return -1;
          }

          if (a.price < b.price) {
            return 1;
          }

          return 0;
        });
        break;

      // Сначала дешёвые
      case 'cheep':
        sorted = immutableSort(arr, function (a, b) {
          if (a.price > b.price) {
            return 1;
          }

          if (a.price < b.price) {
            return -1;
          }

          return 0;
        });
        break;

      // По рейтингу
      case 'rating':
        sorted = immutableSort(arr, function (a, b) {
          // товары, расположенные в порядке убывания рейтинга
          if (a.rating.value > b.rating.value) {
            return -1;
          }

          if (a.rating.value < b.rating.value) {
            return 1;
          }

          // при совпадении рейтинга, выше показывается товар, у которого больше голосов в рейтинге.
          if (a.rating.number > b.rating.number) {
            return -1;
          }

          if (a.rating.number < b.rating.number) {
            return 1;
          }

          return 0;
        });
        break;
    }
    return sorted;
  }

  var sortHandler = function (evt) {
    sortBy = evt.target.value;

    rerenderProductCards(filter(selectedFoodTypes, selectedFoodIngredients, sortBy));
  };

  addFilterEventListener(document.querySelectorAll('input[name="sort"]'), sortHandler, 'change');

  // функция перерисовки карточек
  var rerenderProductCards = function (filteredCards) {
    var productCardFragment = document.createDocumentFragment();

    for (var i = 0; i < filteredCards.length; i++) {
      productCardFragment.appendChild(window.data.createCard(filteredCards[i]));
    }

    window.data.catalogCardsContainer.innerHTML = '';
    window.data.catalogCardsContainer.appendChild(productCardFragment);
  };

  function addFilterEventListener(elements, handler, eventType) {
    if (!elements || !elements.length) {
      return;
    }
    window.functions.forEach(elements, function (element) {
      element.addEventListener(eventType, handler);
    });
  }

  function extraFilter(evt) {
    document.querySelector('.catalog__sidebar form').reset();
    window.initRangeSlider(window.data.arrProductInfo);

    if (evt.target.value && extraFilterValue !== evt.target.value) {
      evt.target.checked = true;
    }

    switch (evt.target.value) {
      case 'favorite':
        extraFilterValue = evt.target.checked ? 'favorite' : undefined;
        break;

      case 'availability':
        extraFilterValue = evt.target.checked ? 'availability' : undefined;
        break;
    }

    rerenderProductCards(filterByExtra(extraFilterValue));

    function filterByExtra(value) {
      if (value === 'favorite') {
        return window.data.arrProductInfo.filter(function (item) {
          return window.favorite.includes(item.name);
        });
      }

      if (value === 'availability') {
        return window.data.arrProductInfo.filter(function (item) {
          return item.amount > 0;
        });
      }

      return window.data.arrProductInfo;
    }
  }

  function foodChangeEventHandler(evt) {
    function getSelectedFoodTypes(types) {
      var type = getLabelText(evt.target.id);
      if (!type) {
        return types;
      }
      if (evt.target.checked) {
        return window.functions.pushToArray(types, type);
      }
      return window.functions.removeFromArray(types, type);
    }

    function getSelectedFoodIngredients(ingr) {
      if (evt.target.checked) {
        return window.functions.pushToArray(ingr, evt.target.value);
      }
      return window.functions.removeFromArray(ingr, evt.target.value);
    }

    var name = evt.target.name;

    if (name === 'food-type') {
      selectedFoodTypes = getSelectedFoodTypes(selectedFoodTypes);
    }

    if (name === 'food-property') {
      selectedFoodIngredients = getSelectedFoodIngredients(selectedFoodIngredients);
    }

    // Показываем карточки соответствующие выбранному фильтру
    rerenderProductCards(filter(selectedFoodTypes, selectedFoodIngredients, sortBy));
  }

  function getLabelText(inputId) {
    var label = document.querySelector('label[for="' + inputId + '"]');

    if (!label || !label.textContent) {
      return undefined;
    }
    return label.textContent;
  }

  function rangeSliderMinEventHandler() {
    var price = document.querySelector('.range__price--min').textContent;
    price = Math.abs(parseInt(price, 10));
    window.rangeSliderPrice.min = isNaN(price) ? 0 : price;
  }

  function rangeSliderMaxEventHandler() {
    var price = document.querySelector('.range__price--max').textContent;
    price = Math.abs(parseInt(price, 10));
    window.rangeSliderPrice.max = isNaN(price) ? 0 : price;
  }

  function addRangeSliderEventListener(element, onMouseMove) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        rerenderProductCards(filter(selectedFoodTypes, selectedFoodIngredients, sortBy));
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  addFilterEventListener(document.querySelectorAll('input[name="food-type"]'), foodChangeEventHandler, 'change');
  addFilterEventListener(document.querySelectorAll('input[name="food-property"]'), foodChangeEventHandler, 'change');
  addFilterEventListener(document.querySelectorAll('input[name="mark"]'), extraFilter, 'change');

  addRangeSliderEventListener(document.querySelector('.range__btn--left'), rangeSliderMinEventHandler);
  addRangeSliderEventListener(document.querySelector('.range__btn--right'), rangeSliderMaxEventHandler);

  function filter(kinds, nutritionFacts, sortOption) {
    function filterByKind(good) {
      if (!kinds.length) {
        return true;
      }
      for (var i = 0; i < kinds.length; i++) {
        if (good.kind === kinds[i]) {
          return true;
        }
      }
      return false;
    }

    function filterByIngredients(good) {
      if (!nutritionFacts.length) {
        return true;
      }

      function sugar() {
        if (!nutritionFacts.includes('sugar')) {
          return true;
        }
        return good.nutritionFacts.sugar !== nutritionFacts.includes('sugar');
      }

      function gluten() {
        if (!nutritionFacts.includes('gluten')) {
          return true;
        }
        return good.nutritionFacts.gluten !== nutritionFacts.includes('gluten');
      }

      function vegetarian() {
        if (!nutritionFacts.includes('sugar')) {
          return true;
        }
        return good.nutritionFacts.vegetarian === nutritionFacts.includes('vegetarian');
      }

      return sugar() && gluten() && vegetarian();
    }

    function filterByPrice(good) {
      return good.price >= window.rangeSliderPrice.min && good.price <= window.rangeSliderPrice.max;
    }

    return getSorted(sortOption, window.data.arrProductInfo
      .filter(filterByKind)
      .filter(filterByIngredients)
      .filter(filterByPrice)
    );
  }

})();
