const users = require('../models/users');

const status400 = 400;
const status409 = 409;

const messageReturned = (string) => ({
  message: string,
});

const validateUser = async (request, response, next) => {
  const { name, email, password } = request.body;
  const validEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  // const message = () => return 'Invalid entries. Try again';

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

module.exports = {
  validateUser,
};
