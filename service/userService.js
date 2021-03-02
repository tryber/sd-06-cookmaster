const User = require('../model/userModels');
// const { ObjectId } = require('mongodb');

const createUser = async (user) => {
  const create = await User.createUser(user);
  return create;
};
const userFindEmail = async (email) => {
  const emailFind = await User.userFindEmail(email);
  return emailFind;
};
const userFindPassword = async (password) => {
  const passwordFind = await User.userFindPassword(password);
  return passwordFind;
};

module.exports = {
  createUser,
  userFindEmail,
  userFindPassword,
};
