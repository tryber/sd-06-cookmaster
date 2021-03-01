const { status, errorMessages } = require('../middlewares/errorHandler/dictionaries');
const usersServices = require('../services/usersServices');

const registerUser = async (req, res) => {
  const responsePayload = await usersServices.registerUser();
  console.log(responsePayload);
  res.status(status.ok).send('Register User');
};

const registerAdmin = async (req, res) => {
  const responsePayload = await usersServices.registerAdmin();
  console.log(responsePayload);
  res.status(status.ok).send('Register Adming');
};

const userLogin = async (req, res) => {
  const responsePayload = await usersServices.userLogin();
  console.log(responsePayload);
  res.status(status.ok).send('User Login');
};

module.exports = { registerUser, userLogin, registerAdmin };