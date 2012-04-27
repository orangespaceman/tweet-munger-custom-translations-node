/*
 * The brains of the operation
 */

var util = require('util'),
		twitter = require('twitter'),
		translator;
	
function init(data) {
	console.log(util.inspect(data));
	
	// init translator
	translator = require('./translations/'+data['translations']);

	var twit = new twitter({
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
	        translator.translate(data.text);
		});
	});
}

module.exports.init = init;
