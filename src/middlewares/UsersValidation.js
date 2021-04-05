const { findUser } = require('../models/UsersModel');

const STATUS_BAD_REQUEST = 400;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const validateEmail = (email) => {
  const mailRegex = /^\S+@\S+$/;
  return mailRegex.test(email);
};

const UserValidation = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password || !validateEmail(email)) {
      return res.status(STATUS_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    }
    if (await findUser(email)) {
      return res.status(STATUS_CONFLICT).json({ message: 'Email already registered' });
    }
  } catch (err) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ err: 'Server Internal Error' });
  }
  next();
};

module.exports = {
  UserValidation,
};
