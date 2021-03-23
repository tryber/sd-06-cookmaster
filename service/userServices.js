const { findByPassword, createUser, getUserRole } = require('../models/userModel');

const postUser = async (user) => {
  try {
    return await createUser(user);
  } catch (e) {
    return null;
  }
};

const lastUserData = async () => {
  const allUsers = await getUserRole();
  const lastUserIndex = allUsers.length - 1;
  return allUsers[lastUserIndex];
};

const rightPassword = async (password) => {
  try {
    return await findByPassword(password);
  } catch (e) {
    return null;
  }
};

module.exports = {
  lastUserData,
  rightPassword,
  postUser,
};
