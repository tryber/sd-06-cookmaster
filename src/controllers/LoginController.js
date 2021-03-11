const rescue = require('express-rescue');
const { LoginService } = require('../services');

const SUCCESS = 200;

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

  const generateToken = await LoginService.userLogin(email, password);

  return res
    .status(SUCCESS)
    .json({ token: generateToken });
});

module.exports = {
  userLogin,
};
