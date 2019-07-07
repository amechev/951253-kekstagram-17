'use strict';

(function () {
  var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  window.renderComment = function (params) {
    var element = commentTemplate.cloneNode(true);
    element.querySelector('.social__text').textContent = params.message;
    element.querySelector('.social__picture').src = params.avatar;
    commentTemplate.appendChild(element);
    return element;
  };

})();
