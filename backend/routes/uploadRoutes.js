const express = require('express');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { uploadFile } = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected upload: requires Authorization Bearer token
router.post('/', authMiddleware, uploadMiddleware.single('file'), uploadFile);

module.exports = router;
