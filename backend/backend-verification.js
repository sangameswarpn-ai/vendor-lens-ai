const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const base = 'http://localhost:5000/api';
const uploadDir = path.join(__dirname, 'upload');

const printResult = (label, status, body) => {
  console.log(`\n=== ${label} ===`);
  console.log(`Status: ${status}`);
  console.log(JSON.stringify(body, null, 2));
};

const run = async () => {
  const unique = Date.now();
  const email = `testuser${unique}@example.com`;
  let token;
  let vendorId;
  let productId;

  const makeJson = async (res) => {
    try {
      return await res.data;
    } catch {
      return res.data || null;
    }
  };

  const registerRes = await axios.post(`${base}/auth/register`, {
    name: 'Test User',
    email,
    password: 'password123',
  });
  printResult('REGISTER', registerRes.status, registerRes.data);

  const loginRes = await axios.post(`${base}/auth/login`, {
    email,
    password: 'password123',
  });
  printResult('LOGIN', loginRes.status, loginRes.data);
  token = loginRes.data.token;
  if (!token) throw new Error('Login did not return a token');

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const vendorCreateRes = await axios.post(`${base}/vendors`, {
    name: 'Test Vendor',
    category: 'Retail',
  }, { headers: authHeaders });
  printResult('VENDOR_CREATE', vendorCreateRes.status, vendorCreateRes.data);
  vendorId = vendorCreateRes.data.data?.id;
  if (!vendorId) throw new Error('Vendor creation failed');

  const vendorListRes = await axios.get(`${base}/vendors`, { headers: { Authorization: `Bearer ${token}` } });
  printResult('VENDOR_LIST', vendorListRes.status, vendorListRes.data);

  const vendorGetRes = await axios.get(`${base}/vendors/${vendorId}`, { headers: { Authorization: `Bearer ${token}` } });
  printResult('VENDOR_GET', vendorGetRes.status, vendorGetRes.data);

  const productCreateRes = await axios.post(`${base}/products`, {
    vendorId,
    name: 'Test Product',
    price: 9.99,
    stock: 10,
    active: true,
  }, { headers: authHeaders });
  printResult('PRODUCT_CREATE', productCreateRes.status, productCreateRes.data);
  productId = productCreateRes.data.data?.id;
  if (!productId) throw new Error('Product creation failed');

  const productListRes = await axios.get(`${base}/products`, { headers: { Authorization: `Bearer ${token}` } });
  printResult('PRODUCT_LIST', productListRes.status, productListRes.data);

  const productGetRes = await axios.get(`${base}/products/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
  printResult('PRODUCT_GET', productGetRes.status, productGetRes.data);

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const uploadFilePath = path.join(uploadDir, 'test-upload.png');
  const imageBytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn0B9WXQKAAAAABJRU5ErkJggg==', 'base64');
  fs.writeFileSync(uploadFilePath, imageBytes);

  const formData = new FormData();
  formData.append('file', fs.createReadStream(uploadFilePath));
  const uploadRes = await axios.post(`${base}/uploads`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...formData.getHeaders(),
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  printResult('UPLOAD', uploadRes.status, uploadRes.data);

  const aiRes = await axios.post(`${base}/ai/analyze`, {
    name: 'Test Vendor',
    category: 'Retail',
    notes: 'All good.',
  }, { headers: authHeaders });
  printResult('AI_ANALYZE', aiRes.status, aiRes.data);

  const vendorUpdateRes = await axios.put(`${base}/vendors/${vendorId}`, {
    notes: 'Updated note',
  }, { headers: authHeaders });
  printResult('VENDOR_UPDATE', vendorUpdateRes.status, vendorUpdateRes.data);

  const productUpdateRes = await axios.put(`${base}/products/${productId}`, {
    price: 19.99,
  }, { headers: authHeaders });
  printResult('PRODUCT_UPDATE', productUpdateRes.status, productUpdateRes.data);

  const productDeleteRes = await axios.delete(`${base}/products/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
  printResult('PRODUCT_DELETE', productDeleteRes.status, productDeleteRes.data);

  const vendorDeleteRes = await axios.delete(`${base}/vendors/${vendorId}`, { headers: { Authorization: `Bearer ${token}` } });
  printResult('VENDOR_DELETE', vendorDeleteRes.status, vendorDeleteRes.data);

  console.log('\nBackend verification finished successfully.');
};

run().catch((error) => {
  console.error('Verification failed:', error.message);
  process.exit(1);
});
