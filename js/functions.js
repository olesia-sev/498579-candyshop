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
    }
  };

})();
