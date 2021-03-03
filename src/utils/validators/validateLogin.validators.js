const { dictionary: { error } } = require('../dictionary');

const validateEmail = (email) => {
  if (!email) throw new Error(error.allFieldsRequired);
  const regex = /^(\w)+([-_.])?(\w)+@([A-Z])+(\.com)$/i;
  const isValid = regex.test(email);
  if (!isValid) throw new Error(error.invalidCredentials);
};

module.exports = (email, password, user) => {
  validateEmail(email);
  if (!password) throw new Error(error.allFieldsRequired);
  if (!user) throw new Error(error.invalidCredentials);
  if (email !== user.email || password !== user.password) throw new Error(error.invalidCredentials);
};
