const { findEmail } = require('../models/usersModel');

const BAD_REQUEST = 400;
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

module.exports = {
  validateUser,
};
