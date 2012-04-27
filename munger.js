/*
 * The brains of the operation
 */

var util = require('util'),
	twitter = require('twitter'),
	twit;
	
function init(data) {
	console.log(util.inspect(data));
	twit = new twitter({
		consumer_key: data['consumer_key'],
		consumer_secret: data['consumer_secret'],
		access_token_key: data['access_token_key'],
		access_token_secret: data['access_token_secret']
	});

	var params = new Object();
	params.follow = data['originalTwitterAccount'];
	twit.stream('statuses/filter', params, function(stream) {
	    stream.on('data', function(data) {
	        console.log(util.inspect(data));
		});
	});
}

module.exports.init = init;
