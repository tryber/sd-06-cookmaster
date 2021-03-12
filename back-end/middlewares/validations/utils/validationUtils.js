const isFieldInexistent = (field) => {
  if (!field) return true;
  return false;
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z]+\.[a-z]+(\.[a-z]+)?$/i;
  return emailRegex.test(email);
};

const isLongEnough = (string, minLength) => string.length >= minLength;

module.exports = {
  isFieldInexistent,
  isValidEmail,
  isLongEnough,
};
