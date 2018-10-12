'use strict';

(function (fn) {

  addChangeEventForRadios(document.getElementsByName('method-deliver'));
  addChangeEventForRadios(document.getElementsByName('pay-method'));

  function addChangeEventForRadios(radios) {
    var tabsWrappers = [];

    fn.forEach(radios, function (radio) {
      tabsWrappers.push('.' + radio.id);
    });

    var changeRadioEventHandler = function (evt) {
      fn.forEach(tabsWrappers, function (tabWrapper) {
        var currentElement = document.querySelector(tabWrapper);
        if (currentElement) {
          currentElement.classList.add('visually-hidden');
          changeElementsAccessibility(currentElement.getElementsByTagName('input'), true);
          changeElementsAccessibility(currentElement.getElementsByTagName('textarea'), true);
        }
      });

      var targetElement = document.querySelector('.' + evt.target.id);

      if (!targetElement) {
        return;
      }

      targetElement.classList.remove('visually-hidden');
      changeElementsAccessibility(targetElement.getElementsByTagName('input'), false);
      changeElementsAccessibility(targetElement.getElementsByTagName('textarea'), false);
    };

    fn.forEach(radios, function (radio) {
      radio.addEventListener('change', changeRadioEventHandler);
    });
  }

  // Принимает на вход коллекцию элементов и каждому устанавливает disabled в значении = isAccessible (true/false)
  // Блокируем инпуты не выбранного таба
  function changeElementsAccessibility(elements, isAccessible) {
    if (!elements || !elements.length) {
      return;
    }

    fn.forEach(elements, function (element) {
      element.disabled = !!isAccessible;
    });
  }

})(window.functions);
