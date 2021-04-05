const usersModel = require('../Models/users');

const addUser = async (userInfo) => usersModel.addUser(userInfo);
const Error400 = 400;
const Error409 = 409;
const validateEmail = (email) => {
  const emailRegex = /\S+@\S+.\S+/;
  return emailRegex.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !validateEmail(email) || !password) {
    return res.status(Error400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const allValidUsers = await usersModel.allUsers();

  const userIsRegister = await allValidUsers.find((users) => users.email === email);

  if (userIsRegister) {
    return res.status(Error409).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};
module.exports = {
  validateEmail,
  addUser,
  validateUser,
  validateUniqueEmail,
};