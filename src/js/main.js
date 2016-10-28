'use strict';

require.config({
  baseUrl: 'js/'
});

require(['./startGame'], function(startGame) {
  startGame();
});

require(['./reviews/reviews'], function(renderReviews) {
  renderReviews();
});


