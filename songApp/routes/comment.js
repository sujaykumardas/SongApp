const express = require('express');
const router = express.Router();

import * as comment from '../controllers/comment';

router.post('/song/:id/comment', comment.addComment);

export {router};
