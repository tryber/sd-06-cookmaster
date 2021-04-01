const {
  insertUser,
  login,
} = require('../models/usersModels');

const {
  validateName,
  validateEmail,
  uniqueEmail,
  validateEmailPass,
  verifyEmailPass,
} = require('../middleware/validates/validate');

const postBar = async (body) => {
  const { name, email, password } = body;
  await uniqueEmail(email);
  validateName(name);
  validateEmail(email);
  const result = await insertUser(name, email, password);
  return result;
};

const postBarLogin = async (body) => {
  const { email, password } = body;
  validateEmailPass(email, password);
  verifyEmailPass(email, password);
  const resLogin = await login(email, password);
  return resLogin;
};

module.exports = {
  postBar,
  postBarLogin,
};
