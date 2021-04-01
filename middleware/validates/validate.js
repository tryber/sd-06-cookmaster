const {
  verifyEmailUnique,
} = require('../../models/usersModels');

const validateName = (name) => {
  const error = {};
  if (!name || name === '') {
    error.status = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }
  return error;
};

const regex = new RegExp(/[1-9\w]{4,16}@\w{3,7}.[a-z]{2,5}/);

const validateEmail = (email) => {
  const testEmail = regex.test(email);
  const error = {};
  if (!email || !testEmail) {
    error.status = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }
  return error;
};

const uniqueEmail = async (email) => {
  const error = {};
  const verify = await verifyEmailUnique(email);
  console.log(verify);
  if (verify) {
    error.status = 409;
    error.message = 'Email already registered';
    throw error;
  }
  return error;
};

const validateEmailPass = (email, pass) => {
  const error = {};
  if (!email || !pass) {
    error.status = 401;
    error.message = 'All fields must be filled';
    throw error;
  }
  return error;
};

const verifyEmailPass = (email, pass) => {
  const error = {};
  const testEmail = regex.test(email);

  if (!testEmail || pass.length < 8) {
    error.status = 401;
    error.message = 'Incorrect username or password';
    throw error;
  }
  return error;
};

module.exports = {
  validateName,
  validateEmail,
  uniqueEmail,
  validateEmailPass,
  verifyEmailPass,
};
