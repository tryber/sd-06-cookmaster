const model = require('../models/usersModel');

const createUser = async (name, email, password) => 
  model.createUser(name, email, password);

module.exports = {
  createUser,
};