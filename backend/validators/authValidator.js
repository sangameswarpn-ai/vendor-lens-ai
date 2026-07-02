const validateRegisterInput = ({ name, email, password }) => {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { isValid: false, message: 'Please provide a valid email address.' };
  }

  if (!password || password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long.' };
  }

  return { isValid: true };
};

const validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    return { isValid: false, message: 'Email and password are required.' };
  }

  return { isValid: true };
};

module.exports = { validateRegisterInput, validateLoginInput };
