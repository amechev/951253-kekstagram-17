'use strict';

window.RenderComment = function (params) {
  var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');
  this.element = commentTemplate.cloneNode(true);
  this.element.querySelector('.social__text').textContent = params.message;
  this.element.querySelector('.social__picture').src = params.avatar;
  return this.element;
};
