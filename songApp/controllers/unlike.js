
import {Song} from '../models/song';
import {User} from '../models/user';

export const unlikeSong = (req, res) => {
 
  Song.findByIdAndUpdate(req.params.id,{$pull: {likes: {userId: req.user._id}}},function(err, docs){
    if(err){      
      console.log("not successful"+err);
    }
    else{        
      res.send("unliked");
    }        
  });               
};
 

