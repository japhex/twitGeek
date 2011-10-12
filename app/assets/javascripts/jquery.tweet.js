(function($) {
  $.fn.tweet = function(o){
    var s = $.extend({
      favorites: false,                         // [boolean]  display the user's favorites instead of his tweets
      query: null,                              // [string]   optional search query
      count: 60,                                 // [integer]  how many tweets to display?
      fetch: null,                              // [integer]  how many tweets to fetch via the API (set this higher than 'count' if using the 'filter' option)
      retweets: true,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
      refresh_interval: 10,  					// [integer]  optional number of seconds after which to reload tweets
      container: null,							// [string]  container to append fresh tweets to
	  refresh_url:null,							// [string]  optional refresh URL for tweets
	  template: "{text}{user}{time}",            
	  comparator: function(tweet1, tweet2) {    // [function] comparator used to sort tweets (see Array.sort)
        return tweet2["tweet_time"] - tweet1["tweet_time"];
      },
      filter: function(tweet) {                 // [function] whether or not to include a particular tweet (be sure to also set 'fetch')
        return true;
      }
    }, o);
    $.fn.extend({
      linkUrl: function() {
        var returning = [];
        var regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
        this.each(function() {
          returning.push(this.replace(regexp,function(match) {
			var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
			return "<a class=\"url\" target=\"_blank\" href=\""+url+"\">"+match+"</a>";
		  }));
        });
        return $(returning);
      },
      linkUser: function() {
        var returning = [];
        var regexp = /[\@]+(\w+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a class=\"user\" target=\"_blank\" href=\"http://twitter.com/$1\">@$1</a>"));
        });
        return $(returning);
      },
      linkHash: function() {
        var returning = [];
        var regexp = /(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi;
		var usercond = (s.username && s.username.length == 1) ? '&from='+s.username.join("%2BOR%2B") : '';
        this.each(function() {
          returning.push(this.replace(regexp, ' <a class="hastag" target="_blank" href="http://search.twitter.com/search?q=&tag=$1&lang=all'+usercond+'">#$1</a>'));
        });
        return $(returning);
      }
    });
    function parse_date(date_str) {
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(date) {
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
      var r = '';
      if (delta < 60) {
        r = delta + ' seconds ago';
      } else if(delta < 120) {
        r = 'a minute ago';
      } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
        r = 'an hour ago';
      } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = 'a day ago';
      } else {
        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return r;
    }
    function build_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      var count = (s.fetch === null) ? s.count : s.fetch;
	  	if (s.refresh_url != null){
				return proto+'//search.twitter.com/search.json?' + s.refresh_url;
	  	}
			else{
      	return proto+'//search.twitter.com/search.json?&q='+encodeURIComponent(s.query)+'&rpp='+s.count+'&page=10&lang=en&callback=?';
			}
		}
    return this.each(function(i, widget){
      var list = $('<ul>').appendTo(widget);
	  var expand_template = function(info) {
		if (typeof s.template === "string") {
			var result = s.template;
			for(var key in info) {
				var val = info[key];
	            result = result.replace(new RegExp('{'+key+'}','g'), val === null ? '' : val);
			}
			return result;
		} else return s.template(info);
		};

      $(widget).bind("load", function(){
        $.getJSON(build_url(), function(data){
          	list.empty();
			list.attr('id',data.refresh_url);
          	var tweets = $.map(data.results || data, function(item){
            var screen_name = item.from_user || item.user.screen_name;
            var source = item.source;
            var user_url = "http://twitter.com/"+screen_name;
            var avatar_url = item.profile_image_url || item.user.profile_image_url;
            var tweet_url = "http://twitter.com/"+screen_name+"/status/"+item.id_str;
            var retweet = (typeof(item.retweeted_status) != 'undefined');
            var retweeted_screen_name = retweet ? item.retweeted_status.user.screen_name : null;
            var tweet_time = parse_date(item.created_at);
            var tweet_relative_time = relative_time(tweet_time);
            var tweet_raw_text = retweet ? ('RT @'+retweeted_screen_name+' '+item.retweeted_status.text) : item.text; // avoid '...' in long retweets
            var tweet_text = $([tweet_raw_text]).linkUrl().linkUser().linkHash()[0];
            var user = '<div><a class="account twitter-anywhere-user" href="'+user_url+'">@'+screen_name+'</a>';
            var time = '<a href="'+tweet_url+'" title="view tweet on twitter" class="tweet-time">'+tweet_relative_time+'</a></div>';
            var text = '<p>'+$([tweet_text])[0]+ '<img class="account-image" src="' + item.profile_image_url + '" /></p>';
			return {item: item, screen_name: screen_name, user_url: user_url, avatar_url: avatar_url, source: source, tweet_url: tweet_url, tweet_time: tweet_time, tweet_relative_time: tweet_relative_time, tweet_raw_text: tweet_raw_text, tweet_text: tweet_text, retweet: retweet, retweeted_screen_name: retweeted_screen_name, user: user, time: time, text: text};
		});
          tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);
		  list.append($.map(tweets,function(t) { return "<li>" + expand_template(t) + "</li>"; }).join(''));
		  $(widget).trigger("loaded").trigger((tweets.length === 0 ? "empty" : "full"));
		$('article li:nth-child(5n)').css('margin-right','0');
        });
      }).trigger("load");
    });
  };
})(jQuery);
