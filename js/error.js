'use strict';
(function () {
  var util = window.util;

  window.renderErrorModal = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderError());
    document.querySelector('main').appendChild(fragment);
    initErrorModal();
  };

  var initErrorModal = function () {
    var modal = document.querySelector('.error');
    var closeButton = modal.querySelector('.error__button');
    closeButton.addEventListener('click', function () {
      closeErrorModal();
    });
    closeButton.addEventListener('keydown', function (evt) {
      util.isEnterEvent(evt, closeErrorModal);
    });
    modal.addEventListener('click', function (evt) {
      if (evt.target === modal) {
        closeErrorModal();
      }
    });
  };

  var closeErrorModal = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', function (evt) {
      util.isEscEvent(evt, closeErrorModal);
    });
  };

  var renderError = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    return errorTemplate.cloneNode(true);
  };
})();

