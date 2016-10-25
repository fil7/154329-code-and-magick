'use strict';

(function(){

  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var IMAGE_LOAD_TIMEOUT = 10000;
  var container = document.querySelector('.reviews-list');
  var template = document.getElementById('review-template');
  var templateContainer = 'content' in template ? template.content : template;
  var reviews = [];

  load(REVIEWS_LOAD_URL, loadReviews, 'JSONPCallback');

  function load(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'cb' + Date.now();
    }
    window[callbackName] = function(data) {
      callback(data);
    };
    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  }

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
      container.appendChild(createReviewElement(review));
    });
  }

  function createReviewElement(review) {
    var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
    fillAuthorImage(reviewElement.querySelector('.review-author'), reviewElement, review);
    fillRating(reviewElement.querySelector('.review-rating'), review.rating);
    fillDescription(reviewElement.querySelector('.review-text'), review.description);
    return reviewElement;
  }

  function fillAuthorImage(authorImage, reviewElement, review) {
    var downloadImage = new Image(124, 124);
    var reviewElementTimeout = setTimeout(function () {
      reviewElement.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    downloadImage.onload = function () {
      clearTimeout(reviewElementTimeout);
      authorImage.src = downloadImage.src;
    };

    downloadImage.onerror = function () {
      clearTimeout(reviewElementTimeout);
      reviewElement.classList.add('review-load-failure');
    };

    downloadImage.src = review.author.picture;
    authorImage.title = review.author.name;
  }

  function fillRating(ratingElement, rating) {
    var ratingClass;
    switch (rating) {
      case 1 :
        ratingClass = 'review-rating-one';
        break;
      case 2 :
        ratingClass = 'review-rating-two';
        break;
      case 3 :
        ratingClass = 'review-rating-three';
        break;
      case 4 :
        ratingClass = 'review-rating-four';
        break;
      case 5 :
        ratingClass = 'review-rating-five';
        break;
      default:
        ratingClass = 'review-rating-three';
    }
    ratingElement.classList.add(ratingClass);
  }

  function fillDescription(descriptionElement, text) {
    descriptionElement.innerHTML = text;
  }

  function showReviewFilters() {
    var reviewFilters = document.querySelector('.reviews-filter');
    reviewFilters.classList.remove('invisible');
  }

})();
