/*
 * The Tweet Munger
 *
 * Pete G
 * csolar
 * danomurray
 */


var util = require('util'),
		twitter = require('twitter'),
		async = require('async'),
		translator;
	
/*
 * mung init
 * called from the main app.js file
 */
function init(data) {
	console.log(util.inspect(data));
	
	// init translator
	translator = require('./translations/'+data['translations']);

    // init twit
	var twit = new twitter({
		consumer_key: data['consumer_key'],
		consumer_secret: data['consumer_secret'],
		access_token_key: data['access_token_key'],
		access_token_secret: data['access_token_secret']
	});

	var params = new Object();
	
	async.waterfall([
		// get the user's ID from their name
		function(callback){
			twit.get('/users/show/' + data['originalTwitterAccount'] + '.json', function(data) {
				callback(null, data);
			});
		},
		// connect to the stream
		function(data, callback){
			params.follow = data.id;
			console.log('user id is: ' + params.follow);
			twit.stream('statuses/filter', params, function(stream) {
				callback(null, stream);
			});
		},
		// when a new tweet is detected
		function(stream, callback){
			stream.on('data', function(data) {
				callback(null, data);
			});
		},
		 // mung and repost
		function(data, callback){
			console.log(util.inspect(data));
	        var translated = translator.translate(data.text);
			twit.updateStatus(translated, function(data) {
					callback(null, data);
			});
		}
		], function(err, result){
			console.log(util.inspect(result));
		});
}

module.exports.init = init;