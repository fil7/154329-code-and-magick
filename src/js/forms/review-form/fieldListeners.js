'use strict';

define(['./checkForm'],
  function(checkForm) {
    return function() {
      var textFields = document.querySelectorAll('.review-form-field');
      for (var i = 0; i < textFields.length; i++) {
        textFields[i].addEventListener('input', checkForm);
      }
      document.querySelector('.review-form-group-mark')
        .addEventListener('change', checkForm);
    };
  });
