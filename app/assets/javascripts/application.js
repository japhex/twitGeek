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
	setInterval(function () { freshTweets() }, 10000);
	function freshTweets(){
		$('article ul').each(function(){
			var searchFeed = $(this);
			var refreshUrl = $(this).attr('id');
			
			searchFeed.tweet({query:searchFeed.parent().data('feed-name'),refresh_url:refreshUrl});
		});
	}
}

//{"refresh_url":"?since_id=124253638473433088&q=steve%20jobs&lang=en",
//"results":[{"created_at":"Wed, 12 Oct 2011 22:42:30 +0000","from_user":"t2thejayyy","from_user_id":165291569,"from_user_id_str":"165291569","geo":null,"id":124253638473433088,"id_str":"124253638473433088","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a3.twimg.com/profile_images/1143557594/zpzp_normal.jpg","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"RT @Jameszeitler: 10 years ago we had Johnny Cash, Bob Hope and Steve Jobs. Now we have no Cash, no Hope and no Jobs.\nPlease don't let Kevin Bacon die.","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:29 +0000","from_user":"manunaHJ","from_user_id":61560230,"from_user_id_str":"61560230","geo":null,"id":124253634480451584,"id_str":"124253634480451584","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a3.twimg.com/profile_images/1300259893/P7300158_normal.JPG","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"RT @Evil_Dumbledore: Dear Blackberry, I think it's nice that you're honouring Steve Jobs' death with a 3 day silence","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:29 +0000","from_user":"cozywitdaposey","from_user_id":400110408,"from_user_id_str":"400110408","geo":null,"id":124253632907583488,"id_str":"124253632907583488","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a2.twimg.com/profile_images/1577797650/image_normal.jpg","source":"&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;","text":"RT @Shealan: Blackberry down, iPhone error 3200. Steve Jobs has only been gone a few days and we are already experiencing the start of the techpocalypse.","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:29 +0000","from_user":"Suwagga","from_user_id":201667952,"from_user_id_str":"201667952","geo":null,"id":124253632668499969,"id_str":"124253632668499969","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a0.twimg.com/profile_images/1576116283/12772685789032_large_normal.jpg","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"3 apples have changed the world. The one Adam &amp; Eve ate, the one that fell on Newton's head and the one created by Steve Jobs.","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:28 +0000","from_user":"JuJitsuFan","from_user_id":36652192,"from_user_id_str":"36652192","geo":null,"id":124253631204687872,"id_str":"124253631204687872","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a3.twimg.com/profile_images/1292095250/vaxdI91e_normal","source":"&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;","text":"RT @paddyhirsch: RT @centrifugen: &quot;10 yrs ago we had Steve Jobs, Bob Hope &amp; Jonny Cash... Now we don't have jobs, hope or cash&quot; #brokeecon","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:28 +0000","from_user":"Lexabarca","from_user_id":174382068,"from_user_id_str":"174382068","geo":null,"id":124253631104024576,"id_str":"124253631104024576","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a0.twimg.com/profile_images/1546456252/Magaly_201_normal.jpg","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"Blackberry down, iPhone error 3200. Steve Jobs has only been gone a few days and we are already experiencing the start of the techpocalypse","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:28 +0000","from_user":"deheinen","from_user_id":398864994,"from_user_id_str":"398864994","geo":null,"id":124253630034477056,"id_str":"124253630034477056","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a1.twimg.com/sticky/default_profile_images/default_profile_2_normal.png","source":"&lt;a href=&quot;http://twitter.com/#!/download/iphone&quot; rel=&quot;nofollow&quot;&gt;Twitter for iPhone&lt;/a&gt;","text":"From Facebook: &quot;10 years ago we had Steve Jobs, Bob Hope and Johnny Cash, now we have No Jobs No Hope and No Cash... &quot;","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:27 +0000","from_user":"leroybouma","from_user_id":421491954,"from_user_id_str":"421491954","geo":null,"id":124253625055850496,"id_str":"124253625055850496","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png","source":"&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;","text":"RT @Shealan: Blackberry down, iPhone error 3200. Steve Jobs has only been gone a few days and we are already experiencing the start of the techpocalypse.","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:27 +0000","from_user":"tannerolson","from_user_id":9783494,"from_user_id_str":"9783494","geo":null,"id":124253624036634624,"id_str":"124253624036634624","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a3.twimg.com/profile_images/1538945437/ciroc_normal.png","source":"&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;","text":"RT @Shealan: Blackberry down, iPhone error 3200. Steve Jobs has only been gone a few days and we are already experiencing the start of the techpocalypse.","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:26 +0000","from_user":"yuanatmojo","from_user_id":276860507,"from_user_id_str":"276860507","geo":null,"id":124253622681866241,"id_str":"124253622681866241","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a3.twimg.com/profile_images/1558238130/das_normal.jpg","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"RT @joemorahan: Steve Jobs....&quot;Very Challenging Photo Subject&quot; http://t.co/c2We2em7","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:26 +0000","from_user":"AniGorr23","from_user_id":378827437,"from_user_id_str":"378827437","geo":null,"id":124253621746532352,"id_str":"124253621746532352","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a1.twimg.com/profile_images/1519146738/DSC00556_normal.JPG","source":"&lt;a href=&quot;http://twitter.com/#!/download/iphone&quot; rel=&quot;nofollow&quot;&gt;Twitter for iPhone&lt;/a&gt;","text":"\u201C@applespotlight: The fact that Steve Jobs' photo is still the entire homepage during 4S, iOS 5, iCloud, says a lot about Apple\u201D","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:26 +0000","from_user":"6yam","from_user_id":99638558,"from_user_id_str":"99638558","geo":null,"id":124253621239033856,"id_str":"124253621239033856","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a2.twimg.com/profile_images/1430891016/216850_197253753643630_100000770202063_438097_3468048_n_normal.jpg","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"RT @Evil_Dumbledore: Dear Blackberry, I think it's nice that you're honouring Steve Jobs' death with a 3 day silence","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:24 +0000","from_user":"jgonzales35","from_user_id":3220910,"from_user_id_str":"3220910","geo":null,"id":124253610845552640,"id_str":"124253610845552640","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a1.twimg.com/profile_images/1337148451/D1PcuT5S_normal","source":"&lt;a href=&quot;http://twitter.com/#!/download/iphone&quot; rel=&quot;nofollow&quot;&gt;Twitter for iPhone&lt;/a&gt;","text":"RT @colindobson: I buy an iPad and Steve Jobs dies. \nI buy a Blackberry and BBM dies. \nI've just bought Katie Price's book.\nFingers crossed!","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:23 +0000","from_user":"whiffenator","from_user_id":177341654,"from_user_id_str":"177341654","geo":null,"id":124253610480640001,"id_str":"124253610480640001","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a0.twimg.com/profile_images/1577117291/whiffenator_normal.jpg","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;","text":"BBM is down after Steve Jobs dies? Sounds like he's haunting BB","to_user_id":null,"to_user_id_str":null},{"created_at":"Wed, 12 Oct 2011 22:42:22 +0000","from_user":"rohan_atf","from_user_id":263197979,"from_user_id_str":"263197979","geo":null,"id":124253604986097664,"id_str":"124253604986097664","iso_language_code":"en","metadata":{"result_type":"recent"},"profile_image_url":"http://a1.twimg.com/profile_images/1569336188/IMG-20111002-00497_normal.jpg","source":"&lt;a href=&quot;http://www.huffingtonpost.com&quot; rel=&quot;nofollow&quot;&gt;The Huffington Post&lt;/a&gt;","text":"RT @HuffingtonPost: Bono: Steve Jobs was 'the Bob Dylan of machines' http://t.co/dcIs1IHC","to_user_id":null,"to_user_id_str":null}],"results_per_page":15,"since_id":124252213970345984,"since_id_str":"124252213970345984"});

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