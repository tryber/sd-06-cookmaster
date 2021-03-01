const usersModel = require('../models/usersModel');
const { loginError } = require('../variables');

const findUser = async (email) => usersModel.findOneUser(email);

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(loginError).json({
      message: 'All fields must be filled',
    });
  }

  next();
};

const validateData = async (req, res, next) => {
  const { email, password } = req.body;
  const patternEmail = /\S+@\S+.\S+/;

  if (!patternEmail.test(email)) {
    return res.status(loginError).json({ message: 'Incorrect username or password' });
  }

  const user = await findUser(email);

  if (!user || user.password !== password) {
    return res.status(loginError).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  findUser,
  validateLogin,
  validateData,
};
