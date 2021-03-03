const { Router } = require('express');
const rescue = require('express-rescue');

const UsersRouter = Router();
const bodyParser = require('body-parser');

UsersRouter.use(bodyParser.json());

// services imports
const createUsersService = require('../services/CreateUsersService');

// middleware imports
const validateName = require('../middlewares/validateName');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const resp = await createUsersService(name, email, password);

  return res.status(resp.status).json(resp.mensage);
};

UsersRouter.post('/', validateName, validateEmail, validatePassword, rescue(createUsers));

module.exports = UsersRouter;
