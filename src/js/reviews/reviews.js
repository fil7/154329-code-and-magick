'use strict';

define(['../load', './reviewObject'],
  function(load, Review) {

    var reviews = [];
    var reviewsObjects = [];
    var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
    var container = document.querySelector('.reviews-list');

    function loadReviews(data) {
      reviews = data;
      hideReviewFilters();
      renderReviewList();
      showReviewFilters();
    }

    function hideReviewFilters() {
      var reviewFilters = document.querySelector('.reviews-filter');
      reviewFilters.classList.add('invisible');
    }

    function renderReviewList() {
      reviews.forEach(function(review) {
        var reviewObj = new Review(review);
        reviewObj.addHandlers();
        reviewsObjects.push(reviewObj);
        container.appendChild(reviewObj.element);
      });
    }

    function showReviewFilters() {
      var reviewFilters = document.querySelector('.reviews-filter');
      reviewFilters.classList.remove('invisible');
    }

    return function() {
      load(REVIEWS_LOAD_URL, loadReviews, 'JSONPCallback');
    };
  }
);

