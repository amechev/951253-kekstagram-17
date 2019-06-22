'use strict';

(function () {
  var TOTAL_CNT = window.constants.TOTAL_CNT;

  window.buildFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i <= TOTAL_CNT; i++) {
      fragment.appendChild(renderPicture(picturesDataArray[i]));
    }

    return fragment;
  };

  var renderPicture = function (params) {
    var element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = params.url;
    element.querySelector('.picture__comments').textContent = params.comments.length;
    element.querySelector('.picture__likes').textContent = params.likes;
    pictureTemplate.appendChild(element);

    return element;
  };

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var picturesDataArray = window.generateData();
})();
