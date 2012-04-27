/*
 * Instantiate munger
 */
var munger     = require("./munger");//,
//    translator = require("./pirate");
    
    munger.init({
        consumer_key : "OkDRwz5gBGGIdMPRUS2kw",
        consumer_secret: "15toQ2udzJXdFIysbKGK959Z4Vx40lL5z7WPD1wblQ",
		access_token_key: "258811766-1rNhVMu3zvXB59d2cSceyq034EnSxHeunkdL3bo7",
		access_token_secret: "gYWGtywbWuDvMDmNTQaRNGshNcO3aryjnAqQSdmSg",
		originalTwitterAccount: "danomurray",
		mungedTwitterAccount: "yyy",
		userAgentAccount: "xxx@yyy.com",
		newTweetCount : 10,
		ignoreRetweets: true,
		translations : "pirate",
		twitterConsumerKey: "x",
		twitterConsumerSecret : "x",
		twitterConsumerOauthToken : "x",
		twitterConsumerOauthSecret : "x"
	//	translator: pirate
    });