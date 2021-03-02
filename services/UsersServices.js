const UsersModels = require('../models/UsersModels');

const create = async (name, email, password, role = 'user') => {
  const usedEmail = await UsersModels.findEmail(email);
  if (usedEmail) return false;
  const user = await UsersModels.create(name, email, password, role);

  return {
    user,
  };
};

module.exports = {
  create,
};
