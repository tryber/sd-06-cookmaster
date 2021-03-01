const Users = require('../models/Users');

const create = async (name, email, password, role = "user") => {
  const user = Users.create(name, email, password, role = user)
  return user;
};

module.exports = {
  create,
};