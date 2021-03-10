const jwt = require('jsonwebtoken');
const UsersService = require('./UsersService');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 409;
const secret = 'mySecretToken';

const isBlank = (field) => !field || field === '';

const findByEmail = async (email) => {
  const users = await UsersService.getUserAll();
  return users.some((user) => user.email === email);
};

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return !regex.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailVerify = await findByEmail(email);  
  switch (true) {
    case (isBlank(name) || isBlank(email) || validateEmail(email) || isBlank(password)):
      return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    case emailVerify:
      return res.status(CONFLICT).json({ message: 'Email already registered' });
    default: next();
  }
};

const loginIsCorrect = async (email, password) => {
  const user = await UsersService.findByOneEmail(email);
  return (!user || user.password !== password);
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const loginNoCorrect = await loginIsCorrect(email, password);
  switch (true) {
    case (isBlank(email) || isBlank(password)):
      return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
    case (validateEmail(email) || loginNoCorrect):
      return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    default: next();
  }
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  switch (true) {
    case (isBlank(name) || isBlank(ingredients) || isBlank(preparation)):
      return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
      default: next();
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const user = await UsersService.findByOneEmail(decoded.data.email);
    switch (true) {
      case (isBlank(user)):
        return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
      default:
        req.user = user;
        next();
    }
  } catch (error) {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
};

const validateTokenUpdate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (isBlank(token)) { return erros.missing_token; }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersService.findByEmail(decoded.data.email);
    if (isBlank(user)) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    next();   
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
};

module.exports = {
  validateUser,
  validateLogin,
  validateRecipe,
  validateToken,
  validateTokenUpdate,
};
