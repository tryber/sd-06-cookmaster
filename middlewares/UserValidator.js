const { UsersModel } = require('../models');
// const { ObjectId } = require('mongodb');

const status400 = 400;
const status409 = 409;
const emailRegex = /\w+@(\w+\.)+\w+$/i;
const errorMsg = (status, mess) => ({ status, message: { message: mess } });

const UserValidator = async (req, _res, next) => {
  const { name, email, password } = req.body;
  if (!name || !password) return next(errorMsg(status400, 'Invalid entries. Try again.'));

  const emailTest = emailRegex.test(email);
  if (!emailTest) return next(errorMsg(status400, 'Invalid entries. Try again.'));

  const userExist = await UsersModel.getEmail(email);
  if (userExist && email === userExist.email) {
    return next(errorMsg(status409, 'Email already registered'));
  }

  next();
};

module.exports = {
  UserValidator,
};
