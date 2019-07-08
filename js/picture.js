'use strict';

window.RenderPicture = function (params) {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  this.element = pictureTemplate.cloneNode(true);
  this.element.setAttribute('data-id', params.url.replace(/[^0-9]/g, ''));
  this.element.querySelector('.picture__img').src = params.url;
  this.element.querySelector('.picture__comments').textContent = params.comments.length;
  this.element.querySelector('.picture__likes').textContent = params.likes;
  return this.element;
};
