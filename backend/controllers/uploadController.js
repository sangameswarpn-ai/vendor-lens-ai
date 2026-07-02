const db = require("../config/db");
const vendorService = require("../services/vendorService");

exports.uploadFile = async (req, res, next) => {
  try {
    console.log("========== UPLOAD REQUEST ==========");
    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    console.log("====================================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const vendorId = Number(req.body.vendorId);
    if (!vendorId || Number.isNaN(vendorId)) {
      return res.status(400).json({
        success: false,
        message: 'vendorId is required and must be a valid number.',
      });
    }

    const vendor = await vendorService.getVendorById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found.',
      });
    }

    const originalName = req.file.originalname;
    const filename = req.file.filename;
    const mimeType = req.file.mimetype;
    const size = req.file.size;
    const uploadedBy = req.user.id;

    const { rows } = await db.query(
      `INSERT INTO vendor_documents
      (vendor_id, filename, original_name, mime_type, size, uploaded_by)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING
        id,
        vendor_id,
        filename,
        original_name AS "originalName",
        mime_type AS "mimeType",
        size,
        uploaded_by,
        uploaded_at AS "uploadedAt"`,
      [
        vendorId,
        filename,
        originalName,
        mimeType,
        size,
        uploadedBy,
      ]
    );

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    next(error);
  }
};