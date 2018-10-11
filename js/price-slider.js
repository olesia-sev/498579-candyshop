'use strict';
(function () {

  /* Слайдер */
  var sliderContainer = document.querySelector('.range');
  var sliderPinMin = sliderContainer.querySelector('.range__btn--left');
  var sliderPinMax = sliderContainer.querySelector('.range__btn--right');

  var sliderMinContainer = sliderContainer.querySelector('.range__price--min');
  var sliderMaxContainer = sliderContainer.querySelector('.range__price--max');

  var sliderPath = sliderContainer.querySelector('.range__filter');
  var sliderFillLine = sliderContainer.querySelector('.range__fill-line');

  var movePin = function (element, container, minPrice, maxPrice) {
    // Получаем координаты контейнера,
    // который ограничивает пины слева и справа
    var edgeCoords = container.getBoundingClientRect();
    var edgeLeft = edgeCoords.left;
    var edgeRight = edgeCoords.right - edgeLeft;
    var pricePerPx = (maxPrice - minPrice) / edgeCoords.width;

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      // запоминаем начальные координаты
      var startCoords = {
        x: evt.clientX,
      };

      // При каждом движении мыши нам нужно обновлять смещение
      // относительно первоначальной точки,
      // чтобы пин смещался на необходимую величину.
      var onMouseMove = function (moveEvt) {
        //  moveEvt.preventDefault();

        // noinspection JSValidateTypes
        moveEvt.target.style.zIndex = 10;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };

        // Находим положение пина
        var newLeftX = element.offsetLeft - shift.x;

        // Ограничиваем движение пина за левую границу
        if (newLeftX < 0) {
          newLeftX = 0;
        } else if (newLeftX > edgeRight) {
          // Ограничиваем движение пина за правую границу
          newLeftX = edgeRight;
        }

        // Отрисовываем пин
        element.style.left = newLeftX + 'px';

        // Отрисовываем линию влево и вправо для каждого пина
        if (element.classList.contains('range__btn--left')) {
          sliderFillLine.style.left = newLeftX + 'px';

          // если левый пин заходит за правый
          if (sliderPinMax.offsetLeft < newLeftX) {
            newLeftX = sliderPinMax.offsetLeft;
            element.style.left = newLeftX + 'px';
          }
          // Отрисовывем стоимость
          sliderMinContainer.textContent = Math.round(newLeftX * pricePerPx) + minPrice;
        } else if (element.classList.contains('range__btn--right')) {
          sliderFillLine.style.right = (edgeRight - newLeftX) + 'px';

          // если правый пин заходит за левый
          if (sliderPinMin.offsetLeft > newLeftX) {
            newLeftX = sliderPinMin.offsetLeft;
            element.style.left = newLeftX + 'px';
          }
          sliderMaxContainer.textContent = Math.round(newLeftX * pricePerPx) + minPrice;
        }
      };

      // При отпускании кнопки мыши нужно переставать слушать события движения мыши.
      var onMouseUp = function () {
        // upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      // Добавим обработчики события передвижения мыши и отпускания кнопки мыши.
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  function _initRangeSlider(arrProductInfo, leftPin, rightPin, line, fillLine) {
    leftPin.style.left = fillLine.style.left = 0;
    rightPin.style.right = fillLine.style.right = 0;

    var minPrice = getMinPrice(arrProductInfo);
    var maxPrice = getMaxPrice(arrProductInfo);

    sliderMinContainer.textContent = minPrice;
    sliderMaxContainer.textContent = maxPrice;

    movePin(leftPin, line, minPrice, maxPrice);
    movePin(rightPin, line, minPrice, maxPrice);
  }

  // Находим минимальное и максимальные занчения цен в массиве с карточками продуктов
  function getMinPrice(array) {
    return array.reduce(function (min, item) {
      if (min === undefined || item.price < min) {
        min = item.price;
      }
      return min;
    }, undefined);
  }

  function getMaxPrice(array) {
    return array.reduce(function (max, item) {
      if (max === undefined || item.price > max) {
        max = item.price;
      }
      return max;
    }, undefined);
  }

  window.initRangeSlider = function (arrProductInfo) {
    _initRangeSlider(arrProductInfo, sliderPinMin, sliderPinMax, sliderPath, sliderFillLine);
  };

})();
