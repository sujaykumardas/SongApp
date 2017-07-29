
import {Song} from '../models/song';
import {User} from '../models/user';
import {Comment} from '../models/comment';
import {Reply} from '../models/reply';

export const replyComment = (req, res) => {

  let newReply = new Reply({
    reply             : req.body.reply,
    repliedOnComment  : req.params.id2,
    repliedByName     : req.user.name,
    replyDate	        : Date.now()
  });

  newReply.save(function(err,reply) {    
    if(err) {      
      res.redirect('/');
      return console.error(err);
    }
    else {    
      console.log('new reply added :' + req.body.reply);
      console.log("success");
    }
  });
  res.redirect('/');

};























