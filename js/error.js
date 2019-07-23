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
    var closeButtons = modal.querySelectorAll('.error__button');
    closeButtons.forEach(function (button) {
      button.addEventListener('click', onCloseErrorModal);
      button.addEventListener('keydown', function (evt) {
        util.isEnterEvent(evt, onCloseErrorModal);
      });
    });
    modal.addEventListener('click', function (evt) {
      if (evt.target === modal) {
        onCloseErrorModal();
      }
    });

    document.addEventListener('keydown', function (evt) {
      util.isEscEvent(evt, onCloseErrorModal);
    });
  };

  var onCloseErrorModal = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', function (evt) {
      util.isEscEvent(evt, onCloseErrorModal);
    });
  };

  var renderError = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    return errorTemplate.cloneNode(true);
  };
})();

