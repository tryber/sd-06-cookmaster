const UserService = require('../service/UserService');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const validateField = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  const emailIsValid = emailFormat.test(email);
  if (!name || !email || !password || !emailIsValid) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const userExist = async (req, res, next) => {
  const { email } = req.body;
  const usersData = await UserService.getAll();
  const emailExist = usersData.every((user) => user.email !== email);
  
  if (!emailExist) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  validateField,
  userExist,
};
