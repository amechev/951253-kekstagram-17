'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var MIN_COMMENTS_LENGTH = 5;
  var currentCommentsLength = 5;
  var HIDDEN = 'visually-hidden';

  var picturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var ImagesDict = {};
  var images = [];

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');

  var currentComments = [];
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCommentsCurrentCnt = bigPicture.querySelector('.comments-current-count');
  var socialCommentsLoader = bigPicture.querySelector('.comments-loader');

  var onSuccessHandler = function (items) {
    images = items;
    items.forEach(function (item) {
      var key = item.url.replace(/[^0-9]/g, '');
      ImagesDict[key] = item;
    });

    renderImages(items);
    filters.classList.remove('img-filters--inactive');
    initFilters();
  };

  var onErrorHandler = window.util.errorHandler;

  var sortImages = window.debounce(function (sortedArr) {
    renderImages(sortedArr);
  });

  var renderImages = function (arr) {
    var fragment = document.createDocumentFragment();
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    arr.forEach(function (item) {
      fragment.appendChild(new window.RenderPicture(item));
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
      item.addEventListener('click', function () {
        var key = item.getAttribute('data-id');
        openPicture(ImagesDict[key]);
      });
    });
  };

  var openPicture = function (param) {
    currentCommentsLength = MIN_COMMENTS_LENGTH;
    socialCommentsLoader.classList.remove(HIDDEN);
    var dialog = new window.Dialog(bigPicture, bigPictureClose);
    bigPictureImg.children[0].src = param.url;
    likesCount.innerText = param.likes;
    commentsCount.innerText = param.comments.length;
    description.innerText = param.description;
    currentComments = param.comments;

    if (currentComments.length < MIN_COMMENTS_LENGTH) {
      currentCommentsLength = currentComments.length;
    } else {
      currentCommentsLength = MIN_COMMENTS_LENGTH;
    }

    renderComments(currentComments);
    dialog.onOpenPopup();
    socialCommentsLoader.addEventListener('click', onCommentLoaderClick);
  };

  var renderComments = function (arr) {
    var fragment = document.createDocumentFragment();
    document.querySelectorAll('.social__comment').forEach(function (item) {
      item.remove();
    });

    arr.slice(0, currentCommentsLength).forEach(function (item) {
      fragment.appendChild(new window.RenderComment(item));
    });

    socialCommentsCurrentCnt.innerHTML = currentCommentsLength.toString();
    socialComments.appendChild(fragment);

    if (currentCommentsLength === currentComments.length) {
      socialCommentsLoader.classList.add(HIDDEN);
    }
  };

  var onCommentLoaderClick = function () {
    currentCommentsLength += 5;
    if (currentCommentsLength > currentComments.length) {
      currentCommentsLength = currentComments.length;
    }

    renderComments(currentComments);
  };

  window.backend.load(DATA_URL, onSuccessHandler, onErrorHandler);

})();
