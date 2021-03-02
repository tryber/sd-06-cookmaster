const User = require('../models/usersModel');

const register = async ({ name, email, password }) => User.register(name, email, password);

const findByEmail = async (email, password) => {
  const user = await User.findByEmail(email);
  if (user.password !== password) throw new Error();
  return user;
};

module.exports = { register, findByEmail };