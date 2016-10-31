'use strict';

require.config({
  baseUrl: 'js/'
});

require(['./startGame'], function(startGame) {
  startGame();
});

require(['./reviews/reviews'], function(renderReviews) {
  renderReviews();
});


require(['./gallery', './galleryPrototype'], function(Gallery) {
  var pictures = document.querySelectorAll('.photogallery-image:not([data-replacement-video])');
  var imageSrc = Array.prototype.map.call(pictures, function(elem) {
    return elem.children[0].src;
  });
  var gallery = new Gallery(imageSrc);
  pictures.forEach(function(elem, i) {
    elem.addEventListener('click', function() {
      gallery.show(i);
    });
  });
});



