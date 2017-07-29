const mongoose = require('mongoose');

import db from '../configurations/dbConfig';
import {User} from '../models/user';
import {Comment} from '../models/comment';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let songSchema = new Schema({
  songName      : { 
  	type: String, 
  	required: true, 
  	unique: true, 
  	minlength: 3, 
  	maxlength: 30 
  },
  description   : { 
  	type: String, 
  	required: true, 
  	minlength: 3, 
  	maxlength: 80
  },
  songPath		: { 
  	type: String, 
  	required: true 
  },
  uploadedBy    : { 
  	type: ObjectId,
    ref: 'User',
  	required: true 
  },
  likes         : [{ 
  	userId: { 
      type: ObjectId, 
      ref: 'User'
    } 
  }],
  comments : [ { 
  	commentId: { 
      type: ObjectId, 
      ref: 'Comment'
    }
  }]
});

let Song = db.model('Song', songSchema);

export {Song} ;
