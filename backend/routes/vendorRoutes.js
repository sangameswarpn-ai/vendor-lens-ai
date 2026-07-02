const express = require('express');
const { getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor } = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllVendors);
router.get('/:id', authMiddleware, getVendorById);
router.post('/', authMiddleware, createVendor);
router.put('/:id', authMiddleware, updateVendor);
router.delete('/:id', authMiddleware, deleteVendor);

module.exports = router;
