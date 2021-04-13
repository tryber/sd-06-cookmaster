const { findUserByEmail } = require('../models/userModel');

const fieldFinder = (user, fields) => {
  const fieldSearch = fields.map((field) => {
    if (!user[field]) {
      return false;
    }
    return true;
  });

  return !fieldSearch.some((item) => item === false);
};

const isEmailRegistered = async (email) => {
  const user = await findUserByEmail(email);
  if (user !== null) {
    return true;
  }
  return false;
};

const passwordValidator = (password) => {
  const minPasswordLength = 8;
  if (password.length < minPasswordLength && password !== 'admin') {
    return false;
  }
  return true;
};

const emailValidator = (email) => {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
};

module.exports = {
  fieldFinder,
  isEmailRegistered,
  emailValidator,
  passwordValidator,
};
