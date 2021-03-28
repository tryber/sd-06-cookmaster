const { Router } = require('express');
const userService = require('../service/userService');
const validation = require('../service/validations/createUserValidation');

const routerUser = new Router();

const created = 201;

routerUser.get('/', async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json({ users });
});

routerUser.post('/', validation.nameVerification,
validation.emailVerification,
validation.passwordVerification, async (req, res) => {
  const userInfo = req.body;
  const newUser = await userService.createUser(userInfo);

  return res.status(created).json(newUser);
});
// recebe de todas as stacs(rotas acima) os erros
routerUser.use('/', async (error, req, res, _next) => {
  console.log('error', error);
  return res.status(error.status).json({ message: error.message });
});

module.exports = routerUser;
