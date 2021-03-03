const { UsersModel } = require('../models');

const status401 = 401;
const errorMsg = (status, mess) => ({ status, message: { message: mess } });

const LoginValidator = async (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(errorMsg(status401, 'All fields must be filled'));

  const userExist = await UsersModel.getEmail(email);
  if (!userExist && email !== userExist.email && password !== userExist.password) {
    return next(errorMsg(status401, 'Incorrect username or password'));
  }

  next();
};

module.exports = {
  LoginValidator,
};
