const mongoose = require('mongoose');

import db from '../configurations/dbConfig';
import {Comment} from '../models/comment';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
let replySchema = new Schema({
  reply       : { 
  	type: String , 
  	minlength: 3, 
  	maxlength: 30
  },
  repliedOnComment   : { 
  	type : ObjectId,
    ref : 'Comment'
  },
  repliedByName   : { 
    type : String
    
  },
  replyDate	: { 
  	type: Date, 
  	default: Date.now 
  }
});

let Reply = db.model('Reply', replySchema);

export {Reply} ;