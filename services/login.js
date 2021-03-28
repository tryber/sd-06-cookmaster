const model = require('../models/login');
const createToken = require('../auth/createToken');
const { INCORRECT_LOGIN_INFO } = require('../dictionary/ErrorMessage');
const { OK, UNAUTHORIZED } = require('../dictionary/StatusCode');

const getByEmailAndPassword = async (email, password) => (
  model.getByEmailAndPassword(email, password)
);

const loginUser = async (email, password) => {
  const user = await getByEmailAndPassword(email, password);

  if (!user) return { status: UNAUTHORIZED, ...INCORRECT_LOGIN_INFO };

  ['name', 'password'].forEach((objKey) => delete user[objKey]);
  const token = createToken(user);

  return { status: OK, message: { token } };
};

module.exports = { loginUser };