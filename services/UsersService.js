const User = require('../models/User');

async function getAll() {
  const users = await User.getAll();
  return {
    all_users: users,
  };
}

async function findById(id) {
  const user = await User.findById(id);

  if (!user) return { error: { message: 'user not found!' } };

  return user;
}

async function findByEmail(email) {
  const user = await User.findByEmail(email);
  if (!user) return { error: { message: 'user not found!' } };
  return user;
}

async function update(id, newDataFromUser) {
  const updatedUser = await User.update(id, newDataFromUser);
  if (!updatedUser) {
    return {
      error: {
        message: 'User not updated',
        code: 404,
      },
    };
  }

  return updatedUser;
}

async function create(name, email, password, role) {
  const registeredUser = await User.create(name, email, password, role);
  return registeredUser;
}

async function remove(id) {
  const removedUser = await User.remove(id);

  if (!removedUser) {
    return {
      error: {
        message: 'User not removed',
        code: 404,
      },
    };
  }

  return removedUser;
}

module.exports = {
  getAll,
  findById,
  findByEmail,
  update,
  create,
  remove,
};
