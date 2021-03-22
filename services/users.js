const models = require('../models/users');

const getByEmail = async (email) => models.getByEmail(email);

const createNewUser = async (name, email, password) => {
  const emailAlreadyUsed = await getByEmail(email);
  // console.log(emailAlreadyUsed);

  if (emailAlreadyUsed) return 'invalid email';

  return models.createNewUser(name, email, password);
};

module.exports = {
  getByEmail,
  createNewUser,
};