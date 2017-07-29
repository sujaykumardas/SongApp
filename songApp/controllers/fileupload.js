const multer  = require('multer');
const path = require('path')

import {Song} from '../models/song';
import {User} from '../models/user';

export const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/uploads')
	},
	filename: function(req, file, callback){		
		callback(null, req.body.songName + path.extname(file.originalname))
	}
})

export const upload = (req, res) => {
  
  let newSong = new Song({
    songName    : req.body.songName,
    description : req.body.description,
    songPath    : '/uploads/'+req.body.songName+'.mp3',
    uploadedBy  : req.user._id,
    comments	  : []
  });
  newSong.save(function(err,song) {
    if(err) {      
      res.redirect('/fileupload');
      return console.error(err);
    }
    else {      
      console.log('new song uploaded :' + req.body.songName);
      console.log("success");
      User.findByIdAndUpdate(req.user._id,{$push: {songs: {songId: song._id}}},function (err, song) {
           if(err){            
            console.log("not successful"+err);
           }
           else{            
            console.log("success");
           }      
        
      });
      res.redirect('/myprofile');
    }
  });
  
}; 

export const renderFileUpload = (req, res) => { 
  res.render('pages/fileupload',{user:req.user});  
};


