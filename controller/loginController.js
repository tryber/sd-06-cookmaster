const { Router } = require('express');
// const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');
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
  if (!createLogin.user) return response.status(401).json({ message: msg });
  const { _id, email: EM, role } = createLogin.user;
  const token = createToken({ _id, email: EM, role }); // renomeado o email porque ja existe
  // console.log(jwt.decode(token));
  return response.status(code).json({ token }); // a resposta  deve receber um objeto com o atributo token
});
module.exports = loginController;
