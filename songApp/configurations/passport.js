
const LocalStrategy = require('passport-local').Strategy;
const mongoose=require("mongoose");

import {User} from '../models/user';

export const verifyUser = (passport) => {
	passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({ name: username }, function(err, user, error) {
      if (err){
        return done(err);
      }
      if (!user){
        return done(null, false, { messages: 'Incorrect username.' });
      }
      user.comparePassword(password,function(err, isMatch, error) {
        if (isMatch){
          console.log("matched");
          return done(null, user);
        } 
        else {
          return done(null, false, { messages: 'Incorrect password.' });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {    
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id,function(err, user){      
      done(err, user);
    });
  });
}

