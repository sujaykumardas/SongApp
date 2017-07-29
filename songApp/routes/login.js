const express = require('express');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;

import * as login from '../controllers/login';
import {verifyUser} from '../configurations/passport';

router.get('/login', login.renderLogin);
router.post('/login', login.authenticate);

export {router};


