'use strict';

window.Dialog = function (elementDialogWrap, elementPopupClose) {
  var util = window.util;
  var that = this;

  this.openPopup = function () {
    elementDialogWrap.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      util.isEscEvent(evt, that.closePopup);
    });
  };

  this.closePopup = function () {
    elementDialogWrap.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      util.isEscEvent(evt, that.closePopup);
    });
  };

  elementPopupClose.addEventListener('click', function () {
    that.closePopup();
  });

  elementPopupClose.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, that.closePopup);
  });
};
