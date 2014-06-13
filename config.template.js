var config = {};

config.twitter = {};
config.web = {};

config.twitter.api_key = '...';
config.twitter.api_secret = '...';
config.twitter.access_token = '...';
config.twitter.access_token_secret = '...';

config.instagram.client_id = '...';
config.instagram.client_secret = '...';

config.web.port = process.env.WEB_PORT || 3000;
config.web.basepath = '';

module.exports = config;