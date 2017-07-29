
import {User} from '../models/user';

export const signup = (req, res)=> {

  let newUser = new User({
    name        : req.body.name,
    email       : req.body.email,
    password    : req.body.password,
    song        : []
  });

  newUser.save(function(err) {
    if(err) {      
      res.status(400).send('Invalid signup request.Please try again.<br><a href="/signup">Signup</a>');
      return console.error(err);
    }
    else {
      console.log('new user created :' + req.body.name);
      console.log("success");
    }
  });  
  res.redirect('/');
};

export const renderSignup = (req, res) => {  
  res.render('pages/signup'); 
};
