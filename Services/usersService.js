const users = require('../Models/users');

const createUserService = async (name, email, password, role) => (
    users.createUser(name, email, password, role)
  );

module.exports = {
    createUserService,
  };