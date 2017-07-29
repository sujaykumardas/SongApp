
import {Song} from '../models/song';
import {User} from '../models/user';
import {Comment} from '../models/comment';

export const deleteSong = (req, res) => {

  User.findByIdAndUpdate(req.user._id,{$pull: {songs: {songId: req.params.id}}}, function(err, user) {
    if(err){             
      console.log("not successful"+err);
    }
    else{           
      console.log("success comment pull");
    }         
  });

  Song.findById(req.params.id, function(err, docs)  {
    docs.comments.forEach(function(u){
      Comment.findByIdAndRemove(u.commentId,function(err, song) {
        if(err){
          console.log("err");
        }
      });
    });
  });

  Song.findByIdAndRemove(req.params.id,function(err, song) {
    if(err){      
      console.log("not successful"+err);
    }
    else{         
      res.send(JSON.stringify("deleted"));
    }         
  }); 

};
 

