const logger = require('../config/logger');

const errorMiddleware = (err, req, res, next) => {
  logger.error('Unhandled error', err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
