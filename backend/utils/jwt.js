const jwt = require('jsonwebtoken');

const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
});

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');

module.exports = { signToken, verifyToken };
