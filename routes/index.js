var express = require('express');
var router = express.Router();
var twit = require('twit');
var config = require('../config');

var t = new twit({
    consumer_key: config.twitter.api_key
  , consumer_secret: config.twitter.api_secret
  , access_token: config.twitter.access_token
  , access_token_secret: config.twitter.access_token_secret
})


/* GET home page. */
router.get(config.web.basepath + '/', function(req, res) {
	t.get('statuses/user_timeline', { screen_name: 'boodlare', count: 10 }, function(err, data, response) {
//	t.get('search/tweets', { screen_name: 'boodla since:2011-11-11', count: 100 }, function(err, data, response) {
		console.log(data);
		var items = Array();
		//data.statuses.forEach(function(item) {
		data.forEach(function(item) {
			items.push(item.text + "\n\n");
		});
		res.render('index', { title: 'Express', tweets: items });
	})
});

module.exports = router;
