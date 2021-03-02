const userModels = require('../Models/usersModel');
const validEmail = require('./validEmail');

const errInvalidEntries = { message: 'Invalid entries. Try again.' };
const errEmail = { message: 'Email already registered' };
const errInvalid = { message: 'Incorrect username or password' };
const errUnauthorized = { message: 'All fields must be filled' };
const errStatus = 400;
const unauthorized = 401;
const errEmailStatus = 409;

const createValidation = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  if (!password) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  const getEmail = await userModels.getByEmail(email);
  if (validEmail(email) === false) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  if (!email) {
    return res.status(errStatus).json(errInvalidEntries);
  }
  if (getEmail) {
    return res.status(errEmailStatus).json(errEmail);
  }
  next();
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(unauthorized).json(errUnauthorized);
  }
  if (validEmail(email) === false) {
    return res.status(unauthorized).json(errInvalid);
  }
  const getByEmail = await userModels.getByEmail(email);
  if (!getByEmail) {
    return res.status(unauthorized).json(errInvalid);
  }
  const checkPass = getByEmail.password;
  if (password !== checkPass) {
    return res.status(unauthorized).json(errInvalid);
  }
  next();
};

module.exports = {
  createValidation,
  loginValidation,
};
