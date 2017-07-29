
import {Song} from '../models/song';
import {User} from '../models/user';

export const likeSong = (req, res) => {
 
  let likes;
  Song.findOneAndUpdate({_id:req.params.id},{$addToSet: {likes: {userId: (req.user._id)}}},function(err, song) {
    if(err){
      console.log("not successful"+err);
    }
    else{
      likes=song.likes.length;
      res.send(JSON.stringify(likes));
    }
  });  
};

 

