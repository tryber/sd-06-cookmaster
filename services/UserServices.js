const Users = require('../models/user');

const errMessage = { message: 'Invalid entries. Try again.' };
const errEmail = { message: 'Email already registered' };
const STATUS_400 = 400;
const STATUS_409 = 409;
const MIN_USERS = 0;
const regex = /^[a-zA-Z0-9]+@[a-z]+\.com$/;

const userRegister = async (email, password, name) => {
  const register = await Users.registerUser(email, password, name);
  return register;
};

const middlewareVerifyFields = (response, email, password, name) => {
  const emailTest = regex.test(email);
  if (!email || !password || !name || !emailTest) {
    return response.status(STATUS_400).json(errMessage);
  }
  return null;
};

const middlewareEmailRepeated = async (response, email) => {
  const allUsers = await Users.getAllUsers();
  if (allUsers.length !== MIN_USERS) {
    const result = allUsers.find((data) => data.email === email);
    return result ? response.status(STATUS_409).json(errEmail) : null;
  }
  return null;
};

module.exports = {
  userRegister,
  middlewareVerifyFields,
  middlewareEmailRepeated,
};
