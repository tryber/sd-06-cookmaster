const { checkIfUserExists } = require('../models/usersModel');

const { newToken } = require('../jwt/token');

const MinMaxLength = 2;

const UNAUTHORIZED = 401;
const SUCCESS = 200;

const errorObj = {
  message: 'All fields must be filled',
};

async function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (Object.entries(req.body).length !== MinMaxLength) {
    return res.status(UNAUTHORIZED).json(errorObj);
  }

  const foundUserAccount = await checkIfUserExists(email, password);
  if (foundUserAccount === null) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }

  const token = await newToken({ email, password });
  res.status(SUCCESS).json({ token });

  return next();
}

module.exports = validateLogin;
