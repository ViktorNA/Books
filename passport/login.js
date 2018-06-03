var LocalStrategy   = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://admin:paror123@ds237620.mlab.com:37620/books2db?ReplicaSet=rs-ds237620";
const bcrypt = require('bcrypt');


module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not


						MongoClient.connect(url, function(err, client){
				          var db = client.db();
									console.log(username);
									db.collection('users').findOne({'username': username},
										function (err, user) {
											if(err){
												console.log("error " + err);
												return done(err);
											}
											if(isValidPassword)
												return done(null, user);
											else {
												console.log("error login or password");
												return done(null, false);
											}
										})
								});

        })
    );

		function isValidPassword(user, password){
        return bcrypt.compareSync(password, user.password);
    }
}
