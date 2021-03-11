const User = require('../models/usersModel');

const findByEmail = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!email || !password) throw new Error('All fields must be filled');
  if (!user) throw new Error('Incorrect username or password');
  if (user.password !== password) throw new Error('Incorrect username or password');
  return user;
};

const emailIsValid = (email) => /\S+@\S+\.\S+/.test(email);

const register = async ({ name, email, password }) => {
  if (!name || !email || !password 
      || !emailIsValid(email)) throw new Error('Invalid entries. Try again.');
  const equalsEmail = await User.findByEmail(email);
  if (equalsEmail) throw new Error('Email already registered');
  return User.register(name, email, password);
};

module.exports = { register, findByEmail };