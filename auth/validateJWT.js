// const jwt = require('jsonwebtoken');
const UserService = require('../model/UsersModel');

const UNAUTHORIZED = 401;
// const secret = 'secretToken';

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
  const passwordFormat = /^\d{8,}$/gm;
  const emailIsValid = emailFormat.test(email);
  const passwordIsValid = passwordFormat.test(password);

  const usersData = await UserService.getAll();
  const emailExist = usersData.every((user) => user.email !== email);
  if (!emailIsValid || !passwordIsValid || emailExist) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  next();
};

/* const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await model.findUser(decoded.user.email);
    res.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid' });
  }
}; */

module.exports = {
  validateFields,
  inputsValidation,
  // validateToken,
};
