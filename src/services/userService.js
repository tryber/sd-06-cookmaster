const UsersModel = require('../models/usersModel');

const getAll = async () => {
  const allUsers = await UsersModel.getAll();

  return allUsers;
};

const findById = async (id) => {
  const findUsersById = await UsersModel.findById(id);

  return findUsersById;
};

const create = async (name, email, password) => {
  const newUser = await UsersModel.create(name, email, password);

  return newUser;
};

const update = async (id, user) => {
  const updateUser = await UsersModel.update(id, user);

  return updateUser;
};

const remove = async (id) => {
  const removeUser = await UsersModel.remove(id);

  return removeUser;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};