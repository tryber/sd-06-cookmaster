const { getUserByEmail } = require('../models/usersModel');

const BADREQUEST = 400;
const CONFLICT = 409;
const UNAUTHORIZED = 401;

async function validateUser(req, res, next) {
  const { name, email, password } = req.body;
  const emailFormatValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  const emailRegistered = await getUserByEmail(email);
  
  if (emailRegistered !== null) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }

  if (!name || !email || !password || !emailFormatValid) {
    return res.status(BADREQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  return next();
}

async function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const foundUser = await getUserByEmail(email);

  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  
  if (!foundUser || foundUser.password !== password || foundUser.email !== email) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }

  return next();
}

module.exports = {
  validateUser,
  validateLogin,
};
