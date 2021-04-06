const { validateEmail } = require('./users');
const { getOneUser } = require('../Models/users');

const Error401 = 401;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getOneUser(email);
  
  if (!user || user.password !== password) {
    return res.status(Error401).json({ message: 'Incorrect username or password' });
  }
  next();
};

const validateFields = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(Error401).json({ message: 'All fields must be filled' });
  }
  if (!validateEmail(email)) {
    return res.status(Error401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  validateFields,
  validateLogin,
};
