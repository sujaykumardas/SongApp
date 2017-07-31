
const mongoose = require('mongoose');

import {User} from '../models/user';
import {Song} from '../models/song';
import {Comment} from '../models/comment';
import {Reply} from '../models/reply';

export const setHomePage = (req, res ,next) => {

  Song.find({}, function(err, songs) {
    console.log("song print",songs);
    if(err){
      console.log(err);
    }
    req.data=[];
    req.songNames=[];
    req.songId=[];
    req.comments=[];
    req.likes=[];
    req.reply=[];

    Comment.find({}, function(err, comm_arr) {
      if(err){
        console.log(err);
      }
      else{
        console.log("comments",comm_arr);
        if(comm_arr.length>0){
    //let i=0;
          comm_arr.forEach(function(u, index)  {
            console.log(u.comment,index);
            req.reply[index]={};
            req.reply[index].key=u.comment;
            Reply.find({repliedOnComment:u._id}, function(err, reps){
              if(err){
                console.log(err);
              }
              else{              
                req.reply[index].value=reps;
                
                console.log("rep",index,req.reply);
               
                songs.forEach(function(song){             
             	    req.data.push(song.songPath);
                  req.songNames.push(song.songName);
             	    req.songId.push(song._id);
                  req.likes.push(song.likes.length);             
                  if(typeof song.comments !== 'undefined'){                
                    req.comments.push(song.comments);
                  }
                });
                //next();
                if(comm_arr.length==0){
                  next();
                }
                else if(index+1 === comm_arr.length){
                  next();
                }
                
              }
            });
            //i++;
          });
        }
      }
    });
       
  }).populate('comments.commentId');
};

export const renderHomepage = (req, res) => {    
    res.render('pages/homepage',{data:req.data, user:req.user, names:req.songNames, ids:req.songId, comments:req.comments, likes:req.likes, replies:req.reply});
};