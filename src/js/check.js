"use strict";
function getMessage(a, b) {
	return (a === true) ? 'Я попал в ' + b : 
				(a === false) ? 'Я никуда не попал' :
					(typeof a === "number") ? 'Я прыгнул на ' + (a * 100) + ' сантиметров' :
						(Array.isArray(b) && Array.isArray(a)) ? 'Я прошёл ' + getDistancePath(a, b) + ' метров' :
							(Array.isArray(a)) ? 'Я прошёл ' + getNumberOfSteps(a) + ' шагов' :							
								'Переданы некорректные данные';
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