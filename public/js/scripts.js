(function($, undefined){
	var backgroundController = function backgroundController(){
		var size, wSize, el;
		$el = $('body');
		size = { height: 360, width: 23600 };
		wSize = {
			width: $(window).width(),
			height: $(window).height()
		};
		this.setMood = function(mood){
			if (mood === 0) mood = 1;
			mood = Math.abs(mood - 100);
			var frame = Math.floor(mood / 2),
					offset = -frame * wSize.width;
			$el.css('background-position-x', offset)
			console.debug('Frame set to %d', frame);
			console.debug('Offset set to %d', offset);
			return true;
		};
		this.init = function(){
			var str = wSize.width * 50 + 'px ' + wSize.height + 'px';
			$el.css('background-size', str);
			this.setMood(25);
			return true;
		};
		return this.init();
	};

	$(function(){
		window.BackgroundC = new backgroundController();
	});
})($);