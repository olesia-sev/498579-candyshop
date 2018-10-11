'use strict';

(function () {

  var cardPaymentContainer = document.querySelector('.payment__card');
  var cardNumber = cardPaymentContainer.querySelector('#payment__card-number');
  var cardDate = cardPaymentContainer.querySelector('#payment__card-date');
  var cardCvc = cardPaymentContainer.querySelector('#payment__card-cvc');
  var cardHolderName = cardPaymentContainer.querySelector('#payment__cardholder');

  var cardStatusWrap = document.querySelector('.payment__card-status-wrap');
  var cardStatus = cardStatusWrap.querySelector('.payment__card-status');

  var validityText = '';

  // Проверяем валидность номера карты с помощью алгоритма Луна
  function checkCardValidity(number) {
    var arr = number.split('').map(function (char, index) {
      var digit = parseInt(char, 10);

      if ((index + number.length) % 2 === 0) {
        var digitX2 = digit * 2;

        return digitX2 > 9 ? digitX2 - 9 : digitX2;
      }
      return digit;
    });
    return !(arr.reduce(function (a, b) {
      return a + b;
    }, 0) % 10);
  }

  // функция изменения статуса карты
  var onChangeCardStatus = function () {
    var isNumberValid = checkCardValidity(cardNumber.value);
    var isCardValid = isNumberValid && cardDate.validity.valid && cardCvc.validity.valid && cardHolderName.validity.valid;

    cardStatus.textContent = isCardValid === true ? 'Одобрен' : 'Не определён';
  };

  cardNumber.addEventListener('invalid', function () {
    if (cardNumber.validity.patternMismatch) {
      validityText = 'Номер карты должен содержать только цифры';
    } else if (cardNumber.validity.valueMissing) {
      validityText = 'Поле обязательно для заполнения';
    } else {
      validityText = '';
    }
    cardNumber.setCustomValidity(validityText);
  });

  cardDate.addEventListener('invalid', function () {
    if (cardDate.validity.patternMismatch) {
      validityText = 'Введите дату в формате мм/гг';
    } else if (cardDate.validity.valueMissing) {
      validityText = 'Поле обязательно для заполнения';
    } else {
      validityText = '';
    }
    cardDate.setCustomValidity(validityText);
  });

  cardCvc.addEventListener('invalid', function () {
    if (cardCvc.validity.patternMismatch) {
      validityText = 'Поле должно содержать 3 цифры';
    } else if (cardCvc.validity.valueMissing) {
      validityText = 'Поле обязательно для заполнения';
    } else {
      validityText = '';
    }
    cardCvc.setCustomValidity(validityText);
  });

  cardHolderName.addEventListener('invalid', function () {
    if (cardHolderName.validity.patternMismatch) {
      validityText = 'Заполните поле латинскими буквами';
    } else if (cardHolderName.validity.valueMissing) {
      validityText = 'Поле обязательно для заполнения';
    } else {
      validityText = '';
    }
    cardHolderName.setCustomValidity(validityText);
  });

  cardPaymentContainer.addEventListener('change', onChangeCardStatus);

  // отправка формы и показ моадальных об успехе/ошибке
  var form = document.querySelector('.buy form');
  form.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
    formReset(form);
  });

  // закрытие модальных окон
  var successHandler = function () {
    window.data.modalSuccess.classList.remove('modal--hidden');
    document.addEventListener('keydown', onEscCloseModalSuccess);
  };

  var errorHandler = function () {
    window.data.modalError.classList.remove('modal--hidden');
    document.addEventListener('keydown', onEscCloseModalError);
  };

  var onEscCloseModalError = function (evt) {
    window.functions.isEscEvent(evt, closeModalError);
  };

  var closeModalError = function () {
    window.data.modalError.classList.add('modal--hidden');
    document.removeEventListener('keydown', onEscCloseModalError);
  };

  var onEscCloseModalSuccess = function (evt) {
    window.functions.isEscEvent(evt, closeModalSuccess);
  };

  var closeModalSuccess = function () {
    window.data.modalSuccess.classList.add('modal--hidden');
    document.removeEventListener('keydown', onEscCloseModalSuccess);
  };

  window.data.closeModalError.addEventListener('click', closeModalError);
  window.data.closeModalError.addEventListener('keydown', function (evt) {
    window.functions.isEscEvent(evt, closeModalError);
  });

  window.data.closeModalSuccess.addEventListener('click', closeModalSuccess);
  window.data.closeModalSuccess.addEventListener('keydown', function (evt) {
    window.functions.isEscEvent(evt, closeModalSuccess);
  });

  // Сбрасываем данные формы
  var formReset = function (element) {
    var inputs = element.getElementsByTagName('input');
    window.functions.forEach(inputs, function (input) {
      input.value = '';
    });
  };

})();
