var LocalStrategy   = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://admin:paror@ds237620.mlab.com:37620/books2db?ReplicaSet=rs-ds237620";
const bcrypt = require('bcrypt');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username

                MongoClient.connect(url, function(err, client){
    				          var db = client.db();
    									console.log(username);
    									db.collection('users').findOne({'username': username},
    										function (err, user) {
    											if(err){
    												console.log("error " + err);
    												return done(err);
    											}
													console.log("user"+user);
    											if(user){
                            console.log('User already exists');
    												return done(null, false);
                          }
    											else {
                            let newUser = {username: username,
																					 email: req.body.email};
                            newUser.password = createHash(password);
    												db.collection('users').save(newUser)
    												return done(null, newUser);
    											}
    										})
    								});

            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

		function createHash (password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
}
