const validateProductInput = (payload = {}) => {
  const { vendorId, name, price, stock, active } = payload;

  if (!vendorId || Number.isNaN(Number(vendorId))) {
    return { isValid: false, message: 'Valid vendorId is required.' };
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { isValid: false, message: 'Product name must be at least 2 characters long.' };
  }

  if (price === undefined || Number.isNaN(Number(price)) || Number(price) < 0) {
    return { isValid: false, message: 'Price must be a valid non-negative number.' };
  }

  if (stock !== undefined && (Number.isNaN(Number(stock)) || Number(stock) < 0)) {
    return { isValid: false, message: 'Stock must be a valid non-negative integer.' };
  }

  if (active !== undefined && typeof active !== 'boolean') {
    return { isValid: false, message: 'Active must be a boolean value.' };
  }

  return { isValid: true };
};

const validateProductUpdateInput = (payload = {}) => {
  if (!payload || Object.keys(payload).length === 0) {
    return { isValid: false, message: 'At least one field is required for update.' };
  }

  if (payload.price !== undefined && (Number.isNaN(Number(payload.price)) || Number(payload.price) < 0)) {
    return { isValid: false, message: 'Price must be a valid non-negative number.' };
  }

  if (payload.stock !== undefined && (Number.isNaN(Number(payload.stock)) || Number(payload.stock) < 0)) {
    return { isValid: false, message: 'Stock must be a valid non-negative integer.' };
  }

  if (payload.active !== undefined && typeof payload.active !== 'boolean') {
    return { isValid: false, message: 'Active must be a boolean value.' };
  }

  return { isValid: true };
};

module.exports = { validateProductInput, validateProductUpdateInput };
