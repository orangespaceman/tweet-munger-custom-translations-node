/*
 * The Tweet Munger
 *
 * Pete G
 * csolar
 * danomurray
 */


var util = require('util'),
    ImmortalNTwitter = require('./immortal-ntwitter'),
    translator,
    initData;


/*
 * mung init
 * called from the main app.js file
 */
function init(data) {
    //console.log(util.inspect(data));
    console.log(now() + " starting node tweet munger...");
    
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
        var userId = data[0].id;
        console.log(now() + ' found user '+initData['originalTwitterAccount']+' (ID: ' + userId + ')');

        // connect to stream
        twit.immortalStream('statuses/filter', {follow:userId}, function(stream) {
            console.log(now() + ' connected to stream, listening for tweets...');

            // when data is recieved
            stream.on('data', function(data) {
                //console.log(util.inspect(data));
                console.log(now() + ' tweet detected: ' + data.text);

                var str = data.text;

                // ignore retweets
                if (str.indexOf("RT") === 0) {
                    console.log(now() + ' retweet detected, ignoring...');
                } else {

                    // don't spam people...
                    str = str.replace('@', '_');
                    str = str.replace('#', '_');

                    // tweet translation
                    var translated = translator.translate(str);

                    // ensure new text length is <= 140 characters
                    if (str.length > 140) {
                        str = str.substring(0, 137) + "...";
                    }

                    // post to twitter
                    twit.updateStatus(translated, function(e, data) {
                        //console.log(util.inspect(data));
                        console.log(now() + ' tweet posted: ' + data.text);
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

module.exports.init = init;