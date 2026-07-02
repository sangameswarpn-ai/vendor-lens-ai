const validateVendorInput = (payload = {}) => {
  const { name } = payload;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { isValid: false, message: 'Vendor name is required and must be at least 2 characters long.' };
  }

  return { isValid: true };
};

const validateVendorUpdateInput = (payload = {}) => {
  if (!payload || Object.keys(payload).length === 0) {
    return { isValid: false, message: 'At least one field is required for update.' };
  }

  return { isValid: true };
};

module.exports = { validateVendorInput, validateVendorUpdateInput };
