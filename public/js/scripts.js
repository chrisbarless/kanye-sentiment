(function($, _, Backbone, undefined){

  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  var Tweet = Backbone.Model.extend();
  var Tweets = Backbone.Collection.extend({
    model: Tweet
  });

  var BaseView = Backbone.View.extend({
    setModel: function(model){
      this.model = model;
      this.trigger('change:model');
    },
    render: function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  var AppView = BaseView.extend({
    initialize: function(){
      BaseView.prototype.initialize();
      this.on('change:model', function(){
        this.Background.setMood(this.model.get('score') * 5 + 50);
      });
    },
    nextTweet: function(){
      if (! App.tweets.currentTweet || App.tweets.currentTweet === App.tweets.length - 1){
        App.tweets.currentTweet = 0;
      }
      this.setModel(App.tweets.at(App.tweets.currentTweet++));
      this.trigger('changeTweet');
    }
  });

  var TweetView = BaseView.extend({
    initialize: function(){
      _.bindAll(this, 'render');
      this.setModel(App.model);
      this.listenTo(App, 'changeTweet', function(){
        this.setModel(App.model);
        this.render();
      });
    }
  });

  var ChartView = BaseView.extend({
    'tagName': 'canvas',
    'id': 'chart',
    'className': 'chart-canvas',
    'attributes': {
      'height': 150,
      'width': 250
    },
    initialize: function(){
      this.ctx = this.el.getContext("2d");
      this.data = [];
      this.addScore();
      this.listenTo(App, 'changeTweet', function(){
        if (this.data.length >= 5) this.data.shift();
        this.addScore();
        this.render();
      });
    },
    addScore: function(){
      this.data.push(App.model.get('score'));
    },
    render: function(){
      this.chart = new Chart(this.ctx).Line({
        labels: ['', '', '', '', ''],
        datasets : [
          {
            fillColor : "rgba(22,22,22,0.2)",
            strokeColor : "rgba(100,100,100,0.2)",
            pointColor : "rgba(220,220,220,0.4)",
            pointStrokeColor : "#444",
            data : this.data
          }
        ]
      }, {
        scaleOverride: true,
        scaleFontFamily: 'monospace',
        scaleFontSize: 10,
        animation: false,
        scaleSteps: 11,
        scaleStartValue: -12,
        scaleStepWidth: 2,
        pointDotRadius: 1,
        pointDot: false,
        pointDotStrokeWidth: 0
      });
      return this;
    }
  });

  var TweetDisplay = TweetView.extend({
    tagName: 'section',
    id: 'tweet-display',
    className: 'tweet-display',
    template: _.template(
      '<p class="tweet"><%= text %></p>'
    )
  });

  var TweetData = TweetView.extend({
    tagName: 'section',
    id: 'tweet-data',
    className: 'tweet-data',
    template: _.template(
      '<p id="tweet-pos"><span class="bold">Positive:</span> <%- positive.join(", ") %></p>' +
      '<p id="tweet-neg"><span class="bold">Negative:</span> <%- negative.join(", ") %></p>' +
      '<p id="tweet-score"><span class="bold">Score:</span> <%- score %></p>'
    )
  });

  var backgroundController = function backgroundController(){
    var $frame = $('#frames'),
        $frameInner = $('#frame-inner'),
        $frames = $frameInner.children(),
        fSize = {
          width: is_firefox ? 1245 : 1320,
          height: is_firefox? 1402 : 1402
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
      if (start == stop) return false;
      var direction = start > stop ? 'up' : 'down';
      var gap = (direction === 'up' ? start - stop : stop - start);
      var self = this;
      var delay = 0;
      var iterations = 0;
      gap = gap / 10;
      if (direction === 'up'){
        for (var i = start; i > stop; i -= gap) {
          i = Math.ceil(i);
          setTimeout(function(mood){
            self._setFrame(mood);
          }, delay, i);
          delay += 200;
          if (iterations++ > 10) break;
        };
      } else {
        for (var i = start; i < stop; i += gap) {
          i = Math.ceil(i);
          setTimeout(function(mood){
            self._setFrame(mood);
          }, delay, i);
          delay += 200;
          if (iterations++ > 10) break;
        };
      }
    };
    this._setFrame = function(mood){
      var frame;
      frame = Math.abs(mood - 100) / 2;
      frame = Math.floor(frame);
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
      }).fadeIn(2500);

      return true;
    };
    this.init();
    this._setFrame(1);
    $frame.fadeIn(2500);

    return true;
  };

  $(function(){
    
    window.App = window.App || new AppView();

    App.Background = new backgroundController();

    App.tweets = new Tweets(window.tweet_data);
    App.nextTweet();

    App.tweetData = new TweetData();
    App.tweetDisplay = new TweetDisplay();
    App.chart = new ChartView();

    $('body').append(
      App.tweetData.render().el,
      App.tweetDisplay.render().el
    );
    $('.chart-canvas-wrap').append(
      App.chart.render().el
    );

    var advanceTweet = function(){
      var seed = 1.2 - (Math.random() * 0.2);
      setTimeout(function(){
        App.nextTweet();
        advanceTweet();
      }, 5500 * seed);
    };
    advanceTweet();

    var throttledResize = _.debounce(function(){
      App.Background.init();
    }, 500, false);
    $(window).on('resize', throttledResize);
  });
})(jQuery, _, Backbone);