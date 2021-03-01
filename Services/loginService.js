const { findOneUser } = require('../Model/usersModel');
const { validateEmail } = require('./usersService');

const getUserByEmail = async (email) => findOneUser(email);

const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });
  if (!validateEmail(email)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  getUserByEmail,
  checkUser,
  validateLogin,
};
