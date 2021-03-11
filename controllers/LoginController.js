const { Router } = require('express');
const LoginService = require('../services/LoginService');
const { checkLoginFields } = require('../middlewares');

const router = Router();

router.post('/', checkLoginFields, async (request, response) => {
  const { email, password } = request.body;
  const token = await LoginService.validateLogin(email, password);
  if (token.error) {
    return response
      .status(token.error.code)
      .json(token.error.msg);
  }
  response.status(200).json({ token });
});

module.exports = router;
