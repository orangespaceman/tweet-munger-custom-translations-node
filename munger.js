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
		
	search('L4RPP');		
}

function search(searchString) {
	console.log('searching for ' + searchString);
	twit.search(searchString, function(data) {
		console.log(util.inspect(data));
	});
	setTimeout(function(){search(searchString);}, 1000);
}

module.exports.init = init;
