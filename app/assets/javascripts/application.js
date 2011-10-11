// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
	// Make call to default options for user
	initNotices();
	twitGeek.defaultOptions();
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 100){
			$('#sticky-bar').css('opacity',0.2);
		}
		else{
			$('#sticky-bar').css('opacity',1);			
		}
	});
});

var twitGeek = {};

// Seperate site functions
function initNotices(){
	$('.user-info').each(function(){
		var $userInfo = $(this);
		if ($userInfo.text() !== ''){
			$userInfo.slideDown('slow',function(){
				$userInfo.delay(2000).slideUp('slow');
			});
		}		
	});
}

twitGeek.defaultOptions = function(){
	if ($('#user-feeds').length > 0) {
		twitGeek.retreiveJSON();
		twitGeek.deleteFeeds();
		//twitGeek.updateFeeds(); - TO DO
	}
}

twitGeek.retreiveJSON = function(){
	$.ajax({
	  url: "terms.json",
	  success: function(data){
		for (i = 0; i < data.length; i++) {
			var active = "";
			if (i === 0){active = "active"} else {active = ""};
			$('#feed-nav').append('<li class="' + active + '" data-feed-class="' + data[i].name + '"><a href="#">' + data[i].name + '</a></li>');
			var $tweetFeed = $('#user-feeds').find("[data-feed-name='" + data[i].name +"']");
			$tweetFeed.tweet({query:data[i].name});		
		}
		$('#feed-nav li').live('click',function(){
			var feedTab = $(this),
				feedContent = feedTab.find('a').text();
			feedTab.siblings().removeClass('active');
			feedTab.addClass('active');
			$('#user-feeds article').removeClass('active');
			$('#user-feeds').find('[data-feed-name="' + feedContent +'"]').addClass('active');
			return false;
		});
		twitGeek.calculateHeight();
	  }
	});	
}

twitGeek.deleteFeeds = function(){
	$('.delete-action').live('click', function(){
		var deleteFeed = $(this).parent().attr('data-feed-name');
		$('#feed-nav').find("[data-feed-class='" + deleteFeed +"']").remove();
		$(this).parent().remove();
		$('#feed-nav li:first').addClass('active');
		$('#user-feeds article:first').addClass('active');		
		return false;
	});
}

twitGeek.calculateHeight = function(){
	var windowHeight = $(window).height();
	$('#user-feeds article ul').css('height',windowHeight - 130 + 'px');
}

/* --- MAY BE USEFUL
"max_id":123430988729696256,
"max_id_str":"123430988729696256",
"refresh_url":"?since_id=123430988729696256&q=jquery&lang=en",
"results":
	[{"geo":null,
	"to_user_id":null
*/