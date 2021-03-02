const User = require('../models/usersModel');

const findByEmail = async (email, password) => {
  const user = await User.findByEmail(email);
  if (user.password !== password) throw new Error();
  return user;
};

const emailIsValid = (email) => /\S+@\S+\.\S+/.test(email);

const register = async ({ name, email, password }) => {
  if (!name || !email || !password 
      || !emailIsValid(email)) throw new Error('Invalid entries. Try again.');
  return User.register(name, email, password);
};

module.exports = { register, findByEmail };