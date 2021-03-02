const { BAD_REQ, CONFLICT, UNAUTHORIZED } = require('../utils');

const { getByEmail } = require('../models/UsersModel');

// const regexEmail = /[\w]{3,30}@[a-zA-Z]{3,8}.[\w]{2,7}/mg;
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

module.exports = {
  validateUser,
  validateEmail,
  validateLogin,
};
