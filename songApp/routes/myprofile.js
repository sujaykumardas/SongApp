const express = require('express');
const router = express.Router();

import * as myprofile from '../controllers/myprofile';

router.get('/myprofile', myprofile.setProfilePage,myprofile.renderMyProfile);

export {router};