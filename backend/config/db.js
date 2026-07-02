const dotenv = require('dotenv');
const { Pool } = require('pg');
const path = require('path');
const logger = require('./logger');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  const error = new Error('DATABASE_URL environment variable is required');
  logger.error(error.message);
  throw error;
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ PostgreSQL Connected');
    logger.info('PostgreSQL connected successfully');
    return pool;
  } catch (error) {
    console.error(error);
    logger.error('PostgreSQL connection failed', error);
    throw error;
  }
};

const query = (text, params) => pool.query(text, params);

module.exports = { connectDB, query, pool };
