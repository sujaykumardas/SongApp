
const mongoose = require('mongoose');

import {User} from '../models/user';
import {Song} from '../models/song';

export const setProfilePage = (req, res ,next) => {

  Song.find({uploadedBy:req.user._id},function(err, songs)  {
    if(err){
      console.log(err);
    }
    req.data=[];
    req.names=[];
    req.ids=[];
    songs.forEach(function(song){           	 
      req.data.push(song.songPath);
      req.names.push(song.songName);
      req.ids.push(song._id);      	 
    });        
    next();
  });
};

export const renderMyProfile = (req, res) => {
  res.render('pages/myprofile',{data:req.data,user:req.user,names:req.names,ids:req.ids});
};