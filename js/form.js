'use strict';

(function () {
  var util = window.util;
  var dialog = window.dialog;
  var MIN_SCALE_PARAM = 25;
  var MAX_SCALE_PARAM = 100;
  var SCALE_STEP = 25;
  var DESCRIPTION_MAX_LENGTH = 150;
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
  var elementImgPreviewWrap = document.querySelector('.img-upload__preview');
  var elementImgPreview = elementImgPreviewWrap.children[0];
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
  var elementImageForm = document.querySelector('#upload-select-image');
  var elementFormDescription = document.querySelector('.text__description');

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

  elementFormDescription.addEventListener('focus', function () {
    util.isEscEventDisabled = true;
  });

  elementFormDescription.addEventListener('blur', function () {
    util.isEscEventDisabled = false;
  });

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

  elementScaleSmaller.addEventListener('click', function () {
    if (currentScaleValue > MIN_SCALE_PARAM) {
      onZoomOut();
    }
  });
  elementScaleSmaller.addEventListener('keydown', function (evt) {
    if (currentScaleValue > MIN_SCALE_PARAM) {
      util.isEnterEvent(evt, onZoomOut);
    }
  });
  elementScaleBigger.addEventListener('click', function () {
    if (currentScaleValue < MAX_SCALE_PARAM) {
      onZoomIn();
    }
  });
  elementScaleBigger.addEventListener('keydown', function (evt) {
    if (currentScaleValue < MAX_SCALE_PARAM) {
      util.isEnterEvent(evt, onZoomIn);
    }
  });

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
    resetFilters();
    clearForm();
    dialog.openPopup();
  });

  var onMouseDownSlider = function (evt) {
    evt.preventDefault();
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

  var onMouseMoveSlider = function (moveEvt) {
    moveEvt.preventDefault();

    var newPosition = moveEvt.pageX - startPosition - levelLineCoords.left;

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

  var validateFormData = function (formData) {
    if (formData.get('description').length > DESCRIPTION_MAX_LENGTH) {
      elementFormDescription.style.boxShadow = '0 0 0 3px tomato';

      elementFormDescription.addEventListener('keydown', onDescriptionChange);
      return false;
    }

    return true;
  };

  var onDescriptionChange = function () {
    elementFormDescription.style = '';
    elementFormDescription.removeEventListener('keydown', onDescriptionChange);
  };

  var onSubmitForm = function (evt) {
    var formData = new FormData(evt.target);
    var isFormFalid = validateFormData(formData);

    if (!isFormFalid) {
      evt.preventDefault();
    }
  };

  elementImageForm.addEventListener('submit', onSubmitForm);
  elementFormDescription.addEventListener('change', onDescriptionChange);
})();
