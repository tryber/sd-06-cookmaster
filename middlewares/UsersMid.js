const { getByEmail } = require('../models/UsersModel');

const BAD_REQ = 400;
const CONFLICT = 409;

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!name || !email || !password || !regex.test(email)) {
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

module.exports = {
  validateUser,
  validateEmail,
};
