const users = require('../models/users');

const errorWriter = (code, message) => ({
  err: {
  statusCode: code,
  customMessage: message,
},
});

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

const findById = async ({ id }) => {
  const user = await users.findById({ id });
  if (!user) {
    return errorWriter(400, 'Couldn´t find user');
  }
  return user;
};

const create = async ({ name, email, password, role }) => {
  if (!name || !email || !password || !isEmailValid(email)) {
    return errorWriter(400, 'Invalid entries. Try again.');
  }
  const emailIsUnique = await isEmailUnique(email);
  if (!emailIsUnique) {
    return errorWriter(409, 'Email already registered');
  }
  const { insertedId } = await users.create({ name, email, password, role });

  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

module.exports = {
  create,
  findById,
};
