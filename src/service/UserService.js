const UserModel = require('../model/UserModel');

const createUser = async (user) => {
  const userWithRole = user;
  userWithRole.role = 'user';

  return UserModel.createUser(userWithRole);
};

module.exports = {
  createUser,
};