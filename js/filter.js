'use strict';
(function () {

  var selectedFoodTypes = [];

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

    rerenderProductCards(filter(selectedFoodTypes, [], sortBy));
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

  function foodTypeChangeEventHandler(evt) {
    var type = getLabelText(evt.target.id);

    if (!type) {
      return;
    }

    if (evt.target.checked) {
      selectedFoodTypes = pushToArray(selectedFoodTypes, type);
    } else {
      selectedFoodTypes = removeFromArray(selectedFoodTypes, type);
    }

    var arrSelectedProductsByType = filter(selectedFoodTypes, [], sortBy);

    // Показываем карточки соответствующие выбранному фильтру
    rerenderProductCards(arrSelectedProductsByType);
  }

  function getLabelText(inputId) {
    var label = document.querySelector('label[for="' + inputId + '"]');

    if (!label || !label.textContent) {
      return undefined;
    }
    return label.textContent;
  }

  function pushToArray(array, value) {
    if (!Array.isArray(array)) {
      return array;
    }
    // не дублируем значения в массиве
    if (array.indexOf(value) > -1) {
      return array;
    }
    array.push(value);
    return array;
  }

  function removeFromArray(array, value) {
    if (!Array.isArray(array)) {
      return array;
    }
    var index = array.indexOf(value);

    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
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

        rerenderProductCards(filter(selectedFoodTypes, [], sortBy));
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  addFilterEventListener(document.querySelectorAll('input[name="food-type"]'), foodTypeChangeEventHandler, 'change');

  addRangeSliderEventListener(document.querySelector('.range__btn--left'), rangeSliderMinEventHandler);
  addRangeSliderEventListener(document.querySelector('.range__btn--right'), rangeSliderMaxEventHandler);

  function filter(kinds, nutritionFacts, sortOption) {
    function sortByKnd(good) {
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

    function sortByIngredients(good) {
      for (var key in nutritionFacts) {
        if (
          nutritionFacts
          && nutritionFacts.hasOwnProperty(key)
          && good.nutritionFacts[key] !== nutritionFacts[key]
        ) {
          return false;
        }
      }
      return true;
    }

    function sortByPrice(good) {
      return good.price >= window.rangeSliderPrice.min && good.price <= window.rangeSliderPrice.max;
    }

    return getSorted(sortOption, window.data.arrProductInfo
        .filter(sortByKnd)
        .filter(sortByIngredients)
        .filter(sortByPrice)
    );
  }

})();
