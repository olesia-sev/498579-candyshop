'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.functions = {

    addEventListenersForElements: function (elements, handler, eventType) {
      if (!elements || !elements.length) {
        return;
      }
      elements.forEach(function (element) {
        element.addEventListener(eventType, handler);
      });
    },

    find: function (array, cb) {
      return Array.prototype.find.call(array, cb);
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    pushToArray: function (array, value) {
      if (!Array.isArray(array)) {
        return array;
      }
      // не дублируем значения в массиве
      if (array.indexOf(value) > -1) {
        return array;
      }
      array.push(value);
      return array;
    },

    removeFromArray: function (array, value) {
      if (!Array.isArray(array)) {
        return array;
      }
      var index = array.indexOf(value);

      if (index > -1) {
        array.splice(index, 1);
      }
      return array;
    }
  };

})();
