'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';

  var successHandler = function (items) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < items.length; i++) {
      fragment.appendChild(window.renderPicture(items[i]));
    }
    var picturesList = document.querySelector('.pictures');
    picturesList.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(DATA_URL, successHandler, errorHandler);

})();
