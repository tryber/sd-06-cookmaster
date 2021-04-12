const { Router } = require('express');
const { fieldFinder, passwordValidator, emailValidator, } = require('../services/validators');
const { BAD_REQUEST, UNATHORIZED, SUCCESS } = require('../services/httpStatuses');
const { mustFillAllFields, wrongNameOrPassword } = require ('../services/messages');
const tokenCreator = require('../auth/tokenCreator');

const LoginController = new Router();

LoginController.post('/', (req, res) => {
  const { email, password } = req.body;
  const requiredFields = ['email', 'password'];
  const doRequiredFieldsExist = fieldFinder(req.body, requiredFields);

  if (!doRequiredFieldsExist) {
    return res.status(UNATHORIZED).json(mustFillAllFields);
  }

  const isPasswordValid = passwordValidator(password);
  const isEmailValid = emailValidator(email);

  if (!isEmailValid || !isPasswordValid) {
    return res.status(UNATHORIZED).json(wrongNameOrPassword);
  }

  const token = tokenCreator(req.body);
  return res.status(SUCCESS).json({ token })
});

module.exports = LoginController;
