const { Router } = require('express');

const routes = Router();

const checkData = require('../middlewares/loginMiddlewares');

const dataValidation = [
  checkData.fieldExists,
  checkData.validEmail,
  checkData.validPassword,
];

const LoginServices = require('../services/LoginServices');

routes.post('/', dataValidation, LoginServices.verifyingValidLogin);

module.exports = routes;