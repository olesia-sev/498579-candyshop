'use strict';

(function () {
  var IMG_PATH = 'img/map/';
  var STORE_ADDRESS = {
    academicheskaya: 'проспект Науки, д. 19, корп. 3, литер А, ТК «Платформа», 3-й этаж, секция 310',
    vasileostrovskaya: 'м. Василеостровская',
    rechka: 'м. Черная речка',
    petrogradskaya: 'м. Петроградская',
    proletarskaya: 'м. Пролетарская',
    vostaniya: 'м. Площадь Восстания',
    prosvesheniya: 'м. Проспект Просвещения',
    frunzenskaya: 'м. Фрунзенская',
    chernishevskaya: 'м. Чернышевская',
    tehinstitute: 'м. Технологический институт'
  };

  var addressContainer = document.querySelector('.deliver__store-describe');
  var mapImage = document.querySelector('.deliver__store-map-img');

  var changeSubwayImage = function (evt) {
    var imgSrc = evt.target.value + '.jpg';

    mapImage.src = IMG_PATH + imgSrc;
    mapImage.alt = evt.target.value;

    addressContainer.textContent = STORE_ADDRESS[evt.target.value];
  };

  window.functions.addEventListenersForElements(document.querySelectorAll('input[name="store"]'), changeSubwayImage, 'change');
})();
