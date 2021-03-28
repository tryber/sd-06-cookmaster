const model = require('../models/users');

const getByEmail = async (email) => model.getByEmail(email);

const createNewUser = async (name, email, password) => {
  const emailAlreadyUsed = await getByEmail(email);

  if (emailAlreadyUsed) return 'email already used';

  return model.createNewUser(name, email, password);
};

const loginUser = async (email, password) => {
  const user = await getByEmailAndPassword(email, password);

  return user;
}

module.exports = {
  createNewUser,
  loginUser,
};