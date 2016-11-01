'use strict';

define(function() {

  var _galleryElem = document.querySelector('.overlay-gallery');
  var _controlLeft = document.querySelector('.overlay-gallery-control-left');
  var _controlRight = document.querySelector('.overlay-gallery-control-right');
  var _countPreview = document.querySelector('.preview-number-total');
  var _closeElement = document.querySelector('.overlay-gallery-close');
  var _previews = document.querySelector('.overlay-gallery-preview');
  var _numberOfCurrentPreview = document.querySelector('.preview-number-current');

  /**
   * Создает объект галереи, отвечающий за показ фотографий.
   *
   * @param {string[]} pictures - Адреса фотографий, которые нужно показать.
   * @constructor
   */
  function Gallery(pictures) {
    this.pictures = pictures;
    this.activePicture = -1;
    this.gallery = {
      galleryElem: _galleryElem,
      controlLeft: _controlLeft,
      controlRight: _controlRight,
      countPreview: _countPreview,
      closeElement: _closeElement,
      previews: _previews,
      numberOfCurrentPreview: _numberOfCurrentPreview
    };
  }

  return Gallery;
});


