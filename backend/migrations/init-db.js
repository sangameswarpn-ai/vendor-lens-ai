#!/usr/bin/env node

/**
 * Database Initialization Script
 * Run this once to set up the PostgreSQL schema for VendorLens AI
 * 
 * Usage:
 *   node migrations/init-db.js
 * 
 * Requirements:
 *   - PostgreSQL must be running
 *   - DATABASE_URL must be set in backend/.env
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { pool } = require('../config/db');

const initDatabase = async () => {
  try {
    console.log('🔧 Initializing VendorLens AI Database...\n');

    // Read schema file
    const schemaPath = path.resolve(__dirname, '../sql/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    console.log('📝 Executing schema...');
    await pool.query(schema);

    console.log('✅ Database initialized successfully!\n');
    console.log('Tables created:');
    console.log('  - users');
    console.log('  - vendors');
    console.log('  - products');
    console.log('  - vendor_documents');
    console.log('  - risk_assessments');
    console.log('  - ai_reports\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:\n', error.message);
    console.error('\nMake sure:');
    console.error('  1. PostgreSQL is running');
    console.error('  2. DATABASE_URL in backend/.env is correct');
    console.error('  3. You have permission to create tables\n');
    process.exit(1);
  }
};

initDatabase();
