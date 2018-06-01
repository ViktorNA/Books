const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
      username: String,
      password: String
    });
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

const LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport){
  passport.use('login', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
        UserDetails.findOne({
          username: username
        }, function(err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (user.password != password) {
            return done(null, false);
          }
          return done(null, user);
        });
    }
  ));
}
