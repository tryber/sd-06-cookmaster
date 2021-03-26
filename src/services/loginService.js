const { searchUser } = require('../models/userModel');
const { validateEmail } = require('./userService');

const invalidCredentials = 'Incorrect username or password';
const unfilledFields = 'All fields must be filled';
const UNAUTHORIZED = 401;

const searchLogin = async (email) => searchUser(email);

async function validateUser(req, res, next) {
  const { email, password } = req.body;
  const user = await searchLogin(email);
  if (!user || user.password !== password) {
    return res.status(UNAUTHORIZED).json(
      {
        message: invalidCredentials,
      },
);
  }
  next();
}

async function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json(
      {
        message: unfilledFields,
      },
);
  }
  if (!validateEmail(email)) {
    return res.status(UNAUTHORIZED).json(
      {
        message: invalidCredentials,
      },
);
  }
  next();
}

module.exports = {
  searchLogin,
  validateUser,
  validateLogin,
};