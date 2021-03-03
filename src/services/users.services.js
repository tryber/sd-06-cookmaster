const { utils, users } = require('../models');
const { validateUser } = require('../utils/validators');

const findByEmail = async (email) => users.queryByEmail('users', email);

const createUser = async (user) => {
  const isEmailTaken = await findByEmail(user.email);
  await validateUser(user, isEmailTaken);
  const registeredUser = await utils.insertToDb('users', { ...user, role: 'user' });
  const { password, ...results } = registeredUser;
  return results;
};

module.exports = {
  createUser,
};
