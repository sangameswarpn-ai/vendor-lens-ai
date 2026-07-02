class AiService {
  async analyzeVendor({ documentId = null, vendorId = null, payload = {}, createdBy = null } = {}) {
    // Generate a mock analysis. If an actual AI integration exists, replace this.
    // Use simple seeded randomness based on documentId or vendorId to make results stable-ish.
    const seedSource = String(documentId || vendorId || Date.now());
    let seed = 0;
    for (let i = 0; i < seedSource.length; i++) seed = (seed * 31 + seedSource.charCodeAt(i)) % 1000;

    const clamp = (v, min = 20, max = 95) => Math.max(min, Math.min(max, Math.round(v)));

    const overall = clamp((seed % 50) + 45);
    const compliance = clamp((seed % 30) + 60);
    const financial = clamp((seed % 40) + 50);
    const legal = clamp((seed % 35) + 40);

    const recommendations = [
      'Review vendor contract renewal terms',
      'Confirm cyber insurance coverage',
      'Clarify indemnity and liability clauses',
    ].slice(0, 3);

    const flags = [];
    if (overall > 80) flags.push('High risk: immediate review recommended');
    if (compliance < 70) flags.push('Compliance gaps identified');
    if (financial < 60) flags.push('Financial stress indicators');

    const report = {
      vendorId,
      documentId,
      vendorName: payload.name || 'Unknown Vendor',
      category: payload.category || 'Uncategorized',
      overallRiskScore: overall,
      complianceScore: compliance,
      financialRisk: financial,
      legalRisk: legal,
      recommendations,
      flags,
      breakdown: {
        cyberRisk: clamp((seed % 30) + 60),
        esgRisk: clamp((seed % 25) + 50),
        financialRisk: financial,
      },
      generatedAt: new Date().toISOString(),
    };

    const db = require('../config/db');
    try {
      if (vendorId) {
        const { rows } = await db.query(
          `INSERT INTO ai_reports (vendor_id, report, created_by)
           VALUES ($1, $2::jsonb, $3)
           RETURNING id, created_at AS "createdAt"`,
          [vendorId, report, createdBy]
        );
        report.id = rows[0].id;
        report.createdAt = rows[0].createdAt;
      }
    } catch (e) {
      // If DB write fails, still return the report
    }

    return report;
  }
}

module.exports = new AiService();
