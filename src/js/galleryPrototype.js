'use strict';

define(['./gallery'], function(Gallery) {

  var images = imagesCache();

  /**
   * Показывает галерею и фото в полноэкранном режиме.
   *
   * @param {number} pictureNum - Номер выбранной фотографии
   */
  Gallery.prototype.show = function(pictureNum) {
    this._addEventListeners();
    this.gallery.galleryElem.classList.remove('invisible');
    this.setActivePicture(pictureNum);
  };

  /**
   * Скрывает фотогалерею.
   */
  Gallery.prototype.hide = function() {
    this.gallery.galleryElem.classList.add('invisible');
    this._removeEventListeners();
    images.clearCache();
  };

  /**
   * Выводит на экран фотографию.
   *
   * @param {number} next - Номер фотографии.
   */
  Gallery.prototype.setActivePicture = function(next) {
    if (next >= 0 && next < +this.gallery.countPreview.innerHTML) {
      this.activePicture = next;
      var srcImage = this.pictures[next];
      var prevImage = document.querySelector('.overlay-gallery-preview img');
      var image = images.createImage(srcImage);
      if (!prevImage) {
        this.gallery.previews.appendChild(image);
      } else {
        this.gallery.previews.replaceChild(image, prevImage);
        prevImage = null;
      }
      this.gallery.numberOfCurrentPreview.innerHTML = this.activePicture + 1;
    }
  };

  Gallery.prototype._controlListener = function(direction) {
    this.setActivePicture(this.activePicture + direction);
  };

  Gallery.prototype._keyDownListener = function(e) {
    var event = window.event ? window.event : e;
    if (event.keyCode === 37) {
      this.gallery.controlLeft.onclick();
    } else if (event.keyCode === 39) {
      this.gallery.controlRight.onclick();
    }
  };

  Gallery.prototype._addEventListeners = function() {
    document.onkeydown = this._keyDownListener.bind(this);
    this.gallery.closeElement.onclick = this.hide.bind(this);
    this.gallery.controlRight.onclick = this._controlListener.bind(this, 1);
    this.gallery.controlLeft.onclick = this._controlListener.bind(this, -1);
  };

  Gallery.prototype._removeEventListeners = function() {
    document.onkeydown = null;
    this.gallery.closeElement.onclick = null;
    this.gallery.controlRight.onclick = null;
    this.gallery.controlLeft.onclick = null;
  };

  function imagesCache() {
    return {
      imageCache: [],
      createImage: function(src) {
        var image;
        var img = this.imageCache.filter(function(elem) {
          return elem.src === src;
        });
        if (img.length === 0) {
          image = new Image();
          image.src = src;
          this.imageCache.push(image);
        } else {
          image = img[0];
        }
        return image;
      },
      clearCache: function() {
        for (var i = 0; i < this.imageCache.length; i++) {
          delete this.imageCache[i];
        }
      }
    };
  }
});
