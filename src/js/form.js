'use strict';

window.form = (function() {
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
    var field = evt.target;
    var labels = evt.target.labels || [];

    for (var j = 0; j < labels.length; j++) {
      var label = labels[j];
      // check comment mandatory
      if(label.classList.contains('review-mark-label')) {
        var mark = label.innerHTML;
        commentField.required = mark < 3;
        commentLabelMandatory.hidden = commentField.validity.valid;
        // hide label-mandatory for text input
      } else if (label.classList.contains('review-fields-label')) {
        label.hidden = field.validity.valid;
      }
    }
    checkSubmitButton();

    function checkSubmitButton() {
      var isFormValid = true;
      for (var i = 0; i < textFields.length; i++) {
        isFormValid &= textFields[i].validity.valid;
      }
      mandatoryLabels.style.display = isFormValid ? 'none' : 'inline-block';
      formSubmitButton.disabled = !isFormValid;
    }
  }

  function saveCookies() {
    var timeExpire = getTimeExpire();
    window.Cookies.set('defaultName', nameField.value, {expires: timeExpire});
    window.Cookies.set('defaultMark', document.querySelector('input[type="radio"]:checked + .review-mark-label').innerHTML, {expires: timeExpire});

    function getTimeExpire() {
      var today = new Date();
      var startingPoint = new Date(today.getFullYear(), 11, 9);
      if (startingPoint > today) {
        startingPoint.setFullYear(startingPoint.getFullYear() - 1);
      }
      var timeDiff = today.getTime() - startingPoint.getTime();
      return new Date(Date.now() + timeDiff);
    }
  }

  function restoreSavedFieldValues() {
    var defaultName = window.Cookies.get('defaultName');
    nameField.value = defaultName ? defaultName : '';
    var mark = window.Cookies.get('defaultMark');
    if (mark && mark !== 2) {
      mark = markFieldset.elements.length - mark;
      markFieldset.elements[mark].checked = true;
    }
    nameField.dispatchEvent(new Event('input'));
    var markInput = document.querySelector('.review-form-group-mark input[type="radio"]:checked');
    markInput.dispatchEvent(new Event('change', {bubbles: true, cancelable: false}));
  }

  return form;

})();
