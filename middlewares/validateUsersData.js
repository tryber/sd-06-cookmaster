const Err = require('../errors/Err');

const validateUsersData = (req, _res, next) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  if (!role) role = 'user';
  if (!name || !email || !password || !regexEmail.test(email)) {
    const errorInfo = {
      message: 'Invalid entries. Try again.',
    };
    throw new Err(errorInfo);
  }
  next();
};

module.exports = validateUsersData;
