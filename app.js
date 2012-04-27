/*
 * Instantiate munger
 */
var munger     = require("./munger");//,
//    translator = require("./pirate");
    
    munger.init({
        consumer_key : "0wHuFLFsB8dKNI9GLMLQ",
        consumer_secret: "Nv7DVpjfPv39HMmQ79uhfNJsXrfDfhqrqufDoN9co",
		access_token_key: "564668417-KdKO7dPMDnCoxFxF1BiopPtDg9NPmudBSYk1WPnr",
		access_token_secret: "2ILCOdV5Dy7fiH5d5EigsUQwhgOtMHnUy2k00xrfy3I",
		originalTwitterAccount: "L4RP",
		mungedTwitterAccount: "yyy",
		userAgentAccount: "xxx@yyy.com",
		ignoreRetweets: true,
		translations : "pirate"
    });