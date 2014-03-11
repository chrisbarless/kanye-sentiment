window.App = window.App || {};

(function($, _, undefined){
	var backgroundController = function backgroundController(){
		var $frame = $('#frames'),
    		$frameInner = $('#frame-inner'),
        $frames = $frameInner.children(),
    		fSize = {
    			width: 1180,
    			height: 902
    		};
    this._mood = 100;
    this.setMood = function(mood){
      if (mood <= 0) mood = 1;
      if (mood > 100) mood = 100;
      this._animate(this._mood, mood);
      this._mood = mood;
      console.debug('Mood set to %d', mood);
      return true;
    };
    this._animate = function(start, stop){
      if (start === stop) return false;
      var direction = start > stop ? 'up' : 'down';
      var gap = (direction === 'up' ? start - stop : stop - start);
      var klass = this;
      var delay = 0;
      gap = gap / 10;
      if (direction === 'up'){
        for (var i = start; i > stop; i -= gap) {
          i = Math.floor(i);
          setTimeout(function(mood){
            klass._setFrame(mood)
          }, delay, i);
          delay += 100;
        };
      } else {
        for (var i = start; i < stop; i += gap) {
          i = Math.floor(i);
          setTimeout(function(mood){
            klass._setFrame(mood)
          }, delay, i);
          delay += 100;
        };
      }
    };
    this._setFrame = function(mood){
      var frame;
      frame = Math.abs(mood - 100) / 2;
      frame = Math.floor(frame);
      console.log(frame);
      var offset = -frame * fSize.width;
      $frameInner.css('left', offset);
      console.debug('Offset set to %d', offset);
      return true;
    };
		this.init = function(){
      var newWidth, newHeight, tString;
      newWidth = $(window).width() / fSize.width,
      newHeight = $(window).height() / fSize.height,
      tString = 'scale(' + newWidth + ', ' + newHeight + ')';
      $frameInner.css({
        'width': fSize.width * $frames.length,
        'height': fSize.height
      });
      $frames.css({
        'width': fSize.width,
        'height': fSize.height
      });
      $frame.css({
        'width': fSize.width,
        'height': fSize.height,
        'transform': tString,
        '-webkit-transform': tString,
        '-moz-transform': tString
      })
      .fadeIn(2500);

      this._setFrame(1);
			return true;
		};
    this.init();
		return true;
	};

	$(function(){
		window.App.Background = new backgroundController();
	});
})(jQuery, _);