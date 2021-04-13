const Users = require('../model/usersModel');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const BAD_MESSAGE = 'Invalid entries. Try again.';

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: BAD_MESSAGE });
  }
  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  const isEmailValid = /[A-Za-z0-9]+@[A-Za-z]+[A-z]*(\.\w{2,3})+/.test(email);
  if (!email || !isEmailValid) {
    return res.status(BAD_REQUEST).json({ message: BAD_MESSAGE });
  }
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: BAD_MESSAGE });
  }
  next();
}

async function uniqueEmail(req, res, next) {
  const { email } = req.body;
  const findEmail = await Users.findUserByEmail(email);
  
  if (findEmail) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
}

module.exports = {
  validateName,
  validatePassword,
  validateEmail,
  uniqueEmail,
};
