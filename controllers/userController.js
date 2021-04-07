const services = require('../services/userService');
const { CREATED, CONFLICT } = require('../errors/statusCode');
const { EMAIL_ALREADY_USED } = require('../errors/messageError');

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await services.createNewUser(name, email, password);

  if (newUser === 'email already used') return res.status(CONFLICT).json(EMAIL_ALREADY_USED);

  return res.status(CREATED).json({ user: newUser });
};

module.exports = {
  createNewUser,
};