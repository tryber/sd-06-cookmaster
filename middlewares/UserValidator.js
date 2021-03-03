const { UsersModel } = require('../models');
// const { ObjectId } = require('mongodb');

const status400 = 400;
const status409 = 409;
const errorMsg = (status, mess) => ({ status, message: { message: mess } });

const UserValidator = async (req, _res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailTest = emailRegex.test(email);
  if (!name || !password) return next(errorMsg(status400, 'Invalid entries. Try again.'));
  if (!emailTest) return next(errorMsg(status400, 'Invalid entries. Try again.'));
  const emailExists = await UsersModel.getEmail(email);
  if (emailExists && email === emailExists.email) {
    return next(errorMsg(status409, 'Email already registered'));
  }
  next();
};

module.exports = {
  UserValidator,
};
