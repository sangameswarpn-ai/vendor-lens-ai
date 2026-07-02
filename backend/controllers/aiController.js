const aiService = require('../services/aiService');

exports.analyzeVendor = async (req, res, next) => {
  try {
    const { documentId = null, vendorId = null } = req.body || {};
    const payload = req.body || {};
    const report = await aiService.analyzeVendor({
      documentId,
      vendorId,
      payload,
      createdBy: req.user?.id || null,
    });
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};
