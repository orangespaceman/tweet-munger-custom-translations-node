/*
 * The Tweet Munger
 *
 * Pete G
 * csolar
 * danomurray
 */


var util = require('util'),
    ImmortalNTwitter = require('./immortal-ntwitter'),
    http = require('http'),
    server,
    port = process.env['app_port'] || 8000,
    translator,
    initData,
    userId = 0,
    lastTweetId = 0,
    messages = [];


/*
 * set up server to relay logs
 */
server = http.createServer(function (req, res) {
  for (var counter = 0, length = messages.length; counter < length; counter++) {
    res.write(messages[counter]+'\n');
  }
  res.end();
});
server.listen(port);
console.log('Web server running on port '+port);



/*
 * mung init
 * called from the main app.js file
 */
function init(data) {
    //console.log(util.inspect(data));
    log('starting node tweet munger...');
    
    // init translator
    translator = require('./translations/' + data['translations']);
    initData = data;

    // init twit
    var twit = new ImmortalNTwitter.create({
        consumer_key: data['consumer_key'],
        consumer_secret: data['consumer_secret'],
        access_token_key: data['access_token_key'],
        access_token_secret: data['access_token_secret']
    });
    
    // get the user's ID from their name
    twit.showUser(data['originalTwitterAccount'], function(e, data) {

        //console.log(util.inspect(data));
        userId = data[0].id;
        lastTweetId = parseInt(data[0].status.id_str, 10);
        log('found user '+initData['originalTwitterAccount']+' (ID: ' + userId + ')');
        log('last tweet id: ' + lastTweetId);

        // connect to stream
        twit.immortalStream('statuses/filter', {follow:userId}, function(stream) {
            log('connected to stream, listening for tweets...');

            // when data is received
            stream.on('data', function(data) {
                //console.log(util.inspect(data));
                log('tweet detected from '+data.user.screen_name+': ' + data.text + ' (ID: '+data.id_str+')');

                var str = data.text;

                // ignore retweets
                if (str.indexOf("RT") === 0) {
                    log('retweet detected, ignoring...');
                
                // ignore tweets by other users
                } else if (data.user.screen_name.toLowerCase() !== initData['originalTwitterAccount'].toLowerCase()) {
                    log('tweet from another account detected, ignoring...');
                
                // ignore tweets older than the last
                } else if (lastTweetId > parseInt(data.id_str, 10)) {
                    log('tweet is too old, ignoring...');

                // OK to mung!
                } else {

                    // don't spam people...
                    str = str.replace('@', '_');
                    str = str.replace('#', '_');

                    // tweet translation
                    var translated = translator.translate(str);

                    // ensure new text length is <= 140 characters
                    if (translated.length > 140) {
                        translated = translated.substring(0, 137) + "...";
                    }

                    // post to twitter
                    twit.updateStatus(translated, function(e, data) {
                        //console.log(util.inspect(data));
                        lastTweetId = parseInt(data.id_str, 10);

                        log('tweet posted: ' + data.text + ' (ID: '+lastTweetId+')');
                    });
                }
            });
        });

    });
}


// format current date and time, for logging
function now() {
    var _now = new Date();
    return (_now.getMonth() + 1) + "/" +
        _now.getDate() + "/" +
        _now.getFullYear() + " - " +
        _now.getHours() + ":" +
        ((_now.getMinutes() < 10) ? "0" + _now.getMinutes() : _now.getMinutes()) + ":" +
        ((_now.getSeconds() < 10) ? "0" + _now.getSeconds() : _now.getSeconds());
}


// log messages
function log(message) {
    var str = now() + " - " + message;
    console.log(str);
    messages.push(str);
}

module.exports.init = init;