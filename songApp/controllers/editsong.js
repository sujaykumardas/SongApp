
import {Song} from '../models/song';
import {User} from '../models/user';

export const renderEditSong = (req, res) => {
 
  Song.findById(req.params.id,function(err, song)  {
    if(err){
      console.log("not successful"+err);
    }
    else{            
      res.render('pages/editsong',{song:docs,user:req.user}); 
    }        
  });   
};

export const editSong = (req, res) => {
  
  Song.findByIdAndUpdate(req.params.id,{ $set: { songName: req.body.name, description: req.body.description}}, function(err, song) {
    if(err){
      console.log("not successful"+err);
    }
    else{            
      console.log("success ");     
    }        
  });   
  res.redirect(200,'/myprofile');  
};
 

