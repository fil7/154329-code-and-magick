'use strict';

define(['./review'], function(getReviewElement) {

  function Review(data) {
    /** Свойство, которое хранит объект с данными */
    this.data = data;

    /** Свойство, которое содержит DOM-элемент */
    this.element = getReviewElement(this.data);
    var quiz = this.element.querySelector('.review-quiz');

    /** Метод, который удаляет обработчики событий */
    this.remove = function() {
      quiz.removeEventListener('click', quizHandler);
      quizHandler = null;
    };

    var quizHandler = _quizAnswerOnClickHandler.bind(this);
    quiz.addEventListener('click', quizHandler);
  }

  function _quizAnswerOnClickHandler(e) {
    var evt = e || event;
    if (evt.target.classList.contains('review-quiz-answer')) {
      var activeAnswer = this.element.querySelector('.review-quiz-answer-active');
      if (activeAnswer) {
        activeAnswer.classList.remove('review-quiz-answer-active');
      }
      evt.target.classList.add('review-quiz-answer-active');
    }
  }

  return Review;
});

