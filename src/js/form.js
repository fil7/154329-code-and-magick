'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');

  var fieldName = document.getElementById('review-name');
  var fieldText = document.getElementById('review-text');
  var fieldsetMark = document.querySelector('.review-form-group-mark');
  var labelsMandatory = document.querySelector('.review-fields');
  var labelMandatoryText = document.querySelector('.review-fields-text');

  var textFields = document.querySelectorAll('.review-form-field');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      setMandatoryFields();
      setFieldListeners();
      formSubmitButton.disabled = true;
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

  function setMandatoryFields() {
    fieldName.required = true;
    var mark = document.querySelector('input[type="radio"]:checked + .review-mark-label').innerHTML;
    setTextMandatoryIf(mark);
  }

  function setTextMandatoryIf(mark) {
    fieldText.required = mark < 3;
    labelMandatoryText.hidden = fieldText.validity.valid;
  }

  function setFieldListeners() {

    for (var i = 0; i < textFields.length; i++) {
      textFields[i].addEventListener('input', textFieldHandler);
    }

    fieldsetMark.onchange = function(e) {
      if (e.target.tagName !== 'INPUT') {
        return;
      }
      if (e.target.labels[0]) {
        var mark = e.target.labels[0].innerHTML;
        setTextMandatoryIf(mark);
        checkMandatoryFields();
      }
    };

    function textFieldHandler(e) {
      var field = e.target;
      var labels = e.target.labels || [];
      for (var j = 0; j < labels.length; j++) {
        if (labels[j].classList.contains('review-fields-label')) {
          labels[j].hidden = field.validity.valid;
          break;
        }
      }
      checkMandatoryFields();
    }
  }

  function checkMandatoryFields() {
    var isFormValid = true;
    for (var i = 0; i < textFields.length; i++) {
      isFormValid &= textFields[i].validity.valid;
    }
    labelsMandatory.style.display = isFormValid ? 'none' : 'inline-block';
    formSubmitButton.disabled = !isFormValid;
  }

  return form;

})();
