/*
 * The Tweet Munger
 *
 * Pete G
 * csolar
 * danomurray
 */

var util    = require('util'),
    twitter = require('twitter'),
    translator;
  
/*
 * mung init
 * called from the main app.js file
 */
function init(data) {

  // init translator
  translator = require('./translations/' + data['translations']);

  // init twit
  var twit = new twitter({
    consumer_key: data['consumer_key'],
    consumer_secret: data['consumer_secret'],
    access_token_key: data['access_token_key'],
    access_token_secret: data['access_token_secret']
  });

  // connect to the stream
	twit.stream('statuses/filter', {follow:data['originalTwitterAccount']}, function(stream) {
    
    // when a new tweet is detected
    stream.on('data', function(data) {
      console.log(util.inspect(data));
      
      // mung and repost
      var translated = translator.translate(data.text);
      twit.updateStatus(translated,
        function(data) {
          console.log(util.inspect(data));
        }
      );
    });
  });
}

// export init method
module.exports.init = init;