const users = require('../models/users');

const status400 = 400;
const status409 = 409;
const status401 = 401;

const messageReturned = (string) => ({
  message: string,
});

const validateUser = async (request, response, next) => {
  const { name, email, password } = request.body;
  const validEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (!name || !email || !validEmail.test(email) || !password) {
    return response
    .status(status400).json(messageReturned('Invalid entries. Try again.'));
  }

  const foundUser = await users.findUserByEmail(email);
  if (foundUser) {
    return response.status(status409).json(messageReturned('Email already registered'));
  }

  next();
};

const validateLogin = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await users.findUserByEmail(email);
  const validEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (!email || !password) {
    return response
    .status(status401).json(messageReturned('All fields must be filled'));
  }

  if (!user || !validEmail.test(email) || password.length < 3 || user.password !== password) {
    return response
    .status(status401).json(messageReturned('Incorrect username or password'));
  }
  next();
};

module.exports = {
  validateUser,
  validateLogin,
};
