'use strict';

define(['../load', './reviewObject'],
  function(load, Review) {

    var pageNumber = 0;
    var PAGE_SIZE = 3;
    var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
    var reviewsContainer = document.querySelector('.reviews-list');
    var moreReviewControl = document.querySelector('.reviews-controls-more');
    var filtersContainer = document.querySelector('.reviews-filter');

    var params = {
      from: 0,
      to: PAGE_SIZE,
      filter: 'reviews-all'
    };

    function renderReviewList(data, replace) {
      if (replace) {
        reviewsContainer.innerHTML = '';
      }
      if (data.length === 0) {
        moreReviewControl.removeEventListener('click', moreReviewHandler);
        moreReviewControl.classList.add('invisible');
      }
      data.forEach(function(review) {
        reviewsContainer.appendChild(new Review(review).element);
      });
    }

    function moreReviewHandler() {
      pageNumber++;
      params.from = pageNumber * PAGE_SIZE;
      params.to = params.from + PAGE_SIZE;
      load(REVIEWS_LOAD_URL, params, renderReviewList);
    }

    function loadReviews(data) {
      hideReviewFilters();
      renderReviewList(data, true);
      moreReviewControl.addEventListener('click', moreReviewHandler);
      moreReviewControl.classList.remove('invisible');
      showReviewFilters();
    }

    function hideReviewFilters() {
      filtersContainer.classList.add('invisible');
      filtersContainer.removeEventListener('change', filterHandler, true);
    }

    function showReviewFilters() {
      filtersContainer.classList.remove('invisible');
      filtersContainer.addEventListener('change', filterHandler, true);
    }

    function filterHandler(e) {
      var evt = e || event;
      var target = evt.target || evt.srcElement;
      pageNumber = 0;
      params.from = pageNumber * PAGE_SIZE;
      params.to = params.from + PAGE_SIZE;
      params.filter = target.id;
      load(REVIEWS_LOAD_URL, params, loadReviews);
    }

    return function() {
      load(REVIEWS_LOAD_URL, params, loadReviews);
    };
  }
);

