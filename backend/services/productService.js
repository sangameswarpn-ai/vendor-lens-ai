const db = require('../config/db');

class ProductService {
  async getProducts() {
    const { rows } = await db.query(
      `SELECT p.id, p.name, p.description, p.price, p.sku, p.category, p.stock, p.active,
              p.vendor_id AS "vendorId", p.created_at AS "createdAt", p.updated_at AS "updatedAt",
              v.name AS "vendorName"
       FROM products p
       LEFT JOIN vendors v ON p.vendor_id = v.id
       ORDER BY p.created_at DESC`
    );
    return rows;
  }

  async getProductById(id) {
    const { rows } = await db.query(
      `SELECT p.id, p.name, p.description, p.price, p.sku, p.category, p.stock, p.active,
              p.vendor_id AS "vendorId", p.created_at AS "createdAt", p.updated_at AS "updatedAt",
              v.name AS "vendorName"
       FROM products p
       LEFT JOIN vendors v ON p.vendor_id = v.id
       WHERE p.id = $1`,
      [id]
    );
    return rows[0];
  }

  async createProduct(payload) {
    const {
      vendorId,
      name,
      description = null,
      price = 0,
      sku = null,
      category = null,
      stock = 0,
      active = true,
    } = payload;

    const { rows } = await db.query(
      `INSERT INTO products (vendor_id, name, description, price, sku, category, stock, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, vendor_id AS "vendorId", name, description, price, sku, category, stock, active,
                 created_at AS "createdAt", updated_at AS "updatedAt"`,
      [vendorId, name, description, price, sku, category, stock, active]
    );
    return rows[0];
  }

  async updateProduct(id, payload) {
    const fields = [];
    const values = [];
    let index = 1;

    const fieldMap = {
      vendorId: 'vendor_id',
      name: 'name',
      description: 'description',
      price: 'price',
      sku: 'sku',
      category: 'category',
      stock: 'stock',
      active: 'active',
    };

    Object.entries(fieldMap).forEach(([key, column]) => {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        fields.push(`${column} = $${index}`);
        values.push(payload[key]);
        index += 1;
      }
    });

    if (fields.length === 0) {
      return this.getProductById(id);
    }

    values.push(id);
    const { rows } = await db.query(
      `UPDATE products
       SET ${fields.join(', ')}, updated_at = NOW()
       WHERE id = $${index}
       RETURNING id, vendor_id AS "vendorId", name, description, price, sku, category, stock, active,
                 created_at AS "createdAt", updated_at AS "updatedAt"`,
      values
    );
    return rows[0];
  }

  async deleteProduct(id) {
    const { rows } = await db.query(
      `DELETE FROM products
       WHERE id = $1
       RETURNING id`,
      [id]
    );
    return rows[0];
  }
}

module.exports = new ProductService();
