const Users = require('../services/UsersService');

const BAD_REQUEST = 400;
const CONFLICT = 409;

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;

  const REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

  if (!name || !email || !password || !REGEX) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  const checkEmail = await Users.getEmail(email);
  if (checkEmail) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};
