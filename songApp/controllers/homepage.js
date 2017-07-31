
const mongoose = require('mongoose');

import {User} from '../models/user';
import {Song} from '../models/song';
import {Comment} from '../models/comment';
import {Reply} from '../models/reply';

export const setHomePage = (req, res ,next) => {

  Song.find({}, function(err, songs) {
    console.log("homepage",req.user);
    if(err){
      console.log(err);
    }
    req.i=0;
    req.data=[];
    req.songNames=[];
    req.songId=[];
    req.comments=[];
    req.likes=[];
    let reply=[];
    let i=0;

    songs.forEach(function(song,sindex){             
      req.data.push(song.songPath);
      req.songNames.push(song.songName);
      req.songId.push(song._id);
      req.likes.push(song.likes.length);             
      if(typeof song.comments !== 'undefined'){                
        req.comments.push(song.comments);        
        song.comments.forEach(function(com,cindex){
          //console.log(com.commentId.comment);
          reply[i]={};
          reply[i].key=com.commentId.comment;
          console.log(reply[i].key);
          Reply.find({repliedOnComment:com.commentId}, function(err, reps) {
            console.log("i",i);
            reply[i].value=reps;
            console.log("reply",reps);
          });
          i++;
        });
        console.log(song.comments,sindex);
      }
    });
    //if()
    console.log("replies",reply);
      next();
                
  }).populate('comments.commentId');
};

export const renderHomepage = (req, res) => {    
    res.render('pages/homepage',{data:req.data, user:req.user, names:req.songNames, ids:req.songId, comments:req.comments, likes:req.likes});//, replies:req.reply});
};