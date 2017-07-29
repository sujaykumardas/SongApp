const express = require('express');
const router = express.Router();

import * as homepage from '../controllers/homepage';

router.get('/',homepage.setHomePage, homepage.renderHomepage);

export {router};
