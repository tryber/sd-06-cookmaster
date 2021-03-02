const Err = require('../errors/Err');

const validateUsersData = (req, _res, next) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  if (!role) role = 'user';
  if (!name || !email || !password) {
    const errorInfo = {
      message: 'Invalid entries. Try again.',
    };
    throw new Err(errorInfo);
  }
  next();
};

module.exports = validateUsersData;
