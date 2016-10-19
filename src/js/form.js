'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');

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
      formSubmitButton.disabled = true;
      commentLabelMandatory.hidden = true;
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

  return form;

})();
