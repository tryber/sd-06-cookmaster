const connection = require('../models/connection');
// const { ObjectId } = require('mongodb');

const OK = 200;
const UNAUTHORIZED = 401;

const emailExists = async (email) => {
  const alreadyExists = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (alreadyExists) {
    return true;
  }

  return false;
};

const correctPassword = async (password) => {
  const itIsCorrect = await connection()
  .then((db) => db.collection('users').findOne({ password }));

  if (itIsCorrect) {
    return true;
  }

  return false;
};

const validPassword = (password) => {
  if (password.length > 5) return true;
  return false;
};

const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;

  return emailRegex.test(email);
};

const validateInsertData = async (email, password) => {
  const emailExistsResponse = await emailExists(email);
  const passwordIsCorrect = await correctPassword(password);
  if (email
    && password && emailExistsResponse && passwordIsCorrect && validEmail(email) && validPassword
  ) {
    return [{
      user: {
        email,
        password,
      },
    }, OK];
  }
  if (!email || !password) {
    const error = [{ message: 'All fields must be filled' }, UNAUTHORIZED];
    throw error;
  }
  const error = [{ message: 'Incorrect username or password' }, UNAUTHORIZED];
  throw error;
};

module.exports = {
  validateInsertData,
};
