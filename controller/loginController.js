const { Router } = require('express');
const rescue = require('express-rescue');

const { loginValidation } = require('../middlewares/loginValidation');
const { loginAuthentication } = require('../service/loginService');

const loginController = Router();

const { UNAUTHORIZED, OK } = require('../utils/statusCodeHandler');

loginController.post('/', loginValidation, rescue(async (request, response) => {
  const loginSuccessfully = await loginAuthentication(request.body);

  if (!loginSuccessfully) {
    return response
      .status(UNAUTHORIZED.code)
      .json({ message: UNAUTHORIZED.message.incorrectField });
  }

  response.status(OK).json(loginSuccessfully);
}));

module.exports = {
  loginController,
};
