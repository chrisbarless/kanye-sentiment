window.App = window.App || {};

(function($, _, undefined){
	var backgroundController = function backgroundController(){
		var size, wSize, el;
		$el = $('body');
		size = { height: 360, width: 23600 };
		wSize = {
			width: $(window).width(),
			height: $(window).height()
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
      var offset = -frame * wSize.width;
      $el.css('background-position-x', offset);
      console.debug('Offset set to %d', offset);
      return true;
    };
		this.init = function(){
			var str = wSize.width * 50 + 'px ' + wSize.height + 'px';
			$el.css('background-size', str);
      this._setFrame(0);
			return true;
		};
    this.init();
		return true;
	};

	$(function(){
		window.App.Background = new backgroundController();
	});
})(jQuery, _);