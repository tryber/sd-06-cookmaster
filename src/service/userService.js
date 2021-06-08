const {
  allUsers,
  findById,
  findByEmail,
  updateUser,
  createUser,
  removeUser,
} = require('../models/userModel');

async function getAllService() {
  const result = await allUsers();
  return { all_users: result };
}

async function findByIdService(id) {
  const result = await findById(id);
  if (!result) return { error: { message: 'user not found!' } };
  return result;
}

async function findByEmailService(email) {
  const result = await findByEmail(email);
  if (!result) return { error: { message: 'user not found!' } };
  return result;
}

async function updateUserService(id, newDataFromUser) {
  const result = await updateUser(id, newDataFromUser);
  if (!result) {
    return {
      error: {
        message: 'User not updated',
        code: 404,
      },
    };
  }
  return result;
}

async function createUserService(name, email, password, role) {
  const result = await createUser(name, email, password, role);
  return result;
}

async function removeUserService(id) {
  const result = await removeUser(id);
  if (!result) {
    return {
      error: {
        message: 'User not removed',
        code: 404,
      },
    };
  }
  return result;
}

module.exports = {
  getAllService,
  findByIdService,
  findByEmailService,
  updateUserService,
  createUserService,
  removeUserService,
};
