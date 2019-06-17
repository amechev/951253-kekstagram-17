'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MIN_SCALE_PARAM = 25;
var MAX_SCALE_PARAM = 100;
var SCALE_STEP = 25;
var FILTER_EFFECTS = {
  none: '',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};

var FILTER_STYLES = {
  none: '',
  chrome: {
    name: 'grayscale',
    max: 1,
    type: ''
  },
  sepia: {
    name: 'sepia',
    max: 1,
    type: ''
  },
  marvin: {
    name: 'invert',
    max: 100,
    type: '%'
  },
  phobos: {
    name: 'blur',
    max: 3,
    type: 'px'
  },
  heat: {
    name: 'brightness',
    max: 3,
    type: ''
  }
};
var DEFAULT_FILTER_VALUE = 100;

var elementInputFile = document.getElementById('upload-file');
var elementDialogWrap = document.querySelector('.img-upload__overlay');
var elementImgPreviewWrap = document.querySelector('.img-upload__preview');
var elementImgPreview = elementImgPreviewWrap.children[0];
var elementPopupClose = document.getElementById('upload-cancel');

var elementScaleSmaller = document.querySelector('.scale__control--smaller');
var elementScaleBigger = document.querySelector('.scale__control--bigger');
var elementScaleValue = document.querySelector('.scale__control--value');
var currentScaleValue = DEFAULT_FILTER_VALUE;

var elementsRadioFilters = document.querySelectorAll('.effects__radio');
var selectedFilter = null;

var currentEffectLevel = DEFAULT_FILTER_VALUE;
var elementEffectLevel = document.querySelector('.effect-level');
var elementLevelLine = document.querySelector('.effect-level__line');
var elementLevelPin = document.querySelector('.effect-level__pin');
var elementLevelDepth = document.querySelector('.effect-level__depth');
var elementLevelValue = document.querySelector('.effect-level__value');
var levelLineWidth = 0;

var levelPinCoords = null;
var levelLineCoords = null;
var startPosition = null;

var openPopup = function () {
  elementDialogWrap.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  elementDialogWrap.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  resetFilters();
  clearForm();
};

var setVisibleFilter = function (isVisible) {
  if (isVisible) {
    elementEffectLevel.classList.remove('hidden');
    resetFilterDuration();
  } else {
    elementEffectLevel.classList.add('hidden');
  }
};

var resetFilters = function () {
  selectedFilter = null;
  elementImgPreview.className = '';
  currentScaleValue = DEFAULT_FILTER_VALUE;
  currentEffectLevel = DEFAULT_FILTER_VALUE;
  setImgPreviewScale(currentScaleValue);
  resetFilterDuration();
  applyFilterLevelOnPreview();
  setVisibleFilter(false);
};

var resetFilterDuration = function () {
  levelLineWidth = elementLevelLine.offsetWidth;
  currentEffectLevel = DEFAULT_FILTER_VALUE;
  elementLevelPin.style.left = levelLineWidth + 'px';
  elementLevelDepth.style.width = currentEffectLevel + '%';
  elementLevelValue.value = currentEffectLevel;
};

var applyFilterLevelOnPreview = function () {
  if (FILTER_STYLES[selectedFilter]) {
    var name = FILTER_STYLES[selectedFilter].name;
    var value = FILTER_STYLES[selectedFilter].max / 100 * currentEffectLevel;
    var type = FILTER_STYLES[selectedFilter].type;
    elementImgPreview.style.filter = name + '(' + value + type + ')';
  } else {
    elementImgPreview.style.filter = '';
  }
};

var clearForm = function () {
  elementInputFile.value = '';
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onZoomOut = function () {
  currentScaleValue -= SCALE_STEP;
  setImgPreviewScale(currentScaleValue);
};

var onZoomIn = function () {
  currentScaleValue += SCALE_STEP;
  setImgPreviewScale(currentScaleValue);
};

var setImgPreviewScale = function (value) {
  elementScaleValue.value = value + '%';
  elementImgPreviewWrap.style.transform = 'scale(' + value / 100 + ')';
};


// Закрытие диалогового окона
elementPopupClose.addEventListener('click', function () {
  closePopup();
});
elementPopupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


// Изменение размеров изображения
elementScaleSmaller.addEventListener('click', function () {
  if (currentScaleValue > MIN_SCALE_PARAM) {
    onZoomOut();
  }
});
elementScaleSmaller.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && currentScaleValue > MIN_SCALE_PARAM) {
    onZoomOut();
  }
});
elementScaleBigger.addEventListener('click', function () {
  if (currentScaleValue < MAX_SCALE_PARAM) {
    onZoomIn();
  }
});
elementScaleBigger.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && currentScaleValue < MAX_SCALE_PARAM) {
    onZoomIn();
  }
});


// Фильтры изображения
var onFilterChange = function (filter) {
  filter.addEventListener('change', function () {
    selectedFilter = filter.value;

    if (selectedFilter === 'none') {
      resetFilters();
      setVisibleFilter(false);
      applyFilterLevelOnPreview();
    } else {
      setVisibleFilter(true);
      applyFilterLevelOnPreview();
    }

    elementImgPreview.className = FILTER_EFFECTS[selectedFilter];
    currentEffectLevel = DEFAULT_FILTER_VALUE;
  });
};

for (var i = 0; i < elementsRadioFilters.length; i++) {
  onFilterChange(elementsRadioFilters[i]);
}

elementInputFile.addEventListener('change', function () {
  openPopup();
});

var onMouseDownSlider = function (evt) {
  levelPinCoords = getElemCoords(elementLevelPin);
  levelLineCoords = getElemCoords(elementLevelLine);
  startPosition = evt.pageX - levelPinCoords.left;

  document.addEventListener('mousemove', onMouseMoveSlider);
  document.addEventListener('mouseup', onMouseupSlider);
  return false;
};

var onMouseupSlider = function () {
  document.removeEventListener('mousemove', onMouseMoveSlider);
  document.removeEventListener('mouseup', onMouseupSlider);
};

var onMouseMoveSlider = function (evt) {
  var newPosition = evt.pageX - startPosition - levelLineCoords.left;

  if (newPosition < 0) {
    newPosition = 0;
  } else if (newPosition > levelLineWidth) {
    newPosition = levelLineWidth;
  }

  elementLevelPin.style.left = newPosition + 'px';
  currentEffectLevel = getPercentsByCoords(levelLineWidth, newPosition);
  elementLevelDepth.style.width = currentEffectLevel + '%';
  elementLevelValue.value = currentEffectLevel;
  applyFilterLevelOnPreview();
};

elementLevelPin.addEventListener('mousedown', onMouseDownSlider);

// Блокирует нативный браузерный dragDrop
elementLevelPin.addEventListener('dragstart', function () {
  return false;
});

var getElemCoords = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

var getPercentsByCoords = function (total, current) {
  return Math.round(100 / total * current);
};