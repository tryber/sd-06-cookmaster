const isFieldInexistent = (field) => {
  if (!field) return true;
  return false;
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return emailRegex.test(email);
};

module.exports = {
  isFieldInexistent,
  isValidEmail,
};
