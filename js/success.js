'use strict';

window.RenderSuccess = function () {
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  this.element = successTemplate.cloneNode(true);
  return this.element;
};
