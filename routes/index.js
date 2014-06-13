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
		console.log(response);
		var items = data;

		ig.tag_media_recent('urbangardening', function (err, medias, pagination, limit) {
			//console.log(medias);

			var grams = medias;

			res.render('index', {
				title : 'Express',
				tweets : JSON.stringify(items),
				instagrams : JSON.stringify(grams)
			});
		});

	})
});

module.exports = router;
