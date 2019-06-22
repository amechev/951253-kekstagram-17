'use strict';

window.dialog = (function () {
  var util = window.util;

  var elementDialogWrap = document.querySelector('.img-upload__overlay');
  var elementPopupClose = document.getElementById('upload-cancel');

  var openPopup = function () {
    elementDialogWrap.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      util.isEscEvent(evt, closePopup);
    });
  };

  var closePopup = function () {
    elementDialogWrap.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      util.isEscEvent(evt, closePopup);
    });
  };

  elementPopupClose.addEventListener('click', function () {
    closePopup();
  });

  elementPopupClose.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, closePopup);
  });

  return {
    openPopup: openPopup,
    // closePopup: closePopup
  };

})();
