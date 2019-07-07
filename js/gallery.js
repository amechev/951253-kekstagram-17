'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var picturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var ImagesDict = {};
  var images = [];

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var socialCommentsLoader = bigPicture.querySelector('.comments-loader');

  var HIDDEN = 'visually-hidden';


  var successHandler = function (items) {
    images = items;
    items.forEach(function (item) {
      var key = item.url.replace(/[^0-9]/g, '');
      ImagesDict[key] = item;
    });

    renderImages(items);
    filters.classList.remove('img-filters--inactive');
    initFilters();
  };

  var errorHandler = window.util.errorHandler;

  var sortImages = window.debounce(function (sortedArr) {
    renderImages(sortedArr);
  });

  var renderImages = function (arr) {
    var fragment = document.createDocumentFragment();
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    arr.forEach(function (item) {
      fragment.appendChild(window.renderPicture(item));
    });
    picturesList.appendChild(fragment);
    initImages(arr);
  };

  var initFilters = function () {
    var filtersButtons = document.querySelectorAll('.img-filters__button');
    var filterActive = 'img-filters__button--active';

    var compareRandom = function () {
      return Math.random() - 0.5;
    };

    var getNewImages = function () {
      return images.slice().sort(compareRandom).slice(0, 9);
    };

    var getDiscussedImages = function () {
      return images.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    };

    var sortTypes = {
      'filter-popular': images,
      'filter-new': getNewImages(),
      'filter-discussed': getDiscussedImages()
    };

    filtersButtons.forEach(function (button) {
      button.addEventListener('click', function (evt) {
        filtersButtons.forEach(function (btn) {
          btn.classList.remove(filterActive);
        });
        evt.target.classList.add(filterActive);

        sortImages(sortTypes[evt.target.id]);
      });
    });
  };

  var initImages = function () {
    var pictures = Array.from(document.querySelectorAll('.picture'));
    pictures.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        var key = item.getAttribute('data-id');
        openPicture(ImagesDict[key]);
      });
    });
  };

  var openPicture = function (param) {
    bigPictureImg.children[0].src = param.url;
    likesCount.innerText = param.likes;
    commentsCount.innerText = param.comments.length;
    description.innerText = param.description;
    socialCommentsCount.classList.add(HIDDEN);
    socialCommentsLoader.classList.add(HIDDEN);
    renderComments(param.comments);
    bigPicture.classList.remove('hidden');
  };

  var renderComments = function (arr) {
    var fragment = document.createDocumentFragment();
    document.querySelectorAll('.social__comment').forEach(function (item) {
      item.remove();
    });
    arr.forEach(function (item) {
      fragment.appendChild(window.renderComment(item));
    });
    socialComments.appendChild(fragment);
  };

  window.backend.load(DATA_URL, successHandler, errorHandler);
})();
