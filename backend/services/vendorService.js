const db = require('../config/db');

class VendorService {
  async getAllVendors() {
    const { rows } = await db.query(
      `SELECT id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM vendors
       ORDER BY created_at DESC`
    );
    return rows;
  }

  async getVendorById(id) {
    const { rows } = await db.query(
      `SELECT id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM vendors
       WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  async createVendor(payload) {
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
      `INSERT INTO vendors (name, category, contact_email, phone, address, rating, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [name, category, contactEmail, phone, address, rating, notes]
    );

    return rows[0];
  }

  async updateVendor(id, payload) {
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
      return this.getVendorById(id);
    }

    values.push(id);
    const { rows } = await db.query(
      `UPDATE vendors
       SET ${patches.join(', ')}, updated_at = NOW()
       WHERE id = $${index}
       RETURNING id, name, category, contact_email AS "contactEmail", phone, address, rating, notes, created_at AS "createdAt", updated_at AS "updatedAt"`,
      values
    );

    return rows[0];
  }

  async deleteVendor(id) {
    const { rows } = await db.query(
      `DELETE FROM vendors
       WHERE id = $1
       RETURNING id`,
      [id]
    );
    return rows[0];
  }
}

module.exports = new VendorService();
