'use strict';

module.exports = function(list, filterID) {

  var threeDays = 1000 * 60 * 60 * 24 * 3;

  switch (filterID) {

    /** список отзывов с оценкой не ниже 3, отсортированный по убыванию оценки  */
    case 'reviews-good' :
      return list
        .filter(isGoodReview)
        .sort(descendingBy('rating'));

    /**  список отзывов с оценкой ниже 3, отсортированный по возрастанию оценки  */
    case 'reviews-bad' :
      return list
        .filter(isBadReview)
        .sort(ascendingBy('rating'));

    /** список отзывов, сделанных за последние три дня, отсортированный по убыванию даты (поле created) */
    case 'reviews-recent':
      return list
        .filter(isRecentReview)
        .sort(descendingBy('created'));

    /**  список отзывов, отсортированный по убыванию полезности отзыва  */
    case 'reviews-popular' :
      return list.sort(descendingBy('review_usefulness'));

    /** список отзывов, показываемый пользователю по умолчанию */
    case 'reviews-all':
      return list.sort(ascendingBy('created'));

    default:
      return list;
  }

  function isGoodReview(review) {
    return review.rating >= 3;
  }

  function isBadReview(review) {
    return review.rating < 3;
  }

  function isRecentReview(review) {
    return Date.now() - review.created <= threeDays;
  }

  function descendingBy(value) {
    return function(r1, r2) {
      return r2[value] - +r1[value];
    }
  }

  function ascendingBy(value) {
    return function(r1, r2) {
      return r1[value] - r2[value];
    }
  }

};


