'use strict';

window.Dialog = function (elementDialogWrap, elementPopupClose) {
  var util = window.util;
  var that = this;

  this.onOpenPopup = function () {
    elementDialogWrap.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (!util.isEscEventDisabled) {
        util.isEscEvent(evt, that.onClosePopup);
      }
    });
  };

  this.onClosePopup = function () {
    elementDialogWrap.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      if (!util.isEscEventDisabled) {
        util.isEscEvent(evt, that.onClosePopup);
      }
    });
    elementPopupClose.removeEventListener('keydown', function (evt) {
      util.isEnterEvent(evt, that.onClosePopup);
    });
  };

  elementPopupClose.addEventListener('click', function () {
    that.onClosePopup();
  });

  elementPopupClose.addEventListener('keydown', function (evt) {
    util.isEnterEvent(evt, that.onClosePopup);
  });
};
