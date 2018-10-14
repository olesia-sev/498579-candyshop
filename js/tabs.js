'use strict';

(function () {

  addChangeEventForRadios(document.querySelectorAll('input[name="method-deliver"]'));
  addChangeEventForRadios(document.querySelectorAll('input[name="pay-method"]'));

  function addChangeEventForRadios(radios) {
    var tabsWrappers = [];

    radios.forEach(function (radio) {
      tabsWrappers.push('.' + radio.id);
    });

    var changeRadioEventHandler = function (evt) {
      tabsWrappers.forEach(function (tabWrapper) {
        var currentElement = document.querySelector(tabWrapper);
        if (currentElement) {
          currentElement.classList.add('visually-hidden');
          changeElementsAccessibility(currentElement.querySelectorAll('input'), true);
          changeElementsAccessibility(currentElement.querySelectorAll('textarea'), true);
        }
      });

      var targetElement = document.querySelector('.' + evt.target.id);

      if (!targetElement) {
        return;
      }

      targetElement.classList.remove('visually-hidden');
      changeElementsAccessibility(targetElement.querySelectorAll('input'), false);
      changeElementsAccessibility(targetElement.querySelectorAll('textarea'), false);
    };

    radios.forEach(function (radio) {
      radio.addEventListener('change', changeRadioEventHandler);
    });
  }

  // Принимает на вход коллекцию элементов и каждому устанавливает disabled в значении = isAccessible (true/false)
  // Блокируем инпуты не выбранного таба
  function changeElementsAccessibility(elements, isAccessible) {
    if (!elements || !elements.length) {
      return;
    }

    elements.forEach(function (element) {
      element.disabled = !!isAccessible;
    });
  }

})();
