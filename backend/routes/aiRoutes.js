const express = require('express');
const { analyzeVendor } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/analyze', authMiddleware, analyzeVendor);

module.exports = router;
