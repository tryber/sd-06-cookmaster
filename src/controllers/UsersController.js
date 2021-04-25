const { Router } = require('express');
const rescue = require('express-rescue');

const UsersRouter = Router();
const bodyParser = require('body-parser');

UsersRouter.use(bodyParser.json());

// services imports
const createUsersService = require('../services/CreateUsersService');
const createAdminService = require('../services/CreateAdminService');

// middleware imports
const validateName = require('../middlewares/validateName');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
const verifyAuthorizationAdmin = require('../middlewares/verifyAuthorizationAdmin');

const createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const resp = await createUsersService(name, email, password);

  return res.status(resp.status).json(resp.mensage);
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const resp = await createAdminService(name, email, password);

  return res.status(resp.status).json(resp.mensage);
};

UsersRouter.post('/', validateName, validateEmail, validatePassword, rescue(createUsers));
UsersRouter.post('/admin', verifyAuthorizationAdmin, rescue(createAdmin));

module.exports = UsersRouter;
