const { findUserByEmail } = require('../models/usersModel');

async function userValidation(req, res, next) {
  const { name, email, password } = req.body;
  const emailTokenValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  const validationRegisterEmail = await findUserByEmail(email);
  
  if (validationRegisterEmail !== null) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  if (!name || !email || !password || !emailTokenValidation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  return next();
}

async function loginValidation(req, res, next) {
  const { email, password } = req.body;
  const gotUserBy = await findUserByEmail(email);

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  
  if (!gotUserBy || gotUserBy.password !== password || gotUserBy.email !== email) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  return next();
}

module.exports = {
  userValidation,
  loginValidation,
};
