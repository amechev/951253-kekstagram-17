'use strict';

window.backend = (function () {
  var TIMEOUT = 10000;
  var SUCCESS_STATUS = 200;

  var getXMLHttpRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var load = function (url, onLoad, onError) {
    var xhr = getXMLHttpRequest(onLoad, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onLoad, onError) {
    var xhr = getXMLHttpRequest(onLoad, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  return {
    load: load,
    save: save
  };
})();
