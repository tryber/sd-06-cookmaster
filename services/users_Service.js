const users = require('../models/users');

const BadRequest = 400;
const Conflict = 409;

const getAllUsers = () => users.getAll();
const createUser = (name, email, password) => users.setUser(name, email, password);

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.com?$/i;
  const emailExist = await users.findByEmail(email);
  if (!name || !email || !password || !emailValidation.test(email)) {
    return res.status(BadRequest).json({ message: 'Invalid entries. Try again.' });
  }

  if (emailExist) {
    return res.status(Conflict).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  getAllUsers,
  createUser,
  validateUser,
};
