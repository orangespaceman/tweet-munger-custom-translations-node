/*
 * The brains of the operation
 */

var util = require('util'),
		twitter = require('twitter'),
		async = require('async'),
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
	
	async.waterfall([
		function(callback){
			twit.get('/users/show/' + data['originalTwitterAccount'] + '.json', function(data) {
				callback(null, data);
			});
		},
		function(data, callback){
			params.follow = data.id;
			console.log('user id is: ' + params.follow);
			twit.stream('statuses/filter', params, function(stream) {
				callback(null, stream);
			});
		},
		function(stream, callback){
			stream.on('data', function(data) {
				callback(null, data);
			});
		},
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
