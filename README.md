# TweetMunger

Translate _(mung)_ tweets from a specific user account through a custom dictionary, then re-tweet from a new account.


## Set up

Setting up a new TweetMunger account will require a few steps:

  * Create a new [Twitter](http://twitter.com/) account 
  * [Register a new app](https://dev.twitter.com/) with the twitter account - take a note of the four different keys listed below, and make sure the app has read and write access.  (Give it read and write access before creating your access tokens so they share this access, to check see [here](https://twitter.com/settings/applications))
  * Pick a custom translation (or create your own - it just needs to export a 'translate' method which returns a string to tweet) - the default supplied translation is pirate


## Init

 * Check out the app from github
 * run `npm install` to install dependencies
 * Duplicate/rename the app.sample.js file, call it app.js (or similar)
 * Open the app.js file, add the correct details for the account you want to mung
 * Once configured, run `node app.js`


### Init options explained

  * *originalTwitterAccount*: The Twitter account we're copying from 
  * *translations*: The custom translation library name to translate to
  * *twitterConsumerKey*, *twitterConsumerSecret*, *twitterConsumerOauthToken* and *twitterConsumerOauthSecret*: Twitter Authorisation tokens -  [Register a new app](https://dev.twitter.com/) for these
  
## Creds

Built by Pete (@thegingerbloke), Chris (@csolar) and Dan (@danomurray) at the Lab for the Recently Possible (@L4RP) in Hove, UK, April 2012