
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import {verifyUser} from '../configurations/passport';

export const renderLogin = (req, res) => {  
  	res.render('pages/login');  
};

export const authenticate = (req, res ,next) => {  
  passport.authenticate('local', function(err,user, info) {
	  if(err){
	    return next(err); 
	  }
	  if(!user) {    
	    return res.redirect('/')
	  }
	  req.logIn(user, function(err, info) {	    
	    if (err) {
	      return next(err);
	    }     
	    return res.redirect('/'); 
	  });
	})(req, res, next);	 
};



