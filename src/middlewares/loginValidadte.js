const { findUserByEmail } = require('../models/User');

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const errMessage = 'Incorrect username or password';

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  if (!regex.test(email)) return res.status(401).json({ message: errMessage });

  const userDB = await findUserByEmail(email);

  if (!userDB) return res.status(401).json({ message: errMessage });

  if (userDB.password !== password) return res.status(401).json({ message: errMessage });

  next();
};

module.exports = {
  loginValidate,
};