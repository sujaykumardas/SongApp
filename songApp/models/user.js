const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

import {Song} from '../models/song';
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let userSchema = new Schema({
  name        : { 
  	type: String, 
  	required: true
  },
  password    : { 
  	type: String, 
  	required: true,  
  	minlength: 8
  },
  email       : { 
  	type: String, 
  	unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  songs       : [{ 
  	songId: { 
      type: ObjectId, 
      ref: 'Song', 
      unique: true 
    } 
  }]
});

userSchema.pre('save', function(next){
  let user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

let User = db.model('User', userSchema);

export {User};