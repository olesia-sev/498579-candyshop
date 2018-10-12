'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.functions = {
    forEach: function (array, cb) {
      Array.prototype.forEach.call(array, cb);
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
