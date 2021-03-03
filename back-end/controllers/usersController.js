const { status } = require('../middlewares/errorHandler/dictionaries');
const {createToken} = require('../middlewares/validations/utils/tokenGenerator');
const usersServices = require('../services/usersServices');

const registerUser = async (req, res) => {
  const reqPayload = req.body;
  const responsePayload = await usersServices.registerUser(reqPayload);
  res.status(status.created).json(responsePayload);
};

const registerAdmin = async (req, res) => {
  const responsePayload = await usersServices.registerAdmin();
  console.log(responsePayload);
  res.status(status.ok).send('Register Adming');
};

const userLogin = async (req, res) => {
  const token = createToken(req.body);
  console.log(token);
  res.status(status.ok).json({ token });
};

module.exports = { registerUser, userLogin, registerAdmin };