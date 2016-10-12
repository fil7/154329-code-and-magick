'use strict';

window.getMessage = function(a, b) {
  var resultMessage = '';
  if (a === true) {
    resultMessage = 'Я попал в ' + b;
  } else if (a === false) {
    resultMessage = 'Я никуда не попал';
  } else if (typeof a === 'number') {
    resultMessage = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  } else if (Array.isArray(b) && Array.isArray(a)) {
    resultMessage = 'Я прошёл ' + getDistancePath(a, b) + ' метров';
  } else if (Array.isArray(a)) {
    resultMessage = 'Я прошёл ' + getNumberOfSteps(a) + ' шагов';
  } else {
    resultMessage = 'Переданы некорректные данные';
  }
  return resultMessage;
};

function getNumberOfSteps(a) {
  var numberOfSteps = 0;
  for (var i = 0; i < a.length; i++) {
    numberOfSteps += a[i];
  }
  return numberOfSteps;
}

function getDistancePath(a, b) {
  var distancePath = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] && b[i]) {
      distancePath += a[i] * b[i];
    }
  }
  return distancePath;
}
