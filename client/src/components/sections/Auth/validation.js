// client/src/components/sections/Auth/validation.js

export const validateText = (text, minLength = 1) => {
  return typeof text === 'string' && text.trim().length >= minLength;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/; // Exactly 10 digits
  return re.test(String(phone));
};

export const validatePassword = (password) => {
  // Min 8 chars, at least 1 letter and 1 number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(String(password));
};

export const validatePrice = (price) => {
  const num = Number(price);
  return !isNaN(num) && num > 0;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};