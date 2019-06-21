'use strict';

(function () {
  var TOTAL_CNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENTS = 0;
  var MAX_COMMENTS = 5;
  var AVATAR_MIN_CNT = 1;
  var AVATAR_MAX_CNT = 6;

  window.constants = {
    TOTAL_CNT: TOTAL_CNT,
    MIN_LIKES: MIN_LIKES,
    MAX_LIKES: MAX_LIKES,
    MIN_COMMENTS: MIN_COMMENTS,
    MAX_COMMENTS: MAX_COMMENTS,
    AVATAR_MIN_CNT: AVATAR_MIN_CNT,
    AVATAR_MAX_CN: AVATAR_MAX_CNT
  };

  var VIEWERS_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var VIEWERS_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.generateData = function () {
    var arr = [];
    for (var i = 1; i <= TOTAL_CNT; i++) {
      arr[i] = {
        url: generateDataUrl(i),
        likes: generateLikesCnt(),
        comments: generateComments()
      };
    }

    return arr;
  };

  var generateDataUrl = function (number) {
    return 'photos/' + number + '.jpg';
  };

  var generateAvatarUrl = function (number) {
    return 'img/avatar-' + number + '.svg';
  };

  var generateLikesCnt = function () {
    return Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES) + MIN_LIKES);
  };

  var generateName = function () {
    var name = VIEWERS_NAMES[Math.floor(Math.random() * (VIEWERS_NAMES.length))];
    var surname = VIEWERS_SURNAMES[Math.floor(Math.random() * (VIEWERS_SURNAMES.length))];
    return name + ' ' + surname;
  };

  var generateComment = function () {
    return COMMENTS[Math.floor(Math.random() * (COMMENTS.length))];
  };

  var generateComments = function () {
    var commentsCnt = Math.floor(Math.random() * (MAX_COMMENTS - MIN_COMMENTS) + MIN_COMMENTS);
    var comments = [];

    for (var i = 0; i < commentsCnt; i++) {
      comments[i] = {
        avatar: generateAvatarUrl(Math.floor(Math.random() * (AVATAR_MAX_CNT - AVATAR_MIN_CNT) + AVATAR_MIN_CNT)),
        message: generateComment(),
        name: generateName()
      };
    }

    return comments;
  };
})();
