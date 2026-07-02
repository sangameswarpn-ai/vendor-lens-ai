const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { downloadLatestReport } = require('../controllers/reportController');

const router = express.Router();

// Protected: download latest report for authenticated user
router.get('/latest', authMiddleware, downloadLatestReport);

module.exports = router;
