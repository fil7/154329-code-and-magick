"use strict";
function getMessage(a, b) {
	var resultMessage = '';

	if (typeof a === "boolean") {
		if (a)  {
			resultMessage = 'Я попал в ' + b;
		} else {
			resultMessage = 'Я никуда не попал';
		}
	} else 
		if (typeof a === "number") {
			resultMessage = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
	} else 
		if (typeof a === "object" && a.length > 0 && typeof b != "object") {		
			resultMessage = 'Я прошёл ' + getNumberOfSteps(a) + ' шагов';
	} else 
		if (typeof a === "object" && a.length > 0 && typeof b === "object" && b.length > 0) {
			resultMessage = 'Я прошёл ' + getDistancePath(a, b) + ' метров';
	} else {
			resultMessage = 'Переданы некорректные данные';
	}

	return resultMessage;
}

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