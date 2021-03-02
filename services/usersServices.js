const { create, findEmail } = require('../models/usersModel');

const createUser = async (user) => {
  const newUser = await create(user);
  return newUser;
};

const findByEmail = async (email) => {
  const user = await findEmail(email);

  return user;
};

module.exports = { createUser, findByEmail };
