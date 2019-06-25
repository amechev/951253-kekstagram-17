'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  window.renderPicture = function (params) {
    var element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = params.url;
    element.querySelector('.picture__comments').textContent = params.comments.length;
    element.querySelector('.picture__likes').textContent = params.likes;
    pictureTemplate.appendChild(element);
    return element;
  };

})();
