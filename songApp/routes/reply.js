const express = require('express');
const router = express.Router();

import * as reply from '../controllers/reply';

router.post('/song/:id1/comments/:id2/reply', reply.replyComment);

export {router};
