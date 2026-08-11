const db = require('../config/db');

class VendorService {
  async getAllVendors(userId) {
    const { rows } = await db.query(
      `SELECT id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM vendors
       WHERE created_by = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  }

  async getVendorById(id, userId) {
    const { rows } = await db.query(
      `SELECT id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM vendors
       WHERE id = $1 AND created_by = $2`,
      [id, userId]
    );
    return rows[0];
  }

  async createVendor(payload, userId) {
    const {
      name,
      category = null,
      contactEmail = null,
      phone = null,
      address = null,
      rating = 0,
      notes = null,
    } = payload;

    const { rows } = await db.query(
      `INSERT INTO vendors (name, category, contact_email, phone, address, rating, notes, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [name, category, contactEmail, phone, address, rating, notes, userId]
    );

    return rows[0];
  }

  async updateVendor(id, payload, userId) {
    const allowedFields = {
      name: 'name',
      category: 'category',
      contactEmail: 'contact_email',
      phone: 'phone',
      address: 'address',
      rating: 'rating',
      notes: 'notes',
    };

    const patches = [];
    const values = [];
    let index = 1;

    Object.entries(allowedFields).forEach(([key, column]) => {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        patches.push(`${column} = $${index}`);
        values.push(payload[key]);
        index += 1;
      }
    });

    if (patches.length === 0) {
      return this.getVendorById(id, userId);
    }

    values.push(id, userId);
    const { rows } = await db.query(
      `UPDATE vendors
       SET ${patches.join(', ')}, updated_at = NOW()
       WHERE id = $${index} AND created_by = $${index + 1}
       RETURNING id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"`,
      values
    );

    return rows[0];
  }

  async deleteVendor(id, userId) {
    const { rows } = await db.query(
      `DELETE FROM vendors
       WHERE id = $1 AND created_by = $2
       RETURNING id`,
      [id, userId]
    );
    return rows[0];
  }
}

module.exports = new VendorService();
