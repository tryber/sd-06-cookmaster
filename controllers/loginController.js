const { INCORRECT_LOGIN_INFO } = require('../errors/messageError');
const { UNAUTHORIZED, OK } = require('../errors/statusCode');
const services = require('../services/login');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await services.loginUser(email, password);

  if (result === 'Invalid login') return res.status(UNAUTHORIZED).json(INCORRECT_LOGIN_INFO);

  return res.status(OK).json({ token: result });
};

module.exports = { loginUser };
