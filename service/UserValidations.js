const { getAllUsers } = require('../models/userModel');

const verifyNameExists = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

const verifyEmailExists = (email) => {
  if (!email) {
    return false;
  }
  return true;
};

const verifyPasswordExists = (password) => {
  if (!password) {
    return false;
  }
  return true;
};

const verifyEmailFormat = (email) => {
  const expectedFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return expectedFormat.test(email);
};

const verifyEmailAlreadyExist = async (email) => {
  const allUsers = await getAllUsers();
  const searchEmail = allUsers.find((user) => user.email === email);
  if (searchEmail) {
    return true;
  }
  return false;
};

const existSetData = (name, email, password) => {
  const nameExist = verifyNameExists(name);
  const emailExist = verifyEmailExists(email);
  const passwordExist = verifyPasswordExists(password);
  if (nameExist && emailExist && passwordExist) {
    return true;
  }
  return false;
};

module.exports = {
  verifyNameExists,
  verifyEmailExists,
  verifyPasswordExists,
  verifyEmailFormat,
  verifyEmailAlreadyExist,
  existSetData,
};
