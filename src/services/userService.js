const Users = require('../models/Users');

const create = async (name, email, password) => {
  const user = await Users.create(name, email, password);
  return user;
};

const getAll = async () => {
  const users = await Users.getAll();
  return users;
};

module.exports = {
  create,
  getAll,
};