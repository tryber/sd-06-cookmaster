const validadeToken = require('../auth/validateToken');
const { UsersModel } = require('../models');

const status401 = 401;
const errorMsg = (status, mess) => ({ status, message: { message: mess } });

const LoginValidator = async (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(errorMsg(status401, 'All fields must be filled'));

  const userExist = await UsersModel.getEmail(email);
  if (!userExist || email !== userExist.email || password !== userExist.password) {
    return next(errorMsg(status401, 'Incorrect username or password'));
  }
  req.infoToken = userExist;
  next();
};

const verifyAuthorization = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return next(errorMsg(status401, 'missing auth token'));
  
  const error = errorMsg(status401, 'jwt malformed');
  const payload = validadeToken(token);
  if (!payload) return next(error);
  
  const userExist = await UsersModel.getEmail(payload.email);
  if (!userExist) next(error);

  req.infoUser = payload;
  next();
};

module.exports = {
  LoginValidator,
  verifyAuthorization,
};
