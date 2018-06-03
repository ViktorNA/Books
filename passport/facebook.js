var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('./fb.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://admin:paror123@ds237620.mlab.com:37620/books2db?ReplicaSet=rs-ds237620";

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

		// asynchronous
  		process.nextTick(function() {

			// find the user in the database based on their facebook id
        MongoClient.connect(url, function(err, client){
            var db = client.db();
            console.log(username);
            db.collection('users').findOne({'id': profile.id},
              function (err, user) {

  	        	// if there is an error, stop everything and return that
  	        	// ie an error connecting to the database
  	            if (err)
  	                return done(err);

  				// if the user is found, then log them in
  	            if (user) {
  	                return done(null, user); // user found, return that user
  	            } else {
  	                // if there is no user found with that facebook id, create them
  	                let newUser = {
                      }

  					// set all of the facebook information in our user model
      	                newUser.fb.id    = profile.id; // set the users facebook id
      	                newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user
      	                newUser.fb.firstName  = profile.name.givenName;
      	                newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
      	                newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first


  					// save our user to the database
                    db.collection('facebookUsers').save(newUser)
                    return done(null, newUser);
  	            }

	        });
        });

    })}));

};
