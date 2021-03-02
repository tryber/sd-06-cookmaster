const users = require('../models/users');

const dataValidate = async (name, email, password) => {
  const errMessage = 'Invalid entries. Try again.';
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const emailUser = await users.findEmailUser(email);

  if (!name || !email || !password) return { err: { status: 400, message: errMessage } };

  if (!regex.test(email)) return { err: { status: 400, message: errMessage } };

  if (emailUser) return { err: { status: 409, message: 'Email already registered' } };

  return false;
};

const create = async (name, email, password) => {
  const errorMessage = await dataValidate(name, email, password);

  if (errorMessage) return errorMessage;

  const userCreated = await users.create(name, email, password);

  return userCreated;
};

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const errMessage = 'Incorrect username or password';

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  if (!regex.test(email)) return res.status(401).json({ message: errMessage });

  const userDB = await users.findEmailUser(email);

  if (!userDB) return res.status(401).json({ message: errMessage });

  if (userDB.password !== password) return res.status(401).json({ message: errMessage });

  next();
};

module.exports = {
  create,
  loginValidate,
};
