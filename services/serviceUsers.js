const model = require('../models/modelUsers');

const getAllUsers = async () => model.getAllUsers();

const getUserById = async (id) => {
  const user = await model.getUserById(id);

  return user;
};

const createUser = async ({ name, email, password, role }) => {
  const newUser = await model.createUser({ name, email, password, role });

  return newUser;
};

const updateUser = async ({ id, name, email, password, role }) => {
  const update = await model.updateUser({ id, name, email, password, role });

  return update;
};

const excludeUser = async (id) => {
  const exclude = await model.excludeProduct(id);

  return exclude;
};

module.exports = {
  excludeUser,
  updateUser,
  createUser,
  getUserById,
  getAllUsers,
};