#!/usr/bin/env node

/**
 * VendorLens AI - Production Deployment Verification
 * 
 * This script verifies that your deployed backend is working correctly
 * 
 * Usage:
 *   node verify-deployment.js [BACKEND_URL]
 * 
 * Example:
 *   node verify-deployment.js https://vendor-lens-backend.onrender.com
 */

const http = require('http');
const https = require('https');

const backendUrl = process.argv[2] || 'http://localhost:5000';

const tests = [];
let passed = 0;
let failed = 0;

// Helper function to make HTTP requests
function makeRequest(url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      const bodyStr = JSON.stringify(body);
      options.headers['Content-Length'] = bodyStr.length;
    }

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Test 1: Health Check
async function testHealthEndpoint() {
  try {
    const response = await makeRequest(`${backendUrl}/health`);
    if (response.status === 200 && response.body?.success) {
      tests.push({ name: '✅ Health Endpoint', status: 'PASS' });
      passed++;
    } else {
      tests.push({
        name: '❌ Health Endpoint',
        status: 'FAIL',
        details: `Got status ${response.status}`,
      });
      failed++;
    }
  } catch (error) {
    tests.push({
      name: '❌ Health Endpoint',
      status: 'FAIL',
      details: error.message,
    });
    failed++;
  }
}

// Test 2: Root Endpoint
async function testRootEndpoint() {
  try {
    const response = await makeRequest(`${backendUrl}/`);
    if (response.status === 200 && response.body?.success) {
      tests.push({ name: '✅ Root Endpoint', status: 'PASS' });
      passed++;
    } else {
      tests.push({
        name: '❌ Root Endpoint',
        status: 'FAIL',
        details: `Got status ${response.status}`,
      });
      failed++;
    }
  } catch (error) {
    tests.push({
      name: '❌ Root Endpoint',
      status: 'FAIL',
      details: error.message,
    });
    failed++;
  }
}

// Test 3: Registration Endpoint
async function testRegistration() {
  try {
    const testUser = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      password: 'Test123456!',
    };

    const response = await makeRequest(`${backendUrl}/api/auth/register`, 'POST', testUser);

    if (response.status === 201 && response.body?.success && response.body?.token) {
      tests.push({ name: '✅ User Registration', status: 'PASS' });
      passed++;
      // Store token for login test
      window.testToken = response.body.token;
      window.testEmail = testUser.email;
      window.testPassword = testUser.password;
    } else {
      tests.push({
        name: '❌ User Registration',
        status: 'FAIL',
        details: response.body?.message || `Got status ${response.status}`,
      });
      failed++;
    }
  } catch (error) {
    tests.push({
      name: '❌ User Registration',
      status: 'FAIL',
      details: error.message,
    });
    failed++;
  }
}

// Test 4: Login Endpoint
async function testLogin() {
  try {
    if (!window.testEmail || !window.testPassword) {
      tests.push({
        name: '⊘ Login Test',
        status: 'SKIP',
        details: 'Skipped because registration failed',
      });
      return;
    }

    const response = await makeRequest(`${backendUrl}/api/auth/login`, 'POST', {
      email: window.testEmail,
      password: window.testPassword,
    });

    if (response.status === 200 && response.body?.success && response.body?.token) {
      tests.push({ name: '✅ User Login', status: 'PASS' });
      passed++;
    } else {
      tests.push({
        name: '❌ User Login',
        status: 'FAIL',
        details: response.body?.message || `Got status ${response.status}`,
      });
      failed++;
    }
  } catch (error) {
    tests.push({
      name: '❌ User Login',
      status: 'FAIL',
      details: error.message,
    });
    failed++;
  }
}

// Test 5: CORS Headers
async function testCorsHeaders() {
  try {
    const response = await makeRequest(`${backendUrl}/health`);
    const hasAccessControlOrigin = response.headers['access-control-allow-origin'];
    const hasAccessControlMethods = response.headers['access-control-allow-methods'];

    if (hasAccessControlOrigin && hasAccessControlMethods) {
      tests.push({
        name: '✅ CORS Configuration',
        status: 'PASS',
        details: `CORS Origin: ${hasAccessControlOrigin}`,
      });
      passed++;
    } else {
      tests.push({
        name: '⚠️  CORS Configuration',
        status: 'WARN',
        details: 'CORS headers not found',
      });
    }
  } catch (error) {
    tests.push({
      name: '❌ CORS Check',
      status: 'FAIL',
      details: error.message,
    });
    failed++;
  }
}

// Test 6: Protected Routes
async function testProtectedRoutes() {
  try {
    // Try accessing without token
    const response = await makeRequest(`${backendUrl}/api/vendors`);

    if (response.status === 401) {
      tests.push({
        name: '✅ Protected Routes',
        status: 'PASS',
        details: 'Correctly requires authentication',
      });
      passed++;
    } else {
      tests.push({
        name: '⚠️  Protected Routes',
        status: 'WARN',
        details: `Expected 401, got ${response.status}`,
      });
    }
  } catch (error) {
    tests.push({
      name: '❌ Protected Routes',
      status: 'FAIL',
      details: error.message,
    });
    failed++;
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n🚀 VendorLens AI - Production Deployment Verification\n');
  console.log(`Backend URL: ${backendUrl}\n`);
  console.log('Running tests...\n');

  // Make window object for storing state
  window = {};

  await testHealthEndpoint();
  await testRootEndpoint();
  await testRegistration();
  await testLogin();
  await testCorsHeaders();
  await testProtectedRoutes();

  // Print results
  console.log('═══════════════════════════════════════════════════════\n');
  tests.forEach((test) => {
    console.log(`${test.name}`);
    if (test.details) {
      console.log(`   └─ ${test.details}`);
    }
  });
  console.log('\n═══════════════════════════════════════════════════════\n');

  console.log(`Results: ${passed} passed, ${failed} failed\n`);

  if (failed === 0) {
    console.log('✅ All tests passed! Your backend is ready for production.\n');
    process.exit(0);
  } else {
    console.log(
      '❌ Some tests failed. Please check your deployment configuration.\n'
    );
    process.exit(1);
  }
}

// Run tests
runAllTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
