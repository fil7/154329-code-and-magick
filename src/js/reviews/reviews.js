'use strict';

define(['./review', '../load'],
  function(getReviewElement, load) {

    var reviews = [];
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
        container.appendChild(getReviewElement(review));
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

