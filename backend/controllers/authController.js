const authService = require('../services/authService');
const { hashPassword, comparePassword } = require('../utils/password');
const { signToken } = require('../utils/jwt');
const logger = require('../config/logger');
const { validateRegisterInput, validateLoginInput } = require('../validators/authValidator');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const validation = validateRegisterInput({ name, email, password });

    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await authService.createUser({ name, email, password: hashedPassword });
    const token = signToken({ id: user.id });

    logger.info('User registered', { email });
    return res.status(201).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validation = validateLoginInput({ email, password });

    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = signToken({ id: user.id });

    logger.info('User logged in', { email });
    return res.status(200).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
