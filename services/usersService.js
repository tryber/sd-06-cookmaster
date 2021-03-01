const model = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const newUser = await model.createUser(name, email, password);
  return newUser;
};

module.exports = {
  createUser,
};