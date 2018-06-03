var login = require('./login');
var signup = require('./signup');
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://admin:paror123@ds237620.mlab.com:37620/books2db?ReplicaSet=rs-ds237620";

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
      MongoClient.connect(url, function(err, client){
            var db = client.db('books2db');
            db.collection('users').findOne({_id: ObjectId(id)},
              function (err, user) {
                console.log('deserializing user:',user);
                return done(null, user);
              })
          });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport)

}
