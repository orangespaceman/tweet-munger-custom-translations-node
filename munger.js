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
	translator.translate("This is a test, office right beer"); // test - remove...

	var twit = new twitter({
		consumer_key: data['consumer_key'],
		consumer_secret: data['consumer_secret'],
		access_token_key: data['access_token_key'],
		access_token_secret: data['access_token_secret']
	});
	
	// connect to twitter user stream
	twit.stream('user', {track: data['originalTwitterAccount']}, function(stream) {
	    stream.on('data', function(data) {
	       // console.log(util.inspect(data));
	    });
	    // Disconnect stream after five seconds
	    //setTimeout(stream.destroy, 10000);
	});
}

module.exports.init = init;
