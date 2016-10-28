'use strict';

define(['./fieldListeners', './formCookies'],

  function(setFieldListeners, formCookies) {

    var formContainer = document.querySelector('.overlay-container');
    var formCloseButton = document.querySelector('.review-form-close');
    var formSubmitButton = document.querySelector('.review-submit');

    return {
      createReviewForm: function() {
        window.form = {
          onClose: null,
          /**
           * @param {Function} cb
           */
          open: function(cb) {
            formContainer.classList.remove('invisible');
            formCookies.restoreSavedFieldValues();
            cb();
          },
          close: function() {
            formContainer.classList.add('invisible');
            if (typeof this.onClose === 'function') {
              this.onClose();
            }
          }
        };
      },
      setEventListeners: function() {
        formSubmitButton.addEventListener('click', formCookies.saveCookies);
        formCloseButton.onclick = function(evt) {
          evt.preventDefault();
          window.form.close();
        };
        setFieldListeners();
      }
    };
  });
