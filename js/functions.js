'use strict';

(function () {

  window.functions = {
    forEach: function (array, cb) {
      Array.prototype.forEach.call(array, cb);
    }
  };

})();
