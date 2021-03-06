const usersModel = require('../models/usersModel');

const createUser = async (user) => {
  const { email, name, password, role = 'user' } = user;

  const createdUser = usersModel.createUser({ email, name, password, role });

  return createdUser;
};

const verifyFields = async (request, response, next) => {
  const { email, name, password } = request.body;
  const regex = /\S+@\S+.\S+/;

  if (!regex.test(email) || !name || !password) {
    return response.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  const exists = await usersModel.getUserByEmail(email);

  if (exists) return response.status(409).json({ message: 'Email already registered' });

  next();
};

module.exports = { createUser, verifyFields };
