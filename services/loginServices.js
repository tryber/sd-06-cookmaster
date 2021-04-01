const loginModel = require('../model/loginModel');

const login = async (email, password) => {
  const newLogin = await loginModel.createLogin(email, password);
  return newLogin;
};
module.exports = { 
  login, 
};