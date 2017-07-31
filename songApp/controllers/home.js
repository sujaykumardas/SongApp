
const mongoose = require('mongoose');

import {User} from '../models/user';
import {Song} from '../models/song';
import {Comment} from '../models/comment';
import {Reply} from '../models/reply';

export const setHomePage = (req, res ,next) => {
  req.reply=[];
  req.i=0;
  let reply=[];
  Comment.find({}, function(err, comm_arr) {
    if(err){
      console.log(err);
    }
    else{
      //console.log("comments",comm_arr);
      if(comm_arr.length>0){
        comm_arr.forEach(function(com, index)  {
          //if(req.reply[req.i]){
          reply[index].key=com.comment;

          Reply.find({repliedOnComment:com._id}, function(err, reps){
            if(err){
              console.log(err);
            }
            else{              
              if(reply[index]){
              console.log("rep",com.comment,reps);
                reply[index].value=reps;
              }
              console.log("replies",req.reply);
            }
          });
        //}
          
        });
      }
    }
  });

  Song.find({}, function(err, songs) {
    console.log("homepage",req.user);
    if(err){
      console.log(err);
    }
    
    req.data=[];
    req.songNames=[];
    req.songId=[];
    req.comments=[];
    req.likes=[];
    
    songs.forEach(function(song){             
      req.data.push(song.songPath);
      req.songNames.push(song.songName);
      req.songId.push(song._id);
      req.likes.push(song.likes.length);             
      if(typeof song.comments !== 'undefined'){                
        req.comments.push(song.comments);
      }
    });
    next();
    
               
                
  }).populate('comments.commentId');
};

export const renderHomepage = (req, res) => {    
    res.render('pages/homepage',{data:req.data, user:req.user, names:req.songNames, ids:req.songId, comments:req.comments, likes:req.likes});//, replies:req.reply});
};