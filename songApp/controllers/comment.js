
import {Song} from '../models/song';
import {User} from '../models/user';
import {Comment} from '../models/comment';

export const addComment = (req, res) => {
  
  let newComment = new Comment({
    comment: req.body.comment,
    commentedBy: req.user._id,
    commentedByName: req.user.name,
    commentDate: Date.now()
  });

  newComment.save(function(err,comment){
    if(err){
      res.redirect('/');
      return console.error(err);
    }
    else {
      console.log('new comment added :' + req.body.comment);
      
      Song.findByIdAndUpdate(req.params.id,{$push: {comments: {commentId: comment._id}}},function(err, song) {
        if(err){
          console.log("not successful"+err);
        }
        else{
          console.log("success comment push");
        }    
      });
    res.redirect('/');
    }
  });
};
 






