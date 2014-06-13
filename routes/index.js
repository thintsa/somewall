var express = require('express');
var router = express.Router();
var twit = require('twit');
var config = require('../config');

var t = new twit({
		consumer_key : config.twitter.api_key,
		consumer_secret : config.twitter.api_secret,
		access_token : config.twitter.access_token,
		access_token_secret : config.twitter.access_token_secret
	});

var ig = require('instagram-node').instagram();
ig.use({
	client_id : config.instagram.client_id,
	client_secret : config.instagram.client_secret
});

/* GET home page. */
router.get(config.web.basepath + '/', function (req, res) {
	t.get('search/tweets', {
		q : 'urbangardening since:2011-11-11',
		count : 10
	}, function (err, data, response) {
		var items = Array();

		data.statuses.forEach(function (entry) {
			var item = Object();
			item.profileimage = entry.user.profile_image_url;
			item.screenname = entry.user.name;
			item.nick = entry.user.screen_name;
			item.text = entry.text;
			item.date = entry.created_at;
			item.id = entry.id;
			items.push(item);
		});

		ig.tag_media_recent('urbangardening', function (err, medias, pagination, limit) {
			var grams = Array();
			var i = 1;
			medias.some(function (entry) {
				var item = Object();
				item.profileimage = entry.user.profile_picture;
				item.image = entry.images.low_resolution;
				item.screenname = entry.user.full_name;
				item.nick = entry.user.username;
				item.date = entry.created_time;
				if (entry.caption !== null) {
					item.text = entry.caption.text;
				} else {
					item.text = "";
				}
				item.id = entry.id;
				grams.push(item);
				if (i++ > 9) return true;
			});

			res.render('index', {
				title : 'Express',
				tweets : JSON.stringify(items),
				instagrams : JSON.stringify(grams)
			});
		});

	})
});

module.exports = router;
