const jwt = require('jsonwebtoken');
const UserService = require('../model/UsersModel');

const UNAUTHORIZED = 401;
const secret = 'secretToken';

const validateFields = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  next();
};

const inputsValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  const emailIsValid = emailFormat.test(email);
  const passwordIsValid = (pass) => pass.length > 3;

  const findUser = await UserService.findUser(email);
  // console.log(!emailIsValid, !passwordIsValid(password), !findUser);
  if (!emailIsValid || !passwordIsValid(password) || !findUser) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  req.data = findUser;
  next();
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.findUser(decoded.data.email);
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateFields,
  inputsValidation,
  validateToken,
};
