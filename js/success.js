'use strict';

(function () {
  var util = window.util;

  window.renderSuccessModal = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderSuccess());
    document.querySelector('main').appendChild(fragment);
    initSuccessModal();
  };

  var initSuccessModal = function () {
    var modal = document.querySelector('.success');
    var closeButton = modal.querySelector('.success__button');
    closeButton.addEventListener('click', function () {
      closeSuccessModal();
    });
    closeButton.addEventListener('keydown', function (evt) {
      util.isEnterEvent(evt, closeSuccessModal);
    });
    modal.addEventListener('click', function (evt) {
      if (evt.target === modal) {
        closeSuccessModal();
      }
    });
    document.addEventListener('keydown', function (evt) {
      util.isEscEvent(evt, closeSuccessModal);
    });
  };

  var closeSuccessModal = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', function (evt) {
      util.isEscEvent(evt, closeSuccessModal);
    });
  };

  var renderSuccess = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    return successTemplate.cloneNode(true);
  };
})();

