const { dictionary: { error } } = require('../dictionary');

const validateEmail = (email) => {
  if (!email) throw new Error(error.invalidEntries);
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);
  if (!isValid) throw new Error(error.invalidEntries);
};

module.exports = async (user, isEmailTaken) => {
  if (isEmailTaken) throw new Error(error.emailIsTaken);
  const { name, email, password } = user;
  if (!name) throw new Error(error.invalidEntries);
  if (!password) throw new Error(error.invalidEntries);
  validateEmail(email);
};