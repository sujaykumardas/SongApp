const express = require('express');
const router = express.Router();
const multer = require('multer');

import * as fileupload from '../controllers/fileupload';

router.get('/fileupload', fileupload.renderFileUpload);
router.post('/files',multer({
		storage: fileupload.storage
		}).single('userFile'), fileupload.upload);

export {router};
