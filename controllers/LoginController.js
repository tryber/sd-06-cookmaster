const { Router } = require('express');
const LoginService = require('../services/LoginSevices');
const createToken = require('../authorization/auth');

const LoginController = Router();
const STATUS_200 = 200;

LoginController.post('/', async (request, response) => {
  const { email, password } = request.body;
  const empty = await LoginService.verifiedEmptyFields(response, email, password);
  console.log(empty);
  if (empty === null) {
    const verify = await LoginService.verifyUser(response, email, password);
    if (verify.name) {
      const token = createToken(verify);
      return response.status(STATUS_200).json({ token });
    }
  }
});

module.exports = LoginController;