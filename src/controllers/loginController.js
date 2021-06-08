const { Router } = require('express');
const loginService = require('../service/loginService');
const { validingLogin } = require('../middleware');

const router = Router();

router.post('/', validingLogin, async (request, response) => {
  const { email, password } = request.body;
  const token = await loginService.validingLogin(email, password);
  if (token.error) {
    return response
      .status(token.error.code)
      .json(token.error.msg);
  }
  response.status(200).json({ token });
});

module.exports = router;
