const connection = require('../models/connection');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const FORBIDDEN = 403;

const uniqueEmail = async (email) => {
  const alreadyExists = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (alreadyExists) {
    return false;
  }

  return true;
};

const validEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailRegex.test(email);
};

const validateInsertData = async (name, email, role = 'user', password) => {
  const isUnique = await uniqueEmail(email);
  if (name && email && password && isUnique && validEmail(email)) {
    return [{
      user: {
        name,
        email,
        role,
        password,
      },
    }, CREATED];
  }
  if (!isUnique) {
    const error = [{ message: 'Email already registered' }, CONFLICT];
    throw error;
  }
  const error = [{ message: 'Invalid entries. Try again.' }, BAD_REQUEST];
  throw error;
};

const validateAdminRole = async (email) => {
  const { role } = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (role === 'admin') {
    return true;
  }
  const error = [{ message: 'Only admins can register new admins' }, FORBIDDEN];
  throw error;
};

module.exports = {
  validateInsertData,
  validateAdminRole,
};
