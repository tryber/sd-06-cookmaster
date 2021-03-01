const connection = require('../models/connection');
// const { ObjectId } = require('mongodb');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;

const uniqueEmail = (email) => {
  const alreadyExists = connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (!alreadyExists) {
    return false;
  }

  return true;
};

const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;

  return emailRegex.test(email);
};

const validateInsertData = async (name, email, role = 'user', password) => {
  if (name && email && password && uniqueEmail(email) && validEmail(email)) {
    return [{
        user: {
        name,
        email,
        role,
        password,
      },
    }, CREATED];
  }
  if (!uniqueEmail(email)) {
    const error = [{ message: 'Email already registered' }, CONFLICT];
    throw error;
  }
  const error = [{ message: 'Invalid entries. Try again.' }, BAD_REQUEST];
  throw error;
};

module.exports = {
  validateInsertData,
};
