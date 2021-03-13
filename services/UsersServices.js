const { UsersModel } = require('../models');

const getAll = async () => UsersModel.getAll();
const postUser = async (user) => UsersModel.postUser(user);

module.exports = {
  getAll,
  postUser,
};
