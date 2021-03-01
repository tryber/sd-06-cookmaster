const { validateEmail } = require('./usersService');
const { getOneUser } = require('../models/usersModel');

const userExists = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await getOneUser(email);
  if (!user || user.password !== password) {
    return response.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

const validateLogin = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(401).json({ message: 'All fields must be filled' });
  }
  if (!validateEmail(email)) {
    return response.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  validateLogin,
  userExists,
};