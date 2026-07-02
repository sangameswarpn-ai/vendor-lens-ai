const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const formatMessage = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${payload}`;
};

const writeLog = (level, message, meta = null) => {
  const entry = formatMessage(level, message, meta);
  console.log(entry);
  fs.appendFileSync(path.join(logDir, 'app.log'), `${entry}\n`);
};

const logger = {
  info: (message, meta) => writeLog('info', message, meta),
  warn: (message, meta) => writeLog('warn', message, meta),
  error: (message, meta) => writeLog('error', message, meta),
  debug: (message, meta) => writeLog('debug', message, meta),
};

module.exports = logger;
