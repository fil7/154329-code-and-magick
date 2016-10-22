'use strict';

window.form = (function() {
  var BIRTH_DATE_OF_GRACE_HOPPER = new Date('12/9/1906');

  var Cookies = window.Cookies;
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');

  var nameField = document.getElementById('review-name');
  var commentField = document.getElementById('review-text');
  var markFieldset = document.querySelector('.review-form-group-mark');
  var mandatoryLabels = document.querySelector('.review-fields');
  var commentLabelMandatory = document.querySelector('.review-fields-text');
  var textFields = document.querySelectorAll('.review-form-field');
  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      document.getElementById('review-name').required = true;
      setFieldListeners();
      restoreSavedFieldValues();
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  formSubmitButton.addEventListener('click', saveCookies);

  function setFieldListeners() {
    for (var i = 0; i < textFields.length; i++) {
      textFields[i].addEventListener('input', checkForm);
    }
    markFieldset.addEventListener('change', checkForm);
  }

  function checkForm(e) {
    var evt = e || event;
    if (evt && (evt.type === 'input' || evt.type === 'change')) {
      checkMandatoryOf(evt.target);
    } else {
      var markInput = document.querySelector('.review-form-group-mark input[type="radio"]:checked');
      checkMandatoryOf(markInput);
      checkMandatoryOf(nameField);
      checkMandatoryOf(commentField);
    }
    checkSubmitButton();
  }

  function saveCookies() {
    var timeExpire = getTimeExpire();
    Cookies.set('defaultName', nameField.value, {expires: timeExpire});
    Cookies.set('defaultMark', document.querySelector('input[type="radio"]:checked + .review-mark-label').innerHTML, {expires: timeExpire});
  }

  function restoreSavedFieldValues() {
    var defaultName = Cookies.get('defaultName');
    nameField.value = defaultName ? defaultName : '';
    var mark = Cookies.get('defaultMark');
    if (mark && mark !== 2) {
      mark = markFieldset.elements.length - mark;
      markFieldset.elements[mark].checked = true;
    }
    checkForm();
  }

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

  function checkSubmitButton() {
    var isFormValid = true;
    for (var i = 0; i < textFields.length; i++) {
      isFormValid &= textFields[i].validity.valid;
    }
    mandatoryLabels.style.display = isFormValid ? 'none' : 'inline-block';
    formSubmitButton.disabled = !isFormValid;
  }

  function checkMandatoryOf(input) {
    var labels = input.labels || [];
    for (var j = 0; j < labels.length; j++) {
      var label = labels[j];
        // check comment mandatory
      if(label.classList.contains('review-mark-label')) {
        var mark = label.innerHTML;
        commentField.required = mark < 3;
        commentLabelMandatory.hidden = commentField.validity.valid;
        // hide label-mandatory for text input
      } else if (label.classList.contains('review-fields-label')) {
        label.hidden = input.validity.valid;
      }
    }
  }

  return form;

})();
