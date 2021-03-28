const model = require('../models/login');
const createToken = require('../auth/createToken');

const getByEmailAndPassword = async (email, password) => (
  model.getByEmailAndPassword(email, password)
);

const loginUser = async (email, password) => {
  const user = await getByEmailAndPassword(email, password);

  if (!user) return 'Invalid login';

  ['name', 'password'].forEach((objKey) => delete user[objKey]);
  const token = createToken(user);

  return token;
};

module.exports = { loginUser };