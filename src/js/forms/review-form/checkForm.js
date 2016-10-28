'use strict';

define(function() {
  var nameField = document.getElementById('review-name');
  var commentField = document.getElementById('review-text');
  var formSubmitButton = document.querySelector('.review-submit');
  var mandatoryLabels = document.querySelector('.review-fields');
  var commentLabelMandatory = document.querySelector('.review-fields-text');
  var textFields = document.querySelectorAll('.review-form-field');

  document.getElementById('review-name').required = true;
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
      if (label.classList.contains('review-mark-label')) {
        var mark = label.innerHTML;
        commentField.required = mark < 3;
        commentLabelMandatory.hidden = commentField.validity.valid;
        // hide label-mandatory for text input
      } else if (label.classList.contains('review-fields-label')) {
        label.hidden = input.validity.valid;
      }
    }
  }

  return function(e) {
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
  };

});
