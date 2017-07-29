
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passwordHash = require("password-hash");
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const passport = require('passport');

import redirectUser from './songApp/middlewares/redirectToLogin';
import { router as loginPath } from './songApp/routes/login';
import { router as signupPath } from './songApp/routes/signup';
import { router as homepagePath } from './songApp/routes/homepage';
import { router as uploadPath } from './songApp/routes/fileupload';
import { router as logoutPath } from './songApp/routes/logout';
import { router as profilePath } from './songApp/routes/myprofile';
import { router as commentPath } from './songApp/routes/comment';
import { router as likePath } from './songApp/routes/like';
import { router as unlikePath } from './songApp/routes/unlike';
import { router as replyPath } from './songApp/routes/reply';
import { router as deleteSongPath } from './songApp/routes/deletesong';
import { router as editSongPath } from './songApp/routes/editsong';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'sujay das',
				  resave: false,
  				  saveUninitialized: false
  				}));
app.use(passport.initialize());
app.use(passport.session());

import {verifyUser} from './songApp/configurations/passport';
verifyUser(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/songApp/views'));
app.set('port', (process.env.PORT || 5000));
app.use(redirectUser);
app.use(loginPath);
app.use(signupPath);
app.use(homepagePath);
app.use(profilePath);
app.use(uploadPath);
app.use(commentPath);
app.use(likePath);
app.use(unlikePath);
app.use(logoutPath);
app.use(replyPath);
app.use(deleteSongPath);
app.use(editSongPath);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});