const express = require('express');
const router = express.Router();

import * as editsong from '../controllers/editsong';

router.put('/songs/:id', editsong.editSong);
router.get('/songs/:id', editsong.renderEditSong);

export {router};
