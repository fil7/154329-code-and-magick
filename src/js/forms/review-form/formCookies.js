'use strict';

define(['./checkForm'],
  function(checkForm) {
    var Cookies = window.Cookies;
    var nameField = document.getElementById('review-name');
    var markFieldset = document.querySelector('.review-form-group-mark');
    var BIRTH_DATE_OF_GRACE_HOPPER = new Date('12/9/1906');

    function getTimeExpire() {
      var today = new Date().setHours(0, 0, 0, 0);
      var startingPoint = getLastBirthDayOf(BIRTH_DATE_OF_GRACE_HOPPER);
      var timeDifference = +today - +startingPoint;
      return new Date(+today + timeDifference);
    }

    function getLastBirthDayOf(birthDate) {
      var today = new Date();
      var lastBirthDay = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (lastBirthDay > today) {
        lastBirthDay.setFullYear(lastBirthDay.getFullYear() - 1);
      }
      return lastBirthDay;
    }

    return {
      saveCookies: function() {
        var timeExpire = getTimeExpire();
        Cookies.set('defaultName', nameField.value, {expires: timeExpire});
        Cookies.set('defaultMark', document.querySelector('input[type="radio"]:checked + .review-mark-label').innerHTML, {expires: timeExpire});
      },
      restoreSavedFieldValues: function() {
        var defaultName = Cookies.get('defaultName');
        nameField.value = defaultName ? defaultName : '';
        var mark = Cookies.get('defaultMark');
        if (mark && mark !== 2) {
          mark = markFieldset.elements.length - mark;
          markFieldset.elements[mark].checked = true;
        }
        checkForm();
      }
    };
  });
