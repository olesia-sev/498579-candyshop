'use strict';
(function () {

  var selectedFoodTypes = [];


  var rerenderProductCards = function (filteredCards) {
    var productCardFragment = document.createDocumentFragment();

    for (var i = 0; i < filteredCards.length; i++) {
      productCardFragment.appendChild(window.data.createCard(filteredCards[i]));
    }

    document.querySelector('.catalog__cards').innerHTML = '';

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

    var arrSelectedProductsByType = filter(selectedFoodTypes, []);

    rerenderProductCards(filter(arrSelectedProductsByType));

    console.log(arrSelectedProductsByType);
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
    rangeSliderPrice.min = isNaN(price) ? 0 : price;
  }

  function rangeSliderMaxEventHandler() {
    var price = document.querySelector('.range__price--max').textContent;
    price = Math.abs(parseInt(price, 10));
    rangeSliderPrice.max = isNaN(price) ? 0 : price;
  }

  function addRangeSliderEventListener(element, onMouseMove) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // TODO filter(selectedFoodTypes, [], rangeSliderPrice)
        console.log(filter(selectedFoodTypes, []));
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  addFilterEventListener(document.querySelectorAll('input[name="food-type"]'), foodTypeChangeEventHandler, 'change');

  addRangeSliderEventListener(document.querySelector('.range__btn--left'), rangeSliderMinEventHandler);
  addRangeSliderEventListener(document.querySelector('.range__btn--right'), rangeSliderMaxEventHandler);

  function filter(kinds, nutritionFacts) {
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

    function sortByIngridients(good) {
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

    return window.data.arrProductInfo
      .filter(sortByKnd)
      .filter(sortByIngridients)
      .filter(sortByPrice);
  }

})();
