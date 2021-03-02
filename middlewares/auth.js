const jwt = require('jsonwebtoken');
const { BAD_REQ, CONFLICT, UNAUTHORIZED, SECRET } = require('../utils');
const { getByEmail } = require('../models/UsersModel');

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !regexEmail.test(email)) {
    return res.status(BAD_REQ).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  // console.log('validateEmail');
  const result = await getByEmail(email);
  if (result) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQ).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
  }

  if (!regexEmail.test(email) || typeof password !== 'string') {
    return res.status(UNAUTHORIZED)
  .json({ message: 'Incorrect username or password' });
  }
  next();
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
  console.log('entrou, não é autorizado');
  return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await getByEmail(decoded.userData.email);
 
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'error to find token user' });
    }
    req.user = user; // Definindo no req.user o usuario logado
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = {
  validateUser,
  validateEmail,
  validateLogin,
  validateJWT,
  validateRecipe,
};
