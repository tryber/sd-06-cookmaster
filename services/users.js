const users = require('../models/users');

const invalidEntriesError = {
  err: {
    statusCode: 400,
    customMessage: 'Invalid entries. Try again.',
  },
};

const conflictError = {
  err: {
    statusCode: 409,
    customMessage: 'Email already registered',
  },
};

const isEmailValid = (email) => {
  const comparison = /[\w]{3,30}@[a-zA-Z]{3,8}.[\w]{2,7}/mg;
  return comparison.test(email);
};

const isEmailUnique = async (email) => {
  const alreadyExists = await users.findByEmail(email);
  if (alreadyExists) {
    return false;
  }
  return true;
};

const create = async ({ name, email, password }) => {
  if (!name || !email || !password || !isEmailValid(email)) {
    return invalidEntriesError;
  }
  const emailIsUnique = await isEmailUnique(email);
  if (!emailIsUnique) {
    return conflictError;
  }
  const { insertedId } = await users.create({ name, email, password });

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
};

module.exports = {
  create,
};
