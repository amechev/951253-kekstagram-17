'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var picturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var images = [];

  var successHandler = function (items) {
    images = items;
    renderImages(images);
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

  window.backend.load(DATA_URL, successHandler, errorHandler);

})();
