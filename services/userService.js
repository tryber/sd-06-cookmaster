const User = require('../models/userModels');

const createUser = async (name, email, password) => User.createUser(name, email, password);

module.exports = {
  createUser,
};
