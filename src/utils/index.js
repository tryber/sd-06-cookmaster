const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const secret = 'secretToken'; // .env

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const throwThisError = (code, msg) => {
  const err = new Error(msg);
  err.codeStatus = code;
  throw err;
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throwThisError(BAD_REQUEST, 'Token not found');

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findByEmail(decoded.data);
    if (!user) throwThisError(404, 'Token user not found');
    const { _id } = user;
    req.userId = _id;
  } catch {
    throwThisError(UNAUTHORIZED, 'jwt malformed');
  }
  next();
};

module.exports = { 
  throwThisError,
  verifyToken,
 };