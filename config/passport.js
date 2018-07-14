const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretorkey;

module.exports = passport =>{
  passport.use(
    new JwtStratergy(opts,(jwt_payload,done) => {
      User.findById(jwt_payload.id)
      .then(user=>{
        if(user){
          return done(null,user);
        }
        return done(null,null);
      })
      .catch(err => console.log(err));
    })
  )
}