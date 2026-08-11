const { GoogleGenerativeAI } = require('@google/generative-ai');

class AiService {
  constructor() {
    this.genAI = null;
    this.model = null;
  }

  _initializeClient() {
    if (!this.genAI && process.env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }
  }

  async analyzeVendor({ documentId = null, vendorId = null, payload = {}, createdBy = null } = {}) {
    this._initializeClient();
    
    let report;
    
    if (this.model && (payload.content || payload.name)) {
      try {
        report = await this._analyzeWithGemini(payload, vendorId, documentId);
      } catch (error) {
        console.error('Gemini AI analysis failed, using fallback:', error.message);
        report = this._generateFallbackReport(vendorId, documentId, payload);
      }
    } else {
      report = this._generateFallbackReport(vendorId, documentId, payload);
    }

    // Save to database
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

  async _analyzeWithGemini(payload, vendorId, documentId) {
    const contractContent = payload.content || `Vendor: ${payload.name}, Category: ${payload.category || 'General'}`;
    
    const prompt = `You are an expert vendor risk analyst. Analyze the following vendor contract/information and provide a comprehensive risk assessment.

Vendor Information:
${contractContent}

Respond ONLY with a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "overallRiskScore": <number 0-100, where higher = more risky>,
  "complianceScore": <number 0-100>,
  "financialRisk": <number 0-100>,
  "legalRisk": <number 0-100>,
  "cyberRisk": <number 0-100>,
  "esgRisk": <number 0-100>,
  "recommendations": [<3-5 specific, actionable recommendations as strings>],
  "flags": [<list of red flags or concerns as strings, can be empty>],
  "summary": "<2-3 sentence executive summary of the risk assessment>"
}`;

    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Parse JSON from response, handling possible markdown fences
    let cleanJson = responseText;
    if (cleanJson.startsWith('\`\`\`')) {
      cleanJson = cleanJson.replace(/^\`\`\`(?:json)?\n?/, '').replace(/\n?\`\`\`$/, '');
    }
    
    const aiResult = JSON.parse(cleanJson);
    
    return {
      vendorId,
      documentId,
      vendorName: payload.name || 'Unknown Vendor',
      category: payload.category || 'Uncategorized',
      overallRiskScore: aiResult.overallRiskScore,
      complianceScore: aiResult.complianceScore,
      financialRisk: aiResult.financialRisk,
      legalRisk: aiResult.legalRisk,
      recommendations: aiResult.recommendations,
      flags: aiResult.flags,
      summary: aiResult.summary,
      breakdown: {
        cyberRisk: aiResult.cyberRisk,
        esgRisk: aiResult.esgRisk,
        financialRisk: aiResult.financialRisk,
      },
      generatedAt: new Date().toISOString(),
      aiPowered: true,
    };
  }

  _generateFallbackReport(vendorId, documentId, payload) {
    // Keep the original mock logic as fallback
    const seedSource = String(documentId || vendorId || Date.now());
    let seed = 0;
    for (let i = 0; i < seedSource.length; i++) seed = (seed * 31 + seedSource.charCodeAt(i)) % 1000;
    const clamp = (v, min = 20, max = 95) => Math.max(min, Math.min(max, Math.round(v)));

    const overall = clamp((seed % 50) + 45);
    const compliance = clamp((seed % 30) + 60);
    const financial = clamp((seed % 40) + 50);
    const legal = clamp((seed % 35) + 40);

    return {
      vendorId,
      documentId,
      vendorName: payload.name || 'Unknown Vendor',
      category: payload.category || 'Uncategorized',
      overallRiskScore: overall,
      complianceScore: compliance,
      financialRisk: financial,
      legalRisk: legal,
      recommendations: [
        'Review vendor contract renewal terms',
        'Confirm cyber insurance coverage',
        'Clarify indemnity and liability clauses',
      ],
      flags: overall > 80 ? ['High risk: immediate review recommended'] : [],
      breakdown: {
        cyberRisk: clamp((seed % 30) + 60),
        esgRisk: clamp((seed % 25) + 50),
        financialRisk: financial,
      },
      generatedAt: new Date().toISOString(),
      aiPowered: false,
    };
  }
}

module.exports = new AiService();
