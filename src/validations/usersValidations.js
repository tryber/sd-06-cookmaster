const { findByEmail } = require('../models/mongoDbRequests');

const connectionUsers = 'users';

const objError = (message, status) => ({ message, status });
// const isString = (parameter) => typeof parameter === 'string';
// const isEqual = (parameter1, parameter2) => parameter1 === parameter2;
// const isLessThan = (parameter1, parameter2) => parameter1 < parameter2;
const isBlank = (parameter) => !parameter;
const isValidEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);  
};

const validationUsersKeysFormat = (body) => {
  const { name, email, password } = body;
  const typeError = 400;

  switch (true) {
    case isBlank(name):
    case isBlank(email):
    case isBlank(password):
    case isValidEmail(email):
      return objError('Invalid entries. Try again.', typeError);
    default: return null;
  }  
};

const validationUsersEmailConflict = async (body) => {
  const { email } = body;
  const typeError = 409;
  
  try {
    const emailConflict = await findByEmail(connectionUsers, email);
    if (emailConflict) {
      return objError('Email already registered', typeError);
    }
  } catch {
    return objError('erro interno', 500);
  }  
  return null;
};

module.exports = {
  validationUsersKeysFormat,
  validationUsersEmailConflict,
};
