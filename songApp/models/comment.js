const mongoose = require('mongoose');

import db from '../configurations/dbConfig';
import {User} from '../models/user';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let commentSchema = new Schema({
  comment       : { 
  	type: String , 
  	minlength: 3, 
  	maxlength: 30
  },
  commentedBy   : { 
  	type : ObjectId,
    ref : 'User' 
  },
  commentedByName  : { 
    type : String
  },
  commentDate	: { 
  	type: Date, 
  	default: Date.now 
  }
});

let Comment = db.model('Comment', commentSchema);

export {Comment} ;