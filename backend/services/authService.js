const db = require('../config/db');

class AuthService {
  async findUserByEmail(email) {
    const { rows } = await db.query(
      `SELECT id, name, email, password, role, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM users
       WHERE email = $1`,
      [email]
    );
    return rows[0];
  }

  async findUserById(id) {
    const { rows } = await db.query(
      `SELECT id, name, email, role, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM users
       WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  async createUser(payload) {
    const { name, email, password, role = 'user' } = payload;
    const { rows } = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [name, email, password, role]
    );
    return rows[0];
  }
}

module.exports = new AuthService();
