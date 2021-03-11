const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/UsersModel');

const BAD_REQ = 400;
const CONFLICT = 409;
const FORBIDDEN = 403;
const secret = 'shhhh...é segredo';

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!name || !email || !password || !regexEmail.test(email)) {
    return res.status(BAD_REQ).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const result = await getByEmail(email);
  if (result) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

const validateAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  try {
  const payload = jwt.verify(token, secret, {
    iss: 'Cookmaster',
    aud: 'identity',
  });
  const { role: adminRole } = payload.userData;
  if (adminRole !== 'admin') {
    throw new Error('Only admins can register new admins');
  }
  } catch (err) {
  return res.status(FORBIDDEN).json({ message: err.message });
  }
  next();
};

module.exports = {
  validateUser,
  validateEmail,
  validateAdmin,
};
