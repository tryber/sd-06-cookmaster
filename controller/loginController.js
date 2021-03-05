const { Router } = require('express');
const loginServices = require('../services/loginServices');
// const verifyAuthorization = require('../middlewares/verifyAuthorization');
const {
  verifyPassWord,
} = require('../middlewares/validateLogin');

const createToken = require('../services/auth/createToken');

const msg = 'Incorrect username or password';
const loginController = new Router();

const code = 200;

loginController.post('/', verifyPassWord, async (request, response) => {
  const { email, password } = request.body;
  const createLogin = await loginServices.login(email, password);
  console.log(createLogin, ' aqui tem erro');
  if (!createLogin.user) return response.status(401).json({ message: msg });
  const token = await createToken({ email });
  return response.status(code).json(token);
});
module.exports = loginController;
