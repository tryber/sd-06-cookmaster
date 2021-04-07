const model = require('../models/userModels');

const getByEmail = async (email) => model.getByEmail(email);

const createNewUser = async (name, email, password) => {
  const emailAlreadyUsed = await getByEmail(email);

  if (emailAlreadyUsed) return 'email already used';

  return model.createNewUser(name, email, password);
};

module.exports = {
  createNewUser,
  getByEmail,
 };
