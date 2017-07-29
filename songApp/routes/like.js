const express = require('express');
const router = express.Router();

import * as like from '../controllers/like';

router.put('/song/:id/like', like.likeSong);

export {router};
