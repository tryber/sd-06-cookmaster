const services = require('../services/users');
const { CREATED, CONFLICT, OK } = require('../dictionary/StatusCode');
const { EMAIL_ALREADY_USED } = require('../dictionary/ErrorMessage');

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await services.createNewUser(name, email, password);

  if (newUser === 'email already used') return res.status(CONFLICT).json(EMAIL_ALREADY_USED);

  return res.status(CREATED).json({ user: newUser });
};

module.exports = {
  createNewUser,
};