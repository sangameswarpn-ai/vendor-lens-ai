const PDFDocument = require('pdfkit');
const db = require('../config/db');

exports.downloadLatestReport = async (req, res, next) => {
  try {
    // fetch the latest report created by this user (or overall latest if none)
    const createdBy = req.user ? req.user.id : null;
    const { rows } = await db.query(
      `SELECT id, report FROM ai_reports WHERE created_by = $1 ORDER BY created_at DESC LIMIT 1`,
      [createdBy]
    );

    if (!rows || rows.length === 0) {
      // fallback: fetch any latest report
      const fallback = await db.query(`SELECT id, report FROM ai_reports ORDER BY created_at DESC LIMIT 1`);
      if (!fallback.rows || fallback.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'No reports found' });
      }
      rows.push(fallback.rows[0]);
    }

    const report = rows[0].report;

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${report.vendorName || 'vendor'}.pdf"`);

    doc.pipe(res);

    doc.fontSize(20).text('Vendor Lens AI - Risk Report', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Vendor: ${report.vendorName || 'Unknown'}`);
    doc.text(`Generated: ${report.generatedAt || new Date().toISOString()}`);
    doc.moveDown();

    doc.fontSize(16).text('Summary', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Overall Risk Score: ${report.overallRiskScore}`);
    doc.text(`Compliance Score: ${report.complianceScore}`);
    doc.text(`Financial Risk: ${report.financialRisk}`);
    doc.text(`Legal Risk: ${report.legalRisk}`);
    doc.moveDown();

    doc.fontSize(14).text('Risk Breakdown', { underline: true });
    doc.moveDown(0.5);
    Object.entries(report.breakdown || {}).forEach(([k, v]) => {
      doc.text(`${k}: ${v}`);
    });
    doc.moveDown();

    doc.fontSize(14).text('AI Recommendations', { underline: true });
    doc.moveDown(0.5);
    (report.recommendations || []).forEach((r, i) => {
      doc.text(`${i + 1}. ${r}`);
    });
    doc.moveDown();

    doc.fontSize(14).text('Flags', { underline: true });
    doc.moveDown(0.5);
    (report.flags || []).forEach((f, i) => {
      doc.text(`${i + 1}. ${f}`);
    });

    doc.end();
  } catch (error) {
    next(error);
  }
};
