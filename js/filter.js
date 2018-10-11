'use strict';
(function () {

  var selectedFoodTypes = [];

  function addFilterEventListener(elements, handler) {
    if (!elements || !elements.length) {
      return;
    }

    window.functions.forEach(elements, function (element) {
      element.addEventListener('change', handler);
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

    var test = filter(selectedFoodTypes, [], []);

    console.log(window.data.arrProductInfo, test);
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

  addFilterEventListener(document.querySelectorAll('input[name="food-type"]'), foodTypeChangeEventHandler);

  function filter(kinds, nutritionFacts, price) {
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
      return good.price >= price.min && good.price <= price.max;
    }

    return window.data.arrProductInfo.filter(sortByKnd).filter(sortByIngridients).filter(sortByPrice);
  }

})();
