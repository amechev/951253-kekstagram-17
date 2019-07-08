'use strict';

window.RenderError = function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  this.element = errorTemplate.cloneNode(true);
  return this.element;
};
