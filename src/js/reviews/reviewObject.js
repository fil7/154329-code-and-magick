'use strict';

define(['./review'], function(getReviewElement) {

  function Review(data) {
    /** Свойство, которое хранит объект с данными */
    this.data = data;

    /** Свойство, которое содержит DOM-элемент */
    this.element = getReviewElement(this.data);
    var quiz = this.element.querySelector('.review-quiz');

    /** Обработчики событий кликов по элементам review-quiz-answer */
    this.addHandlers = function() {
      this.quizHandler = this._quizAnswerOnClickHandler.bind(this);
      quiz.addEventListener('click', this.quizHandler);
    };

    /** Метод, который удаляет обработчики событий */
    this.remove = function() {
      quiz.removeEventListener('click', this.quizHandler);
      this.quizHandler = null;
    };

    this.addHandlers();
  }

  Review.prototype._quizAnswerOnClickHandler = function _quizAnswerOnClickHandler(e) {
    var evt = e || event;
    if (evt.target.classList.contains('review-quiz-answer')) {
      var activeAnswer = this.element.querySelector('.review-quiz-answer-active');
      if (activeAnswer) {
        activeAnswer.classList.remove('review-quiz-answer-active');
      }
      evt.target.classList.add('review-quiz-answer-active');
    }
  };



  return Review;
});

