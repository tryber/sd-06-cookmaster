const jwt = require('jsonwebtoken');
const { findEmail } = require('../models/usersModel');

const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const CONFLICT = 409;

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // regex do AppReceitas
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const result = await findEmail(email);

  if (!name || !email || !password || !regex.test(email)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  
  if (result) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

const validateAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'senha12345';
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
  validateAdmin,
};
