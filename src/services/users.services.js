const { utils, users } = require('../models');
const { validateUser } = require('../utils/validators');
const { dictionary: { error } } = require('../utils/dictionary');

const findByEmail = async (email) => users.queryByEmail('users', email);

const createUser = async (data) => {
  const isEmailTaken = await findByEmail(data.email);
  await validateUser(data, isEmailTaken);
  const newUser = await utils.insertToDb('users', { ...data, role: 'user' });
  const { password, ...results } = newUser;
  return results;
};

const createAdmin = async (data, adminId) => {
  const isEmailTaken = await findByEmail(data.email);
  await validateUser(data, isEmailTaken);
  const admin = await utils.queryFromDb('users', adminId);
  if (admin.role !== 'admin') throw new Error(error.failedCreateAdmin);
  const newAdmin = await utils.insertToDb('users', { ...data, role: 'admin' });
  const { password, ...results } = newAdmin;
  return results;
};

module.exports = {
  createUser,
  createAdmin,
};
