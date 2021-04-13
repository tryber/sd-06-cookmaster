const connection = require('../Models/connection');

const blank = (value) => (!value);

const invalidEmail = (email) => {
  const dataPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !dataPattern.test(email);
};
const invalidPassword = (value) => typeof value !== 'string';

const errorCode = 400;
const duplicatedCode = 409;
const errorMessage = 'Invalid entries. Try again.';
const duplicatedMessage = 'Email already registered';

const validate = (name, email, password) => {
  switch (true) {
    case blank(name):
    case blank(email):
    case blank(password):
      case invalidPassword(password):  
    case invalidEmail(email): return { code: errorCode, message: errorMessage };
    default: return {};
  }
};

const duplicatedEmail = async (value) => {
  const duplicated = await connection().then((db) => db.collection('users')
    .find({ email: value }).toArray());

  if (duplicated.length !== 0) {
    return { code: duplicatedCode, message: duplicatedMessage };
  }

  return {};
};

module.exports = {
  validate,
  duplicatedEmail,
};
