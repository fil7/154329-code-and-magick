'use strict';

define(['./review'], function(getReviewElement) {

  function Review(data) {
    /** Свойство, которое хранит объект с данными */
    this.data = data;

    /** Свойство, которое содержит DOM-элемент */
    this.element = getReviewElement(this.data);
    var answerElements = this.element.querySelectorAll('.review-quiz-answer');

    /** Обработчики событий кликов по элементам review-quiz-answer */
    this.addHandlers = function() {
      answerElements.forEach(
        function(answer) {
          answer.onclick = this._quizAnswerOnClickHandler.bind(this);
        },
        this
      );
    };

    /** Метод, который удаляет обработчики событий */
    this.remove = function() {
      answerElements.forEach(function(answer) {
        answer.onclick = null;
      });
    };
  }

  Review.prototype._quizAnswerOnClickHandler = function(e) {
    var evt = e || event;
    var activeAnswer = this.element.querySelector('.review-quiz-answer-active');
    if (activeAnswer) {
      activeAnswer.classList.remove('review-quiz-answer-active');
    }
    evt.target.classList.add('review-quiz-answer-active');
  };

  return Review;
});

