const express = require('express');
const router = express.Router();

import * as deletesong from '../controllers/deletesong';

router.delete('/songs/:id', deletesong.deleteSong);

export {router};
