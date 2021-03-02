const users = require('../Models/users');

const createUserService = async (name, email, password, role) => {
    const newUser = await users.createUser(name, email, password, role);
    return newUser;
};

module.exports = {
    createUserService,
  };