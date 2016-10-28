'use strict';

define(['./forms/review-form/form', './game.js'],
  function(form) {
    return function() {
      var game = new window.Game(document.querySelector('.demo'));
      game.initializeLevelAndStart();
      game.setGameStatus(window.Game.Verdict.INTRO);

      form.createReviewForm();
      form.setEventListeners();
      var formOpenButton = document.querySelector('.reviews-controls-new');
      /** @param {MouseEvent} evt */
      formOpenButton.onclick = function(evt) {
        evt.preventDefault();
        window.form.open(function() {
          game.setGameStatus(window.Game.Verdict.PAUSE);
          game.setDeactivated(true);
        });
      };
      window.form.onClose = function() {
        game.setDeactivated(false);
      };
    };
  }
);
