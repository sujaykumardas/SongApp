const express = require('express');
const router = express.Router();

import * as unlike from '../controllers/unlike';

router.put('/song/:id/unlike', unlike.unlikeSong);

export {router};
