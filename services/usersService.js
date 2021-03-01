// const { ObjectId } = require('mongodb');
const usersModel = require('../models/usersModel');

const CONFLICT = 409;
const BAD_REQUEST = 400;

const registerUser = async (userInfo) => usersModel.registerUser(userInfo);

const validateEmail = (email) => {
  const pattern = /\S+@\S+.\S+/;
  return pattern.test(email);
};

const validateUser = async (request, response, next) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return response.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const checkUniqueEmail = async (request, response, next) => {
  const { email } = request.body;
  const usersList = await usersModel.getAllUsers();
  const Exists = await usersList.find((users) => users.email === email);

  if (Exists) {
    return response.status(CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  checkUniqueEmail,
  validateUser,
  registerUser,
};
